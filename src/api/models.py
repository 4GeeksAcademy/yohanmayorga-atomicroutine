from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = "user"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    salt = db.Column(db.String(80), unique=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "salt": self.salt
            # do not serialize the password, its a security breach
        }


class Journal(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    text = db.Column(db.String(120), unique=True)
    color = db.Column(db.String(80), unique=False)

    def __repr__(self):
        return f'<Journal {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "text": self.text,
            "color": self.color,
        }
