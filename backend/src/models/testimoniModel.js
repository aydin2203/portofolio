const db = require('../config/db');

// ==========================================
// FUNGSI 1: Mengambil SEMUA data testimoni
// ==========================================
const getAllTestimonies = async () => {
    const [rows] = await db.query('SELECT * FROM testimoni ORDER BY create_at DESC');
    return rows;
};

// ==========================================
// FUNGSI 2: Mengambil SATU testimoni berdasarkan ID
// ==========================================
const getTestimonyById = async (id) => {
    const [rows] = await db.query('SELECT * FROM testimoni WHERE id = ?', [id]);
    return rows[0];
};

// ==========================================
// FUNGSI 3: Menambahkan testimoni baru (CREATE)
// ==========================================
const createTestimony = async (data) => {
    const { name, role, company, message, avatar_url, rating } = data;

    const [result] = await db.query(
        `INSERT INTO testimoni (name, role, company, message, avatar_url, rating) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [name, role, company, message, avatar_url, rating]
    );
    return result;
}; 
// ==========================================
// FUNGSI 4: Memperbarui data testimoni (UPDATE)
// ==========================================
const updateTestimony = async (id, data) => {
    const { name, role, company, message, avatar_url, rating } = data;

    const [result] = await db.query(
        `UPDATE testimoni SET 
         name = ?, role = ?, company = ?, 
         message = ?, avatar_url = ?, rating = ? 
         WHERE id = ?`,
        [name, role, company, message, avatar_url, rating, id]
    );
    return result;
};

// ==========================================
// FUNGSI 5: Menghapus testimoni (DELETE)
// ==========================================
const deleteTestimony = async (id) => {
    const [result] = await db.query('DELETE FROM testimoni WHERE id = ?', [id]);
    return result;
};

module.exports = {
    getAllTestimonies,
    getTestimonyById,
    createTestimony,
    updateTestimony,
    deleteTestimony
};