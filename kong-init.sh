#!/bin/sh

echo "⏳ Aguardando o Kong iniciar..."
until curl -s http://kong:8001/status > /dev/null; do
  echo "🔁 Esperando Kong ficar online..."
  sleep 2
done

echo "🚀 Registrando microserviços no Kong..."

# Serviço Pedido
curl -s -X POST http://kong:8001/services \
  --data "name=orders-service" \
  --data "url=http://order-service:3001"

curl -s -X POST http://kong:8001/routes \
  --data "name=orders-route" \
  --data "paths[]=/microservice-orders" \
  --data "service.name=orders-service"

# Serviço Pagamento
curl -s -X POST http://kong:8001/services \
  --data "name=payment-service" \
  --data "url=http://payment-service:3002"

curl -s -X POST http://kong:8001/routes \
  --data "name=payments-route" \
  --data "paths[]=/microservice-payments" \
  --data "service.name=payment-service"

echo "✅ Configuração do Kong concluída com sucesso."
