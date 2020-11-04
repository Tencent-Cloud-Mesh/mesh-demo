# Tencent Cloud Mesh Demo

## Demo概览

Demo是一个电商网站，由6个服务组成：

- **frontend：**网站前端，调用user、product、cart、order服务
- **product：**商品服务，提供商品信息
两个版本，版本一没有顶部广告banner；版本二有顶部广告banner
- **user：**用户登陆服务，提供登陆功能
- **cart：**购物车服务，提供添加、查看购物车功能，调用库存服务提供库存告警功能，需要登陆才可以下单
- **order：**订单结算服务，登陆后点击checkout后可发起结算，结算时需要调用stock库存服务查询库存情况，库存不足会下单失败
两个版本，版本一无积分抵扣运费的功能，版本二有积分抵扣运费的功能
- **stock：**库存服务，为order购物车服务的库存告警功能和order订单结算服务的库存查询提供库存信息

![Demo界面](1-2-2.png)
![Demo结构](1-2-1.svg)

服务使用了多种开发语言，模拟跨团队协作多语言的开发场景。

## Demo部署

当前demo已经完成构建与镜像打包，部署至Kubernetes集群的Deployment yaml文件已经归档至`/yamls`文件夹，初始部署的app Deployment yaml文件是：`/yamls/apps-zone-a.yaml`。每个服务的代码已经归档至`/app`文件夹。

部署完成后，您可以根据[教程文档](https://tencent-cloud-mesh.github.io/meshdemotutorial.github.io/)体验腾讯云服务网格在变更发布，可观测性，分布式高可用架构，安全隔离场景中的功能。

体验过程中涉及到的配置yaml文件也已经归档至`/yamls`文件夹，或可以直接从教程代码块中复制获取。