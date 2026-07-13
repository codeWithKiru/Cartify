from flask import Blueprint, request, jsonify
from database import get_connection
import random

payment_bp = Blueprint("payment", __name__)


# =====================================
# DEMO PAYMENT
# =====================================

@payment_bp.route("/payment", methods=["POST"])
def payment():

    data = request.get_json()

    user_id = data.get("user_id")
    order_id = data.get("order_id")
    payment_method = data.get("payment_method")
    amount = data.get("amount")

    transaction_id = "TXN" + str(random.randint(100000000, 999999999))

    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("""
        INSERT INTO payments(
            order_id,
            user_id,
            payment_method,
            transaction_id,
            amount,
            status
        )
        VALUES(?,?,?,?,?,?)
    """, (

        order_id,
        user_id,
        payment_method,
        transaction_id,
        amount,
        "Success"

    ))

    cursor.execute("""
        UPDATE orders
        SET payment_status='Paid'
        WHERE id=?
    """, (order_id,))

    connection.commit()
    connection.close()

    return jsonify({

        "success": True,
        "message": "Payment Successful",
        "transaction_id": transaction_id

    })