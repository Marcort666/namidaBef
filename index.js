const express = require('express')
const app = express()
const path = require('path')
const webSockets = require('express-ws')
webSockets(app)
require('dotenv').config()

const tectalicOpenai = require('@tectalic/openai').default
const openIAClient = tectalicOpenai(process.env.OPENAI_API_KEY)

app.use(express.static('public'))

app.get('/', function (req, res){
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

// Server init
const port = process.env.PORT || 8000
app.listen(port, function(){
    console.log('Server listening on port ' + port)
})

// Sockets init
app.ws('/', handleWs)

// Socket handler
function handleWs(ws){
    console.log('User connected.')
    
    // Event listener to new message
    ws.on('message', (m) => {
        const data = JSON.parse(m)
        if(data.type == 'completion-request'){
            // request to openia
            openIAClient.chatCompletions.create({
                model: 'gpt-4',
                messages: [{role: 'user', content: data.prompt}]
            })
            .then((response) => {
                console.log('Respuesta del chatbot:',response.data.choices[0].message.content)
                const reply = response.data.choices[0].message.content
                ws.send(JSON.stringify({type: 'completion-response', response: reply}))
            })
            .catch((err) => {
                console.log('Error al interactuar con la API de OpenAI:', err)
                ws.send(JSON.stringify({type: 'completion-response', response: 'Error al recibir la respuesta, por favor intenta preguntando otra cosa.'}))
            })
        }
    })

    // Event listner to user ending connection
    ws.on('close', () => {
        console.log('User disconnected.')
    })
}