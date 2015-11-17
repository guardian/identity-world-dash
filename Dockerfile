FROM mhart/alpine-node:5

EXPOSE 3000

ADD . /app

WORKDIR /app

RUN [ "npm", "i" ]

CMD [ "npm", "start" ]
