FROM node:20-alpine
WORKDIR /app
COPY pacakage*.json ./
RUN npm install
COPY . .

EXPOSE 5000
CMD ["npm", "start"]