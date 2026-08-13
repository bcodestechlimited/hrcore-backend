FROM node:22-alpine

WORKDIR /app

COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn

RUN node .yarn/releases/yarn-4.17.1.cjs install --immutable

COPY . .

RUN node .yarn/releases/yarn-4.17.1.cjs buildproj

EXPOSE 5000

CMD ["node", ".yarn/releases/yarn-4.17.1.cjs", "startproj"]