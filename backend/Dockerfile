FROM node
RUN apt-get update && apt-get upgrade
WORKDIR /usr/myproejct
COPY . .
RUN npm install
RUN npm cache clear --force
EXPOSE 3000
CMD ["npm" ,"start"] 
