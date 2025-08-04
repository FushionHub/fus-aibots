import { HfInference } from '@huggingface/inference';

// Initialize the Hugging Face Inference client
const Hf = new HfInference(process.env.HF_API_TOKEN);

export async function generateImage(prompt: string, style: string, size: string) {
  // Construct a detailed prompt for the model
  // Example: A photorealistic image of a cat sitting on a couch.
  const formattedPrompt = `${style} image of ${prompt}`;

  // Parse the size string "widthxheight" into numbers
  const [width, height] = size.split('x').map(Number);

  const imageBlob = await Hf.imageGeneration({
    model: 'stabilityai/stable-diffusion-2-1', // A popular open-source model
    inputs: formattedPrompt,
    parameters: {
      width,
      height,
      negative_prompt: 'blurry, low quality, bad anatomy', // Help improve quality
    },
  });

  return imageBlob;
}
