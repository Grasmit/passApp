FROM node:alpine
WORKDIR /app
COPY package* .
RUN ["npm","install"]
COPY . .
ENV BACKEND_PORT=3000
EXPOSE 3000
CMD [ "npm","start" ]