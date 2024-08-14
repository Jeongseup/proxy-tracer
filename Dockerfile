# Use the official Node.js image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the entire codebase to the working directory
COPY . .

# Expose the port on which your app will run
EXPOSE 3000

# Set the environment variables (optional, can also be done using Docker run command)
# ENV API_URL=http://example.com:8080

# Command to run the application
CMD ["node", "index.js"]