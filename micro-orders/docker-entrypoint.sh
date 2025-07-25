#!/bin/sh

# Aguarda o banco ficar pronto (opcional)
echo "⏳ Aguardando o banco de dados..."
sleep 5

# Executa as migrations
echo "📦 Executando migrations..."
npx prisma migrate deploy

# Inicia o app
echo "🚀 Iniciando aplicação..."
node dist/src/main.js
