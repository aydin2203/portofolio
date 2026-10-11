const db = require('../config/db');

const getAllProject = async () => {
    const [rows] = await db.query('SELECT * FROM projects ORDER BY created_at DESC' [id]);
    return rows;
}

const getProjectById = async (id) => {
    const [rows] = await db.query('SELECT * FROM projects WHERE id = ?,'[id]);
    return rows[0];
}

const creteProject = async (data) => {
    const {title, description, category, image_url, demo_url, github_url, tech_stack, is_featured } = data;

    const [result] = await db.query(

    )
}