#!/bin/env python
""" This module implements the CreateURL Service """
import logging
from flask import Blueprint, jsonify, request, redirect
from src import db
from pymongo import errors
from bson.json_util import dumps
import string
import random
import logging
__author__ = "Anuvrath Joshi"

createUrl_blueprint = Blueprint('aboutauto', __name__, template_folder='templates', static_folder='static')
RANDOM_KEY_LENGTH = 12


@createUrl_blueprint.route('/urlhandler/createshorturl', methods=['POST'])
def create_url():
    """
    This service handles the add URL requests
    """
    letters_and_digits = string.ascii_letters + string.digits
    random_key = ''.join(random.choice(letters_and_digits) for i in range(RANDOM_KEY_LENGTH))
    generated_short_url = 'http://localhost/urlhandler?key='+random_key
    logging.info(generated_short_url)

    payload = {}
    try:
        request_payload = request.get_json()
        payload['key'] = random_key
        payload['shortUrl'] = generated_short_url
        payload['originalURL'] = request_payload['originalUrl']
        payload['usage_count'] = 0
        payload['max_usage'] = 10
    except KeyError:
        return jsonify({'Status': 'Wrong Data Sent'}), 400

    try:
        logging.info(payload)
        db.url_store.insert_one(payload,bypass_document_validation=False)
        return jsonify({'shortLink': generated_short_url}), 200
    except errors.OperationFailure:
        return jsonify({'Status': 'Failure to get sub module list'}), 500


@createUrl_blueprint.route('/urlhandler', methods=['GET'])
def get_url():
    """
        This service handles the add URL requests
    """
    try:
        key = request.args.get('key')
        find_query = {
            "key": key
        }
    except KeyError:
        return jsonify({'Status': 'Wrong Data Sent'}), 400

    try:
        cur_document = db.url_store.find_one(find_query)
        forwarding_url = cur_document['originalURL']
        return redirect(forwarding_url, code=301)
    except errors.OperationFailure:
        return jsonify({'Status': 'Failure to get sub module list'}), 500
