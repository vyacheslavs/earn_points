FROM node:18.16.1-alpine as builder

RUN mkdir -p /src
WORKDIR /src
COPY . .

RUN npm ci
RUN npm run build

WORKDIR /src/backend
RUN npm ci
RUN npm run build

FROM node:18.16.1-alpine

RUN mkdir -p /app/www

COPY --from=builder /src/build/ /app/www/
COPY --from=builder /src/backend/build/ /app/
COPY --from=builder /src/entrypoint.sh /app/

EXPOSE 3001
ENTRYPOINT ["/app/entrypoint.sh"]
