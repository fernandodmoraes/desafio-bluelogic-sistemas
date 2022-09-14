const express = require('express');
const server = express();
server.use(express.json()); // faz com que o express entenda JSON
const geeks = ['Nome: Fernando', 'Nome: Anabelle', 'Nome: Vitoria', 'Nome: Antonio'];

server.use((req, res, next) => { // cria o middleware global
  console.time('Request'); // marca o início da requisição
  console.log(`Método: ${req.method}; URL: ${req.url}; `); // retorna qual o método e url foi chamada

  next(); // função que chama as próximas ações 

  console.log('Finalizou'); // será chamado após a requisição ser concluída
  console.timeEnd('Request'); // marca o fim da requisição
});

function checkGeekExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: 'geek name is required' });
  }
  return next();
}   
function checkGeekInArray(req, res, next) {
  const geek = geeks[req.params.index];
  if (!geek) {
    return res.status(400).json({ error: 'geek does not exists' });
  } 

  req.geek = geek;
  return next();
}

server.get('/geeks', (req, res) => {
  return res.json(geeks);
}) // rota para listar todos os geeks

server.get('/geeks/:index', checkGeekInArray, (req, res) => {
  return res.json(req.geek);
})

server.post('/geeks', checkGeekExists, (req, res) => {
  const { name } = req.body; // buscar o nome informado dentro da requisição  
  geeks.push(name);
  return res.json(geeks); // retorna a informação da variavel geeks
})

server.put('/geeks/:index', checkGeekInArray, checkGeekExists, (req, res) => {
  const { index } = req.params; // recupera o index com os dados
  const { name } = req.body;
  geeks[index] = name; 
  return res.json(geeks);
}); // retorna os geeks atualizados após o update

server.delete('/geeks/:index', checkGeekInArray, (req, res) => {
  const { index } = req.params;
  geeks.splice(index, 1); // percorre o vetor até o index selecionado e deleta uma posição no array

  return res.send(); 
}); // retorna os dados após exclusão


server.listen(3000);
