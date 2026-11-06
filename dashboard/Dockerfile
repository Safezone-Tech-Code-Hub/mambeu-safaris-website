FROM node:22-alpine AS build
WORKDIR /app/dashboard
COPY dashboard/package.json dashboard/package-lock.json* ./
RUN npm ci
COPY dashboard/ .
COPY src/content /app/src/content
ARG VITE_POCKETBASE_URL=https://dashboard-mambeu.schoolhub.space
ARG VITE_PUBLIC_SITE_URL=https://new-mambeu.schoolhub.space
ENV VITE_POCKETBASE_URL=$VITE_POCKETBASE_URL
ENV VITE_PUBLIC_SITE_URL=$VITE_PUBLIC_SITE_URL
RUN npm run build

FROM nginx:alpine
COPY dashboard/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dashboard/dist /usr/share/nginx/html
EXPOSE 8082
CMD ["nginx", "-g", "daemon off;"]
