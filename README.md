# webchallenge-ato-children
Provide ATO victims' children with gifts for the St. Nicholas Day

# HOWTO

Make sure you have `node` of version `4.0.0+` or higher. You may use `nvm` to install it in user space. Also you need `python` of version `3.4+`.

Create `ato_children/local_settings.py` with the following contents:
```python
import os
BASE_DIR = os.path.dirname(os.path.dirname(__file__))

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

DEBUG = True

INSTALLED_APPS = (
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'ato_children',
    'django_extensions',
)
```

Once it's ready, just run:
```sh
$ make dev
```

You may create superuser as follows:
```sh
$ ./manage.py createsuperuser
```
