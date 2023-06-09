from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

app = Flask(__name__)
CORS(app)

app.config["JWT_SECRET_KEY"] = "super-secret"
jwt = JWTManager(app)

db = mysql.connector.connect(
    host='localhost',
    user='root',
    password='password',
    database='internship'
)

#to get listing
@app.route('/', methods=['GET'])
def get_all():
    try:
        cursor = db.cursor()
        query = "SELECT * FROM products"
        cursor.execute(query)
        products = cursor.fetchall()
        cursor.close()

        product_list = []
        for product in products:
            product_dict = {
                'product_id': product[0],
                'name': product[1],
                'description': product[2],
                'price': product[3],
                'image_url': product[4]
            }
            product_list.append(product_dict)

        return jsonify(products=product_list)
    except mysql.connector.Error as e:
        return jsonify(error='An error occurred while retrieving the product listing: {}'.format(str(e))), 500
    except Exception as e:
        print('xdcfvhjb')
        return jsonify(error=str(e)), 500

#to get cart
@app.route('/mycart', methods=['GET'])
@jwt_required()
def get_my_all():

    user_id = request.args.get('user_id')
    print(user_id)
    
    cursor = db.cursor()
    query = """
        SELECT cart.id, cart.product_id, products.product_name, products.description, products.price, products.image_url 
        FROM cart
        INNER JOIN products ON cart.product_id = products.id
        WHERE cart.user_id = %s
    """
    values = (user_id,)
    cursor.execute(query, values)

    rows = cursor.fetchall()
    cursor.close()

    cart = []
    for row in rows:
        item = {
            'cart_id': row[0],
            'product_id': row[1],
            'name': row[2],
            'description': row[3],
            'price': row[4],
            'img_url': row[5]
        }
        cart.append(item)

    return jsonify(products=cart)

#addtocart
@app.route('/cart/add', methods=['POST'])
@jwt_required()
def add_to_cart():

    product_id = request.json['product_id']
    user_id = request.json['user_id']

    cursor = db.cursor()

    try:
        query = "INSERT INTO cart (user_id, product_id) VALUES (%s, %s)"
        values = (user_id, product_id)
        cursor.execute(query, values)
        db.commit()
        cursor.close()

        response = {'message': 'Product added to cart successfully'}
        return jsonify(response)
    except Exception as e:
        db.rollback()
        error_message = str(e)
        response = {'message': 'Error adding product to cart', 'error': error_message}
        return jsonify(response), 500


#deletefromcart
@app.route('/cart/delete', methods=['POST'])
@jwt_required()
def delete_from_cart():

    product_id = request.json['product_id']
    user_id = request.json['user_id']

    cursor = db.cursor()

    try:
        query = "DELETE FROM cart WHERE user_id = %s AND product_id = %s"
        values = (user_id, product_id)
        cursor.execute(query, values)
        db.commit()
        cursor.close()

        response = {'message': 'Product removed from cart successfully'}
        return jsonify(response)
    except Exception as e:
        db.rollback()
        error_message = str(e)
        response = {'message': 'Error removing product from cart', 'error': error_message}
        return jsonify(response), 500


#checkout
@app.route('/checkout',methods=['POST'])
@jwt_required()
def checkout():
    try:
        product_ids = request.json['product_ids']
        user_id = request.json['user_id']

        cursor = db.cursor()

        order_query = "INSERT INTO orders (user_id) VALUES (%s)"
        order_values = (user_id,)
        cursor.execute(order_query, order_values)
        db.commit()

        order_id = cursor.lastrowid

        for product_id in product_ids:
            item_query = "INSERT INTO order_items (order_id, product_id) VALUES (%s, %s)"
            item_values = (order_id, product_id)
            cursor.execute(item_query, item_values)
        db.commit()

        query = "DELETE FROM cart WHERE user_id = %s"
        values = (user_id,)
        cursor.execute(query, values)
        db.commit()

        cursor.close()

        response = {'message': 'Order placed successfully'}
        return jsonify(response)

    except Exception as e:
        error_message = str(e)
        response = {'message': 'Error placing the order', 'error': error_message}
        return jsonify(response), 500


#login
@app.route('/login',methods=['POST'])
def user_login():
    try:
        email = request.json['email']
        password = request.json['password']
        
        cursor = db.cursor()
        query = "SELECT id FROM users WHERE email = %s AND password = %s"
        values = (email, password)
        
        cursor.execute(query, values)
        result = cursor.fetchone()
        cursor.close()
        
        if result:
            access_token = create_access_token(identity=result[0])
            return jsonify(message='Login successful',user_id=result[0],access_token=access_token)
        else:
            return jsonify(error='Login failed')

    except Exception as e:
        return jsonify(error=str(e)), 500

#register
@app.route('/register',methods=['POST'])
def user_register():
    
    try:
        name = request.json['name']
        email = request.json['email']
        address = request.json['address']
        password = request.json['password']
    
        cursor = db.cursor()
        query = "INSERT INTO users (username, email, address, password) VALUES (%s, %s, %s, %s)"
        values = (name, email, address, password)
        
        cursor.execute(query, values)
        db.commit()
        cursor.close()

        return jsonify(message='Registration successful')

    except mysql.connector.Error as e:
        db.rollback()  # Rollback the changes if an error occurs
        return jsonify(error='An error occurred while writing to the database: {}'.format(str(e))), 500
    except Exception as e:
        return jsonify(error=str(e)), 500

if __name__ == '__main__':
    app.run(debug = True)
