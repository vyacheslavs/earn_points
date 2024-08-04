ARG NODE_VERSION=18.16.1-alpine

FROM node:${NODE_VERSION} as builder

RUN mkdir -p /src
WORKDIR /src
COPY . .

RUN echo "REACT_APP_BACKEND=" > /src/.env
RUN echo "REACT_APP_BONUS_REWARD_SECRET=KPm8mWqkAN3uPT" >> /src/.env
RUN npm ci
RUN npm run build

WORKDIR /src/backend
RUN npm ci
RUN npm run build

FROM node:${NODE_VERSION}

RUN apk add --no-cache tzdata
ENV TZ=America/Toronto

RUN mkdir -p /app/www
RUN mkdir -p /app/data

COPY --from=builder /src/build/ /app/www/
COPY --from=builder /src/backend/src/points.json /app/points.json.template
COPY --from=builder /src/backend/build/ /app/
COPY --from=builder /src/entrypoint.sh /app/

EXPOSE 3001
ENTRYPOINT ["/app/entrypoint.sh"]
