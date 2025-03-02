FROM node

WORKDIR /app

COPY package*.json entrypoint.sh ./

RUN chmod +x /app/entrypoint.sh && \
    npm install

EXPOSE 4000

ENTRYPOINT [ "/app/entrypoint.sh" ]