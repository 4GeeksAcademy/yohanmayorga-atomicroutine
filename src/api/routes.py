"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Journal, TodoList, TodoItem, Habit, Emotion
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
import bcrypt
from datetime import timedelta

api = Blueprint('api', __name__)

# -----------------------MÉTODOS PUT-----------------------#
@api.route("/updatejournal", methods=["PUT"])
def update_journal():
    text = request.json.get("textJournal")
    id = request.json.get("idJournal")
    journal = Journal.query.get(id)
    journal.text = text
    db.session.commit()
    return jsonify({"success": True}), 200


@api.route("/markcompleted", methods=["PUT"])
def mark_completed():
    completed = request.json.get("completed")
    id = request.json.get("taskId")
    todo = TodoItem.query.get(id)
    todo.completed = completed
    db.session.commit()
    return jsonify({"success": True}), 200

@api.route("/markhabitcompleted", methods=["PUT"])
def mark_habit_completed():
    completed = request.json.get("completed")
    id = request.json.get("habitId")
    habit = Habit.query.get(id)
    habit.completed = completed
    db.session.commit()
    return jsonify({"success": True}), 200


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
    #Consultar si existe el usuario
    user = User.query.filter_by(email=email).one_or_none()
    if user is not None:
        return jsonify({"message": "User exists"}), 400
    else:
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
        return {'error': 'parameters missing'}, 400
    user = User.query.filter_by(email=email).one_or_none()
    if user is None:
        return {'error': "User doesn't exist"}, 400
    password_byte = bytes(password, 'utf-8')
    if bcrypt.checkpw(password_byte, user.password.encode('utf-8')):
        return {'token': create_access_token(identity=user.email, expires_delta=timedelta(hours=3))}, 200
    else:
        return {"token": "",
                "error": "you can not access"}, 501

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
        new_journal = Journal(name=name, text=text, color=color,
                            author=author, author_id=author_id)
        db.session.add(new_journal)
        db.session.commit()
    except Exception as error:
        return "error:" + str(error), 500
    return {"journal": new_journal.serialize()}, 200

# POST PARA CREAR UN NUEVO HÁBITO


@api.route('/createhabit', methods=['POST'])
@jwt_required()
def create_habit():
    body = request.get_json()
    name = body.get("name", None)
    description = body.get("description", None)
    date = body.get("date", None)
    completed = body.get("completed", None)
    email = get_jwt_identity()
    author = User.query.filter_by(email=email).one_or_none()
    author_id = User.id
    try: 
        new_habit = Habit(name=name, description=description, date=date, completed=completed, author=author, author_id=author_id)
        db.session.add(new_habit)
        db.session.commit()
    except Exception as error:
        return "error:" + str(error), 500
    return {"habit": new_habit.serialize()}, 200


# POST PARA CREAR UNA NUEVA LISTA

@api.route('/createlist', methods=['POST'])
@jwt_required()
def create_list():
    body = request.get_json()
    name = body.get("name", None)
    email = get_jwt_identity()
    author = User.query.filter_by(email=email).one_or_none()
    author_id = User.id
    try: 
        new_list = TodoList(name=name, author=author, author_id=author_id)
        db.session.add(new_list)
        db.session.commit()
    except Exception as error:
        return "error:" + str(error), 500
    return {"list": new_list.serialize()}, 200

@api.route('/createemotion', methods=['POST'])
@jwt_required()
def create_emotion():
    body = request.get_json()
    name = body.get("name", None)
    email = get_jwt_identity()
    description = body.get("description", None)
    date = body.get("date", None)
    author = User.query.filter_by(email=email).one_or_none()
    author_id = User.id
    try: 
        new_emotion = Emotion(name=name, author=author, author_id=author_id, description=description, date=date)
        db.session.add(new_emotion)
        db.session.commit()
    except Exception as error:
        return "error:" + str(error), 500
    return {"emotion": new_list.serialize()}, 200

# POST PARA CREAR UNA NUEVA TAREA

@api.route('/addtodo', methods=['POST'])
@jwt_required()
def create_todo():
    body = request.get_json()
    name = body.get("todo", None)
    email = get_jwt_identity()
    author = User.query.filter_by(email=email).one_or_none()
    author_id = User.id
    completed = False
    list_id = body.get("list_id", None)
    listName = TodoList.query.filter_by(id=list_id).one_or_none()
    
    try: 
        new_todo = TodoItem(name=name, listName=listName, author=author, author_id=author_id, list_id=list_id, completed=completed)
        print(new_todo)
        db.session.add(new_todo)
        db.session.commit()
    except Exception as error:
        return "error:" + str(error), 500
    return {"todo": new_todo.serialize()}, 200

# -----------------------MÉTODOS DELETE-----------------------#

# DELETE PARA BORRAR UN DIARIO
@api.route('/deletejournal', methods=['DELETE'])
def delete_journal():
    text = request.json.get("journal_id")
    id = Journal.query.get(text)
    if id is None:
        return "Journal not found", 404
    try:
        db.session.delete(id)
        db.session.commit()
    except Exception as error:
        return "error:" + str(error), 500

    return "Journal deleted successfully", 200

# DELETE PARA BORRAR UNA LISTA
@api.route('/deletelist', methods=['DELETE'])
def delete_list():
    text = request.json.get("listId")
    id = TodoList.query.get(text)
    if id is None:
        return "List not found", 404
    try:
        db.session.delete(id)
        db.session.commit()
    except Exception as error:
        return "error:" + str(error), 500

    return "List deleted successfully", 200

# DELETE PARA BORRAR UNA TAREA DE LISTA
@api.route('/deletetodo', methods=['DELETE'])
def delete_todo():
    text = request.json.get("todoId")
    id = TodoItem.query.get(text)
    if id is None:
        return "Todo not found", 404
    try:
        db.session.delete(id)
        db.session.commit()
    except Exception as error:
        return "error:" + str(error), 500

    return "Todo deleted successfully", 200

# DELETE PARA BORRAR UN REGISTRO DE EMOCIÓN
@api.route('/deleteemotion', methods=['DELETE'])
def delete_emotion():
    text = request.json.get("emotionId")
    id = Emotion.query.get(text)
    if id is None:
        return "Register not found", 404
    try:
        db.session.delete(id)
        db.session.commit()
    except Exception as error:
        return "error:" + str(error), 500
    return "Register deleted successfully", 200

# DELETE PARA BORRAR UN HÁBITO
@api.route('/deletehabit', methods=['DELETE'])
def delete_habit():
    text = request.json.get("habitId")
    id = Habit.query.get(text)
    if id is None:
        return "Habit not found", 404
    try:
        db.session.delete(id)
        db.session.commit()
    except Exception as error:
        return "error:" + str(error), 500

    return "Habit deleted successfully", 200

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

# GET PARA OBTENER TODAS LAS EMOCIONES

@api.route('/emotions', methods=['GET'])
def get_emotions():
    emotions = Emotion.query.all()
    return jsonify([emotion.serialize() for emotion in emotions])

# GET PARA OBTENER TODAS LAS LISTAS

@api.route('/lists', methods=['GET'])
def get_lists():
    lists = TodoList.query.all()
    return jsonify([list.serialize() for list in lists])

# GET PARA OBTENER TODOS LOS HÁBITOS

@api.route('/habits', methods=['GET'])
def get_habits():
    habits = Habit.query.all()
    return jsonify([habit.serialize() for habit in habits])

# GET PARA OBTENER TODAS LAS TAREAS

@api.route('/tasks', methods=['GET'])
def get_tasks():
    tasks = TodoItem.query.all()
    return jsonify([task.serialize() for task in tasks])

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
