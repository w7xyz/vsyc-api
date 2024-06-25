/**
 * @file Main File of the bot, responsible for registering events, commands, interactions etc.
 * @author Naman Vrati
 * @since 1.0.0
 * @version 3.3.0
 */

// Declare constants which will be used throughout the bot.
const bodyParser = require('body-parser');
const fs = require("fs");
const {
	Client,
	Collection,
	GatewayIntentBits,
	Partials,
	WebhookClient,
	EmbedBuilder
} = require("discord.js");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { token, client_id, test_guild_id } = require("./config.js");
require('dotenv').config();

/**
 * From v13, specifying the intents is compulsory.
 * @type {import('./typings').Client}
 * @description Main Application Client */

// @ts-ignore
const client = new Client({
	// Please add all intents you need, more detailed information @ https://ziad87.net/intents/
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	],
	partials: [Partials.Channel],
});

const express = require('express');
const session = require('express-session');
const MemoryStore = require('memorystore')(session);
const path = require('path');

const app = express();
const port = 80;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    store: new MemoryStore({
        checkPeriod: 86400000 // Limpa o armazenamento uma vez por dia
    }),
    secret: 'vsyncnashnash1337matei3norolasslkpaidichava',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false, // Defina como true apenas se estiver usando HTTPS
        maxAge: 3600000 // Tempo de expiração do cookie em milissegundos (1 hora)
    }
}));

 app.set('trust proxy', false);
 app.use(express.json());

 let licenseData;
 try {
     const data = fs.readFileSync('users.json');
     licenseData = JSON.parse(data);
     // Verifica a validade de cada licença e remove as expiradas
     licenseData = licenseData.filter(license => new Date(license.validUntil) > new Date());
     // Salva as licenças atualizadas no arquivo
     fs.writeFileSync('users.json', JSON.stringify(licenseData, null, 2));
 } catch (err) {
     console.error('Erro ao ler o arquivo users.json:', err);
     licenseData = [];
 }
 app.use((req, res, next) => {
     req.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
     next();
 });
 
 
   function readLicenseData() {
     const rawData = fs.readFileSync('users.json');
     return JSON.parse(rawData);
 }



// Função para escrever os usuários no arquivo JSON


app.get('/', (req, res) => {
	res.end("Vsync's API - discord.gg/w7mytbk3G2")
});

app.get('/teste', (req, res) => {
	res.sendFile(path.join(__dirname, 'teste.html'));
});

