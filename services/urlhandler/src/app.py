#!/bin/env python
""" This module implements the CreateURL Service """
import logging
from flask import Blueprint, jsonify, request
from src import db
from pymongo import errors
from bson.json_util import dumps
__author__ = "Anuvrath Joshi"

createUrl_blueprint = Blueprint('aboutauto', __name__, template_folder='templates', static_folder='static')


@createUrl_blueprint.route('/urlhandler/createshorturl', methods=['POST'])
def create_url():
    """
    This service handles the add URL requests
    """

    return jsonify({'shortLink': 'http://localhost:fkjsdfjd'}), 500