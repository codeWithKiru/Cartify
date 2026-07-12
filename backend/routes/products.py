from flask import Blueprint, jsonify, request
from database import get_connection

products_bp = Blueprint("products", __name__)


# =====================================
# GET ALL PRODUCTS
# =====================================

@products_bp.route("/products", methods=["GET"])
def get_products():

    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("SELECT * FROM products")
    products = cursor.fetchall()

    connection.close()

    product_list = []

    for product in products:

        product_list.append({

            "id": product["id"],
            "name": product["name"],
            "price": product["price"],
            "category": product["category"],
            "brand": product["brand"],
            "rating": product["rating"],
            "stock": product["stock"],
            "image": product["image"]

        })

    return jsonify(product_list)


# =====================================
# GET SINGLE PRODUCT
# =====================================

@products_bp.route("/products/<int:product_id>", methods=["GET"])
def get_product(product_id):

    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute(
        "SELECT * FROM products WHERE id=?",
        (product_id,)
    )

    product = cursor.fetchone()

    connection.close()

    if product is None:

        return jsonify({
            "success": False,
            "message": "Product not found."
        }), 404

    return jsonify({

        "id": product["id"],
        "name": product["name"],
        "price": product["price"],
        "category": product["category"],
        "brand": product["brand"],
        "rating": product["rating"],
        "stock": product["stock"],
        "image": product["image"]

    })


# =====================================
# ADD PRODUCT
# =====================================

@products_bp.route("/products", methods=["POST"])
def add_product():

    data = request.get_json()

    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("""
        INSERT INTO products
        (
            name,
            category,
            brand,
            price,
            rating,
            stock,
            image
        )
        VALUES(?,?,?,?,?,?,?)
    """, (

        data["name"],
        data["category"],
        data["brand"],
        data["price"],
        data["rating"],
        data["stock"],
        data["image"]

    ))

    connection.commit()
    connection.close()

    return jsonify({
        "success": True,
        "message": "Product Added Successfully."
    })


# =====================================
# UPDATE PRODUCT
# =====================================

@products_bp.route("/products/<int:product_id>", methods=["PUT"])
def update_product(product_id):

    data = request.get_json()

    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("""
        UPDATE products
        SET
            name=?,
            category=?,
            brand=?,
            price=?,
            rating=?,
            stock=?,
            image=?
        WHERE id=?
    """, (

        data["name"],
        data["category"],
        data["brand"],
        data["price"],
        data["rating"],
        data["stock"],
        data["image"],
        product_id

    ))

    connection.commit()
    connection.close()

    return jsonify({
        "success": True,
        "message": "Product Updated Successfully."
    })


# =====================================
# DELETE PRODUCT
# =====================================

@products_bp.route("/products/<int:product_id>", methods=["DELETE"])
def delete_product(product_id):

    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute(
        "DELETE FROM products WHERE id=?",
        (product_id,)
    )

    connection.commit()
    connection.close()

    return jsonify({
        "success": True,
        "message": "Product Deleted Successfully."
    })