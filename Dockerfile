FROM nginx:stable-alpine as production-stage
COPY dist /usr/share/nginx/html
# nginx容器内部暴露的端口
EXPOSE 80
# 运行的命令
CMD ["nginx", "-g", "daemon off;"]
