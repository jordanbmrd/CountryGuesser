##
## Build (immutable) - Create React App
##
FROM node:18-alpine AS build

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .

# Build-time env for CRA (baked into the bundle)
ARG REACT_APP_API_URI
ARG REACT_APP_WEBSOCKET_URI
ARG REACT_APP_MAPBOX_TOKEN
ENV REACT_APP_API_URI=${REACT_APP_API_URI}
ENV REACT_APP_WEBSOCKET_URI=${REACT_APP_WEBSOCKET_URI}
ENV REACT_APP_MAPBOX_TOKEN=${REACT_APP_MAPBOX_TOKEN}

# Reduce build memory usage (useful for buildx/qemu on small Docker memory limits)
ENV GENERATE_SOURCEMAP=false
ENV DISABLE_ESLINT_PLUGIN=true
ENV NODE_OPTIONS=--max_old_space_size=2048

RUN npm run build

##
## Runtime - Nginx serving static + reverse proxy to API/WS
##
FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
