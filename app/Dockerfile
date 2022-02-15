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

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=build /app/build .

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]