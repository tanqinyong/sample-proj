from modules.user.model import User

def get_user_by_id(user_id: int):
    return User.query.get(user_id)

def get_user_by_email(email: str):
    return User.query.filter_by(email=email).first()