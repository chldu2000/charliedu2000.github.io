import{g as d,a2 as g,u as h,A as f,U as y,a7 as v,a8 as C,Q as b,D as k,E as x,c as P,w as c,a6 as w,o as A,e as s,k as t,b as o,t as B,G as D,h as E}from"./app-025bdceb.js";import{_ as R}from"./YunPageHeader.vue_vue_type_script_setup_true_lang-870a2da2.js";const V={text:"center",class:"yun-text-light",p:"2"},G={class:"page-action",text:"center"},I=["title"],L=o("div",{"i-ri-arrow-go-back-line":""},null,-1),N=[L],H=d({__name:"gallery",setup(O){const l=g(),{t:n}=h(),e=f(),r=y(e);v([C({"@type":"CollectionPage"})]);const a=b(()=>e.value.photos||[]),_=k().value.addons["valaxy-addon-lightgallery"]?x(()=>D(()=>import("./YunGallery-a3fddf41.js"),["assets/YunGallery-a3fddf41.js","assets/app-025bdceb.js","assets/index-67f11a9b.css"])):()=>null;return(T,i)=>{const u=R,p=E("router-view"),m=w;return A(),P(m,null,{"main-header":c(()=>[s(u,{title:t(r)||t(n)("title.gallery"),icon:t(e).icon||"i-ri-gallery-line",color:t(e).color},null,8,["title","icon","color"])]),"main-content":c(()=>[o("div",V,B(t(n)("counter.photos",t(a).length)),1),o("div",G,[o("a",{class:"yun-icon-btn",title:t(n)("accessibility.back"),onClick:i[0]||(i[0]=()=>t(l).back())},N,8,I)]),s(t(_),{photos:t(a)},null,8,["photos"]),s(p)]),_:1})}}});export{H as default};
