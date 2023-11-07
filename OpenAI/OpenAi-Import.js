// This code is for v4 of the openai package: npmjs.com/package/openai
import OpenAI from "openai"


const openai = new OpenAI({
apiKey: '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'
})

const response = await openIAClient.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: [
    {
      "role": "system",
      "content": "You are a good and helpful assistant"
    },
    {
      "role": "user",
      "content": "Give me the CSS code for 4 colors that matches the \"calm\" feeling"
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