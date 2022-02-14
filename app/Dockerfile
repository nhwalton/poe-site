FROM node:12
COPY package.json /opt/
COPY package-lock.json /opt/
ADD . ./opt/
WORKDIR /opt/

RUN npm install
RUN npm run build
EXPOSE 5000
ENTRYPOINT ["node", "server.js"]