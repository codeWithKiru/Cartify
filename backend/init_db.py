from database import get_connection

connection = get_connection()
cursor = connection.cursor()

# ==========================
# PRODUCTS TABLE
# ==========================

cursor.execute("""
CREATE TABLE IF NOT EXISTS products (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    name TEXT NOT NULL,

    price REAL NOT NULL,

    category TEXT NOT NULL,

    brand TEXT,

    rating REAL,

    stock INTEGER,

    image TEXT

)
""")

# ==========================
# USERS TABLE
# ==========================

cursor.execute("""
CREATE TABLE IF NOT EXISTS users (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    name TEXT NOT NULL,

    email TEXT UNIQUE NOT NULL,

    password TEXT NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

)
""")

# ==========================
# CART TABLE
# ==========================

cursor.execute("""
CREATE TABLE IF NOT EXISTS cart (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    user_id INTEGER NOT NULL,

    product_id INTEGER NOT NULL,

    quantity INTEGER DEFAULT 1,

    FOREIGN KEY(user_id) REFERENCES users(id),

    FOREIGN KEY(product_id) REFERENCES products(id)

)
""")

# ==========================
# INSERT PRODUCTS
# ==========================

cursor.execute("DELETE FROM products")

products = [

    ("Black Jacket", 1999, "Men", "Nike", 4.8, 20, "black_jacket.jpg"),

    ("Blue T-Shirt", 799, "Men", "Puma", 4.5, 30, "blue_tshirt.jpg"),

    ("Women's Dress", 1499, "Women", "Zara", 4.7, 15, "dress.jpg"),

    ("White Sneakers", 2499, "Unisex", "Adidas", 4.9, 25, "sneakers.jpg")

]

cursor.executemany("""

INSERT INTO products
(name, price, category, brand, rating, stock, image)

VALUES (?, ?, ?, ?, ?, ?, ?)

""", products)

connection.commit()
connection.close()

print("Database initialized successfully!")