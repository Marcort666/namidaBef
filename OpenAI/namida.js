import axios from 'axios';
import apiKey from './gpt-3.5-turbo-config.js';

async function generateResponse(input){
  const apiUrl = 'https://api.openai.com/v1/chat/completions';

  try {
    const response = await post(apiUrl, {
      prompt: `Habla como Namida: ${input}`,
      max_tokens: 256,
    }, 
    { headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
    });

    return response.data.choices[0].text;
} catch (error) {
  console.error(error)
  return 'ERROR 404: NAMIDA no encontro respuesta, Dale un momento que respire e intentalo de nuevo.';
}
}

export default {
generateResponse,
}