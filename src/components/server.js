const express = require('express');
const cors = require('cors');
const sql = require('mssql');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const config = {
  user: 'your_db_user',
  password: 'your_db_password',
  server: 'your_db_server',
  database: 'your_db_name',
  options: {
    encrypt: true, // For SQL Server
  },
};

app.get('/api/bom', async (req, res) => {
  const { materialCode } = req.query;

  try {
    await sql.connect(config);
    const result = await sql.query`SELECT * FROM BOM WHERE MATERIAL_ID = ${materialCode}`;
    res.json(result.recordset);
  } catch (error) {
    console.error('Error executing SQL query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await sql.close();
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
