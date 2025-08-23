FROM node:24-alpine AS build
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.28-alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist /usr/share/nginx/html
COPY defoult.conf /etc/nginx/nginx.conf
EXPOSE 80 
CMD ["nginx", "-g", "daemon off;"]