# YouTube Transcriber Web UI

A modern, professional web interface for the YouTube Transcriber service built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

- 🎨 **Modern UI/UX**: Clean, intuitive interface with smooth animations
- 🌓 **Dark Mode Support**: Toggle between light and dark themes
- 📱 **Fully Responsive**: Works perfectly on desktop, tablet, and mobile
- ⚡ **Real-time Progress**: Live progress tracking for transcription process
- 🌍 **Multi-language**: Support for 10+ languages
- 📥 **Multiple Export Formats**: TXT, JSON, SRT, VTT
- 🔄 **Processing States**: Visual feedback for each processing step
- 🎯 **Quality Settings**: Choose between Fast, Standard, and Premium processing

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Azure Speech Services API credentials (for production)
- yt-dlp and ffmpeg installed on the system (for API endpoints)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env.local
```

3. Edit `.env.local` with your Azure credentials

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Production Build

```bash
npm run build
npm run start
```

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **UI Components**: Radix UI
- **Animations**: Framer Motion
- **Notifications**: React Hot Toast

## Project Structure

```
web/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
├── lib/                   # Utility functions
└── public/               # Static assets
```
