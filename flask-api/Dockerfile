FROM python:3.8
ADD . ./opt/
WORKDIR /opt/
EXPOSE 6000
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
CMD ["python","api.py"]