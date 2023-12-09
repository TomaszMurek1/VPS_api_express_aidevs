import express from 'express';
import OpenAIApi from 'openai';
import openaiConfig from '../config.js'

const router = express.Router();
const openai = new OpenAIApi(openaiConfig);

router.post('/', async (req, res) => {
    try {
      const parsedBody = req.body
        console.log(' test',parsedBody)
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "user",
                content: [
                  {
                    type: "text",
                    text: parsedBody.question,
                  }
                
                ],
              },
            ],
          });
       res.json({ reply: response.choices[0].message.content });

    } catch (e) {
        res.status(400).json({ error: `Invalid request, ${e}` });
    }
});

export default router;