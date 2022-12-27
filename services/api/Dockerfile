FROM node:18 as build

RUN apt-get update && apt-get install -y --no-install-recommends dumb-init

ENV NODE_ENV production

WORKDIR /app
COPY package*.json /app/
RUN npm install --omit=dev

FROM node:18

ENV NODE_ENV production
COPY --from=build /usr/bin/dumb-init /usr/bin/dumb-init
USER node
WORKDIR /app
COPY --chown=node:node --from=build /app/node_modules /app/node_modules
COPY --chown=node:node dist /app/

EXPOSE 4000

CMD [ "dumb-init", "node", "server.js"]