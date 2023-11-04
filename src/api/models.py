from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    salt = db.Column(db.String(80), unique=False)

    def __init__(self, email, password, name, salt):
        self.email = email
        self.password = password
        self.name = name
        self.salt = salt

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "salt": self.salt,
            # do not serialize the password, its a security breach
            #"journals": [journal.serialize() for journal in self.journals]
        }


class Journal(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False)
    text = db.Column(db.String(20000), unique=False)
    color = db.Column(db.String(80), unique=False)
    author_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    author = db.relationship("User", backref="journals")

    def __init__(self, name, text, color, author, author_id):
        self.name = name
        self.text = text
        self.color = color
        self.author = author
        self.author_id = author_id

    def __repr__(self):
        return f'<Journal {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "text": self.text,
            "color": self.color,
            "author": self.author.serialize(),
            "author_id": self.author_id
        }

class TodoList(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    author_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    author = db.relationship("User", backref="todos")

    def __init__(self, name, author, author_id):
        self.name = name
        self.author = author
        self.author_id = author_id

    def __repr__(self):
        return f'<TodoList {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "author": self.author.serialize(),
            "author_id": self.author_id
        }

