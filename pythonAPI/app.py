from flask import Flask, jsonify, request
import mysql.connector
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app, support_credentials=True, resources={r"*": {"origins": "*"}}) # Esto habilitará CORS para todos los dominios en todas las rutas
                                                                        # También, permitirá todas las solicitudes de cualquier origen
# Configuración de la base de datos
db_config = {
    'host': 'db',
    'user': 'root',
    'password': 'rootpassword',
    'database': 'todoList'
}

@app.route('/')
def home():
    return 'Servidor Flask funcionando...'

@app.route('/loadTasks', methods=['GET'])
def loadTasks():

    with mysql.connector.connect(**db_config) as conn:
        with conn.cursor(dictionary=True) as cursor:
            cursor.execute("SELECT * FROM tasks")
            tasks = cursor.fetchall()
    return jsonify(tasks)

@app.route('/loadDoneTasks', methods=['GET'])
def loadDoneTasks():

    with mysql.connector.connect(**db_config) as conn:
        with conn.cursor(dictionary=True) as cursor:
            cursor.execute("SELECT * FROM doneTasks")
            doneTasks = cursor.fetchall()
    return jsonify(doneTasks)

@app.route('/addTask', methods=['POST'])
def addTask():
    datos = request.json  # Obtiene los datos enviados en la solicitud POST
    name = datos.get('name')
    date = datos.get('date')

    with mysql.connector.connect(**db_config) as conn:
        with conn.cursor() as cursor:
            consulta = "INSERT INTO tasks (name, date) VALUES (%s, %s)"
            cursor.execute(consulta, (name, date))
            conn.commit()  # Es importante hacer commit de la transacción

    return jsonify({"success": True, "mensaje": "Tarea añadida correctamente"})

@app.route('/deleteTask/<int:id>', methods=['DELETE'])
def deleteTask(id):
    with mysql.connector.connect(**db_config) as conn:
        with conn.cursor() as cursor:
            consulta = "DELETE FROM tasks WHERE id = %s"
            cursor.execute(consulta, (id,))
            conn.commit()

    return jsonify({"success": True, "mensaje": "Tarea eliminada correctamente"})

@app.route('/addDoneTask', methods=['POST'])
def addDoneTask():
    datos = request.json  # Obtiene los datos enviados en la solicitud POST
    name = datos.get('name')
    date = datos.get('date')

    with mysql.connector.connect(**db_config) as conn:
        with conn.cursor() as cursor:
            consulta = "INSERT INTO doneTasks (name, date) VALUES (%s, %s)"
            cursor.execute(consulta, (name, date))
            conn.commit()  # Es importante hacer commit de la transacción

    return jsonify({"success": True, "mensaje": "Tarea añadida correctamente"})

@app.route('/deleteDoneTask/<int:id>', methods=['DELETE'])
def deleteDoneTask(id):
    with mysql.connector.connect(**db_config) as conn:
        with conn.cursor() as cursor:
            consulta = "DELETE FROM doneTasks WHERE id = %s"
            cursor.execute(consulta, (id,))
            conn.commit()

    return jsonify({"success": True, "mensaje": "Tarea eliminada correctamente"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80, debug=True)

