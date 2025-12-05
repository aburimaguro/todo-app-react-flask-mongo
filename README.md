# Full-Stack Todo App (React + Flask + MongoDB)

This project is a complete full-stack Todo List application featuring user accounts, task creation and management, and a business rule preventing deletion of completed tasks older than one week. The stack is intentionally minimal: only React, Flask, MongoDB, flask-cors, and pymongo are used. Styling is done entirely through custom CSS to maintain a visually polished UI without additional libraries.


## Features

### Authentication

* User registration
* User login
* Users see only their own tasks

Note: Authentication uses basic credential checking only. No hashing or JWT is included to comply with the requirement of not adding additional libraries.

### Todo Management

* Create new tasks
* View tasks
* Toggle completion status
* Delete tasks
* Tasks are associated with the logged-in user

### Business Rule

* Completed tasks older than one week cannot be deleted.

### User Interface

* Gradient background
* Glass-card style components
* Custom CSS without external UI frameworks


## Technologies Used

### Frontend

* React (Create React App)
* Custom CSS
* Fetch API

### Backend

* Python (Flask)
* flask-cors
* pymongo

### Database

* MongoDB Community Edition (local database)

### Other Tools

* Node.js and npm
* Python virtual environments
* MongoDB Compass (optional)


## Setup and Run Guide (Windows)

### 1. Clone the Repository

```powershell
git clone <your-repo-url>
cd todo-app
```


# Backend Setup (Flask)

```powershell
cd backend
python -m venv venv
venv\Scripts\activate
pip install flask pymongo flask-cors
```

Run the backend server:

```powershell
python app.py
```

Backend will run at:

[http://127.0.0.1:5000](http://127.0.0.1:5000)


# Frontend Setup (React)

```powershell
cd ../frontend
npm install
npm start
```

Frontend will run at:

[http://localhost:3000](http://localhost:3000)


## Screenshots

Replace the following image paths with your own screenshots.

### Login Screen

![Login Screenshot](screenshots/login.png)

### Register Screen

![Register Screenshot](screenshots/register.png)

### Task Dashboard

![Task Dashboard Screenshot](screenshots/dashboard.png)


## Useful Commands

### Start Flask

```powershell
cd backend
venv\Scripts\activate
python app.py
```

### Start React

```powershell
cd frontend
npm start
```

### Install Backend Dependencies

```powershell
pip install flask pymongo flask-cors
```

### Install Frontend Dependencies

```powershell
npm install
```

### Clean NPM Modules (if needed)

```powershell
rm -rf node_modules
npm install
```


## Future Scope

* Add password hashing
* Add filtering (completed, active, old tasks)
* Add categories, tags, and labels
* Add due dates and reminders
* Add pagination for large task sets
* Migrate database to MongoDB Atlas
* Add environment variable support
* Add Docker support
* Add unit tests and integration tests
* Add confirmation dialogs
* Add a dark mode theme


## License

MIT License:
[https://opensource.org/licenses/MIT](https://opensource.org/licenses/MIT)

Include a LICENSE file in the project root with the full MIT license text.


## Additional Notes

### CORS Requirements

Because the frontend and backend run on different ports during development, flask-cors is required to enable communication.

```python
from flask_cors import CORS
CORS(app)
```

### MongoDB Collections

Users collection:

```json
{
  "username": "john",
  "password": "1234"
}
```

Tasks collection:

```json
{
  "username": "john",
  "title": "Buy groceries",
  "completed": false,
  "created_at": "UTC timestamp"
}
```

### Business Logic

The backend restricts deletion of tasks based on:

```python
if task["completed"] and task["created_at"] < one_week_ago:
```

### Styling

The UI uses lightweight custom CSS for layout, gradients, and glass-effect surfaces without depending on external CSS or UI frameworks.
