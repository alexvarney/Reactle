FROM nginx:alpine
RUN apk add --update npm

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm run build

COPY build /usr/share/nginx/html