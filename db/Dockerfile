FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000

CMD ["node", "app.js"]

# cd db
# docker build -t db .
# docker run -p 8000:8000 db