from .routes import user_bp

def register(app):
    app.register_blueprint(user_bp)
