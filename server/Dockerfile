FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8001

CMD ["node", "app.js"]

# cd server
# docker build -t server .
# docker run -p 8001:8001 server