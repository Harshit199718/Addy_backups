# Use official Node.js image as a parent image
FROM node:20

# Install necessary build tools for native modules
# RUN apt-get update && apt-get install -y \
#   build-essential \
#   python3 \
#   && apt-get clean && rm -rf /var/lib/apt/lists/*

# # Install Redis
# RUN apt-get update && apt-get install -y redis-server
# EXPOSE 6379

# Node.js application setup
RUN mkdir -p /usr/src/app/
WORKDIR /usr/src/app/
COPY package.json /usr/src/app/package.json
RUN npm i
COPY . /usr/src/app/
ENV NODE_ENV=production
EXPOSE 8000

# Start the Node.js application
CMD ["npm", "run", "start"]