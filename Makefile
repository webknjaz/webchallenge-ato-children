MGR=./manage.py
PINST=pip install -r
WSGI=gunicorn


deps:
	$(PINST) requirements.txt

dev-deps:
	$(PINST) dev.txt

dev: dev-deps db
	$(MGR) runserver_plus 0.0.0.0:8080

run: deps db
	$(WSGI) ato_children.wsgi

db:
	$(MGR) migrate

static:
	gulp build

all: dev
