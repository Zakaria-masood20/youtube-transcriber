import { NextRequest, NextResponse } from 'next/server'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }

    const videoIdRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
    const match = url.match(videoIdRegex)
    
    if (!match) {
      return NextResponse.json({ 
        valid: false, 
        error: 'Invalid YouTube URL' 
      }, { status: 400 })
    }

    const videoId = match[1]
    
    try {
      const { stdout } = await execAsync(`yt-dlp --get-title --get-duration "https://youtube.com/watch?v=${videoId}"`)
      const [title, duration] = stdout.trim().split('\n')
      
      const durationInSeconds = duration.split(':').reduce((acc, time) => (60 * acc) + +time, 0)
      
      return NextResponse.json({
        valid: true,
        videoId,
        title,
        duration: durationInSeconds,
        url: `https://youtube.com/watch?v=${videoId}`
      })
    } catch (error) {
      return NextResponse.json({
        valid: false,
        error: 'Could not fetch video information. Please check if the video exists and is accessible.'
      }, { status: 400 })
    }
  } catch (error) {
    console.error('Validation error:', error)
    return NextResponse.json(
      { error: 'Failed to validate URL' },
      { status: 500 }
    )
  }
}