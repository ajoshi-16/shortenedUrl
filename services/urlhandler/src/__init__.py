from flask import Flask
from pymongo import MongoClient
import logging

client = MongoClient("mongodb://mongoDB:27017")
db = client.shortURL


def create_app():
    app = Flask(__name__)
    formatter = logging.Formatter("%(asctime)s - %(levelname)s - %(message)s")

    logger = logging.getLogger()
    logger.setLevel(logging.INFO)

    console_handler = logging.StreamHandler()
    console_handler.setLevel(logging.INFO)
    console_handler.setFormatter(formatter)
    logger.addHandler(console_handler)

    from src.app import createUrl_blueprint
    app.register_blueprint(createUrl_blueprint)

    return app
