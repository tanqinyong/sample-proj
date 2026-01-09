from flask import Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity
from modules.user.controller import get_user_by_id

user_bp = Blueprint("user", __name__)

@user_bp.get("/api/me")
@jwt_required()
def me():
    user_id = int(get_jwt_identity())
    user = get_user_by_id(user_id)
    if not user:
        return {"error": "user not found"}, 404
    return {"user": user.to_public()}, 200