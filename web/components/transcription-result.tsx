'use client'

import { useState } from 'react'
import { Download, Copy, Check, FileText, Share2, Eye, EyeOff } from 'lucide-react'
import { cn } from '@/lib/utils'
import toast from 'react-hot-toast'

interface TranscriptionResultProps {
  transcript: string
  format: string
  videoTitle?: string
  videoDuration?: number
  onDownload: () => void
}

export function TranscriptionResult({ 
  transcript, 
  format, 
  videoTitle,
  videoDuration,
  onDownload 
}: TranscriptionResultProps) {
  const [copied, setCopied] = useState(false)
  const [showFullTranscript, setShowFullTranscript] = useState(false)
  
  const wordCount = transcript.split(/\s+/).length
  const charCount = transcript.length
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(transcript)
      setCopied(true)
      toast.success('Transcript copied to clipboard!')
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast.error('Failed to copy transcript')
    }
  }
  
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: videoTitle || 'YouTube Transcript',
          text: transcript.substring(0, 1000),
        })
      } catch (err) {
        console.log('Share cancelled')
      }
    } else {
      handleCopy()
    }
  }
  
  const previewText = transcript.length > 500 
    ? transcript.substring(0, 500) + '...' 
    : transcript

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">Transcription Complete!</h3>
            {videoTitle && (
              <p className="text-green-100 text-sm">{videoTitle}</p>
            )}
          </div>
          <div className="bg-white/20 rounded-lg p-3">
            <FileText className="w-8 h-8" />
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-2xl font-bold">{wordCount.toLocaleString()}</div>
            <div className="text-xs text-green-100">Words</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-2xl font-bold">{charCount.toLocaleString()}</div>
            <div className="text-xs text-green-100">Characters</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-2xl font-bold uppercase">{format}</div>
            <div className="text-xs text-green-100">Format</div>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
            Transcript Preview
          </h4>
          <button
            onClick={() => setShowFullTranscript(!showFullTranscript)}
            className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            {showFullTranscript ? (
              <>
                <EyeOff className="w-4 h-4" />
                <span>Show Less</span>
              </>
            ) : (
              <>
                <Eye className="w-4 h-4" />
                <span>Show Full</span>
              </>
            )}
          </button>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-6 max-h-96 overflow-y-auto">
          <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-mono">
            {showFullTranscript ? transcript : previewText}
          </pre>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onDownload}
            className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
          >
            <Download className="w-5 h-5" />
            <span>Download {format.toUpperCase()}</span>
          </button>
          
          <button
            onClick={handleCopy}
            className={cn(
              "flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-colors font-medium",
              copied
                ? "bg-green-600 text-white"
                : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
            )}
          >
            {copied ? (
              <>
                <Check className="w-5 h-5" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-5 h-5" />
                <span>Copy to Clipboard</span>
              </>
            )}
          </button>
          
          <button
            onClick={handleShare}
            className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg transition-colors font-medium"
          >
            <Share2 className="w-5 h-5" />
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  )
}