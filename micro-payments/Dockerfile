FROM node:20-alpine

RUN apk add --no-cache libc6-compat openssl

WORKDIR /app

COPY package*.json prisma ./
RUN npm install
RUN npx prisma generate

COPY . .

RUN npm run build

# Copia script de inicialização
COPY docker-entrypoint.sh .

RUN chmod +x docker-entrypoint.sh

# Usa o script como entrypoint
ENTRYPOINT ["./docker-entrypoint.sh"]
