# Fus AI Model - Multi-AI Platform

A comprehensive AI platform that brings together multiple AI services for content creation, including voiceovers, image generation, video creation, music composition, code generation, and speech processing.

## 🚀 Features

### 🎙️ AI Voiceover
- **Premium Voice Generation**: High-quality text-to-speech with multiple voice options
- **Multiple Providers**: Premium, Standard, and Fast voice generation
- **Customizable Settings**: Adjustable speech speed and voice selection
- **Export Ready**: Download generated audio in MP3 format

### 🖼️ Image Generation
- **AI Image Creation**: Generate stunning images from text descriptions
- **Stock Photo Search**: Search and access Pexels stock photos
- **Multiple Styles**: Photorealistic, artistic, cartoon, abstract, and digital art
- **Custom Dimensions**: Various size options from 512x512 to 1024x768
- **High Quality Output**: Professional-grade image generation

### 🎬 Video Generation
- **AI Video Creation**: Generate videos from text prompts using cutting-edge AI
- **Multiple Qualities**: Standard (480p), HD (720p), and Full HD (1080p)
- **Various Styles**: Realistic, cinematic, animated, and artistic
- **Flexible Duration**: 3 to 15-second video clips
- **Download Support**: Export videos in MP4 format

### 🎵 Music Generation
- **AI Music Composition**: Create original music tracks from text descriptions
- **Multiple Genres**: Ambient, classical, electronic, rock, jazz, pop, and cinematic
- **Flexible Duration**: 15 seconds to 2 minutes
- **Quality Options**: Large, medium, and fast models for different needs
- **Professional Output**: High-quality audio generation

### 💻 Code Generation
- **Multi-Language Support**: JavaScript, TypeScript, Python, PHP, Java, C#, Go, Rust
- **Framework Integration**: React, Vue, Angular, Django, Laravel, and more
- **Smart Code Generation**: Context-aware code creation with best practices
- **Export Functionality**: Download generated code with proper file extensions

### 🎤 Speech Processing
- **Speech-to-Text**: Convert audio files to text with high accuracy
- **Text-to-Speech**: Generate natural-sounding speech from text
- **Multiple Formats**: Support for MP3, WAV, M4A audio files
- **Real-time Processing**: Fast and efficient audio processing

## 🛠️ Technology Stack

- **Frontend**: Next.js 13, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Icons**: Lucide React
- **API Integration**: RESTful APIs for multiple AI services
- **State Management**: React hooks (useState, useEffect)
- **Build Tool**: Next.js with static export support

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd fus-ai-model
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

4. **Configure API keys** (see Configuration section below)

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

## ⚙️ Configuration

### API Keys Setup

The platform supports multiple AI service providers. Configure your API keys in the `.env.local` file:

```env
# AI Service API Keys
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
NEXT_PUBLIC_ELEVEN_LABS_API_KEY=your_eleven_labs_api_key_here
NEXT_PUBLIC_FAI_API_KEY=your_fai_api_key_here
NEXT_PUBLIC_STABILITY_AI_API_KEY=your_stability_ai_api_key_here
NEXT_PUBLIC_REPLICATE_API_KEY=your_replicate_api_key_here
NEXT_PUBLIC_VEO_3_API_KEY=your_veo_3_api_key_here
NEXT_PUBLIC_PEXELS_API_KEY=your_pexels_api_key_here
NEXT_PUBLIC_DEEPSEEK_API_KEY=your_deepseek_api_key_here
NEXT_PUBLIC_LAMIA_API_KEY=your_lamia_api_key_here
```

### Supported AI Services

| Service | Purpose | Models Available |
|---------|---------|------------------|
| **Google Gemini** | Text & Code Generation | gemini-1.5-pro, gemini-1.5-flash, gemini-1.0-pro |
| **Eleven Labs** | Text-to-Speech | eleven_multilingual_v2, eleven_turbo_v2, eleven_monolingual_v1 |
| **FAI** | Fast Voice Generation | fai-premium, fai-standard, fai-fast |
| **Stability AI** | Image Generation | stable-diffusion-xl, stable-diffusion-3, stable-cascade |
| **Google Veo 3** | Video Generation | veo-3-standard, veo-3-premium |
| **Pexels** | Stock Photos | pexels-api-v1 |
| **DeepSeek AI** | Code Generation | deepseek-coder-v2, deepseek-chat-v2 |
| **Lamia AI** | Creative Text | lamia-creative, lamia-standard |
| **Replicate** | Music Generation | musicgen-large, musicgen-medium, riffusion |

## 📱 Usage

### Getting Started

