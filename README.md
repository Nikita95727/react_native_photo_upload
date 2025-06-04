# 📸 Photo Uploader App

A full-stack mobile app built with **React Native (Expo)** for the frontend, **Node.js + Express** for the backend, and **MySQL** for database storage.

---

## 🚀 Features

* 📷 Take photos using the device camera
* ☁️ Upload photos to a backend server
* 🗂️ Display uploaded photos in a gallery
* 💃 Store photo metadata in a MySQL database

---

## 📁 Project Structure

```
photo-uploader/
├── photo-server/           # Node.js + Express server
├── database/
│   └── schema.sql     # MySQL setup script
└── README.md
```

---

## 📱 Frontend (React Native + Expo)

### Setup

```bash
npm install
npx expo start
```

### Notes

* Uses `expo-camera` for camera functionality
* Uses `axios` for HTTP requests
* Update `BASE_URL` in the code with your local IP (e.g. `http://192.168.1.100:3000`)

---

## 🖥️ Backend (Node.js + Express)

### Setup

```bash
cd photo-server
npm install
node index.js
```

### Features

* `POST /upload-photo`: Upload an image (multipart/form-data)
* `GET /photos`: Return list of uploaded photos
* Stores files in `/uploads` and metadata in MySQL

---

## 👢 Database (MySQL)

### Setup

```sql
-- Run this using MySQL Workbench or CLI
CREATE DATABASE IF NOT EXISTS photo_app;
USE photo_app;

CREATE TABLE IF NOT EXISTS photos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  file_name VARCHAR(255) NOT NULL,
  created_at DATETIME NOT NULL
);
```

---

## ⚙️ Environment

### Backend `.env` (optional)

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=photo_app
PORT=3000
```

---
