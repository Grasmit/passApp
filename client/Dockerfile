FROM node:alpine
WORKDIR /app
COPY package* .
RUN ["npm","install"]
COPY . .
ENV REACT_APP_BASE_API=http://localhost:3000
EXPOSE 3000
CMD ["npm","start"]