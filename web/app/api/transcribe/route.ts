import { NextRequest, NextResponse } from 'next/server'
import { exec } from 'child_process'
import { promisify } from 'util'
import path from 'path'
import fs from 'fs/promises'

const execAsync = promisify(exec)

export async function POST(request: NextRequest) {
  try {
    const { url, format = 'txt', language = 'en-US' } = await request.json()

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }

    const timestamp = Date.now()
    const outputDir = path.join(process.cwd(), '..', 'src', 'output', timestamp.toString())
    
    await fs.mkdir(outputDir, { recursive: true })

    const transcriptPath = path.join(outputDir, `transcript.${format}`)
    
    const transcribeCommand = `cd .. && npm run transcribe -- "${url}" --output "${outputDir}" --format ${format} --language ${language}`
    
    const { stdout, stderr } = await execAsync(transcribeCommand, {
      cwd: process.cwd(),
      env: {
        ...process.env,
        TRANSCRIPTION_LANGUAGE: language,
        OUTPUT_DIR: outputDir,
        OUTPUT_FORMATS: format
      }
    })

    const transcriptContent = await fs.readFile(transcriptPath, 'utf-8')

    return NextResponse.json({
      success: true,
      transcript: transcriptContent,
      format,
      language,
      outputPath: transcriptPath
    })
  } catch (error) {
    console.error('Transcription error:', error)
    return NextResponse.json(
      { error: 'Failed to transcribe video', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const jobId = searchParams.get('jobId')
  
  if (!jobId) {
    return NextResponse.json({ error: 'Job ID required' }, { status: 400 })
  }

  try {
    const outputPath = path.join(process.cwd(), '..', 'src', 'output', jobId)
    const files = await fs.readdir(outputPath)
    
    const transcripts = await Promise.all(
      files
        .filter(file => file.startsWith('transcript'))
        .map(async (file) => {
          const content = await fs.readFile(path.join(outputPath, file), 'utf-8')
          return {
            format: path.extname(file).slice(1),
            content
          }
        })
    )

    return NextResponse.json({ transcripts })
  } catch (error) {
    return NextResponse.json(
      { error: 'Job not found or still processing' },
      { status: 404 }
    )
  }
}