from flask import Flask
from flask_cors import CORS
from config import Config
from extensions import db, migrate, jwt

from modules.auth import register as register_auth
from modules.user import register as register_user
from dotenv import load_dotenv
load_dotenv()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app, resources={r"/api/*": {"origins": "*"}})

    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)

    register_auth(app)
    register_user(app)

    @app.get("/api/health")
    def health():
        return {"ok": True}

    return app

app = create_app()