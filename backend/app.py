from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime, timedelta
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)
client = MongoClient("mongodb://localhost:27017/")
db = client["todo_app"]

# ----------------------
# USER ENDPOINTS
# ----------------------

@app.post("/register")
def register():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    if db.users.find_one({"username": username}):
        return jsonify({"error": "User already exists"}), 400

    db.users.insert_one({"username": username, "password": password})
    return jsonify({"message": "Account created"}), 201


@app.post("/login")
def login():
    data = request.json
    user = db.users.find_one(data)

    if not user:
        return jsonify({"error": "Invalid credentials"}), 401

    return jsonify({"message": "Login successful"}), 200


# ----------------------
# TASK ENDPOINTS
# ----------------------

@app.get("/tasks")
def get_tasks():
    username = request.args.get("username")
    tasks = list(db.tasks.find({"username": username}, {"_id": 0}))
    return jsonify(tasks), 200


@app.post("/tasks")
def create_task():
    data = request.json
    db.tasks.insert_one({
        "username": data["username"],
        "title": data["title"],
        "completed": False,
        "created_at": datetime.utcnow()
    })
    return jsonify({"message": "Task added"}), 201


@app.put("/tasks")
def update_task():
    data = request.json
    db.tasks.update_one(
        {"username": data["username"], "title": data["old_title"]},
        {"$set": {"title": data["new_title"], "completed": data["completed"]}}
    )
    return jsonify({"message": "Task updated"}), 200


@app.delete("/tasks")
def delete_task():
    data = request.json
    task = db.tasks.find_one({"username": data["username"], "title": data["title"]})

    if not task:
        return jsonify({"error": "Task not found"}), 404

    # Business rule
    if task["completed"]:
        one_week_ago = datetime.utcnow() - timedelta(weeks=1)
        if task["created_at"] < one_week_ago:
            return jsonify({"error": "Cannot delete completed tasks older than 1 week"}), 403

    db.tasks.delete_one({"username": data["username"], "title": data["title"]})
    return jsonify({"message": "Task deleted"}), 200


@app.get("/")
def home():
    return "Todo API running"


if __name__ == "__main__":
    app.run(debug=True)

