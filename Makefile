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

dev: dev-deps db build-static
	$(MGR) runserver_plus 0.0.0.0:8080 --traceback $1

run: db
	$(WSGI) ato_children.wsgi $1 &

production: build-static run

django-static:
	$(MGR) collectstatic --noinput

gulp-static:
	npm install --only=dev
	gulp build-prod

build-static: django-static gulp-static

run-front:
	gulp
