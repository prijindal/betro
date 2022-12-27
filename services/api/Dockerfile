FROM node:18

ENV NODE_ENV production

RUN apt-get update && apt-get install -y --no-install-recommends dumb-init

USER node
WORKDIR /app
COPY --chown=node:node package*.json /app/
COPY --chown=node:node node_modules /app/node_modules
COPY --chown=node:node migrations /app/
COPY --chown=node:node dist /app/

EXPOSE 4000

CMD [ "dumb-init", "node", "server.js"]