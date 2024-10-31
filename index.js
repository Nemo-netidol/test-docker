const express = require('express')
const mysql = require('mysql2/promise')
const app = express()
const port = 8000

let conn = null;

async function initMySQL() {
    conn = await mysql.createConnection({
        host: 'db',
        port: 3306, // Explicitly specify the port to avoid defaults
        user: 'root',
        password: 'root',
        database: 'tutorial',
      });
    //   conn.connect()
    //   conn.query(`CREATE TABLE Persons ( id int )`)
    // const id = await conn.query(`SELECT * from Persons`)
    // console.log(id)
}


app.get('/hello-world', (req, res) => {
    res.send('hello world')
})

// path = GET /users สำหรับ get users ทั้งหมดที่บันทึกเข้าไปออกมา
app.get('/users', async (req, res) => {
    const [results] = await conn.query('SELECT * FROM users')
    res.json(results)
  })

app.listen(port, async () => {
    await initMySQL();
    console.log(`Server running at http://localhost:${port}/`)
})

