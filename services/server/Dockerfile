FROM node:21-alpine

RUN apk add --no-cache tini

RUN mkdir -p /usr/src/app/node_modules

RUN chown -R node:node /usr/src/app

USER node

WORKDIR /usr/src/app

COPY --chown=node:node server/package*.json ./

RUN npm install

RUN npm cache clean --force

ENTRYPOINT ["/sbin/tini", "--"]

CMD ["npm", "run", "start:dev"]