FROM node:14

WORKDIR /ubuntu/src/app

COPY package*.json ./

RUN npm install --silent

# to building for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

RUN npm run build

EXPOSE 8080
CMD [ "node", "dist/main" ]