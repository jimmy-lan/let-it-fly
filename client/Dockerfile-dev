# This Docker file creates a container of client in development
# mode. This is not meant to be used in production.

FROM node:alpine

# Set /app to be primary working folder
WORKDIR /app

# This is required for react-scripts
ENV CI=true

# Install dependencies and copy content
COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json ./
RUN npm install
COPY ./ ./

# Run in development mode
CMD ["npm", "start"]