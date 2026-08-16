frontend-install:
	cd frontend && npm install

frontend-dev:
	cd frontend && npm run dev

backend-install:
	cd backend && python -m pip install -e '.[dev]'

backend-dev:
	cd backend && uvicorn app.main:app --reload

test:
	cd backend && pytest
