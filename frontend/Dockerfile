FROM node:20-alpine

WORKDIR /app/frontend

COPY package*.json ./

RUN npm install

COPY . .

ARG NEXT_PUBLIC_MEDUSA_BACKEND_URL
ENV NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://backend:9000
ARG NEXT_PUBLIC_STRIPE_KEY
ENV NEXT_PUBLIC_STRIPE_KEY=pk_test_... 

RUN npm run build

EXPOSE 8000
CMD ["npm", "run", "start"]