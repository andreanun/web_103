import { pool } from "../config/database.js";

const getActs = async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM acts ORDER BY id ASC");
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const getActBySlug = async (req, res, next) => {
  try {
    const results = await pool.query("SELECT * FROM acts WHERE slug = $1", [req.params.slug]);
    if (results.rows.length === 0) return next();
    req.act = results.rows[0];
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  getActs,
  getActBySlug,
};
