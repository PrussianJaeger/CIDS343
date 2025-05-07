const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'database.db'); // Adjust as needed
const db = new sqlite3.Database(dbPath);

// Columns to add
const columnsToAdd = [
  { name: 'total_savings', type: 'REAL', default: 0 },
  { name: 'total_monthly_savings', type: 'REAL', default: 0 },
  { name: 'monthly_goal', type: 'REAL', default: 0 },
];

function addColumnsIfNotExist() {
  db.all("PRAGMA table_info(users);", (err, columns) => {
    if (err) {
      console.error("Failed to retrieve table info:", err);
      return db.close();
    }

    const existingColumnNames = columns.map(col => col.name);
    const columnsToAddNow = columnsToAdd.filter(col => !existingColumnNames.includes(col.name));

    if (columnsToAddNow.length === 0) {
      console.log("All columns already exist.");
      return db.close();
    }

    let remaining = columnsToAddNow.length;

    columnsToAddNow.forEach(col => {
      const alterQuery = `ALTER TABLE users ADD COLUMN ${col.name} ${col.type} DEFAULT ${col.default};`;
      db.run(alterQuery, (err) => {
        if (err) {
          console.error(`Error adding column ${col.name}:`, err.message);
        } else {
          console.log(`Column '${col.name}' added successfully.`);
        }

        remaining--;
        if (remaining === 0) {
          db.close((err) => {
            if (err) {
              console.error('Error closing database:', err.message);
            } else {
              console.log('Database closed.');
            }
          });
        }
      });
    });
  });
}

addColumnsIfNotExist();