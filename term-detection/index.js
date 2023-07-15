const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function askGPTToFindTerm(sentence) {
  const messages = [
    {
      role: 'system',
      content: `Hello! I'm working as an agent specialized in educating people about new concepts. How can I help you?`,
    },
    {
      role: 'user',
      content: `From a sentence, you need to recognize 1 terminology that the audience might find it hardest to understand.
          For instance, you should return ["OpenGL"] given this following sentence: Our graphics API is built on top of OpenGL,
           and can be rendered on multiple device. Now, here's your sentence. Follow the example I gave and give a response.
            Your response should be a single word. Sentence: "${sentence}"`,
    },
  ];
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: messages,
  });
  return response.data.choices[0].message.content;
}

async function askGPTAboutTerm(term) {
  const messages = [
    {
      role: 'system',
      content: `Hello! I'm working as an agent specialized in educating people about new concepts. How can I help you?`,
    },
    {
      role: 'user',
      content: `Here's a formatted example provided to explain the specific term "${term}".

          Term: "OpenGL" (Open Graphics Library);
          Explanation: A list of computing interfaces that allow programmers indirectly operate the graphic card.

          Following the example and format provided above, explain the following terminology to a 9-year-old child in a very short sentence: "AR/VR".
           The explanation part should be limited to around 25 words.`,
    },
  ];
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: messages,
  });
  return response.data.choices[0].message.content;
}

async function askGPT(input) {
  const term = await askGPTToFindTerm(input);
  const explanation = await askGPTAboutTerm(term);
  console.log(explanation);
}

const input =
  'Apple is planning to release a new pair of AR/VR glasses that utilizes video see-through \
   and spatial computing technologies to create an immersive environment for users to do indoor activities.';

askGPT(input);
