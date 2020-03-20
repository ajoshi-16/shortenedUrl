from flask import Flask
from flask_triangle import Triangle
import logging


def create_app():
    app = Flask(__name__)
    Triangle(app)

    formatter = logging.Formatter("%(asctime)s - %(levelname)s - %(message)s")

    logger = logging.getLogger()
    logger.setLevel(logging.INFO)

    console_handler = logging.StreamHandler()
    console_handler.setLevel(logging.INFO)
    console_handler.setFormatter(formatter)
    logger.addHandler(console_handler)

    from src.app import client_blueprint
    app.register_blueprint(client_blueprint)

    return app
