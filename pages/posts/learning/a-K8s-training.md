---
layout: post
title: 记录一下 K8s 小课堂
date: 2024-08-04 00:23:38
updated: 2024-08-04 00:23:38
tags:
  - K8s
categories:
  - 快去学习
excerpt_type: html
---

> 一些参考资料：
> 
> - [cndevtutorial](https://github.com/LI-Mingyu/cndevtutorial)
> - [kubernetes.io 文档](https://kubernetes.io/zh-cn/docs/home/)

**内容可能存在错误，欢迎纠正。**

<!-- more -->

## 从 Docker 开始

Docker 等容器技术的出现和微服务大行其道脱不开关系。和一般的单体服务相比，微服务开销更小，单个服务的功能也更单一，这就对承载平台带来了挑战。不管是服务器还是虚拟机，只部署一个微服务显然浪费资源，部署多个微服务的话又难以隔离各类资源和运行环境。容器技术最大的特点就是把应用和运行环境打包、达到了开箱即用的效果，这也就解决了上面的问题，我们能在不浪费服务器资源的同时隔离各个服务，也为更好的应用监控、资源分配等打下了基础。从此应用要面对的不再是 OS 乃至机器，而是容器。

~~有了标准化的交付手段，换台机器就不能跑的时代成为历史啦！~~

[Docker](https://www.docker.com/) 是使用最广泛的开源容器引擎，基于操作系统级的虚拟化技术 runc，依赖 Linux 内核特性 Namespace（环境隔离） 和 Cgroup（资源限制）。~~不多解释，毕竟我也不是很懂。~~

### Docker 容器与容器管理

我们可以把 Docker 容器大致分为 4 类：

1. 无状态服务（例如微服务）
2. 有状态服务（例如数据库）
3. Job（例如数据分析任务）
4. 工具（例如 netshoot）

这样分类的目的是总结出创建容器（`docker run`）时常用的选项参数。其中无状态服务和有状态服务都需要长时间运行，所以它们经常要用到 `-d` 让容器在后台运行，用 `-P` 将容器所暴露的所有端口随即映射到宿主机的端口（`-p` 会将容器暴露的端口映射到宿主对应的端口，但很可能遇到宿主端口被占用的请况），有状态服务还可能要操作文件，比方说指定保存数据的目录，这时就要用到 `-v` 把宿主机的目录挂载到容器里；Job 类的容器通常运行完之后就可以直接退出，不用挂到后台，不过遇到要处理数据的情况就要用到 `-v` 了；工具类的容器可能需要交互，所以经常会用到 `-it`，交互式运行并分配一个伪终端。

除此之外，管理容器常用的命令还有 `docker` ...

- `ps`：列出容器
- `inspect`：查看容器的详细信息
- `exec`：在容器中执行命令
- `logs`：获取容器输出到 `stdout` 和 `stderr` 的日志
- `rm`：删除容器

当然，我们可以利用 help 或者文档来查看更多的命令选项和管理方法。

### Docker 镜像

Docker 镜像本身是一个分层存储的文件，按照创建时的命令顺序依次“向上堆叠”。另外，容器启动的时候会创建一个可写的容器层，所有的文件操作都发生在这里，容器不会修改镜像层的文件。

有关镜像的命令通常是 `docker image ...`。

#### Dockerfile

Dockerfile 中常用的指令：

|指令|描述|
|--|--|
|FROM|说明基于哪个镜像来构建这个镜像|
|MAINTAINER|镜像维护者|
|RUN|构建镜像时运行的 shell 命令|
|COPY|将文件/目录复制到镜像中|
|ADD|将文件/目录添加到镜像中，支持通过 URL 远程获取资源|
|ENV|设置环境变量|
|USER|为 `RUN`、`CMD` 和 `ENTRYPOINT` 指定用户|
|EXPOSE|声明容器运行的服务端口|
|WORKDIR|为 `RUN`、`CMD`、`ENTRYPOINT`、`COPY` 和 `ADD` 设置工作目录|
|ENTRYPOINT|运行容器时执行，如果有多个，最后一个生效|
|CMD|运行容器时执行，如果有多个，最后一个生效，能够被 `docker run` 的参数**替换**|

为什么不能用 `RUN cd xxx` 来更改工作目录？每一个 `RUN` 都相当于启动一个容器、执行命令然后提交文件变更，后面的命令并不继承前一层的变化。

## 说到 K8s

我们一般把 K8s 称为容器管理平台，在“云原生”的世界中，它扮演了类似于操作系统的角色，对上提供一组功能和接口给云原生应用，对下则管理网络、存储等资源。

K8s 在很长一段时间里用 Docker 作为容器运行时环境。虽然现在 K8s 已经抛弃 Docker 转向了 containerd，但是 Docker 镜像已经成为事实上的标准，我们还是可以在本地用 Docker 开发，部署时再使用 containerd。

### K8s 的架构

![K8s架构.png](https://s2.loli.net/2024/08/04/YTO5Xu7wEchfdWB.png)

- kuberctl：管理 K8s 环境的命令行工具
- ApiServer：操作 K8s 资源的入口
- Scheduler：负责将 Pod 调度到合适的 Node 上
- Controller-manager：由负责不同资源的多个 Controller 构成，共同负责集群内的 Node、Pod 等所有资源的管理
- etcd：K8s 集群的数据库
- Node
  - kubelet：部署在每个 Node 节点上，向 ApiServer 注册，管理节点上的 pod，检查容器健康状态，通过 Metrics Server 等监控 Node、Pod 的资源使用情况
  - kube-proxy：网络代理与负载均衡
  - Pod：K8s 的最小调度单元（相当于虚拟机？），一个 Pod 可以封装多个容器，容器之间共享存储、网络等

*为什么不直接管理容器？*

### Pod 中的容器

Pod 的声明文件说明了 Pod 创建完成的状态。

```yaml
# cndevtutorial/pods/pod-2containers.yaml
apiVersion: v1
kind: Pod
metadata:
  name: 2containers
  labels:
    app: 2containers
spec:
  containers:
  - name: content-generator
    image: centos:7
    command: ["bash","-c",
      "while true;
       do echo $(date) > /contentdir/index.html;
       sleep 1;done"]
    volumeMounts:
      - name: web-content
        mountPath: /contentdir/
  - name: web-server
    image: nginx:1.19-alpine-perl
    ports:
    - containerPort: 80
    volumeMounts:
      - name: web-content
        mountPath: /usr/share/nginx/html/
  volumes:
    - name: web-content
      emptyDir: {}
```

如上所示，可以用列表的形式声明 Pod 中的多个容器。

上面的 Pod 用到了一个启动时为空的[临时卷](https://kubernetes.io/zh-cn/docs/concepts/storage/ephemeral-volumes/)，这个卷的生命周期和 Pod 一样。

`command` 会覆盖容器的 `ENTRYPOINT`？

一些其他的点：

- Sidecar：例如用一个容器运行主服务，另一个容器收集非标准输出的日志
- initContainers：和 containers 同级，为其他容器准备数据和环境等，按声明的顺序运行，所有 initContainer 运行成功之后才会启动其他容器

### 工作负载类型/Pod 的工作策略

K8s 提供了几种工作负载类型，方便用户管理一组 Pod，而不是直接管理每个 Pod。

#### ReplicaSet/Deployment

[ReplicaSet](https://kubernetes.io/zh-cn/docs/concepts/workloads/controllers/replicaset/) 可以提供一组一定数量的 Pod 副本，而 [Deployment](https://kubernetes.io/zh-cn/docs/concepts/workloads/controllers/deployment/) 管理 ReplicaSet，还拥有滚动升级等特性，所以一般使用 Deployment，不直接用 ReplicaSet。Deployment 适用于无状态服务。

Deployment 的例子：

```yaml
# cndevtutorial/deploy-service/deployment-demo.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: spring-demo
spec:
  selector:
    matchLabels:
      app: spring-demo
      tier: front-end
  replicas: 3
  template:
    metadata:
      labels:
        app: spring-demo
        tier: front-end
    spec:
      containers:
      - name: springmsdemo
        image: limingyu007/springmsdemo:1.0
```

Deployment 用 `matchLabels` 来匹配 Pod 声明，即 `template`，`replicas` 指定了 Pod 数量。在滚动更新时，Deployment 创建新的 ReplicaSet，启动一个新的 Pod，成功之后关闭一个老的 Pod，如此直到全部替换完成。

*扩容缩容就是通过更改 `replicas` 实现的；每次更新 Pod 的数量等可以通过 Deployment 的 `spec.strategy` 来配置。*

#### StatefulSet

[StatefulSet](https://kubernetes.io/zh-cn/docs/concepts/workloads/controllers/statefulset/) 负责管理有状态应用。

StatefulSet 的例子：

```yaml
# https://kubernetes.io/zh-cn/docs/concepts/workloads/controllers/statefulset/#components
apiVersion: v1
kind: Service
metadata:
  name: nginx
  labels:
    app: nginx
spec:
  ports:
  - port: 80
    name: web
  clusterIP: None # 'Headless' - by me
  selector:
    app: nginx
---
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: web
spec:
  selector:
    matchLabels:
      app: nginx # 必须匹配 .spec.template.metadata.labels
  serviceName: "nginx"
  replicas: 3 # 默认值是 1
  minReadySeconds: 10 # 默认值是 0
  template:
    metadata:
      labels:
        app: nginx # 必须匹配 .spec.selector.matchLabels
    spec:
      terminationGracePeriodSeconds: 10
      containers:
      - name: nginx
        image: registry.k8s.io/nginx-slim:0.24
        ports:
        - containerPort: 80
          name: web
        volumeMounts:
        - name: www
          mountPath: /usr/share/nginx/html
  volumeClaimTemplates:
  - metadata:
      name: www
    spec:
      accessModes: [ "ReadWriteOnce" ]
      storageClassName: "my-storage-class"
      resources:
        requests:
          storage: 1Gi
```

*`ReadWriteOnce`只允许一个 Pod 访问卷，但是允许多个容器同时操作。使用 `ReadWriteOncePod`可以保证一次只有一个容器访问卷。*

重新创建 StatefulSet 时，Pod 名/HostName 不会改变。

#### DaemonSet

[DaemonSet](https://kubernetes.io/zh-cn/docs/concepts/workloads/controllers/daemonset/) 确保全部（或某些）节点上运行一个 Pod 的副本。当有节点加入集群时，也会为它们新增一个 Pod。当有节点从集群移除时，这些 Pod 也会被回收。删除 DaemonSet 将会删除它创建的所有 Pod。常见用法有节点上的监控、日志收集等。

#### Job 和 CronJob

[Job](https://kubernetes.io/zh-cn/docs/concepts/workloads/controllers/job/) 和 [CronJob](https://kubernetes.io/zh-cn/docs/concepts/workloads/controllers/cron-jobs/) 可以定义运行结束后可以退出的任务。

#### 其他

[Service](https://kubernetes.io/zh-cn/docs/concepts/services-networking/service/)

[Ingress](https://kubernetes.io/zh-cn/docs/concepts/services-networking/ingress/)/[Gateway](https://kubernetes.io/zh-cn/docs/concepts/services-networking/gateway/)

[健康检查和探针](https://kubernetes.io/zh-cn/docs/concepts/configuration/liveness-readiness-startup-probes/)

[容器的生命周期](https://kubernetes.io/zh-cn/docs/concepts/containers/container-lifecycle-hooks/)

Pod 的资源约束，如[计算资源](https://kubernetes.io/zh-cn/docs/concepts/policy/resource-quotas/#compute-resource-quota)

[Pod 水平自动扩缩](https://kubernetes.io/zh-cn/docs/tasks/run-application/horizontal-pod-autoscale/)和[示例](https://kubernetes.io/zh-cn/docs/tasks/run-application/horizontal-pod-autoscale-walkthrough/#create-horizontal-pod-autoscaler)

[存储](https://kubernetes.io/zh-cn/docs/concepts/storage/)与[卷](https://kubernetes.io/zh-cn/docs/concepts/storage/volumes/)

[ConfigMap](https://kubernetes.io/zh-cn/docs/concepts/configuration/configmap/) 和 [Secret](https://kubernetes.io/zh-cn/docs/concepts/configuration/secret/)