app.get('/login', (req, res) => {
    res.setHeader('Cache-Control', 'no-cache');
    res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title id="page-title">Vsync API</title>
        <style>
            body {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                background-color: #000;
                margin: 0;
                font-family: Arial, sans-serif;
                overflow: hidden;
                position: relative;
            }
            canvas {
                display: block;
                vertical-align: bottom;
            }
            #particles-js {
                position: absolute;
                width: 100%;
                height: 100%;
                background-color: #0e0e0e;
                background-image: url("");
                background-repeat: no-repeat;
                background-size: cover;
                background-position: 50% 50%;
            }
            .count-particles {
                background: #000022;
                position: absolute;
                top: 48px;
                left: 0;
                width: 80px;
                color: #000000;
                font-size: .8em;
                text-align: left;
                text-indent: 4px;
                line-height: 14px;
                padding-bottom: 2px;
                font-family: Helvetica, Arial, sans-serif;
                font-weight: bold;
            }
            .js-count-particles {
                font-size: 1.1em;
            }
            #stats,
            .count-particles {
                -webkit-user-select: none;
            }
            #stats {
                border-radius: 3px 3px 0 0;
                overflow: hidden;
            }
            .count-particles {
                border-radius: 0 0 3px 3px;
            }
            .login-container {
                background-color: #131313;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                text-align: center;
                width: 300px;
                z-index: 1;
                position: relative;
            }
            .login-container h2 {
                margin-bottom: 20px;
                color: #ffffff;
            }
            .login-container input[type="text"], .login-container button {
                width: calc(100% - 20px);
                padding: 10px;
                margin-bottom: 20px;
                border-radius: 6px;
                box-sizing: border-box;
                font-size: 16px;
            }
            .login-container input[type="text"] {
                background-color: #1d1d1d;
                border: 1px solid #1d1d1d;
                color: #ffffff;
                transition: border 0.3s, box-shadow 0.3s;
            }
            .login-container input[type="text"]:focus {
                border: 1px solid #ffffff;
                box-shadow: 0 0 5px #ffffff;
                outline: none;
            }
            .login-container button {
                background-color: #ffffff;
                color: #000;
                border: 1px solid #ffffff;
                cursor: pointer;
                transition: background-color 0.3s, box-shadow 0.3s;
            }
            .login-container button:hover {
                background-color: #f0f0f0;
                box-shadow: 0 0 5px #f0f0f0;
            }
        </style>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css">
    </head>
    <body>
        <div id="particles-js"></div>
        <div class="login-container">
            <h2>Vsync Login</h2>
            <form id="loginForm" action="/login" method="post">
                <input type="text" id="licenseKey" name="licenseKey" placeholder="License Key" required>
                <button type="submit">Login</button>
            </form>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/toastify-js"></script>
        <script src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"></script>
        <script>
            particlesJS("particles-js", {
                "particles": {
                    "number": {
                        "value": 50,
                        "density": {
                            "enable": true,
                            "value_area": 800
                        }
                    },
                    "color": {
                        "value": "#ffffff"
                    },
                    "shape": {
                        "type": "circle",
                        "stroke": {
                            "width": 0,
                            "color": "#000000"
                        },
                        "polygon": {
                            "nb_sides": 5
                        },
                        "image": {
                            "src": "img/github.svg",
                            "width": 100,
                            "height": 100
                        }
                    },
                    "opacity": {
                        "value": 0.5,
                        "random": false,
                        "anim": {
                            "enable": false,
                            "speed": 1,
                            "opacity_min": 0.1,
                            "sync": false
                        }
                    },
                    "size": {
                        "value": 3,
                        "random": true,
                        "anim": {
                            "enable": false,
                            "speed": 40,
                            "size_min": 0.1,
                            "sync": false
                        }
                    },
                    "line_linked": {
                        "enable": true,
                        "distance": 150,
                        "color": "#ffffff",
                        "opacity": 0.4,
                        "width": 1
                    },
                    "move": {
                        "enable": true,
                        "speed": 6,
                        "direction": "none",
                        "random": false,
                        "straight": false,
                        "out_mode": "out",
                        "bounce": false,
                        "attract": {
                            "enable": false,
                            "rotateX": 600,
                            "rotateY": 1200
                        }
                    }
                },
                "interactivity": {
                    "detect_on": "canvas",
                    "events": {
                        "onhover": {
                            "enable": true,
                            "mode": "repulse"
                        },
                        "onclick": {
                            "enable": true,
                            "mode": "push"
                        },
                        "resize": true
                    },
                    "modes": {
                        "grab": {
                            "distance": 400,
                            "line_linked": {
                                "opacity": 1
                            }
                        },
                        "bubble": {
                            "distance": 400,
                            "size": 40,
                            "duration": 2,
                            "opacity": 8,
                            "speed": 3
                        },
                        "repulse": {
                            "distance": 200,
                            "duration": 0.4
                        },
                        "push": {
                            "particles_nb": 4
                        },
                        "remove": {
                            "particles_nb": 2
                        }
                    }
                },
                "retina_detect": true
            });
    
            document.getElementById("loginForm").addEventListener("submit", function(event) {
                event.preventDefault();
                const licenseKey = document.getElementById("licenseKey").value;
            
                // Enviar solicitação POST para o servidor
                fetch('/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ licenseKey: licenseKey })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        console.log('Login bem-sucedido. Redirecionando para o dashboard...');
                        window.location.href = '/dashboard'; // Redirecionar para o dashboard se o login for bem-sucedido
                    } else {
                        console.log('Credenciais inválidas. Exibindo mensagem de erro...');
                        // Exibir mensagem de erro ao usuário
                        Toastify({
                            text: data.message || 'Credenciais inválidas. Tente novamente.',
                            duration: 3000,
                            gravity: "top",
                            position: "right",
                            backgroundColor: "#dc3545",
                            style: {
                                boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
                                borderRadius: "10px",
                            }
                        }).showToast();
                    }
                })
                .catch(error => {
                    console.error('Ocorreu um erro ao processar a solicitação:', error);
                });
            });
            
            function typeTitle(title) {
                let index = 0;
                const titleElement = document.getElementById('page-title');
                const intervalId = setInterval(function() {
                    if (index <= title.length) {
                        titleElement.textContent = title.substring(0, index);
                        index++;
                    } else {
                        clearInterval(intervalId);
                        setTimeout(function() {
                            typeTitle(title); // Reiniciar o efeito após um intervalo
                        }, 1000); // Tempo em milissegundos antes de reiniciar o efeito (ajuste conforme necessário)
                    }
                }, 500); // Tempo em milissegundos entre cada caractere (ajuste conforme necessário)
            }
    
            // Chamando a função typeTitle assim que a página for carregada
            window.onload = function() {
                const originalTitle = document.title; // Armazenar o título original
                typeTitle(originalTitle); // Iniciar o efeito de digitação
            };
        </script>
    </body>
    </html>
    `);
});
app.use(express.json());
app.post('/api/save-hwid', (req, res) => {
    const { hwid } = req.body;
    // Lógica para salvar o HWID
    res.status(200).json({ message: 'HWID salvo com sucesso!' });
});

app.post('/api/set-hwid', (req, res) => {
    if (!req.session.loggedIn) {
        return res.status(401).json({ message: 'Usuário não logado' });
    }

    const { hwid } = req.body;
    const licenseKey = req.session.licenseKey;

    // Ler o arquivo users.json
    fs.readFile('users.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo users.json:', err);
            return res.status(500).json({ message: 'Erro ao ler o arquivo de usuários' });
        }

        let users = JSON.parse(data);

        // Encontrar o usuário logado
        let user = users.find(user => user.key === licenseKey);
        if (user) {
            // Atualizar o HWID
            user.hwid = hwid;

            // Salvar o arquivo users.json
            fs.writeFile('users.json', JSON.stringify(users, null, 2), 'utf8', (err) => {
                if (err) {
                    console.error('Erro ao salvar o arquivo users.json:', err);
                    return res.status(500).json({ message: 'Erro ao salvar o arquivo de usuários' });
                }

                res.status(200).json({ message: 'HWID salvo com sucesso!' });
            });
        } else {
            res.status(404).json({ message: 'Usuário não encontrado' });
        }
    });
});


app.post('/login', (req, res) => {
    const licenseKey = req.body.licenseKey;
    const license = licenseData.find(license => license.key === licenseKey);

    if (license) {
        req.session.loggedIn = true;
        req.session.licenseKey = licenseKey;
        console.log('Sessão criada:', req.session);
        res.json({ success: true });
    } else {
        res.status(401).json({ success: false, message: 'Credenciais inválidas' });
    }
});

app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Erro ao encerrar a sessão:', err);
            res.status(500).send('Erro ao encerrar a sessão');
        } else {
            res.sendStatus(200);
        }
    });
});


const webhook = new WebhookClient({ url: 'https://discord.com/api/webhooks/1243966856616870018/l3-WfhnXqohVZ4Z9ZbxmuxaRr5CmNwN4zMS8OvpmGtHMAyQLqMXQYpOloM6uU5hT6kTQ' });
const webhook2 = new WebhookClient({ url: 'https://discord.com/api/webhooks/1243996689673617460/d1t5MsfZYfnPaJ6Ap11n1QeDNfGhyAjuvKtAXu2UxHW7KntrH9x2A1-hAQUuKh7NSMUY' });

//const licenseData = require('./users.json');

app.use(express.static('public'));

app.get('/download', (req, res) => {
    const filePath = path.join(__dirname, 'public', 'loader.exe');
    const randomFileName = generateRandomName(12) + '.exe';

    res.download(filePath, randomFileName, (err) => {
        if (err) {
            console.error('Error downloading file:', err);
            res.status(500).send('Error downloading file.');
        }
    });
});

app.post('/update-avatar', (req, res) => {
    const { licenseKey, avatarUrl } = req.body;

    // Find the license
    const licenseIndex = licenseData.findIndex(license => license.key === licenseKey);
    if (licenseIndex !== -1) {
        // Update the avatar URL
        licenseData[licenseIndex].avatar = avatarUrl;

        // Save the updated data back to users.json
        fs.writeFile(path.join(__dirname, 'users.json'), JSON.stringify(licenseData, null, 2), (err) => {
            if (err) {
                console.error('Error writing to users.json:', err);
                return res.status(500).send('Internal server error');
            }
            res.send('Avatar URL updated successfully');
        });
    } else {
        res.status(404).send('License not found');
    }
});

function generateRandomName(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = 'VSYNC-';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

app.get('/dashboard', (req, res) => {
    console.log('Sessão atual:', req.session);
    if (req.session && req.session.loggedIn && req.session.licenseKey) {
        const license = licenseData.find(license => license.key === req.session.licenseKey);
        if (license) {
            const hwid = license.hwid || 'N/A'; // Use 'N/A' se o HWID não estiver definido
            res.send(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Vsync Dashboard</title>
<style>
    body {
        margin: 0;
        padding: 0;
        font-family: Arial, sans-serif;
        background-color: #0e0e0e;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        flex-direction: column; /* Para alinhar os contêineres na vertical */
    }
    .container {
        width: 60%;
        background-color: #131313;
        padding: 24px;
        border-radius: 3px;
        right: 200px;
        
        color: #fff;
        margin-bottom: 10px; /* Reduzindo a margem inferior entre os containers */
        position: relative; /* Para posicionar o botão relativo a este container */
        box-shadow: 0 4px 8px rgba(51, 51, 51, 0.1); /* Adicionando sombra */
    }
    
    h1 {
        font-size: 20px;
        margin: 0 0 10px 0;
    }
    h2 {
        font-size: 20px;
        color: #7e7e7e;
        margin: 5px 0 20px 120px;
    }
    .fields-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        width: 100%;
    }
    .field {
        width: calc(33.33% - 10px);
        padding: 10px;
        margin-bottom: 20px;
        box-sizing: border-box;
    }
    .field-title {
        font-size: 12px;
        color: #888;
        margin-bottom: 5px;
    }
    .icon {
        width: 20px;
        height: auto;
        fill: #fff;
        margin-right: 5px;
    }
    .field-value {
        font-size: 14px;
        margin-top: 5px;
    }
    .field-content {
        display: flex;
        align-items: center;
        position: relative; /* Para que os ícones possam ser posicionados relativamente */
    }
    input[type="text"] {
        width: calc(100% - 22px); /* Ajustando o tamanho do input */
        padding: 8px; /* Ajustando o padding */
        margin-top: 5px;
        border-radius: 0%;
        border: 1px solid #2e2e2e; /* Alterando a cor da borda */
        background-color: #2b2b2b; /* Alterando a cor de fundo */
        color: #ccc; /* Alterando a cor do texto */
        font-size: 14px; /* Reduzindo o tamanho da fonte */
        transition: box-shadow 0.3s ease; /* Adicionando transição suave */
    }
    input[type="text"]:hover,
    input[type="text"]:focus {
        box-shadow: 0 0 5px rgba(68, 68, 68, 0.5); /* Adicionando sombra ao passar o mouse ou focar */
    }
    button {
        position: absolute; /* Posicionamento absoluto */
        bottom: 35px; /* Distância do topo */
        right: 10px; /* Distância da direita */
        padding: 10px 20px; /* Adicionando um espaçamento interno */
        background-color: #666; /* Cor de fundo */
        color: #fff; /* Cor do texto */
        border: none; /* Removendo a borda */
        border-radius: 4px; /* Borda arredondada */
        cursor: pointer; /* Cursor ao passar */
        transform: translate(-50%, -50%); /* Centralizando o botão */
        transition: background-color 0.3s ease; /* Adicionando transição suave */
        box-shadow: 0 0 3px #3f3f3f; /* Adicionando sombra */
    }
    button:hover {
        background-color: #555; /* Alterando a cor de fundo ao passar o mouse */
        animation: glow 1s infinite alternate; /* Adicionando animação de brilho */
    }

    @keyframes glow {
        from {
            box-shadow: 0 0 3px #1f1f1f, 0 0 6px #1f1f1f, 0 0 9px #1f1f1f, 0 0 12px #1f1f1f, 0 0 15px #1f1f1f, 0 0 18px #1f1f1f, 0 0 21px #1f1f1f;
        }
        to {
            box-shadow: 0 0 6px #1f1f1f, 0 0 9px #1f1f1f, 0 0 12px #1f1f1f, 0 0 15px #1f1f1f, 0 0 18px #1f1f1f, 0 0 21px #1f1f1f, 0 0 24px #1f1f1f;
        }
    }
    button2 {
        position: absolute; /* Posicionamento absoluto */
        bottom: 2px; /* Distância do topo */
        right: -97px; /* Distância da direita */
        padding: 10px 100px; /* Adicionando um espaçamento interno */
        background-color: #666; /* Cor de fundo */
        color: #fff; /* Cor do texto */
        border: none; /* Removendo a borda */
        border-radius: 4px; /* Borda arredondada */
        cursor: pointer; /* Cursor ao passar */
        transform: translate(-50%, -50%); /* Centralizando o botão */
        transition: background-color 0.3s ease; /* Adicionando transição suave */
        box-shadow: 0 0 3px #3f3f3f; /* Adicionando sombra */
    }
    button2:hover {
        background-color: #555; /* Alterando a cor de fundo ao passar o mouse */
        animation: glow 1s infinite alternate; /* Adicionando animação de brilho */
    }

    button3 {
        position: absolute; /* Posicionamento absoluto */
        bottom: 50px; /* Distância do topo */
        right: -95px; /* Distância da direita */
        padding: 10px 130px; /* Adicionando um espaçamento interno */
        background-color: #666; /* Cor de fundo */
        color: #fff; /* Cor do texto */
        border: none; /* Removendo a borda */
        border-radius: 4px; /* Borda arredondada */
        cursor: pointer; /* Cursor ao passar */
        transform: translate(-50%, -50%); /* Centralizando o botão */
        transition: background-color 0.3s ease; /* Adicionando transição suave */
        box-shadow: 0 0 3px #3f3f3f; /* Adicionando sombra */
    }
    button3:hover {
        background-color: #555; /* Alterando a cor de fundo ao passar o mouse */
        animation: glow 1s infinite alternate; /* Adicionando animação de brilho */
    }

    @keyframes glow {
        from {
            box-shadow: 0 0 3px #1f1f1f, 0 0 6px #1f1f1f, 0 0 9px #1f1f1f, 0 0 12px #1f1f1f, 0 0 15px #1f1f1f, 0 0 18px #1f1f1f, 0 0 21px #1f1f1f;
        }
        to {
            box-shadow: 0 0 6px #1f1f1f, 0 0 9px #1f1f1f, 0 0 12px #1f1f1f, 0 0 15px #1f1f1f, 0 0 18px #1f1f1f, 0 0 21px #1f1f1f, 0 0 24px #1f1f1f;
        }
    }

    .profile-container {
        width: 20%;
        background-color: #131313;
        padding: 20px;
        border-radius: 3px;
        color: #fff;
        position: absolute;
        right: 120px;
        top: 233px;
        height: calc(100% - 515px); /* Definindo a altura dinamicamente */
        box-shadow: 0 4px 8px rgba(68, 68, 68, 0.1); /* Adicionando sombra */
    }
    .user-icon {
     display: ${license.avatar ? 'none' : 'block'};
        width: 200px;
        height: 200px;
        right: -90px;
        top: 20px;
        position: relative;
        fill: #fff;
        margin-bottom: 10px;
    }
    .user-icon-fill {
    fill: #525252;

.user-icon-img {
    display: ${license.avatar ? 'block' : 'none'};
}

}
.field2 {
    
        width: calc(100% - 15px);
        padding: 0px;
        top: 25px;
        right: -35px;
        position: relative;
        margin-bottom: 10px;
        box-sizing: border-box;
    }
.field2-title {
        font-size: 13px;
        color: #ffffff;
        margin-bottom: 1px;
    }
         .wrapper {
                        position: absolute;
                        width: 100%;
                        height: 100%;
                    }

.field2-value {
    color: #888;
        font-size: 14px;
        margin-top: 1px;
         position: relative;
    }
    canvas {
                        display: block;
                        vertical-align: bottom;
                    }
            
                    #particles-js {
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        background-color: #0e0e0e;
                        background-image: url("");
                        background-repeat: no-repeat;
                        background-size: cover;
                        background-position: 50% 50%;
                    }
            
                    .count-particles {
                        background: #000022;
                        position: absolute;
                        top: 48px;
                        left: 0;
                        width: 80px;
                        color: #000000;
                        font-size: .8em;
                        text-align: left;
                        text-indent: 4px;
                        line-height: 14px;
                        padding-bottom: 2px;
                        font-family: Helvetica, Arial, sans-serif;
                        font-weight: bold;
                    }
            
                    .js-count-particles {
                        font-size: 1.1em;
                    }
            
                    #stats,
                    .count-particles {
                        -webkit-user-select: none;
                    }
            
                    #stats {
                        border-radius: 3px 3px 0 0;
                        overflow: hidden;
                    }
            
                    .count-particles {
                        border-radius: 0 0 3px 3px;
                    }
                    .user-icon-img {
        border-radius: 50%;
        width: 200px;
        height: 200px;
        object-fit: cover;
        display: none;
        position: relative;
        right: -90px;
        top: 20px;
    }
       .swal2-popup {
    background: #0f0f0f !important;
    border-radius: 5px;
    width: 500px;
    height: 500px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.swal2-title {
    color: #fff !important;
}

.swal2-input {
    background: #252525 !important;
    border-radius: 5px;
    color: #fff !important;
    border: 1px solid #0f0f0f; /* Adicionando borda ao input */
}

.swal2-confirm {
    background: #fff !important;
    color: #000 !important;
    transition: background-color 0.3s, box-shadow 0.3s;
    border-radius: 5px;
    border: 1px solid #0f0f0f; /* Adicionando borda ao botão */
}

.swal2-cancel {
    margin-right: 5px;
    background: #252525 !important;
    color: #ffffff !important;
    transition: background-color 0.3s, box-shadow 0.3s;
    border-radius: 5px;
    border: 1px solid #0f0f0f; /* Adicionando borda ao botão */
}

.message-box {
        position: fixed;
        top: 30px;
        left: 50%;
        transform: translateX(-50%);
        background-color: #131313;
        color: white;
        padding: 1px 100px;
        border-radius: 12px;
        box-shadow: 0 4px 4px rgba(51, 51, 51, 0.1);
        z-index: 1000;
        opacity: 0; /* Inicialmente invisível */
        transition: opacity 0.5s; /* Transição de opacidade */
    }

.message-input {
    position: relative;
    display: block;
    margin-top: 50px;
    width: calc(100% - 50px);
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    right: -10px;
    top: -20px;
    box-sizing: border-box;
    background-color: #2b2b2b; /* Alterando a cor de fundo */
        color: #ccc; /* Alterando a cor do texto */
        font-size: 14px; /* Reduzindo o tamanho da fonte */
        transition: box-shadow 0.3s ease; /* Adicionando transição suave */

}
        .message-input:hover,
    .message-input:focus {
        box-shadow: 0 0 5px rgba(68, 68, 68, 0.5); /* Adicionando sombra ao passar o mouse ou focar */
    }
    .message-text {
        color: #888;
        position: relative;
        top: 1px;
    text-align: center;
}
.message-button {
        position: relative; /* Posicionamento absoluto */
        right: -163px;
        top: 10px;
        padding: 10px 108px; /* Adicionando um espaçamento interno */
        background-color: #666; /* Cor de fundo */
        color: #fff; /* Cor do texto */
        border: none; /* Removendo a borda */
        border-radius: 4px; /* Borda arredondada */
        cursor: pointer; /* Cursor ao passar */
        transform: translate(-50%, -50%); /* Centralizando o botão */
        transition: background-color 0.3s ease; /* Adicionando transição suave */
        box-shadow: 0 0 3px #3f3f3f; /* Adicionando sombra */
    }
    message-button:hover {
        background-color: #555; /* Alterando a cor de fundo ao passar o mouse */
        animation: glow 1s infinite alternate; /* Adicionando animação de brilho */
    }

   .truncated-text {
    /* Limita o tamanho do texto a 12 caracteres */
    max-width: calc(100% - 30px);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    position: relative;
}

.truncated-text::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: inherit;
    filter: blur(4px); /* Ajuste o valor do desfoque conforme necessário */
}


    @keyframes glow {
        from {
            box-shadow: 0 0 3px #1f1f1f, 0 0 6px #1f1f1f, 0 0 9px #1f1f1f, 0 0 12px #1f1f1f, 0 0 15px #1f1f1f, 0 0 18px #1f1f1f, 0 0 21px #1f1f1f;
        }
        to {
            box-shadow: 0 0 6px #1f1f1f, 0 0 9px #1f1f1f, 0 0 12px #1f1f1f, 0 0 15px #1f1f1f, 0 0 18px #1f1f1f, 0 0 21px #1f1f1f, 0 0 24px #1f1f1f;
        }
    }
        
</style>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css">
</head>
<body>
    <div id="particles-js"></div>
   
<div class="container">
    <h1>Profile</h1>
    <div class="fields-container">
        <div class="field">
            <div class="field-title">Username</div>
            <input type="text" placeholder="${license.username}" readonly>
        </div>
       <div class="field">
    <div class="field-title">Avatar URL</div>
    <input type="text" id="avatarUrl" placeholder="${license.avatar || 'Enter Avatar URL'}">
</div>
<div class="field">
    <div class="field-title">Discord Secret</div>
    <input type="text" id="setHWID" placeholder="${hwid || 'Enter Discord Secret'}">
</div>
    </div>
</div>

<div class="container">
    <h1>Discord</h1>
    <div class="fields-container">
        <div class="field">
            <div class="field-title">Discord ID:</div>
            <div class="field-content">
                <div class="field-value">${license.discordId}</div>
            </div>
        </div>
        <div class="field">
            <div class="field-title">Discord Role:</div>
            <div class="field-value">${license.discordRole}</div>
        </div>
        <div class="field">
            <div class="field-title">Discord Secret:</div>
            <div class="field-value">${hwid}</div>
        </div>
    </div>
</div>

<div class="container">
    <h1>Hardware</h1>
    <div class="fields-container">
        <div class="field">
            <div class="field-title">Devices:</div>
            <div class="field-content">
                <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M21 2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7v2H8v2h8v-2h-2v-2h7c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H3V4h18v12z"/></svg>
                <div class="field-value">${license.ip}</div>
            </div>
        </div>
        <div class="field">
            <div class="field-title">Keys activated:</div>
            <div class="field-value">${license.productName}</div>
        </div>
       <div class="field">
    <div class="field-title">Date Added:</div>
    <div class="field-value" id="dateAdded">${license.hwidUpdated}</div>
</div>

        
    </div>
    
</div>
<div class="profile-container">
    <h2>Vsync Profile</h2>
<svg class="user-icon" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="50" />
    <path d="M50 55c-9.7 0-18.2 5-23.3 12.5 6 7.6 15.3 12.5 25.8 12.5s19.8-4.9 25.8-12.5C68.2 60 59.7 55 50 55z"/>
    <circle cx="50" cy="35" r="15"/>
</svg>
<img src="${license.avatar || ''}" class="user-icon-img" id="userIconImg" alt="User Avatar" style="display: ${license.avatar ? 'block' : 'none'};" />

    <div class="field2">
    <div class="field2-title">Access Key:</div>
    <div class="field2-value">
        <span class="truncated-text">${license.key.substr(0, 24) + '...'}</span>
    </div>
</div>



    <div class="field2">
        <div class="field2-title">Discord Secret:</div>
        <div class="field2-value">${hwid}</div>
    </div>
    <div class="field2">
        <div class="field2-title">IP Address:</div>
        <div class="field2-value">${license.ip}</div>
    </div>
    

<button2 id="updateButton">Updated Profile</button2>
  <button3 onclick="logout()">Logout</button2>
</div>

<script src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script>
document.getElementById('updateButton').addEventListener('click', function () {
    const avatarUrl = document.getElementById('avatarUrl').value;
    const discordSecret = document.getElementById('setHWID').value;

    // Verifica se há um avatar URL e executa a função para atualizar o avatar
    if (avatarUrl) {
        updateAvatar(avatarUrl);
    }
    
    // Verifica se há um Discord Secret e executa a função para atualizar o HWID
    if (discordSecret) {
        setHWID(discordSecret);
    }

    // Se ambos os campos estiverem vazios, exibe uma mensagem de erro
    if (!avatarUrl && !discordSecret) {
        showMessage('Please fill in at least one field');
    }
});


// Função para formatar a data no formato dd.mm.aaaa
function formatDate(date) {
    const day = (date.getDate() < 10 ? '0' : '') + date.getDate();
    const month = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);
    const year = date.getFullYear();
    return day + '.' + month + '.' + year;
}

function logout() {
        fetch('/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                window.location.href = '/login';
            } else {
                alert('Failed to logout');
            }
        })
        .catch(error => {
            console.error('Error during logout:', error);
            alert('An error occurred during logout');
        });
    }

// Definir a data inicial
let dateAdded = new Date('2024-06-07');

// Atualizar a data de alteração quando o Discord Secret é modificado
document.getElementById('setHWID').addEventListener('input', function() {
    // Obter a data e hora atual
    const currentDate = new Date();
    // Formatar a data atual
    const formattedDate = formatDate(currentDate);
    // Atualizar a data de alteração exibida na interface
    document.getElementById('dateAdded').textContent = formattedDate;
    // Atualizar a data de alteração interna para futuras referências
    dateAdded = currentDate;
});


function updateAvatar(avatarUrl) {
    const newAvatarUrl = document.getElementById('avatarUrl').value;
    const licenseKey = '${req.session.licenseKey}';
    fetch('/update-avatar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ licenseKey, avatarUrl: newAvatarUrl })
    })
    .then(response => response.text())
    .then(data => {
        const img = document.getElementById('userIconImg');
        if (newAvatarUrl) {
            img.src = newAvatarUrl;
            img.style.display = 'block';
            document.querySelector('.user-icon').style.display = 'none';
        } else {
            img.style.display = 'none';
            document.querySelector('.user-icon').style.display = 'block';
        }
        showMessage('Profile Picture updated!')
    })
    .catch(error => console.error('Error:', error));
}


function updateHWID(newHWID) {
    // Atualiza o HWID na página
    const hwidElement = document.getElementById('hwid');
    hwid = newHWID;
    if (hwidElement) {
        hwidElement.innerText = newHWID;
        document.getElementById('hwid').innerText = newHWID;
    }
}
function setHWID(newHWID) {
    fetch('/api/updatehwid', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            key: '${license.key}',
            hwid: newHWID
        })
    })
    .then(response => {
        if (!response.ok) {
            
            showMessage('Error updating HWID!')
        }
        return response.json();
    })
    .then(data => {
        if (!data.success) {
            showMessage('Error updating HWID!')
        }
        // Atualiza o HWID na página
        updateHWID(newHWID);
        // Exibe uma mensagem de sucesso
        showMessage('HWID updated Successfully!')
        setTimeout(() => {
            window.location.reload();
        }, 2000); // Tempo em milissegundos (0.5 segundos)
       
        
    })
    .catch(error => {
        showMessage('Error updating HWID!')
       
    });
}


function showMessage(message, hasInput) {
    // Cria o elemento da caixa de mensagem
    const messageBox = document.createElement('div');
    messageBox.classList.add('message-box');
    
    // Adiciona o texto da mensagem
    const messageText = document.createElement('p');
    messageText.textContent = message;
    messageText.classList.add('message-text');
    messageBox.appendChild(messageText);

    // Adiciona a caixa de mensagem ao corpo do documento
    document.body.appendChild(messageBox);

    // Faz uma pequena pausa antes de fazer a transição para torná-la visível
    setTimeout(() => {
        messageBox.style.opacity = '1';
    }, 100); // Tempo em milissegundos (0.1 segundos)

    // Define um tempo limite para a caixa de mensagem desaparecer
    setTimeout(() => {
        // Faz a transição para tornar a caixa de mensagem invisível
        messageBox.style.opacity = '0';

        // Remove a caixa de mensagem do corpo do documento após a transição terminar
        setTimeout(() => {
            messageBox.remove();
        }, 500); // Tempo em milissegundos (0.5 segundos)
    }, 5000); // Tempo em milissegundos (5 segundos)
}


    particlesJS("particles-js", {
        "particles": {
            "number": {
                "value": 50,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#ffffff"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                },
                "image": {
                    "src": "img/github.svg",
                    "width": 100,
                    "height": 100
                }
            },
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 6,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "repulse"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 400,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });
    
</script>

</body>
</html>
`);
        } else {
            
            res.send('<h2>License not found</h2>');
        }
    } else {
        res.redirect('/login');
    }
});

