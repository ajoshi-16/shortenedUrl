FROM python:2.7.16-slim
WORKDIR /usr/src/app
COPY ./requirements.txt /usr/src/app/requirements.txt
COPY ./entrypoint.sh /usr/src/app/entrypoint-prod.sh
RUN pip install -r requirements.txt
RUN chmod +x /usr/src/app/entrypoint-prod.sh
COPY . /usr/src/app
CMD gunicorn -b 0.0.0.0:5000 manage:app