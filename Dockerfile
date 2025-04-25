FROM node:22-alpines as deps
WORKDIR /app
COPY package.json package-lock*.json* ./
