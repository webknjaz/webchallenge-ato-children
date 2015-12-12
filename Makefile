MGR=./manage.py
PINST=pip install -r
WSGI=gunicorn


all: dev

deps:
	$(PINST) requirements.txt

dev-deps:
	$(PINST) dev.txt

db:
	$(MGR) migrate

provision: db build-static

dev: dev-deps provision
	$(MGR) runserver_plus 0.0.0.0:8080

run: deps provision
	$(WSGI) ato_children.wsgi

django-static:
	$(MGR) collectstatic --noinput

gulp-static:
	gulp build-prod

build-static: django-static gulp-static

run-front:
	gulp
