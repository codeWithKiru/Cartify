from flask import Blueprint, request, jsonify
import jwt
import datetime

admin_bp = Blueprint("admin", __name__)

SECRET_KEY = "cartify_secret_key"

ADMIN_EMAIL = "admin@cartify.com"
ADMIN_PASSWORD = "admin123"


@admin_bp.route("/admin/login", methods=["POST"])
def admin_login():

    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    if email != ADMIN_EMAIL or password != ADMIN_PASSWORD:

        return jsonify({
            "success": False,
            "message": "Invalid Admin Credentials."
        }), 401

    token = jwt.encode(
        {
            "admin": True,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(days=1)
        },
        SECRET_KEY,
        algorithm="HS256"
    )

    return jsonify({
        "success": True,
        "message": "Admin Login Successful.",
        "token": token
    })