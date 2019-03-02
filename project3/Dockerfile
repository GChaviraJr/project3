# specify the node base image with your desired version node:<version>
FROM node:11.10.1

# Set the working directory
WORKDIR /Users/guadalupechavira/git/project3/project3

# Copy the current directory contents into the container
COPY . /project3

# Install any needed packages specified in package.json file
COPY package.json /Users/guadalupechavira/git/project3/project3
RUN yarn
COPY package.json /Users/guadalupechavira/git/project3/project3/client
RUN yarn

# Bundle app source
COPY . /Users/guadalupechavira/git/project3/project3

# Make port 80 available to the world outside this container
EXPOSE 80

# Define environment variable
ENV NODE_VERSION $NODE_VERSION

# Build arguments
ARG NODE_VERSION=11.10.1
