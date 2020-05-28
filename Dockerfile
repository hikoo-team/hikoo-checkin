FROM node:12-alpine as builder

USER node

ENV NODE_ENV build
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin

WORKDIR /home/node

COPY --chown=node:node . /home/node

RUN npm install --no-save && npm run build

EXPOSE 8080

CMD ["npm", "run", "start:prod"]