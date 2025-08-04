FROM node

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

EXPOSE 5000

CMD ["node", "server/index.js"]
