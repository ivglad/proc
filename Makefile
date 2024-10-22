.PHONY: env
env:
	@echo "Установка переменных окружения..."
	cp .env.example .env

.PHONY: build
build:
	docker compose build

.PHONY: up
up:
	docker compose up -d

.PHONY: down
down:
	docker compose down

.PHONY: restart
restart:
	docker compose restart

.PHONY: logs server
logs:
	docker compose logs -f server