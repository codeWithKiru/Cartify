from flask import Blueprint, jsonify
from database import get_connection

dashboard_bp = Blueprint("dashboard", __name__)


# =====================================
# DASHBOARD ANALYTICS
# =====================================

@dashboard_bp.route("/admin/dashboard", methods=["GET"])
def dashboard():

    connection = get_connection()
    cursor = connection.cursor()

    # Total Users
    cursor.execute("SELECT COUNT(*) AS total_users FROM users")
    total_users = cursor.fetchone()["total_users"]

    # Total Products
    cursor.execute("SELECT COUNT(*) AS total_products FROM products")
    total_products = cursor.fetchone()["total_products"]

    # Total Orders
    cursor.execute("SELECT COUNT(*) AS total_orders FROM orders")
    total_orders = cursor.fetchone()["total_orders"]

    # Total Revenue
    cursor.execute("""
        SELECT
            IFNULL(SUM(total_amount),0) AS revenue
        FROM orders
    """)

    revenue = cursor.fetchone()["revenue"]

    connection.close()

    return jsonify({

        "users": total_users,
        "products": total_products,
        "orders": total_orders,
        "revenue": revenue

    })
