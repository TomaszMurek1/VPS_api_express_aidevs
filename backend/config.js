import dotenv from 'dotenv';
dotenv.config();

const config = {
  openaiApiKey: process.env.OPENAI_API_KEY,
};

export default config;