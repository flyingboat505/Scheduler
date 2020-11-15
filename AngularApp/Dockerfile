# Stage 1
#FROM node:8.11.2-alpine as node

#WORKDIR /usr/src/app

#COPY package*.json ./

#RUN npm i npm@latest -g

#RUN npm install
#RUN npm audit fix

#COPY . .

#RUN npm run build

# Stage 2
#FROM nginx:1.13.12-alpine

#COPY --from=node /usr/src/app/ /usr/share/nginx/html

FROM node:13
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm audit fix
RUN npm install -g @angular/cli

COPY . /usr/src/app
EXPOSE 4200
CMD ["ng", "serve", "--host=0.0.0.0"]