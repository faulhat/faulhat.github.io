---
header-includes:
  - \hypersetup{colorlinks=false,
            allbordercolors={0 0 0},
            pdfborderstyle={/S/U/W 1}}
---

# List of libraries and modules used in the author-id project

Links:

[author-id-model repository](https://github.com/tafaulhaber590/author-id-model)

[author-id-server repository](https://github.com/tafaulhaber590/author-id-server)



requirements.txt for author-id-model repo:

```
absl-py==1.0.0
astunparse==1.6.3
attrs==21.4.0
autopep8==1.6.0
cachetools==5.0.0
certifi==2021.10.8
charset-normalizer==2.0.12
click==8.0.3
compress-json==1.0.4
coverage==6.3.2
cycler==0.11.0
Cython==0.29.28
Flask==2.0.2
Flask-SQLAlchemy==2.5.1
flatbuffers==2.0
fonttools==4.29.1
gast==0.5.3
gluonnlp==0.10.0
google-auth==2.6.0
google-auth-oauthlib==0.4.6
google-pasta==0.2.0
graphviz==0.8.4
greenlet==1.1.2
grpcio==1.44.0
h5py==3.6.0
hnswlib==0.6.1
idna==3.3
imageio==2.16.1
importlib-metadata==4.11.1
iniconfig==1.1.1
itsdangerous==2.0.1
Jinja2==3.0.3
joblib==1.1.0
kaggle==1.5.12
keras==2.8.0
Keras-Preprocessing==1.1.2
kiwisolver==1.3.2
libclang==13.0.0
Markdown==3.3.6
MarkupSafe==2.0.1
matplotlib==3.5.1
mxboard==0.1.0
mxnet==1.9.0
mysql-client==0.0.1
networkx==2.7.1
numpy==1.22.2
oauthlib==3.2.0
opencv-python==4.5.5.62
opt-einsum==3.3.0
packaging==21.3
pandas==1.4.1
Pillow==9.0.1
plot-keras-history==1.1.30
pluggy==1.0.0
protobuf==3.19.4
py==1.11.0
pyasn1==0.4.8
pyasn1-modules==0.2.8
pybind11==2.9.1
pycodestyle==2.8.0
pydot==1.4.2
pyparsing==3.0.7
pytest==7.1.1
python-dateutil==2.8.2
python-slugify==6.0.1
pytz==2021.3
PyWavelets==1.2.0
requests==2.27.1
requests-oauthlib==1.3.1
rsa==4.8
sanitize-ml-labels==1.0.29
scikit-image==0.19.2
scikit-learn==1.0.2
scipy==1.8.0
six==1.16.0
SQLAlchemy==1.4.31
tensorboard-data-server==0.6.1
tensorboard-plugin-wit==1.8.1
tensorflow==2.8.0
tensorflow-io-gcs-filesystem==0.24.0
termcolor==1.1.0
text-unidecode==1.3
tf-estimator-nightly==2.8.0.dev2021122109
threadpoolctl==3.1.0
tifffile==2022.2.9
toml==0.10.2
tomli==2.0.1
tqdm==4.62.3
typing-extensions==4.1.1
urllib3==1.26.8
Werkzeug==2.0.3
wrapt==1.13.3
zipp==3.7.0
```

.gitmodules for author-id-model repo:

```
[submodule "handwritten-text-recognition-for-apache-mxnet"]
	path = handwritten-text-recognition-for-apache-mxnet
	url = https://github.com/awslabs/handwritten-text-recognition-for-apache-mxnet
```


requirements.txt for author-id-server repo:

```
attrs==21.4.0
autopep8==1.6.0
bcrypt==3.2.0
black==22.3.0
blinker==1.4
certifi==2021.10.8
cffi==1.15.0
charset-normalizer==2.0.12
click==8.0.4
coverage==6.3.2
cryptography==36.0.2
dnspython==2.2.1
email-validator==1.1.3
Flask==2.0.3
Flask-Login==0.5.0
Flask-Mail==0.9.1
Flask-Reuploaded==1.2.0
Flask-SQLAlchemy==2.5.1
Flask-User==1.0.2.2
Flask-WTF==1.0.0
greenlet==1.1.2
idna==3.3
iniconfig==1.1.1
itsdangerous==2.1.2
Jinja2==3.1.0
MarkupSafe==2.1.1
mypy-extensions==0.4.3
numpy==1.22.3
packaging==21.3
passlib==1.7.4
pathspec==0.9.0
Pillow==9.0.1
platformdirs==2.5.1
pluggy==1.0.0
py==1.11.0
pycodestyle==2.8.0
pycparser==2.21
pyparsing==3.0.7
pytest==7.1.1
python-magic==0.4.25
requests==2.27.1
six==1.16.0
SQLAlchemy==1.4.32
toml==0.10.2
tomli==2.0.1
typing-extensions==4.1.1
urllib3==1.26.9
Wand==0.6.7
Werkzeug==2.0.3
WTForms==3.0.1
```

.gitmodules for author-id-server repo

```
[submodule "app/static/win95.css"]
	path = app/static/win95.css
	url = https://github.com/AlexBSoft/win95.css
```
