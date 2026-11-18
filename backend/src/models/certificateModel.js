const db = require('../config/db');

const getAllCertificates = async () => {
    const [rows] = await db.query('SELECT * FROM certificate ORDER BY issue_date DESC');
    return rows;
};

const getCertificateById = async (id) => {
    const [rows] = await db.query('SELECT * FROM certificate WHERE id = ?', [id]);
    return rows[0];
};

const createCertificate = async (data) => {
    const {name, issuer, issue_date, experiation_date, credential_id, credential_url, description} = data;
    const [result] = await db.query(
        'INSERT INTO certificate (name, issuer, issue_date, experiation_date, credential_id, credential_url, description) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [name, issuer, issue_date, experiation_date || null, credential_id || null, credential_url || null, description || null]
    );
    return result;
};

const updateCertificate = async (id, data) => {
    const {name, issuer, issue_date, experiation_date, credential_id, credential_url, description} = data;
    const [result] = await db.query(
        'UPDATE certificate SET name = ?, issuer = ?, issue_date = ?, experiation_date = ?, credential_id = ?, credential_url = ?, description = ? WHERE id = ?',
        [name, issuer, issue_date, experiation_date || null, credential_id || null, credential_url || null, description || null, id]
    );
    return result;
}

const deleteCertificate = async (id) => {
    const [result] = await db.query('DELETE FROM certificate WHERE id = ?', [id]);
    return result;
}

module.exports = {
    getAllCertificates,
    getCertificateById,
    createCertificate,
    updateCertificate,
    deleteCertificate
};