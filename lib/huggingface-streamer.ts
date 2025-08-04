import { HuggingFaceStream, StreamingTextResponse } from 'ai';
import { HfInference } from '@huggingface/inference';

// Initialize the Hugging Face Inference client
const Hf = new HfInference(process.env.HF_API_TOKEN);

export async function streamCode(prompt: string, language: string, framework: string) {
  // Construct a detailed prompt for the model
  const formattedPrompt = `
You are an expert programmer specializing in ${language} and the ${framework} framework.
Your task is to provide a high-quality, complete, and well-explained code snippet based on the user's request.

User Request: "${prompt}"

Please generate the code in ${language}. The code should be production-ready, include comments where necessary, and follow best practices.
Do not include any introductory text or pleasantries, just the code block itself.
  `;

  const response = Hf.textGenerationStream({
    model: 'TinyLlama/TinyLlama-1.1B-Chat-v1.0',
    inputs: formattedPrompt,
    parameters: {
      max_new_tokens: 1024,
      temperature: 0.7,
      top_p: 0.95,
      repetition_penalty: 1.2,
      return_full_text: false,
    },
  });

  // Convert the response into a friendly text-stream
  const stream = HuggingFaceStream(response);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}
