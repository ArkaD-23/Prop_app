FROM node

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

RUN npx next build

EXPOSE 3000

CMD ["npx","next","start"]
