# YouTube Video Transcription Service

A Node.js/TypeScript application that downloads YouTube videos, extracts audio, and generates transcriptions using Azure Speech Services. Originally built as a prototype for a chatbot feature that allows users to ask questions about video content.

## Features

- Download audio from YouTube videos using yt-dlp
- Convert audio to WAV format for transcription
- Transcribe audio using Azure Speech Services
- Process multiple YouTube URLs in batch
- Save transcriptions as text files

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- yt-dlp installed globally (`pip install yt-dlp` or `brew install yt-dlp`)
- ffmpeg installed (`brew install ffmpeg` on macOS)
- Azure Speech Services subscription

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd yt_audio
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with your Azure credentials:
```bash
AZURE_SPEECH_KEY=your_azure_speech_key
AZURE_SPEECH_REGION=your_azure_region
```

## Usage

### Single Video Download (yt-vid-to-audio.ts)
Downloads a single YouTube video's audio:
```bash
npm run download
```

### Batch Processing with Transcription (ytvid.ts)
Process multiple YouTube URLs and generate transcriptions:
```bash
npm run transcribe "https://youtube.com/watch?v=VIDEO_ID_1" "https://youtube.com/watch?v=VIDEO_ID_2"
```

## Project Structure

```
yt_audio/
├── src/
│   ├── yt-vid-to-audio.ts  # Simple YouTube audio downloader
│   └── ytvid.ts             # Full transcription pipeline
├── package.json
├── tsconfig.json
└── README.md
```

## How It Works

1. **Download**: Uses yt-dlp to extract audio from YouTube videos in MP3 format
2. **Convert**: Converts MP3 to WAV format using ffmpeg (required for Azure Speech Services)
3. **Transcribe**: Sends audio to Azure Speech Services for transcription
4. **Save**: Stores transcriptions as text files for further processing

## Use Case

This prototype was developed to test a chatbot feature where:
- Users provide YouTube video URLs
- Videos are transcribed and stored with embeddings in a database (Supabase)
- Users can ask questions about the video content
- The chatbot retrieves relevant information using semantic search

## Technologies Used

- **TypeScript/Node.js**: Core application
- **yt-dlp**: YouTube video/audio extraction
- **ffmpeg**: Audio format conversion
- **Azure Speech Services**: Speech-to-text transcription
- **child_process**: Shell command execution

## Future Enhancements

- Add support for more video platforms
- Implement real-time transcription for live streams
- Add support for multiple languages
- Integrate with vector databases for semantic search
- Add REST API endpoints for web integration

## License

MIT

## Note

This is a prototype project. For production use, consider:
- Implementing proper error handling
- Adding rate limiting for API calls
- Using job queues for batch processing
- Implementing caching mechanisms
- Adding authentication and authorization