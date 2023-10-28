"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
import bcrypt
from datetime import timedelta

api = Blueprint('api', __name__)


@api.route('/create', methods=['POST'])
def create_user():

    body = request.get_json()
    name = body.get("name", None)
    email = body.get("email", None)
    password = body.get("password", None)
    is_active = body.get("is_active", None)
    bpassword = bytes(password, 'utf-8')
    salt = bcrypt.gensalt(14)

    hashed_password = bcrypt.hashpw(password=bpassword, salt=salt)

    new_user = User(name=name, email=email, password=hashed_password.decode(
        'utf-8'), salt=salt, is_active=is_active)
    db.session.add(new_user)
    db.session.commit()

    return {"user": new_user.serialize()}, 200


@api.route('/token', methods=['POST'])
def create_token():
    email = request.json.get('email', None)
    password = request.json.get('password', None)
    if email is None or password is None:
        return {'message': 'parameters missing'}, 400
    user = User.query.filter_by(email=email).one_or_none()
    if user is None:
        return {'message': "User doesn't exist"}, 400
    password_byte = bytes(password, 'utf-8')
    # hash_password = bcrypt.hashpw(password_byte)
    if bcrypt.checkpw(password_byte, user.password.encode('utf-8')):
        return {'token': create_access_token(identity=user.email, expires_delta=timedelta(hours=3))}, 200
    return {'message': 'you can not access'}, 501

@api.route('/profile')
@jwt_required()
def get_customer_profile():
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).one_or_none()
    if user is not None:
        return user.serialize(), 200
    return {"message": "Not Authorized"}, 401


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200