1. **Navigate to the homepage** to see all available AI services
2. **Click on any service** to access its dedicated page
3. **Configure your settings** in the Settings page
4. **Enter your prompts** and generate content
5. **Download or export** your generated content

### Service-Specific Guides

#### Voiceover Generation
1. Enter your text in the text area
2. Select your preferred AI provider and voice
3. Choose speech speed (slow, normal, fast)
4. Click "Generate Voiceover"
5. Play the audio and download when satisfied

#### Image Generation
1. Describe the image you want to create
2. Choose between AI generation or stock photo search
3. Select style and dimensions (for AI generation)
4. Click "Generate Image" or "Search Images"
5. Download the result

#### Video Generation
1. Provide a detailed video description
2. Select duration, quality, and style
3. Click "Generate Video"
4. Preview and download the generated video

#### Music Generation
1. Describe the music style and mood
2. Choose genre, duration, and AI model
3. Click "Generate Music"
4. Listen to the preview and download

#### Code Generation
1. Describe the code functionality you need
2. Select programming language and framework
3. Choose your preferred AI provider
4. Click "Generate Code"
5. Copy or download the generated code

#### Speech Processing
1. **Speech-to-Text**: Upload an audio file and convert to text
2. **Text-to-Speech**: Enter text and generate speech audio
3. Download transcriptions or audio files

## 🎨 Design Features

- **Modern UI/UX**: Clean, professional interface with gradient backgrounds
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark Mode Support**: Automatic theme detection and manual toggle
- **Progress Indicators**: Real-time generation progress tracking
- **Export Functionality**: Download all generated content
- **Settings Management**: Centralized API key and model configuration

## 📁 Project Structure

```
fus-ai-model/
├── app/
│   ├── api/
│   │   └── ai/
│   │       ├── code/
│   │       ├── image/
│   │       ├── music/
│   │       ├── speech-to-text/
│   │       ├── video/
│   │       └── voiceover/
│   ├── code/
│   ├── image/
│   ├── music/
│   ├── settings/
│   ├── speech/
│   ├── video/
│   ├── voiceover/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ai-services/
│   └── ui/
├── lib/
├── public/
├── .env.example
├── next.config.js
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Static Export

The project is configured for static export:

```bash
npm run build
```

The built files will be in the `out/` directory, ready for deployment to any static hosting service.

### Deployment Options

- **Vercel**: Automatic deployment with Git integration
- **Netlify**: Drag and drop or Git-based deployment
- **GitHub Pages**: Static site hosting
- **AWS S3**: Static website hosting
- **Any CDN**: Upload the `out/` folder contents

## 🔒 Security

- **API Key Protection**: All API keys are stored securely in environment variables
- **Client-Side Storage**: Settings are stored locally in the browser
- **No Server-Side Storage**: No user data is stored on servers
- **HTTPS Required**: All API communications use HTTPS

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

**Fus AI Model** was developed by **Jamachi Mauricennadi**, CEO of [FusionHubAI.com.ng](https://fushionhubai.com.ng)

### About the Developer

Jamachi Mauricennadi is a visionary technology leader and the CEO of FusionHubAI, a cutting-edge AI solutions company based in Nigeria. With extensive experience in artificial intelligence, machine learning, and software development, Jamachi has dedicated his career to making advanced AI technologies accessible to businesses and individuals across Africa and beyond.

**Contact Information:**
- **Company**: FusionHubAI
- **Website**: [fushionhubai.com.ng](https://fushionhubai.com.ng)
- **Role**: Chief Executive Officer

### FusionHubAI

FusionHubAI is at the forefront of AI innovation in Nigeria, providing comprehensive AI solutions that empower businesses to leverage the power of artificial intelligence. The company specializes in:

- Custom AI model development
- AI integration services
- Machine learning consulting
- AI-powered application development
- Enterprise AI solutions

## 🆘 Support

For support, feature requests, or bug reports:

1. **GitHub Issues**: Create an issue in this repository
2. **Documentation**: Check this README and inline code comments
3. **Community**: Join our discussions in the Issues section

## 🔄 Updates

Stay updated with the latest features and improvements:

- **Version**: 1.0.0
- **Last Updated**: 2025
- **Next.js Version**: 13.5.1
- **React Version**: 18.2.0

## 🙏 Acknowledgments

- **Next.js Team**: For the amazing React framework
- **Vercel**: For hosting and deployment solutions
- **shadcn/ui**: For beautiful UI components
- **Tailwind CSS**: For utility-first CSS framework
- **Lucide**: For beautiful icons
- **AI Service Providers**: Google, Eleven Labs, Stability AI, and others

---

**Built with ❤️ by Jamachi Mauricennadi | FusionHubAI**

*Empowering creativity through artificial intelligence*
