from flask import Blueprint, request, jsonify
from database import get_connection
import bcrypt
import jwt
import datetime

users_bp = Blueprint("users", __name__)

SECRET_KEY = "cartify_secret_key"


# ==========================================
# REGISTER
# ==========================================

@users_bp.route("/register", methods=["POST"])
def register():

    data = request.get_json()

    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if not name or not email or not password:

        return jsonify({
            "success": False,
            "message": "All fields are required."
        }), 400

    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute(
        "SELECT * FROM users WHERE email=?",
        (email,)
    )

    existing_user = cursor.fetchone()

    if existing_user:

        connection.close()

        return jsonify({
            "success": False,
            "message": "Email already registered."
        }), 400

    hashed_password = bcrypt.hashpw(
        password.encode("utf-8"),
        bcrypt.gensalt()
    ).decode("utf-8")

    cursor.execute(
        """
        INSERT INTO users(name,email,password)
        VALUES(?,?,?)
        """,
        (
            name,
            email,
            hashed_password
        )
    )

    connection.commit()
    connection.close()

    return jsonify({
        "success": True,
        "message": "Registration successful."
    })


# ==========================================
# LOGIN
# ==========================================

@users_bp.route("/login", methods=["POST"])
def login():

    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    if not email or not password:

        return jsonify({
            "success": False,
            "message": "Email and password are required."
        }), 400

    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute(
        "SELECT * FROM users WHERE email=?",
        (email,)
    )

    user = cursor.fetchone()

    connection.close()

    if not user:

        return jsonify({
            "success": False,
            "message": "Invalid email or password."
        }), 401

    if not bcrypt.checkpw(
        password.encode("utf-8"),
        user["password"].encode("utf-8")
    ):

        return jsonify({
            "success": False,
            "message": "Invalid email or password."
        }), 401

    token = jwt.encode(
        {
            "user_id": user["id"],
            "exp": datetime.datetime.utcnow() + datetime.timedelta(days=1)
        },
        SECRET_KEY,
        algorithm="HS256"
    )

    return jsonify({
        "success": True,
        "message": "Login successful.",
        "token": token,
        "user": {
            "id": user["id"],
            "name": user["name"],
            "email": user["email"]
        }
    })


# ==========================================
# ADMIN - GET ALL USERS
# ==========================================

@users_bp.route("/admin/users", methods=["GET"])
def get_all_users():

    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("""

        SELECT
            id,
            name,
            email

        FROM users

        ORDER BY id DESC

    """)

    users = cursor.fetchall()

    connection.close()

    result = []

    for user in users:

        result.append({

            "id": user["id"],
            "name": user["name"],
            "email": user["email"]

        })

    return jsonify(result)


# ==========================================
# ADMIN - DELETE USER
# ==========================================

@users_bp.route("/admin/users/<int:user_id>", methods=["DELETE"])
def delete_user(user_id):

    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute(
        "DELETE FROM users WHERE id=?",
        (user_id,)
    )

    connection.commit()
    connection.close()

    return jsonify({

        "success": True,
        "message": "User deleted successfully."

    })