app.get('/api/vsync/admin/panel', (req, res) => {
    if (req.session && req.session.loggedIn && req.session.licenseKey) {
        const license = licenseData.find(license => license.key === req.session.licenseKey);
        if (license) {
            const hwid = license.hwid || 'N/A';
            res.sendFile(path.join(__dirname, 'public', 'teste.html')); // Certifique-se de que o arquivo HTML esteja em uma pasta pública
        } else {
            res.status(403).send('License not found.');
        }
    } else {
        res.status(401).send('Unauthorized');
    }
});


app.get('/api/users', (req, res) => {
    fs.readFile('users.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading users file:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(JSON.parse(data));
    });
});


app.get('/api/nash/hwid', (req, res) => {
    const licenseKey = req.query.data;

    // Verifica se a chave da licença existe no users.json
    const license = licenseData.find(license => license.key === licenseKey);
    if (license) {
        // Se a licença existir, retorna as informações
        const { hwid } = license;
        res.status(200).json({      
            hwid
        });
    } else {
        // Se a licença não for encontrada, retorna um erro 404
        res.status(404).json({ code: '404', message: 'License not found.' });
    }
});


function readUsersFile() {
    const filePath = path.join(__dirname, 'users.json'); // Caminho absoluto para 'users.json'

    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Erro ao ler arquivo de usuários:', err);
        return []; // Retorna um array vazio em caso de erro
    }
}

