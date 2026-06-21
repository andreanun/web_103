import { pool } from "./database.js";
import "./dotenv.js";
import { acts } from "../data/acts.js";

const createActsTable = async () => {
  const createTableQuery = `
        DROP TABLE IF EXISTS acts;

        CREATE TABLE IF NOT EXISTS acts (
            id SERIAL PRIMARY KEY,
            slug VARCHAR(255) NOT NULL,
            name VARCHAR(255) NOT NULL,
            label VARCHAR(255) NOT NULL,
            type VARCHAR(255) NOT NULL,
            members INTEGER, 
            tourName VARCHAR(255) NOT NULL,
            usCities TEXT[] NOT NULL,
            description TEXT NOT NULL,
            image VARCHAR(255) NOT NULL,
            fanName VARCHAR(255) NOT NULL,
            genre VARCHAR(255) NOT NULL,
            debutYear INT NOT NULL,
            highlight VARCHAR(255) NOT NULL
        )
    `;

  try {
    const res = await pool.query(createTableQuery);
    console.log("🎉 acts table created successfully");
  } catch (err) {
    console.log("⚠️ error creating acts table", err);
  }
};

// Load data into table
const seedActsTable = async () => {
  await createActsTable();

  acts.forEach((act) => {
    const insertQuery = {
      text: `INSERT INTO acts (slug, name, label, type, members, tourName, usCities, description, image, fanName, genre, debutYear, highlight)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
    };

    const values = [
      act.slug,
      act.name,
      act.label,
      act.type,
      act.members,
      act.tourName,
      act.usCities,
      act.description,
      act.image,
      act.fanName,
      act.genre,
      act.debutYear,
      act.highlight,
    ];

    pool.query(insertQuery, values, (err, res) => {
      if (err) {
        console.error("⚠️ error inserting act", err);
        return;
      }

      console.log(`✅ ${act.name} added successfully`);
    });
  });
};

seedActsTable();
