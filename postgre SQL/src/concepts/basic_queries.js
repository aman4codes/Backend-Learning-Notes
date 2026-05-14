const db = require("../db/db");

async function createUserTable() {
   const createTableQuery = `
    CREATE TABLE IF NOT EXISTS Users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )`;

   try {
      await db.query(createTableQuery);
      console.log("Table Created Successfully");
   } catch (e) {
      console.error("Error Occurred:", e);
   }
}

async function insertUser(username, email) {

   const insertQuery = `INSERT INTO users (username, email)
    VALUES ($1, $2)
    RETURNING *
    `;


   try {
      const res = await db.query(insertQuery, [username, email]);
      console.log("User added Successfully");
      return res.rows[0];
   } catch (e) {
      console.error("Error Occurred:", e);
   }
}

async function fetchAllUser() {
   const fetchAllQuery = "SELECT * FROM users";

   try {
      const res = await db.query(fetchAllQuery);

      console.log("Fetched all users", res);

      return res.rowCount;
   } catch (e) {
      console.error("Error Occurred:", e);
   }
}

async function updateUserInfo(username, newEmail) {
   const updateUserQuery = `
    UPDATE users
    SET email = $2
    WHERE username = $1
    RETURNING *
    `;

   try {
      const res = await db.query(updateUserQuery, [username, newEmail]);

      if (res.rows.length > 0) {
         console.log("User updated successfully!", res.rows[0]);
         return res.rows[0];
      } else {
         console.log("No user found with given username");
         return null;
      }
   } catch (error) {
      console.error("Error while creating users table", error);
   }
}

async function deleteInfo(username) {
   const deleteQuery = `
    DELETE FROM users
    WHERE username = $1
    RETURNING *
    `;
   try {
      const res = await db.query(deleteQuery, [username]);

      if (res.rows.length > 0) {
         console.log("User deleted successfully!", res.rows[0]);
         return res.rows[0];
      } else {
         console.log("No user found with given username");
         return null;
      }
   } catch (error) {
      console.error("Error while creating users table", error);
   }
}


module.exports = { createUserTable, insertUser, fetchAllUser, updateUserInfo, deleteInfo };