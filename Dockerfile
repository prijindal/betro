FROM node:20-alpine

RUN apk add --no-cache dumb-init

ENV NODE_ENV production

USER node

WORKDIR /app

EXPOSE 5001

COPY --chown=node:node node_modules /app/node_modules
COPY --chown=node:node .npmrc package*.json turbo.json /app/
COPY --chown=node:node libraries /app/libraries
COPY --chown=node:node packages /app/packages
COPY --chown=node:node services /app/services

ENV UI_BUILD_PATH services/ui/dist/

CMD [ "dumb-init", "node", "services/api/dist/src/server.js"]
