FROM nginx:latest

COPY /infra/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
EXPOSE 443

ENTRYPOINT [ "nginx" ]
CMD [ "-g", "daemon off;" ]
