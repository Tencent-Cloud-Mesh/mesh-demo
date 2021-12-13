#build frontend
FROM ccr.ccs.tencentyun.com/qcloud/nginx:1.9
COPY ./default.conf /etc/nginx/conf.d/ 
COPY ./build /usr/share/nginx/html/
EXPOSE 80
ENTRYPOINT nginx -g "daemon off;"