frontend 部分基于 react + nginx进行构建

## 本地运行

### npm install

下载依赖包node_modules

### `npm run start`

本地运行： [http://localhost:3000](http://localhost:3000) 

### ！！！attention

如果想要在本地运行此项目，则需要修改WebAPI.js文件中的接口API为各后端服务接口URL

## 镜像打包流程

### build the project

`npm run build`: 将 project 打包（build folder）

### docker login --username=${USER_NAME} ccr.ccs.tencentyun.com -p ${PASSWORD}

登录镜像仓库

### docker build -t [Registry address]:[image version] . -f [dockerfile]

镜像打包

### docker push [image name]

上传镜像

## nginx配置修改

查看项目路径下的default.conf文件，根据自己的需求进行配置修改