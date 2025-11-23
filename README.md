# Glycool Project (Flask + Angular)

## Overview

**Glycool** is a demonstration project built to explore and compare multiple approaches for developing a modern web application using Angular (frontend) and Python Flask (backend).  
The project intentionally uses a variety of coding styles, architectural patterns, and data management strategies to showcase the flexibility and richness of both frameworks.

---

## Goals

- **Experimentation:** Try out different ways to structure, fetch, and display data in Angular.
- **Learning:** Compare classic and modern Angular features (signals, RxJS, resolvers, etc.).
- **Backend Exploration:** Use Python Flask to expose REST APIs and manage data.
- **Fullstack Integration:** Demonstrate how Angular and Flask can communicate and work together.

---

## Technologies

- **Frontend:** Angular (latest version)
  - Signals, RxJS, Observables
  - Routing, Resolvers, Services
  - Multiple component communication patterns
- **Backend:** Python Flask
  - RESTful API endpoints
  - Data models and serialization
  - Error handling and status codes

---

## Project Structure

```
glycool_project_flask_version/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── pages/
│   │   │   │   ├── user-profil-component/
│   │   │   │   │   ├── user-profil-children/
│   │   │   │   │   │   ├── contacts-component/
│   │   │   │   │   │   ├── send-message-component/
│   │   │   │   │   │   └── ...
│   │   ├── core/
│   │   │   ├── services/
│   │   │   │   ├── authentification/
│   │   │   │   ├── contact-service/
│   │   │   │   ├── message-service/
│   │   │   │   └── user-services/
│   │   │   ├── models/
│   │   │   │   ├── user-models/
│   │   │   │   ├── contact-models/
│   │   │   │   └── message-models/
│   │   │   └── resolvers/
│   │   └── ...
├── backend/
│   ├── app.py
│   ├── models.py
│   ├── routes/
│   ├── requirements.txt
│   └── ...
```

---

## Key Features & Coding Approaches

### Angular Frontend

- **Multiple Data Fetching Strategies**

  - Classic service calls in components
  - Using Angular resolvers for pre-fetching data before route activation
  - RxJS Observables and forkJoin for parallel requests
  - Signals for reactive state management

- **Component Communication**

  - Input/Output bindings
  - Service-based shared state
  - Navigation with state and query params

- **Error Handling**

  - HTTP error management (e.g., 404 returns empty arrays)
  - User feedback for loading, empty states, and errors

- **UI Patterns**
  - Dynamic templates with conditional rendering
  - Loading spinners, badges, avatars, and message history
  - Responsive layouts with Bootstrap classes

### Python Flask Backend

- **RESTful API Endpoints**

  - CRUD operations for users, contacts, and messages
  - JSON serialization and deserialization

- **Error Management**

  - Proper HTTP status codes (404, 400, 500)
  - Custom error handlers

- **Flexible Data Models**
  - Demonstrates different ways to structure and query data

---

## Why So Many Ways?

This project is intentionally **not uniform**.  
You will find:

- Different ways to fetch and display contacts/messages
- Multiple error handling patterns
- Several approaches to routing and navigation
- Both classic and modern Angular features

**Purpose:**  
To help you (and others) compare, learn, and choose the best approach for your own needs.

---

## How to Run

### Backend (Flask)

```bash
cd backend
pip install -r requirements.txt
python app.py
```

### Frontend (Angular)

```bash
cd frontend
npm install
ng serve
```

---

## Notes

- This project is for **educational and experimental purposes**.
- Some code may look redundant or unconventional: this is intentional to show alternatives.
- Feel free to explore, refactor, and adapt the code to your style!

---

## Author

Created by Thierry Gillot  
Contact: thierrygillot@live.com

---

## License

MIT License
