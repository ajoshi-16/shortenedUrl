FROM mongo:latest
COPY initScripts /docker-entrypoint-initdb.d/
ENV MONGO_INITDB_DATABASE=automation
ENV ME_CONFIG_MONGODB_ADMINUSERNAME=root
ENV ME_CONFIG_MONGODB_ADMINPASSWORD=example