// Função para escrever no arquivo 'users.json'
function writeUsersFile(users) {
    const filePath = path.join(__dirname, 'users.json'); // Caminho absoluto para 'users.json'

    try {
        fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
    } catch (err) {
        console.error('Erro ao salvar o arquivo users.json:', err);
    }
}
app.get('/api/nash/hwidsave', (req, res) => {
    try {
        const { key, hwid } = req.query; // Extrai os parâmetros da query string

        // Simulação de leitura dos usuários do arquivo users.json (substitua pelo seu método real)
        let users = require('./users.json');

        // Encontra o usuário pela chave (key)
        const userToUpdate = users.find(u => u.key === key);

        if (userToUpdate) {
            // Atualiza o HWID do usuário
            userToUpdate.hwid = hwid;

            // Simulação de escrita dos usuários de volta no arquivo users.json (substitua pelo seu método real)
            fs.writeFileSync('./users.json', JSON.stringify(users, null, 2));

            // Retorna uma resposta de sucesso
            res.status(200).json({ success: true, message: 'HWID atualizado com sucesso.' });
        } else {
            // Se o usuário não foi encontrado, retorna um erro 404
            res.status(404).json({ success: false, message: 'Usuário não encontrado.' });
        }
    } catch (error) {
        console.error('Erro ao atualizar HWID:', error);
        res.status(500).json({ success: false, message: 'Erro ao atualizar HWID.' });
    }
});



