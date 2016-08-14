FROM nginx@stable
MAINTAINER Filipe Oliveira <contato@fmoliveira.com.br>

COPY ./dist /usr/share/nginx/html
