const mysql = require('mysql2');
const faker = require('faker');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    port: 3336,
    user: 'root',
    password: '56123',
    database: 'devWebC1'
});

connection.connect(function(err){
    if(err) return console.log(err);
    console.log('O Banco de dados esta conectado ao sistema!');
    createTableUsers(connection);
    populateUsers(connection);
});

function createTableUsers(conn){
    const sql = `CREATE TABLE IF NOT EXISTS Users
                   (id INT NOT NULL AUTO_INCREMENT, 
                   nome VARCHAR(80) NOT NULL,
                   altura VARCHAR(50) NOT NULL,
                   peso VARCHAR(80) NOT NULL,
                   telefone VARCHAR(80) NOT NULL,
                   saude VARCHAR(80) NOT NULL,
                   email VARCHAR(100) NOT NULL,
                   PRIMARY KEY (id)
                   );`
    conn.query(sql, function(error, results, fields){
        if(error) return console.log(error);
        console.log('A Tabela foi feita com sucesso!')
    })
}

function populateUsers(conn){
    const sql = `INSERT INTO Users(nome, altura, peso, telefone, , saude, email) VALUES ?`;
    
    let values = [];

    for(let i = 0; i < 10; i++){
        let altura = (Math.random() * 0.30 + 1.50).toString+"m";  
        let peso = (Math.random() * 58 + 42).toString+"kg";  
        let arraySaude = ["Esta saudavel","Esta com COVID 19","Esta com anemia","Esta com chicungunha","Esta gripado"]
        let saude = arraySaude[Math.floor(Math.random() * arraySaude.length)];  
        values.push([faker.name.findName(), faker.internet.email(), faker.phone.phoneNumber(), altura, peso, saude]);
    }

    conn.query(sql, [values], function(error, results, fields){
        if(error) return console.log(error);
        console.log('Os Registros estao inseridos com sucesso!');
        conn.end();
    });
}