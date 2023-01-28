# Stage1: UI Build
FROM node:14-slim AS ui-build
WORKDIR /usr/src
COPY client/ ./client/
RUN cd client && npm install && npm run start

# Stage2: API Build
FROM node:14-slim AS api-build
WORKDIR /usr/src
COPY server/ ./server/
RUN cd server && npm install && npm run server
RUN ls

Stage3: Packagign the app
FROM node:14-slim
WORKDIR /root/
COPY --from=ui-build /usr/src/client/build ./client/build
COPY --from=api-build /usr/src/server/dist .
RUN ls

EXPOSE 80
