from huggingface_hub import hf_hub_download
import os

# Create a directory to store the model
model_dir = "models"
os.makedirs(model_dir, exist_ok=True)

# Download the GGUF model from Hugging Face
hf_hub_download(
    repo_id="TheBloke/TinyLlama-1.1B-Chat-v1.0-GGUF",
    filename="tinyllama-1.1b-chat-v1.0.Q4_K_M.gguf",
    local_dir=model_dir,
    local_dir_use_symlinks=False
)

print("Model downloaded successfully!")