app.get('/api/nash/userinfo', (req, res) => {
    const licenseKey = req.query.data;

    try {
        const users = readUsersFile(); // Lê os usuários do arquivo padrão 'users.json'

        // Verifica se a chave da licença existe no users.json
        const user = users.find(u => u.key === licenseKey);

        if (user) {
            // Retorna as informações do usuário
            const { username, discordId, productName, validUntil, ip, hwid, avatar, discordRole } = user;
            res.status(200).json({
                username,
                discordId,
                productName,
                validUntil,
                ip,
                hwid,
                avatar,
                discordRole
            });
        } else {
            // Se a licença não for encontrada, retorna um erro 404
            res.status(404).json({ code: '404', message: 'License not found.' });
        }
    } catch (error) {
        console.error('Erro ao buscar informações do usuário:', error);
        res.status(500).json({ code: '500', message: 'Erro ao buscar informações do usuário.' });
    }
});


  app.get('/api/nash/hwid', (req, res) => {
    const licenseKey = req.query.data;

    // Verifica se a chave da licença existe no users.json
    const license = licenseData.find(license => license.key === licenseKey);
    if (license) {
        // Se a licença existir, retorna as informações
        const { hwid } = license;
        res.status(200).json({      
            hwid
        });
    } else {
        // Se a licença não for encontrada, retorna um erro 404
        res.status(404).json({ code: '404', message: 'License not found.' });
    }
});


