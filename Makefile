.PHONY: env
env:
	@echo "Установка переменных окружения..."
	cp .env.example .env

.PHONY: up
up:
	docker compose up -d

.PHONY: down
down:
	docker compose down

.PHONY: logs server
logs:
	docker compose logs -f server