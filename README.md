# YouTube Transcriber Pro 🎥➡️📝

A professional-grade Node.js/TypeScript CLI application that downloads YouTube videos, extracts audio, and generates accurate transcriptions using Azure Speech Services. Features a modern CLI interface, multiple export formats, and enterprise-ready architecture.

## ✨ Features

### Core Capabilities
- 🎥 Download audio from YouTube videos, shorts, and playlists
- 🔊 High-quality audio extraction with configurable formats
- 📝 Accurate transcription using Azure Speech Services
- 🌍 Multi-language support for transcription
- 📦 Batch processing of multiple videos
- 🔄 Automatic retry logic for failed downloads

### Advanced Features
- 🎨 **Modern CLI Interface**: Interactive mode with beautiful prompts
- 📊 **Multiple Export Formats**: TXT, JSON, SRT, VTT subtitles
- 🚀 **Progress Indicators**: Real-time status updates with spinners
- 📝 **Comprehensive Logging**: Winston-based logging system
- ✅ **Input Validation**: YouTube URL validation and sanitization
- ⚙️ **Flexible Configuration**: Environment variables and config files
- 🐳 **Docker Support**: Containerized deployment ready
- 🔧 **Extensible Architecture**: Easy to add new transcription providers

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- yt-dlp (`pip install yt-dlp`)
- ffmpeg (`brew install ffmpeg` on macOS)
- Azure Speech Services subscription

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/youtube-transcriber.git
cd youtube-transcriber

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your Azure credentials
```

## 💻 Usage

### Interactive Mode (Recommended)

```bash
npm run transcribe --interactive
```

This will guide you through:
- Entering YouTube URLs
- Selecting export formats
- Choosing output options

### Command Line Mode

```bash
# Transcribe a single video
npm run transcribe "https://youtube.com/watch?v=VIDEO_ID"

# Transcribe multiple videos
npm run transcribe "URL1" "URL2" "URL3"

# Download audio only (no transcription)
npm run download "https://youtube.com/watch?v=VIDEO_ID"

# Validate configuration
npm run validate
```

### Advanced Options

```bash
# Custom output directory and formats
npm run transcribe "URL" -- -o ./my-output -f txt,srt,json

# Keep audio files after transcription
npm run transcribe "URL" -- --keep-audio

# Use specific transcription provider
npm run transcribe "URL" -- -p azure
```

## 📁 Project Structure

```
youtube-transcriber/
├── src/
│   ├── cli.ts                 # Main CLI interface
│   ├── config/
│   │   └── config.ts          # Configuration management
│   ├── services/
│   │   ├── downloader.ts      # YouTube download service
│   │   ├── transcriber.ts     # Transcription service
│   │   └── exporter.ts        # Export service (TXT, SRT, etc.)
│   ├── utils/
│   │   ├── logger.ts          # Logging utility
│   │   └── validator.ts       # Input validation
│   └── legacy/
│       ├── yt-vid-to-audio.ts # Legacy downloader
│       └── ytvid.ts           # Legacy transcriber
├── output/                    # Transcription outputs
├── logs/                      # Application logs
├── .env.example              # Environment variables template
├── Dockerfile                # Docker configuration
├── docker-compose.yml        # Docker Compose setup
├── package.json
└── tsconfig.json
```

## ⚙️ Configuration

### Environment Variables

```bash
# Azure Speech Services
AZURE_SPEECH_KEY=your_key_here
AZURE_SPEECH_REGION=westeurope
TRANSCRIPTION_LANGUAGE=en-US

# Output Configuration
OUTPUT_DIR=./output
OUTPUT_FORMATS=txt,json,srt
KEEP_AUDIO=false
KEEP_WAV=false

# Download Settings
AUDIO_QUALITY=best
AUDIO_FORMAT=mp3
DOWNLOAD_RETRIES=3
DOWNLOAD_TIMEOUT=300000

# Logging
LOG_LEVEL=info
LOG_TO_FILE=true
```

## 🐳 Docker Deployment

### Using Docker

```bash
# Build the image
docker build -t youtube-transcriber .

# Run a container
docker run -v $(pwd)/output:/app/output \
  -e AZURE_SPEECH_KEY=your_key \
  youtube-transcriber transcribe "URL"
```

### Using Docker Compose

```bash
# Start the service
docker-compose up

# Transcribe videos
docker-compose run youtube-transcriber transcribe "URL"
```

## 📊 Export Formats

### Text (TXT)
Plain text transcription with metadata header

### JSON
Structured data with metadata, word count, and timestamps

### SRT Subtitles
```
1
00:00:00,000 --> 00:00:03,000
This is the transcribed text

2
00:00:03,000 --> 00:00:06,000
Formatted as subtitles
```

### WebVTT (VTT)
Web-compatible subtitle format for HTML5 video

## 🔧 API Integration (Coming Soon)

```javascript
import { YouTubeTranscriber } from 'youtube-transcriber';

const transcriber = new YouTubeTranscriber({
  azureKey: 'your_key',
  azureRegion: 'westeurope',
});

const result = await transcriber.transcribe('https://youtube.com/watch?v=ID');
console.log(result.transcript);
```

## 🛠️ Development

```bash
# Run in development mode
npm run dev

# Run tests
npm test

# Lint code
npm run lint

# Format code
npm run format

# Build for production
npm run build
```

## 📈 Performance

- **Download Speed**: Utilizes yt-dlp's optimized downloading
- **Retry Logic**: Automatic retry for failed downloads (3 attempts)
- **Batch Processing**: Process multiple videos concurrently
- **Caching**: Reuses downloaded files when available
- **Error Handling**: Comprehensive error handling and logging

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

## 🙏 Acknowledgments

- Built with Azure Speech Services for accurate transcription
- Uses yt-dlp for reliable YouTube downloading
- Inspired by the need for accessible video content

## 📞 Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

**Note**: This project was originally developed as a prototype for a chatbot feature that enables users to ask questions about video content. The transcriptions can be stored with embeddings in a database for semantic search capabilities.