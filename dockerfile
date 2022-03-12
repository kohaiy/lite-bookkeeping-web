FROM nginx

WORKDIR /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/nginx.conf

COPY ./dist ./

EXPOSE 80
