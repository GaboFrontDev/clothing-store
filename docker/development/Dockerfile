# Dockerfile
# Use node alpine as it's a small node image
FROM oven/bun:latest
ARG NODE_ENV
RUN apt-get update && apt-get install libvips-dev vim -y

ENV PORT 3000

# Create the directory on the node image 
# where our Next.js app will live
RUN mkdir -p /app

# Set /app as the working directory
WORKDIR /app

# Copy package.json and package-lock.json
# to the /app working directory
COPY ./package*.json /app/
COPY ./.env /app/

# Install dependencies in /app
RUN bun install

# Copy the rest of our Next.js folder into /app
COPY ./ /app

# For production build
ENV NODE_ENV=${NODE_ENV}

ENV PATH /app/node_modules/.bin:$PATH


# Ensure port 3005 is accessible to our system
EXPOSE 3000

# Run yarn dev, as we would via the command line 
CMD [ "bun", "dev" ]