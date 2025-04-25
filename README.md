
# MQTTServer

### Descrição
Server MQTT utilizado para guardar medições dos Assets.

### Como rodar
> ``git clone https://github.com/SettaDigitalLabsJS/MQTTServer.git  ``

Dentro da pasta, ``npm install`` e ``npm start``
Utilize o [MQTT Explorer](https://mqtt-explorer.com) para teste (configurar o certificado se necessário).

### Gerando os certificados
Crie uma pasta e rode o seguinte código
> ``openssl req -newkey rsa:2048 -nodes -keyout keyname.key -out request.csr -subj "/C=BR/ST=Minas Gerais/L=Patos de Minas/O=Setta Digital Corporation/CN=localhost"``

Altere o "**CN**" para o seu **HOSTNAME** ao gerar os certificados para produção. 

Em seguida, utilize
> ``openssl x509 -req -signkey keyname.key -in request.csr -out certificate.crt``

Use o ``certificate.crt`` e ``keyname.key`` no **options** do MQTT.