app.get('/api/nash/authenticate', async (req, res) => {
    const licenseKey = req.query.data;
    const hwid = req.query.hwid;

    // Verifica se a chave da licença existe no users.json
    const licenseIndex = licenseData.findIndex(license => license.key === licenseKey);
    if (licenseIndex !== -1) {
        const license = licenseData[licenseIndex];
        const validUntil = new Date(license.validUntil).toLocaleDateString();

        // Adiciona o IP e o HWID aos dados da licença
        license.ip = req.ip;
        if (hwid) {
            license.hwid = hwid;
        }

        // Atualiza os dados da licença no users.json
        licenseData[licenseIndex] = license;
        fs.writeFileSync('users.json', JSON.stringify(licenseData, null, 2));
        const embed = new EmbedBuilder().setColor("#2b2d31")
            //.setColor('#00FF00')
            .setTitle(`Log's Autenticação`)
            .setDescription(`Usuário autenticado com sucesso!`);
        embed.addFields([
            {
                name: "<:lock:1244256882382602352> Chave de Acesso:",
                value: `\`\`\`${licenseKey}\`\`\``,
                inline: true
            },
            {
                name: "<:calendario:1244260517972017244> Validade até:",
                value: `${validUntil}`,
                inline: false
            }
        ]);

        try {
            // Envia o log para o canal do Discord
            await webhook.send({ embeds: [embed] });
        } catch (error) {
            console.error('Erro ao enviar log para o Discord:', error);
        }

        res.status(200).json({ code: '070', message: `Authenticated ! -> Expires: ${validUntil}` });
    } else {
        const ip = req.ip;

        // Cria uma mensagem de log em forma de embed
        const embed = new EmbedBuilder().setColor("#2b2d31")
            //.setColor('#FF0000')
            .setTitle(`Log's Autenticação`)
            .setDescription(`Usuário não autenticado!`);
        embed.addFields([
            {
                name: "<:world:1244098390426390578> IP Adress:",
                value: `\`\`\`${ip}\`\`\``,
                inline: true
            }
        ]);

        try {
            // Envia o log para o canal do Discord
            await webhook2.send({ embeds: [embed] });
        } catch (error) {
            console.error('Erro ao enviar log para o Discord:', error);
        }

        res.status(404).json({ code: '404', message: 'License not found.' });
    }
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${port}/`);
});
// Observa mudanças no arquivo users.json
fs.watchFile('users.json', (curr, prev) => {
    console.log('users.json mudou. Recarregando dados...');
    try {
        const data = fs.readFileSync('users.json');
        licenseData = JSON.parse(data);
    } catch (err) {
        console.error('Erro ao ler o arquivo users.json:', err);
        licenseData = [];
    }
});
/**********************************************************************/
// Below we will be making an event handler!

/**
 * @description All event files of the event handler.
 * @type {String[]}
 */

const eventFiles = fs
	.readdirSync("./events")
	.filter((file) => file.endsWith(".js"));

// Loop through all files and execute the event when it is actually emmited.
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} else {
		client.on(
			event.name,
			async (...args) => await event.execute(...args, client)
		);
	}
}

/**********************************************************************/
// Define Collection of Commands, Slash Commands and cooldowns

client.commands = new Collection();
client.slashCommands = new Collection();
client.buttonCommands = new Collection();
client.selectCommands = new Collection();
client.contextCommands = new Collection();
client.modalCommands = new Collection();
client.cooldowns = new Collection();
client.autocompleteInteractions = new Collection();
client.triggers = new Collection();

/**********************************************************************/
// Registration of Message-Based Legacy Commands.

/**
 * @type {String[]}
 * @description All command categories aka folders.
 */

const commandFolders = fs.readdirSync("./commands");

// Loop through all files and store commands in commands collection.

for (const folder of commandFolders) {
	const commandFiles = fs
		.readdirSync(`./commands/${folder}`)
		.filter((file) => file.endsWith(".js"));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}

/**********************************************************************/
// Registration of Slash-Command Interactions.

/**
 * @type {String[""]}
 * @description All slash commands.
 */

const slashCommands = fs.readdirSync("./interactions/slash");

// Loop through all files and store slash-commands in slashCommands collection.

for (const module of slashCommands) {
	const commandFiles = fs
		.readdirSync(`./interactions/slash/${module}`)
		.filter((file) => file.endsWith(".js"));

	for (const commandFile of commandFiles) {
		const command = require(`./interactions/slash/${module}/${commandFile}`);
		client.slashCommands.set(command.data.name, command);
	}
}

/**********************************************************************/
// Registration of Autocomplete Interactions.

/**
 * @type {String[]}
 * @description All autocomplete interactions.
 */

const autocompleteInteractions = fs.readdirSync("./interactions/autocomplete");

// Loop through all files and store autocomplete interactions in autocompleteInteractions collection.

for (const module of autocompleteInteractions) {
	const files = fs
		.readdirSync(`./interactions/autocomplete/${module}`)
		.filter((file) => file.endsWith(".js"));

	for (const interactionFile of files) {
		const interaction = require(`./interactions/autocomplete/${module}/${interactionFile}`);
		client.autocompleteInteractions.set(interaction.name, interaction);
	}
}

/**********************************************************************/
// Registration of Context-Menu Interactions

/**
 * @type {String[]}
 * @description All Context Menu commands.
 */

const contextMenus = fs.readdirSync("./interactions/context-menus");

// Loop through all files and store context-menus in contextMenus collection.

for (const folder of contextMenus) {
	const files = fs
		.readdirSync(`./interactions/context-menus/${folder}`)
		.filter((file) => file.endsWith(".js"));
	for (const file of files) {
		const menu = require(`./interactions/context-menus/${folder}/${file}`);
		const keyName = `${folder.toUpperCase()} ${menu.data.name}`;
		client.contextCommands.set(keyName, menu);
	}
}

/**********************************************************************/
// Registration of Button-Command Interactions.

/**
 * @type {String[]}
 * @description All button commands.
 */

const buttonCommands = fs.readdirSync("./interactions/buttons");

// Loop through all files and store button-commands in buttonCommands collection.

for (const module of buttonCommands) {
	const commandFiles = fs
		.readdirSync(`./interactions/buttons/${module}`)
		.filter((file) => file.endsWith(".js"));

	for (const commandFile of commandFiles) {
		const command = require(`./interactions/buttons/${module}/${commandFile}`);
		client.buttonCommands.set(command.id, command);
	}
}

/**********************************************************************/
// Registration of Modal-Command Interactions.

/**
 * @type {String[]}
 * @description All modal commands.
 */

const modalCommands = fs.readdirSync("./interactions/modals");

// Loop through all files and store modal-commands in modalCommands collection.

for (const module of modalCommands) {
	const commandFiles = fs
		.readdirSync(`./interactions/modals/${module}`)
		.filter((file) => file.endsWith(".js"));

	for (const commandFile of commandFiles) {
		const command = require(`./interactions/modals/${module}/${commandFile}`);
		client.modalCommands.set(command.id, command);
	}
}

client.on('ready', async () => {

    const activities = [
        'Digite !help',
        'Fui criado por TONICOLO#0001',
        'Nightmare Community',
        'Acesse Meu Servidor'
    ];

    let i = 0;

    setInterval(() => {
        client.user.setPresence({
            activities: [{
                name: activities[i++ % activities.length],
                type: 'WATCHING'
            }],
            
        });
    }, 5000);
	client.user.setStatus("online");
});



/**********************************************************************/
// Registration of select-menus Interactions

/**
 * @type {String[]}
 * @description All Select Menu commands.
 */

const selectMenus = fs.readdirSync("./interactions/select-menus");

// Loop through all files and store select-menus in selectMenus collection.

for (const module of selectMenus) {
	const commandFiles = fs
		.readdirSync(`./interactions/select-menus/${module}`)
		.filter((file) => file.endsWith(".js"));
	for (const commandFile of commandFiles) {
		const command = require(`./interactions/select-menus/${module}/${commandFile}`);
		client.selectCommands.set(command.id, command);
	}
}

/**********************************************************************/
// Registration of Slash-Commands in Discord API

const rest = new REST({ version: "9" }).setToken(token);

const commandJsonData = [
	...Array.from(client.slashCommands.values()).map((c) => c.data.toJSON()),
	...Array.from(client.contextCommands.values()).map((c) => c.data),
];

(async () => {
	try {
		console.log("[💜] Started (/) commands.");

		await rest.put(
			/**
			 * By default, you will be using guild commands during development.
			 * Once you are done and ready to use global commands (which have 1 hour cache time),
			 * 1. Please uncomment the below (commented) line to deploy global commands.
			 * 2. Please comment the below (uncommented) line (for guild commands).
			 */

			Routes.applicationGuildCommands(client_id, test_guild_id),

			/**
			 * Good advice for global commands, you need to execute them only once to update
			 * your commands to the Discord API. Please comment it again after running the bot once
			 * to ensure they don't get re-deployed on the next restart.
			 */

			// Routes.applicationCommands(client_id)

			{ body: commandJsonData }
		);

		console.log("[💜] Successfully reloaded (/) commands.");
	} catch (error) {
		console.error(error);
	}
})();

/**********************************************************************/
// Registration of Message Based Chat Triggers

/**
 * @type {String[]}
 * @description All trigger categories aka folders.
 */

const triggerFolders = fs.readdirSync("./triggers");

// Loop through all files and store triggers in triggers collection.

for (const folder of triggerFolders) {
	const triggerFiles = fs
		.readdirSync(`./triggers/${folder}`)
		.filter((file) => file.endsWith(".js"));
	for (const file of triggerFiles) {
		const trigger = require(`./triggers/${folder}/${file}`);
		client.triggers.set(trigger.name, trigger);
	}
}



// Login into your client application with bot's token.

client.login(process.env.TOKEN);
