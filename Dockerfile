# specify the node base image with your desired version node:<version>
FROM node:11.10.1-stretch

# Set the working directory
RUN mkdir -p /opt/project3/node_modules && chown -R node:node /opt/project3
RUN mkdir -p /opt/project3/client/node_modules && chown -R node:node /opt/project3/client 
RUN mkdir -p /opt/project3/data/mongo
RUN mkdir -p /opt/project3/data/redis

WORKDIR /opt/project3

# Install any needed packages specified in package.json file
COPY package.json /opt/project3
RUN yarn
COPY ./client/package.json /opt/project3/client
WORKDIR /opt/project3/client
RUN yarn

# Bundle app source
COPY . /opt/project3

WORKDIR /opt/project3

# Make port 3001 available to the world outside this container
EXPOSE 3001

# Define environment variable
# ENV NODE_VERSION $NODE_VERSION

# Build arguments
# ARG NODE_VERSION=11.10.1
