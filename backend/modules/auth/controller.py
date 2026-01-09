from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, create_refresh_token
from extensions import db
from modules.user.model import User

def register_user(email: str, password: str):
    email = (email or "").strip().lower()
    password = password or ""

    if not email or not password:
        return None, ("email and password required", 400)
    if len(password) < 6:
        return None, ("password must be at least 6 characters", 400)

    if User.query.filter_by(email=email).first():
        return None, ("email already registered", 409)

    user = User(email=email, password_hash=generate_password_hash(password))
    db.session.add(user)
    db.session.commit()
    return user, None

def login_user(email: str, password: str):
    email = (email or "").strip().lower()
    password = password or ""

    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password_hash, password):
        return None, ("invalid credentials", 401)

    access = create_access_token(identity=str(user.id))
    refresh = create_refresh_token(identity=str(user.id))
    return {"access_token": access, "refresh_token": refresh, "user": user.to_public()}, None