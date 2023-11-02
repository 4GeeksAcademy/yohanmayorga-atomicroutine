"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Journal
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
import bcrypt
from datetime import timedelta

api = Blueprint('api', __name__)

# -----------------------MÉTODOS POST-----------------------#

# POST PARA CREAR USUARIO


@api.route('/create', methods=['POST'])
def create_user():

    body = request.get_json()
    name = body.get("name", None)
    email = body.get("email", None)
    password = body.get("password", None)
    bpassword = bytes(password, 'utf-8')
    salt = bcrypt.gensalt(14)
    hashed_password = bcrypt.hashpw(password=bpassword, salt=salt)
    new_user = User(name=name, email=email, password=hashed_password.decode(
        'utf-8'), salt=salt)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message":"User created success"}), 201

# POST PARA GENERAR TOKEN (INICIAR SESIÓN)


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
    if bcrypt.checkpw(password_byte, user.password.encode('utf-8')):
        return {'token': create_access_token(identity=user.email, expires_delta=timedelta(hours=3))}, 200
    else:
        return {"token": "",
                "message": "you can not access"}, 501

# POST PARA CREAR UN NUEVO DIARIO


@api.route('/createjournal', methods=['POST'])
@jwt_required()
def create_journal():
    body = request.get_json()
    name = body.get("name", None)
    text = body.get("text", None)
    color = body.get("color", None)
    email = get_jwt_identity()
    author = User.query.filter_by(email=email).one_or_none()
    author_id = User.id
    try: 
        # author = User.query.get(1)  # ----------> ASIGNAR USER.ID
        new_journal = Journal(name=name, text=text, color=color,
                            author=author, author_id=author_id)
        db.session.add(new_journal)
        db.session.commit()
    except Exception as error:
        return "error:" + str(error), 500
    return {"journal": new_journal.serialize()}, 200


# -----------------------MÉTODOS GET-----------------------#

# GET PROFILE (PERFIL DEL USUARIO)
@api.route('/profile')
@jwt_required()
def get_customer_profile():
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).one_or_none()
    if user is not None:
        return user.serialize(), 200
    return {"message": "Not Authorized"}, 401

# GET USUARIO POR ID (MUESTRA SUS JOURNALS)


@api.route('/user_journals')
def get_customer_journals():
    user = User.query.get(1)  # ----------> ASIGNAR USER.ID
    if user is not None:
        return user.serialize(), 200
    return {"message": "Error"}, 500

# GET PARA OBTENER TODOS LOS DIARIOS


@api.route('/journals', methods=['GET'])
def get_journals():
    journals = Journal.query.all()
    return jsonify([journal.serialize() for journal in journals])

# GET PARA OBTENER TODOS LOS USUARIOS


@api.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([user.serialize() for user in users])


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }
    return jsonify(response_body), 200
