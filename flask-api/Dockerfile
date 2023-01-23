FROM python:3.8

ADD . ./opt/
WORKDIR /opt/
EXPOSE 6000
RUN pip install --upgrade pip
RUN pip install poetry
# RUN pip install -r requirements.txt
RUN poetry config virtualenvs.create false
RUN poetry install --no-dev

CMD ["poetry","run","python","api.py"]