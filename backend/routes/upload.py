from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
import os

upload_bp = Blueprint("upload", __name__)

UPLOAD_FOLDER = "images"

# Create images folder if it doesn't exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@upload_bp.route("/upload", methods=["POST"])
def upload_image():

    if "image" not in request.files:

        return jsonify({
            "success": False,
            "message": "No image selected."
        }), 400

    image = request.files["image"]

    if image.filename == "":

        return jsonify({
            "success": False,
            "message": "No image selected."
        }), 400

    filename = secure_filename(image.filename)

    image.save(os.path.join(UPLOAD_FOLDER, filename))

    return jsonify({

        "success": True,
        "filename": filename,
        "message": "Image uploaded successfully."

    })