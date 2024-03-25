.PHONY: env
env: ## Установка переменных окружения
	@echo "Установка переменных окружения..."
	cp .env.example .env

.PHONY: up
up:
	docker compose up -d

.PHONY: down
down:
	docker compose down