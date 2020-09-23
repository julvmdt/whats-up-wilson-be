FROM node:lts as dist
WORKDIR /tmp/
COPY package.json package-lock.json tsconfig.json tsconfig.build.json ./
COPY src/ src/
RUN npm install
RUN npm run build

FROM node:lts as node_modules
WORKDIR /tmp/
COPY package.json package-lock.json ./
RUN npm install --production

FROM node:lts-alpine
WORKDIR /usr/local/stockmarketbe
COPY --from=node_modules /tmp/node_modules ./node_modules
COPY --from=dist /tmp/dist ./dist
CMD ["node", "dist/main.js"]

EXPOSE 3000