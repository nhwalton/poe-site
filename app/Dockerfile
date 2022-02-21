FROM node:16 as build
COPY package.json /app/
COPY package-lock.json /app/
ADD . ./app/
WORKDIR /app/

RUN npm install
RUN npm run build
# EXPOSE 5000
# ENTRYPOINT ["node", "server.js"]

FROM nginx:alpine

RUN mkdir -p /var/www/poesyn.xyz/html

WORKDIR /var/www/poesyn.xyz/html

# RUN rm -rf /usr/share/nginx/html*

COPY --from=build /app/build .

# RUN mkdir -p /etc/nginx/sites-enabled/

WORKDIR /etc/nginx/sites-available/
# RUN rm /etc/nginx/conf.d/default.conf
COPY poesyn.conf .

RUN ln -s /etc/nginx/sites-available/poesyn.conf /etc/nginx/conf.d/

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]