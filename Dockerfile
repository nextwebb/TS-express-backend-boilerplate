FROM node:14

COPY $PWD /usr/src/app

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Copy source files from host computer to the container
COPY . .

# Build the app
RUN yarn build

# Specify port app runs on
EXPOSE $PORT

# Run the app
CMD [ "yarn", "start" ]