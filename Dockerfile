FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN apk add --no-cache python3 pkgconfig cairo-dev pango-dev jpeg-dev giflib-dev build-base

RUN npm install -g 
RUN node -v 

RUN npm install

COPY . .

CMD ["npm","run","dev"]
