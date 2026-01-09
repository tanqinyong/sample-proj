from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token
from modules.auth.controller import register_user, login_user

auth_bp = Blueprint("auth", __name__, url_prefix="/api/auth")

@auth_bp.post("/register")
def register():
    data = request.get_json() or {}
    user, err = register_user(data.get("email"), data.get("password"))
    if err:
        msg, code = err
        return {"error": msg}, code
    return {"user": user.to_public()}, 201

@auth_bp.post("/login")
def login():
    data = request.get_json() or {}
    payload, err = login_user(data.get("email"), data.get("password"))
    if err:
        msg, code = err
        return {"error": msg}, code
    return payload, 200

@auth_bp.post("/refresh")
@jwt_required(refresh=True)
def refresh():
    user_id = get_jwt_identity()
    return {"access_token": create_access_token(identity=user_id)}, 200