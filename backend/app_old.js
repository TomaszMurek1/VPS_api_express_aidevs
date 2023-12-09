const http= require('http');
const OpenAIApi= require("openai");

// Configure OpenAI SDK with your API key

const openai = new OpenAIApi({
  apiKey: "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"
});

const server = http.createServer(async (req, res) => {
  if (req.url === '/apiown' && req.method === 'POST') {
    let body = '';
console.log('here')
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      try {
        debugger
        const parsedBody = JSON.parse(body);
        console.log('parsedBody', parsedBody);

        // Make a call to OpenAI API using data from the request
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
        console.log(response.choices[0].message)
        console.log(response.choices[0].message.content)

        // Send OpenAI's response as the API response
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ reply: response.choices[0].message.content }));

      } catch (e) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: `Invalid request, ${e}`}));
      }
    });
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});