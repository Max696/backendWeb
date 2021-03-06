FROM node:14-slim



# set working directory

WORKDIR .



# install app dependencies

COPY ./package.json .





RUN npm install



# add app

COPY . .



EXPOSE 5000



# start app

CMD ["npm", "start"]