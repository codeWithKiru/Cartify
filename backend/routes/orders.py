from flask import Blueprint, request, jsonify
from database import get_connection

orders_bp = Blueprint("orders", __name__)


# ==========================================
# PLACE ORDER
# ==========================================

@orders_bp.route("/place-order", methods=["POST"])
def place_order():

    data = request.get_json()

    user_id = data.get("user_id")

    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("""
        SELECT
            cart.product_id,
            cart.quantity,
            products.price,
            products.stock
        FROM cart
        JOIN products
        ON cart.product_id = products.id
        WHERE cart.user_id=?
    """, (user_id,))

    cart_items = cursor.fetchall()

    if len(cart_items) == 0:

        connection.close()

        return jsonify({
            "success": False,
            "message": "Cart is empty."
        }), 400

    # ==========================================
    # CHECK STOCK
    # ==========================================

    for item in cart_items:

        if item["quantity"] > item["stock"]:

            connection.close()

            return jsonify({

                "success": False,
                "message": "Some products are out of stock."

            }), 400

    total = 0

    for item in cart_items:

        total += item["price"] * item["quantity"]

    cursor.execute("""
        INSERT INTO orders(user_id,total_amount)
        VALUES(?,?)
    """, (

        user_id,
        total

    ))

    order_id = cursor.lastrowid

    # ==========================================
    # SAVE ORDER ITEMS & UPDATE STOCK
    # ==========================================

    for item in cart_items:

        cursor.execute("""
            INSERT INTO order_items(
                order_id,
                product_id,
                quantity,
                price
            )
            VALUES(?,?,?,?)
        """, (

            order_id,
            item["product_id"],
            item["quantity"],
            item["price"]

        ))

        cursor.execute("""
            UPDATE products
            SET stock = stock - ?
            WHERE id = ?
        """, (

            item["quantity"],
            item["product_id"]

        ))

    cursor.execute(
        "DELETE FROM cart WHERE user_id=?",
        (user_id,)
    )

    connection.commit()
    connection.close()

    return jsonify({

        "success": True,
        "message": "Order placed successfully.",
        "order_id": order_id

    })


# ==========================================
# GET USER ORDERS
# ==========================================

@orders_bp.route("/orders/<int:user_id>", methods=["GET"])
def get_orders(user_id):

    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("""
        SELECT
            id,
            total_amount,
            status,
            created_at
        FROM orders
        WHERE user_id=?
        ORDER BY id DESC
    """, (user_id,))

    orders = cursor.fetchall()

    result = []

    for order in orders:

        cursor.execute("""
            SELECT
                products.name,
                products.image,
                order_items.quantity,
                order_items.price
            FROM order_items
            JOIN products
            ON order_items.product_id = products.id
            WHERE order_items.order_id=?
        """, (order["id"],))

        items = cursor.fetchall()

        products = []

        for item in items:

            products.append({

                "name": item["name"],
                "image": item["image"],
                "price": item["price"],
                "quantity": item["quantity"]

            })

        result.append({

            "order_id": order["id"],
            "total_amount": order["total_amount"],
            "status": order["status"],
            "created_at": order["created_at"],
            "products": products

        })

    connection.close()

    return jsonify(result)


# ==========================================
# ADMIN - GET ALL ORDERS
# ==========================================

@orders_bp.route("/admin/orders", methods=["GET"])
def admin_get_orders():

    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("""
        SELECT
            orders.id,
            orders.user_id,
            users.name,
            orders.total_amount,
            orders.status,
            orders.created_at
        FROM orders
        JOIN users
        ON orders.user_id = users.id
        ORDER BY orders.id DESC
    """)

    orders = cursor.fetchall()

    connection.close()

    result = []

    for order in orders:

        result.append({

            "id": order["id"],
            "user_id": order["user_id"],
            "customer_name": order["name"],
            "total_amount": order["total_amount"],
            "status": order["status"],
            "created_at": order["created_at"]

        })

    return jsonify(result)


# ==========================================
# ADMIN - UPDATE ORDER STATUS
# ==========================================

@orders_bp.route("/admin/orders/<int:order_id>", methods=["PUT"])
def update_order_status(order_id):

    data = request.get_json()

    status = data.get("status")

    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("""

        UPDATE orders

        SET status=?

        WHERE id=?

    """, (

        status,
        order_id

    ))

    connection.commit()
    connection.close()

    return jsonify({

        "success": True,
        "message": "Order Status Updated Successfully."

    })