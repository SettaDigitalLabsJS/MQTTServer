const aedes = require('aedes')();
const net = require('net');

// Autenticação
aedes.authenticate = (client, username, password, callback) => {
  const AUTH_USERS = {
    'usuario1': 'senha123',
    'admin': 'adminpass'
  };

  const pwd = password ? password.toString() : '';

  if (AUTH_USERS[username] && AUTH_USERS[username] === pwd) {
    return callback(null, true);
  }

  const error = new Error('Autenticação falhou!');
  error.returnCode = 4; // Código MQTT para "bad username or password"
  return callback(error, false);
};

// Porta padrão MQTT
const PORT = 1883;

const server = net.createServer(aedes.handle);

server.listen(PORT, () => {
  console.log(`🟢 Broker MQTT rodando na porta ${PORT}`);
});
