const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const mysql = require('mysql2');

// npm install express --save
// npm install body-parser --save

//Configurações do ambiente
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Criando um roteador
const router = express.Router();
router.get('/', (req, res) => res.json({message: 'API OK!'}));
app.use('/', router);

function execQuery(query, res){
  const connection = mysql.createConnection({
      host: '127.0.0.1',
      port: 3336,
      user: 'root',
      password: '56123',
      database: 'devWebC1'
  });

  connection.query(query, function(error, results, fields){
    
    if(error) res.json(error);
    else res.json(results);
    
    connection.end();
    console.log('Query executada com sucesso!')
  });
}

//Rotas Users
router.get('/users', (req, res) => {
  execQuery('SELECT * FROM Users;', res);
});

router.get('/users/:id?', (req, res) => {
  let filter = '';
  if(req.params.id) filter = ' WHERE id = ' + parseInt(req.params.id);
  execQuery('SELECT * FROM Users ' + filter, res);
});

router.delete('/users/:id', (req, res) => {
  execQuery('DELETE FROM Users WHERE id=' + parseInt(req.params.id), res);
});

router.post('/users', (req, res) => {
  const nome = req.body.nome.substring(0,80);
  const altura = req.body.altura.substring(0,50);
  const peso = req.body.peso.substring(0,80);
  const telefone = req.body.telefone.substring(0,80);
  const saude = req.body.saude.substring(0,80);
  const email = req.body.email.substring(0,100);
  execQuery(`INSERT INTO Users (nome, altura, peso, telefone, saude, email) VALUES ('${nome}','${altura}', '${peso}', '${telefone}',  '${saude}'), '${email}';`, res);
});

router.patch('/users/:id', (req,res) => {
  const nome = req.body.nome.substring(0,80);
  const altura = req.body.altura.substring(0,50);
  const peso = req.body.peso.substring(0,80);
  const telefone = req.body.telefone.substring(0,80);
  const saude = req.body.saude.substring(0,80);
  const email = req.body.email.substring(0,100);
  execQuery(`UPDATE Users SET nome='${nome}', altura='${altura}', peso='${peso}', telefone='${telefone}', saude='${saude}', email='${email}', WHERE id = '${req.params.id}';`, res);
});

//Iniciando o servidor
app.listen(port);
console.log('API rodando ....');








