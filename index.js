import express, { json } from 'express'
import bodyParser from 'body-parser'
import openai from './OpenAI/gpt-3.5-turbo-config.js'
import { dirname } from 'path'
import { join } from 'path'
import { fileURLToPath } from 'url'
import { readFileSync } from 'fs'

const app = express()
// import {generateResponse} from './OpenAI/namida.js'
import webSockets from 'express-ws'
webSockets(app)
import 'dotenv/config'
const { json: _json } = bodyParser
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const filePath = join(__dirname, './public/index.html')
const contenido = readFileSync(filePath, 'utf-8')
console.log(contenido)

// const tectalicOpenai = require('@tectalic/openai').default
// const openIAClient = tectalicOpenai(process.env.OPENAI_API_KEY)

app.use(express('public'))
app.use(json())
app.use(_json())

app.get('/', function (req, res) {
    res.sendFile(join(__dirname, './public/index.html'))
})

app.post('/ask-namida', async (req, res) => {
    const { message } = req.body

    if (!message) {
        res.status(400).json({ error: 'Debes escribir algo para Namida.' })
        return
    }
    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
            {
                "role": "system",
                "content": "You are a good and helpful  assistant"
            },
            {
                "role": "user",
                "content": "Give me the CSS code for 4 colors that matches the \"calm\" feeling."
            },
            {
                "role": "assistant",
                "content": "{\n  \"css_code\": \"background-color: #2E2B5F;\"\n}"
            },
            {
                "role": "assistant",
                "content": "{\n  \"css_code\": \"background-color: #AED9E0;\"\n}"
            },
            {
                "role": "assistant",
                "content": "{\n  \"css_code\": \"background-color: #E6F2F3;\"\n}"
            },
            {
                "role": "assistant",
                "content": "{\n  \"css_code\": \"background-color: #D1E7E9;\"\n}"
            },
            {
                "role": "assistant",
                "content": "Here are four CSS codes for colors that evoke a \"calm\" feeling:\n\n1. Light Blue: \n```css\nbackground-color: #AED9E0;\n```\n\n2. Pale Green: \n```css\nbackground-color: #E6F2F3;\n```\n\n3. Light Gray: \n```css\nbackground-color: #D1E7E9;\n```\n\n4. Deep Blue: \n```css\nbackground-color: #2E2B5F;\n```\n\nFeel free to use these codes in your CSS to create a calm and soothing color scheme."
            }
        ],
        temperature: 0,
        max_tokens: 1024,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    })

    })
// const cssCode = generateCSSFromDescription(description)
// res.json({ response: response.choices[0].text })
// res.json({ cssCode })


// Server init
const port = process.env.PORT || 8000
app.listen(port, function () {
    console.log('Server listening on port ' + port)
})

// Sockets init
app.ws('/', handleWs)

// Socket handler
function handleWs(ws) {
    console.log('User connected.')

    // Event listener to new message
    ws.on('message', (m) => {
        const data = JSON.parse(m)
        if (data.type == 'completion-request') {
            // request to openia
            openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: data.messages }]
            })
                .then((response) => {
                    console.log(response.data.choices[0].messages.content)
                    const reply = response.data.choices[0].messages.content
                    ws.send(JSON.stringify({ type: 'completion-response', response: reply }))
                })
                .catch((err) => {
                    console.log('Error catched.')
                    ws.send(JSON.stringify({ type: 'completion-response', response: 'ERROR 404: NAMIDA no encontro respuesta, Dale un momento que respire e intentalo de nuevo.' }))
                })
        }
    })

    // Event listner to user ending connection
    ws.on('close', () => {
        console.log('User disconnected.')
    })
}