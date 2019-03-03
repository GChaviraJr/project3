# specify the node base image with your desired version node:<version>
FROM node:11.10.1-stretch

# Set the working directory
RUN mkdir -p /Users/guadalupechavira/git/project3/project3/node_modules && chown -R node:node /Users/guadalupechavira/git/project3/project3
RUN mkdir -p /Users/guadalupechavira/git/project3/project3/client/node_modules && chown -R node:node /Users/guadalupechavira/git/project3/project3/client
WORKDIR /Users/guadalupechavira/git/project3/project3/client

# Copy the current directory contents into the container
COPY . /project3

# Install any needed packages specified in package.json file
COPY package.json /Users/guadalupechavira/git/project3/project3
USER node
RUN yarn
COPY package.json /Users/guadalupechavira/git/project3/project3/client
USER node
RUN yarn

# Bundle app source
COPY . /Users/guadalupechavira/git/project3/project3

# Make port 80 available to the world outside this container
EXPOSE 8080

# Define environment variable
ENV NODE_VERSION $NODE_VERSION

# Build arguments
ARG NODE_VERSION=11.10.1

CMD [ "yarn", "start"]
