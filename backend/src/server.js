// 1. Import library yang dibutuhkan
const express= require('express');
const dotenv = require('dotenv')
const cors = require('cors');

// 2. Load file konfigurasi .env
dotenv.config();

const db = require('./config/db');

// 3. inisialisasi aplikasi Express
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware dasar
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Selamart Datang di API Portofolio Dinamis!',
        version: '1.0.0'
    });
});

app.get('/api/status', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Server dalam keadaan sehat dan aktif',
        timestamp: new Date().toISOString()
    });
});

app.get('/api/biodata', (req, res) => {
    res.status(200).json({
    "success": true,
    "data": {
    "nama": "Abdillah Aydin Syah",
    "kelas": "XI RPL 1",
    "cita_cita": "Fullstack Developer",
    "hobi": "Coding & Gaming"
    }
    });
});

const profileRoutes = require('./routes/profileRoutes');
app.use('/api/profile', profileRoutes);


app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint tidak ditemukan!'
    });
});

app.listen(PORT, () => {
    console.log(`===================================`);
    console.log(`server berjalan di http://localhost:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`===================================`);
});