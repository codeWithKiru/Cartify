from flask import Flask, send_from_directory
from flask_cors import CORS

from routes.products import products_bp
from routes.users import users_bp
from routes.cart import cart_bp
from routes.orders import orders_bp
from routes.dashboard import dashboard_bp
from routes.upload import upload_bp
from routes.admin import admin_bp
from routes.payment import payment_bp
from routes.reviews import reviews_bp

app = Flask(__name__)

CORS(app)

# =====================================
# REGISTER BLUEPRINTS
# =====================================

app.register_blueprint(products_bp)
app.register_blueprint(users_bp)
app.register_blueprint(cart_bp)
app.register_blueprint(orders_bp)
app.register_blueprint(dashboard_bp)
app.register_blueprint(upload_bp)
app.register_blueprint(admin_bp)
app.register_blueprint(payment_bp)
app.register_blueprint(reviews_bp)

# =====================================
# HOME
# =====================================

@app.route("/")
def home():

    return {
        "message": "Welcome to Cartify Backend!"
    }


# =====================================
# API HEALTH CHECK
# =====================================

@app.route("/api")
def api():

    return {
        "status": "Backend is Running",
        "success": True
    }


# =====================================
# SERVE PRODUCT IMAGES
# =====================================

@app.route("/images/<filename>")
def get_image(filename):

    return send_from_directory("images", filename)


# =====================================
# RUN APPLICATION
# =====================================

if __name__ == "__main__":

    app.run(
        debug=True,
        host="0.0.0.0",
        port=5000
    )