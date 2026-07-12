from flask import Blueprint, request, jsonify
from database import get_connection

cart_bp = Blueprint("cart", __name__)


# ===========================
# GET USER CART
# ===========================

@cart_bp.route("/cart/<int:user_id>", methods=["GET"])
def get_cart(user_id):

    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("""
        SELECT
            cart.id,
            cart.quantity,
            products.id AS product_id,
            products.name,
            products.price,
            products.image,
            products.brand,
            products.rating,
            products.stock
        FROM cart
        JOIN products
        ON cart.product_id = products.id
        WHERE cart.user_id = ?
    """, (user_id,))

    cart_items = cursor.fetchall()

    connection.close()

    result = []

    for item in cart_items:
        result.append({
            "id": item["id"],
            "product_id": item["product_id"],
            "name": item["name"],
            "price": item["price"],
            "image": item["image"],
            "brand": item["brand"],
            "rating": item["rating"],
            "stock": item["stock"],
            "quantity": item["quantity"]
        })

    return jsonify(result)


# ===========================
# ADD TO CART
# ===========================

@cart_bp.route("/cart", methods=["POST"])
def add_to_cart():

    data = request.get_json()

    user_id = data.get("user_id")
    product_id = data.get("product_id")

    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute(
        """
        SELECT * FROM cart
        WHERE user_id=? AND product_id=?
        """,
        (user_id, product_id)
    )

    existing = cursor.fetchone()

    if existing:

        cursor.execute(
            """
            UPDATE cart
            SET quantity = quantity + 1
            WHERE id=?
            """,
            (existing["id"],)
        )

    else:

        cursor.execute(
            """
            INSERT INTO cart(user_id, product_id, quantity)
            VALUES(?,?,1)
            """,
            (user_id, product_id)
        )

    connection.commit()
    connection.close()

    return jsonify({
        "success": True,
        "message": "Product added to cart."
    })


# ===========================
# UPDATE QUANTITY
# ===========================

@cart_bp.route("/cart/<int:cart_id>", methods=["PUT"])
def update_cart(cart_id):

    data = request.get_json()

    quantity = data.get("quantity")

    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute(
        """
        UPDATE cart
        SET quantity=?
        WHERE id=?
        """,
        (quantity, cart_id)
    )

    connection.commit()
    connection.close()

    return jsonify({
        "success": True
    })


# ===========================
# REMOVE ITEM
# ===========================

@cart_bp.route("/cart/<int:cart_id>", methods=["DELETE"])
def delete_cart(cart_id):

    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute(
        "DELETE FROM cart WHERE id=?",
        (cart_id,)
    )

    connection.commit()
    connection.close()

    return jsonify({
        "success": True,
        "message": "Item removed."
    })