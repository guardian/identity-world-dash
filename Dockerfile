FROM mhart/alpine-node:5

# Native dependencies
RUN apk add --update make gcc g++ python

EXPOSE 3000

ADD . /app

WORKDIR /app

# Install all the  node things
RUN [ "npm", "i" ]

# Remove natives
RUN apk del make gcc g++ python && \
  rm -rf /tmp/* /var/cache/apk/* /root/.npm /root/.node-gyp

CMD [ "npm", "start" ]
