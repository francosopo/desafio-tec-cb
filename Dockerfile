FROM node:18
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm run start:prod

CMD ["npm", "run", "start:dev"]