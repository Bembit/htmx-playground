FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8001

CMD ["node", "app.js"]

# cd lambda-replica-server
# docker build -t lambda-replica-server .
# docker run -p 8001:8001 lambda-replica-server