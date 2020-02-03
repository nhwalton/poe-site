# POE Site and API

## Starting Everything

``` bash
# install dependencies and start preact site at localhost:8080
cd site
npm install
npm run dev
```

``` bash
# install dependencies and start api at localhost:5000
cd flask-api
source api/bin/activate
pip install -r requirements.txt
python api.py
```

## Build images

```bash
cd flask-api
docker build -t flask-api .
cd ../site
docker build -t site .
cd ..
docker-compose up -d
```