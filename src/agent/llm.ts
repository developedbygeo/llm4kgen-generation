import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import config from '../config';

export const llm = new ChatGoogleGenerativeAI({
    // model: 'gemini-2.0-flash-exp',
    model: 'gemini-1.5-flash',
    apiKey: config.secrets.GOOGLE_API_KEY,
    temperature: 0.25,
    streaming: true,
});
