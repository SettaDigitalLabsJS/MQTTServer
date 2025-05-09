const aedes = require('aedes')();
const net = require('net');   // Para conexões MQTT via TCP
const fs = require('fs');
const tls = require('tls');

require("dotenv").config();

const tcpPort = process.env.TCP_PORT;   // Porta padrão para MQTT

// Usuários permitidos
const USERS = {
    [process.env.BASIC_AUTH_USER]: process.env.BASIC_AUTH_PASSWORD
};

// Função de autenticação
aedes.authenticate = (client, username, password, callback) => {
    const userPassword = USERS[username];    
    if (userPassword && password && password.toString() === userPassword) {
        console.log(`Cliente "${username}" autenticado com sucesso!`);
        return callback(null, true);
    } else {
        console.log(`Falha na autenticação do cliente "${username}".`);
        const erro = new Error('Usuário ou senha inválidos');
        erro.returnCode = 4;
        return callback(erro, false);
    }
};

// Controle de publicação (opcional)
aedes.authorizePublish = (client, packet, callback) => {
    console.log(`Cliente "${client.id}" publicou no tópico "${packet.topic}"`);
    callback(null);  // Permite publicação
};

// Controle de inscrição (opcional)
aedes.authorizeSubscribe = (client, sub, callback) => {
    console.log(`Cliente "${client.id}" tentou se inscrever no tópico "${sub.topic}"`);
    callback(null, sub);  // Permite inscrição
};

const options = {
    key: fs.readFileSync('certs/keyname.key'),
    cert: fs.readFileSync('certs/certificate.crt')
}

/*
const tlsServer = tls.createServer(options, aedes.handle); 
tlsServer.listen(tcpPort, function () {
  console.log(`Servidor MQTT rodando em: tcp://localhost:${tcpPort}`);
}); //com certificado
*/ 
const server = net.createServer(aedes.handle); // sem certificado
    server.listen(tcpPort, '0.0.0.0', function () {
    console.log(`Servidor MQTT rodando em: tcp://localhost:${tcpPort}`);
});

// Log de eventos do broker
aedes.on('client', (client) => {
    console.log(`Cliente conectado: ${client.id}`);
});
aedes.on('clientDisconnect', (client) => {
    console.log(`Cliente desconectado: ${client.id}`);
});
aedes.on('publish', (packet, client) => {
    console.log(`Mensagem publicada no tópico "${packet.topic}" (QoS ${packet.qos}): ${packet.payload}`);
});