FROM node:12
COPY package.json /opt/
COPY package-lock.json /opt/
ADD . ./opt/
WORKDIR /opt/

RUN npm install
EXPOSE 8080
ENTRYPOINT ["npm", "start"]