const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const mysql = require('mysql2/promise');
const fs = require('fs');

const app = express();
app.use(cors());
app.use('/uploads', express.static('uploads'));

const upload = multer({ dest: 'uploads/'});

// Connect to DB
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'boynextdoor95',
    database: 'photo_app'
}

app.get('/', (req, res) => {
    res.json({success: true});
})

app.post('/upload-photo', upload.single('photo'), async (req, res) => {
    const { filename } = req.file;
    const createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');

    const conn = await mysql.createConnection(dbConfig);
    await conn.execute(
        'INSERT INTO photos (file_name, created_at) VALUES (?, ?)',
        [filename, createdAt]
    );
    await conn.end();

    res.json({ success: true });
})

app.get('/photos', async (req, res) => {
    try {
        const conn = await mysql.createConnection(dbConfig);
        const [rows] = await conn.execute('SELECT * FROM photos ORDER BY created_at DESC');
        await conn.end();

        const photos = rows.map((row) => ({
        url: `http://192.168.50.239:3000/uploads/${row.file_name}`,
        'created.at': row.created_at,
        }));

        res.json(photos);
    } catch (error) {
        console.error('Error fetching photos:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

app.listen(3000, () => console.log('Server is running on http://localhost:3000'));