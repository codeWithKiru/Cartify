from flask import Blueprint, request, jsonify
from database import get_connection

reviews_bp = Blueprint("reviews", __name__)


# ==========================================
# ADD REVIEW
# ==========================================

@reviews_bp.route("/reviews", methods=["POST"])
def add_review():

    data = request.get_json()

    user_id = data.get("user_id")
    product_id = data.get("product_id")
    rating = data.get("rating")
    review = data.get("review")

    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("""
        INSERT INTO reviews(
            user_id,
            product_id,
            rating,
            review
        )
        VALUES(?,?,?,?)
    """, (

        user_id,
        product_id,
        rating,
        review

    ))

    connection.commit()
    connection.close()

    return jsonify({

        "success": True,
        "message": "Review Added Successfully."

    })


# ==========================================
# GET PRODUCT REVIEWS
# ==========================================

@reviews_bp.route("/reviews/<int:product_id>", methods=["GET"])
def get_reviews(product_id):

    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("""

        SELECT

            reviews.id,
            reviews.rating,
            reviews.review,
            reviews.created_at,
            users.name

        FROM reviews

        JOIN users

        ON reviews.user_id = users.id

        WHERE reviews.product_id=?

        ORDER BY reviews.id DESC

    """, (product_id,))

    reviews = cursor.fetchall()

    cursor.execute("""

        SELECT

            ROUND(AVG(rating),1) AS average_rating,
            COUNT(*) AS total_reviews

        FROM reviews

        WHERE product_id=?

    """, (product_id,))

    stats = cursor.fetchone()

    connection.close()

    result = []

    for review in reviews:

        result.append({

            "id": review["id"],
            "name": review["name"],
            "rating": review["rating"],
            "review": review["review"],
            "created_at": review["created_at"]

        })

    return jsonify({

        "average_rating": stats["average_rating"] or 0,
        "total_reviews": stats["total_reviews"],
        "reviews": result

    })