FROM python:2.7.16-slim
RUN apt-get update && apt-get -y install netcat && apt-get clean
WORKDIR /usr/src/app
COPY requirements.txt /usr/src/app/requirements.txt
RUN pip install -r requirements.txt
COPY entrypoint.sh /usr/src/app/entrypoint-prod.sh
RUN chmod +x /usr/src/app/entrypoint-prod.sh
COPY . /usr/src/app
CMD gunicorn -b 0.0.0.0:5000 manage:app