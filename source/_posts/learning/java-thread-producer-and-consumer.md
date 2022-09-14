---
title: 生产者消费者模型
tags:
  - Java
  - 多线程
categories:
  - 快去学习
date: 2021-10-07 19:37:53
---

## 生产者消费者模型

~~书接上回……[Java 中的多线程编程？](https://afool.top/learning/java-thread/)……~~

要讨论多线程问题，生产者消费者模型是绕不开的。简单来说，生产者消费者模型中有生产者和消费者两种角色，它们操作同一个“仓库”（或许仓库也可以算一个角色），生产者向仓库中存放资源，消费者从仓库中获取资源。

![生产者消费者](https://i.loli.net/2021/10/08/uegpBx7DaF2IOZJ.png)

显然，仓库已满的时候生产者不能再往仓库中存放资源，而仓库为空的时候消费者不能获取资源。

## 所以……这就实现了？

按照上面所写的定义，我们写代码实现一下这个模型。

```java
// 仓库
package thread1006;

import java.util.LinkedList;

public class Storage {
  private final LinkedList<Object> linkedList = new LinkedList<>();

  public void produce() {
    linkedList.add(new Object());
    System.out.println("生产者 " + Thread.currentThread().getName() + " 生产，当前数量：" + linkedList.size());
  }

  public void consume() {
    linkedList.remove();
    System.out.println("消费者 " + Thread.currentThread().getName() + " 消费，当前数量：" + linkedList.size());
  }

  public int getMAX_SIZE() {
    return 20;
  }

  public LinkedList<Object> getLinkedList() {
    return linkedList;
  }
}
```

```java
// 生产者
package thread1006;

import thread1006.MyRandom;

public class Producer extends Thread {
  Storage storage;

  public Producer(Storage storage) {
    this.storage = storage;
  }

  @Override
  public void run() {
    while (true) {
      if (storage.getLinkedList().size() >= storage.getMAX_SIZE()) {
        System.out.println("仓库已满，生产者 " + this.getName() + " 等待");
        try {
          sleep(MyRandom.getInstance().nextInt(500) + 500);
        } catch (InterruptedException e) {
          e.printStackTrace();
        }
      } else {
        storage.produce();
      }
    }
  }
}
```

```java
// 消费者
package thread1006;

import thread1006.MyRandom;

public class Consumer extends Thread{
  Storage storage;

  public Consumer(Storage storage) {
    this.storage = storage;
  }

  @Override
  public void run() {
    while (true) {
      if (storage.getLinkedList().size() <= 0) {
        System.out.println("仓库为空，消费者 " + this.getName() + " 等待");
        try {
          sleep(MyRandom.getInstance().nextInt(500) + 500);
        } catch (InterruptedException e) {
          e.printStackTrace();
        }
      } else {
        storage.consume();
      }
    }
  }

  public static void main(String[] args) {
    Storage storage = new Storage();

    Producer producer1 = new Producer(storage);
    Producer producer2 = new Producer(storage);
    Producer producer3 = new Producer(storage);
    Consumer consumer1 = new Consumer(storage);
    Consumer consumer2 = new Consumer(storage);
    Consumer consumer3 = new Consumer(storage);
    producer1.start();
    producer2.start();
    producer3.start();
    consumer1.start();
    consumer2.start();
    consumer3.start();
  }
}
```

在 `Consumer` 类中写了程序入口。按照前面所讲的，我们的生产者和消费者线程应该会根据仓库中列表的大小完成我们预期的动作。

但是程序运行的结果却让我大跌眼镜，来看其中的一小段输出：

```text
生产者 Thread-2 生产，当前数量：1
消费者 Thread-4 消费，当前数量：0
消费者 Thread-3 消费，当前数量：1
生产者 Thread-1 生产，当前数量：2
生产者 Thread-0 生产，当前数量：1
生产者 Thread-0 生产，当前数量：2
消费者 Thread-5 消费，当前数量：0
生产者 Thread-0 生产，当前数量：3
生产者 Thread-1 生产，当前数量：1
消费者 Thread-4 消费，当前数量：0
生产者 Thread-2 生产，当前数量：1
消费者 Thread-4 消费，当前数量：3
生产者 Thread-1 生产，当前数量：4
生产者 Thread-1 生产，当前数量：4
```

消费者消费数量与仓库中资源减少量不符，生产者生产后资源数量不变……

还有这种：

```text
仓库为空，消费者 Thread-3 等待
仓库为空，消费者 Thread-5 等待
仓库为空，消费者 Thread-4 等待
仓库已满，生产者 Thread-0 等待
仓库已满，生产者 Thread-1 等待
仓库已满，生产者 Thread-2 等待
```

仓库到底是空还是满？

这些问题很严重。为什么会这样呢？原因很简单：这些线程没有同步。各个线程可以同时对仓库执行自己的动作，我们看到的输出就会乱作一团。设想一下，两个生产者同时生产，我们预期的结果是数量依次加1，但是我们实际看到的可能是两个生产者输出的数量都是原来的数量加2。

还有一个经典的例子：售卖车票。如果购票系统中的一个线程刚使票数减1，票卖完了，但操作没有结束，另一个线程就插进来，很可能导致系统卖出一张不存在的票。

为了避免这些情况，我们需要给这些线程加上同步锁，使线程互斥。

## 还要加锁

在 Java 中加同步锁很简单，用 `synchronized (共享数据对象) { 要同步的代码块 }` 就可以。

加上锁的生产者和消费者如下：

```java
// 生产者
package thread1006;

public class Producer extends Thread {
  Storage storage;

  public Producer(Storage storage) {
    this.storage = storage;
  }

  @Override
  public void run() {
    while (true) {
      synchronized (storage.getLinkedList()) {
        if (storage.getLinkedList().size() >= storage.getMAX_SIZE()) {
          System.out.println("仓库已满，生产者 " + this.getName() + " 等待");
          try {
            storage.getLinkedList().wait();
          } catch (InterruptedException e) {
            e.printStackTrace();
          }
        } else {
          storage.produce();
          storage.getLinkedList().notify();
        }
      }
    }
  }
}
```

```java
// 消费者
package thread1006;

public class Consumer extends Thread{
  Storage storage;

  public Consumer(Storage storage) {
    this.storage = storage;
  }

  @Override
  public void run() {
    while (true) {
      synchronized (storage.getLinkedList()) {
        if (storage.getLinkedList().size() <= 0) {
          System.out.println("仓库为空，消费者 " + this.getName() + " 等待");
          try {
            storage.getLinkedList().wait();
          } catch (InterruptedException e) {
            e.printStackTrace();
          }
        } else {
          storage.consume();
          storage.getLinkedList().notify();
        }
      }
    }
  }

  public static void main(String[] args) {
    Storage storage = new Storage();

    Producer producer1 = new Producer(storage);
    Producer producer2 = new Producer(storage);
    Producer producer3 = new Producer(storage);
    Consumer consumer1 = new Consumer(storage);
    Consumer consumer2 = new Consumer(storage);
    Consumer consumer3 = new Consumer(storage);
    producer1.start();
    producer2.start();
    producer3.start();
    consumer1.start();
    consumer2.start();
    consumer3.start();
  }
}
```

仓库中的 `linkedList` 就是共享数据，所以要把它作为锁，把线程对它的操作作为同步代码块。这样的话在某一时刻就只有一个线程能拿到共享的数据，避免了前面的错误。

上面是用了 `wait()` 和 `notify()` 方法来完成线程的等待和唤醒，当然还有其他方法，就不一一展示了。

一小段输出结果：

```text
仓库已满，生产者 Thread-2 等待
仓库已满，生产者 Thread-0 等待
仓库已满，生产者 Thread-1 等待
消费者 Thread-3消费，当前数量：19
消费者 Thread-3消费，当前数量：18
消费者 Thread-3消费，当前数量：17
消费者 Thread-3消费，当前数量：16
消费者 Thread-3消费，当前数量：15
消费者 Thread-3消费，当前数量：14
消费者 Thread-3消费，当前数量：13
生产者 Thread-1生产，当前数量：14
生产者 Thread-1生产，当前数量：15
生产者 Thread-1生产，当前数量：16
生产者 Thread-1生产，当前数量：17
生产者 Thread-1生产，当前数量：18
生产者 Thread-1生产，当前数量：19
生产者 Thread-1生产，当前数量：20
仓库已满，生产者 Thread-1 等待
消费者 Thread-3消费，当前数量：19
消费者 Thread-3消费，当前数量：18
生产者 Thread-2生产，当前数量：19
生产者 Thread-2生产，当前数量：20
仓库已满，生产者 Thread-2 等待
消费者 Thread-5消费，当前数量：19
消费者 Thread-5消费，当前数量：18
消费者 Thread-5消费，当前数量：17
消费者 Thread-5消费，当前数量：16
消费者 Thread-5消费，当前数量：15
消费者 Thread-5消费，当前数量：14
消费者 Thread-5消费，当前数量：13
```

### 关于 wait() 和 notify()

从上面可以看出调用 `wait()` 和 `notify()` 的对象是作为同步锁的共享资源 `Storage.linkedList`，为什么要用它来调用这两个方法呢？

`wait()` 方法可以让一个线程进入等待状态并释放持有的锁，而 `notify() ` 则是通知等待该锁的线程重新获得这个锁对象。显然，如果没有锁对象，这两个方法就没有意义。所以要使用这两个方法，必须指定锁对象，把要同步的部分写进同步代码块，通过锁对象来调用它们。

~~（话锋一转）~~这也就解释了 `wait()` 和 `sleep()` 的本质区别。`wait()` 是通过线程通信来通知线程进入等待状态并释放锁，而 `sleep()` 是控制当前线程等待，并不释放所持有的资源。同时，由于 `wait()` 涉及到同步锁，我们必须在同步代码块中才能使用它，而 `sleep()` 与锁无关，我们可以在任何地方调用。

哦，还有一件事，`wait()` 属于 `Object` 类（毕竟同步锁可以是任何类的实例），而 `sleep()` 是 `Thread` 类的静态方法。这一点应该不难理解吧……

（欢迎捉虫，逃~）
