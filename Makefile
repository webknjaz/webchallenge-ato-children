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

build-static:
	$(MGR) collectstatic --noinput
	gulp build

all: dev
