import express from 'express';
import OpenAIApi from 'openai';
const router = express.Router();
const openai = new OpenAIApi({ apiKey: "apiKey" });

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
        res.json({ reply: req.body });
    } catch (e) {
        res.status(400).json({ error: `Invalid request, ${e}` });
    }
});

export default router;