'use client'

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { UrlInput } from '@/components/url-input'
import { TranscriptionOptions, TranscriptionSettings } from '@/components/transcription-options'
import { ProcessingStatus, ProcessingStep } from '@/components/processing-status'
import { TranscriptionResult } from '@/components/transcription-result'
import { VideoSummary } from '@/components/video-summary'
import { Toaster } from 'react-hot-toast'
import toast from 'react-hot-toast'
import { Sparkles, Zap, Shield, Globe, ChevronRight, Brain } from 'lucide-react'

export default function Home() {
  const [settings, setSettings] = useState<TranscriptionSettings>({
    format: 'txt',
    language: 'en-US',
    quality: 'standard'
  })
  
  const [isProcessing, setIsProcessing] = useState(false)
  const [currentStep, setCurrentStep] = useState<ProcessingStep | null>(null)
  const [progress, setProgress] = useState(0)
  const [transcript, setTranscript] = useState<string | null>(null)
  const [videoInfo, setVideoInfo] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const simulateProgress = (step: ProcessingStep, duration: number) => {
    return new Promise((resolve) => {
      let currentProgress = 0
      const interval = setInterval(() => {
        currentProgress += 10
        setProgress(currentProgress)
        if (currentProgress >= 100) {
          clearInterval(interval)
          resolve(true)
        }
      }, duration / 10)
    })
  }

  const handleTranscribe = async (url: string) => {
    setIsProcessing(true)
    setError(null)
    setTranscript(null)
    setProgress(0)

    try {
      setCurrentStep('validating')
      await simulateProgress('validating', 1000)
      
      const validateResponse = await fetch('/api/validate-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      })
      
      if (!validateResponse.ok) {
        const error = await validateResponse.json()
        throw new Error(error.error || 'Invalid YouTube URL')
      }
      
      const validationData = await validateResponse.json()
      setVideoInfo({
        title: validationData.title,
        duration: validationData.duration,
        videoId: validationData.videoId
      })
      
      setCurrentStep('downloading')
      setProgress(0)
      await simulateProgress('downloading', 3000)
      
      setCurrentStep('extracting')
      setProgress(0)
      await simulateProgress('extracting', 2000)
      
      setCurrentStep('transcribing')
      setProgress(0)
      
      const transcriptionTime = settings.quality === 'fast' ? 2000 : 
                               settings.quality === 'standard' ? 5000 : 8000
      await simulateProgress('transcribing', transcriptionTime)
      
      setCurrentStep('formatting')
      setProgress(0)
      await simulateProgress('formatting', 1000)
      
      const mockTranscript = `This is a sample transcription of the YouTube video "${validationData.title}".

The transcription has been processed with ${settings.quality} quality in ${settings.language} language.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

This is formatted as ${settings.format.toUpperCase()} output.`
      
      setTranscript(mockTranscript)
      setCurrentStep('complete')
      toast.success('Transcription completed successfully!')
      
    } catch (err) {
      setCurrentStep('error')
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred'
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleDownload = () => {
    if (!transcript) return
    
    const blob = new Blob([transcript], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `transcript_${videoInfo?.videoId || 'video'}.${settings.format}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
    toast.success('Download started!')
  }

  const resetForm = () => {
    setTranscript(null)
    setCurrentStep(null)
    setProgress(0)
    setVideoInfo(null)
    setError(null)
  }

  return (
    <>
      <Toaster position="top-right" />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
        <Navbar />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Transform YouTube Videos into
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Text</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Professional transcription service powered by Azure AI. Get accurate transcripts in multiple formats and languages.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
            <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-800">
              <Sparkles className="w-8 h-8 text-yellow-500 mb-2" />
              <h3 className="font-semibold text-gray-900 dark:text-white">AI-Powered</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Advanced speech recognition</p>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-800">
              <Brain className="w-8 h-8 text-purple-500 mb-2" />
              <h3 className="font-semibold text-gray-900 dark:text-white">AI Summary</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Instant video insights</p>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-800">
              <Zap className="w-8 h-8 text-blue-500 mb-2" />
              <h3 className="font-semibold text-gray-900 dark:text-white">Fast Processing</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Quick turnaround times</p>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-800">
              <Shield className="w-8 h-8 text-green-500 mb-2" />
              <h3 className="font-semibold text-gray-900 dark:text-white">Secure & Private</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Your data is protected</p>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-800">
              <Globe className="w-8 h-8 text-indigo-500 mb-2" />
              <h3 className="font-semibold text-gray-900 dark:text-white">Multi-Language</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">10+ languages supported</p>
            </div>
          </div>

          {!currentStep && !transcript ? (
            <div className="space-y-8">
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Start Transcribing
                </h2>
                <UrlInput onSubmit={handleTranscribe} isLoading={isProcessing} />
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Transcription Settings
                </h2>
                <TranscriptionOptions 
                  settings={settings} 
                  onChange={setSettings}
                  disabled={isProcessing}
                />
              </div>
            </div>
          ) : currentStep && currentStep !== 'complete' ? (
            <ProcessingStatus 
              currentStep={currentStep}
              progress={progress}
              error={error || undefined}
              videoInfo={videoInfo}
            />
          ) : transcript ? (
            <div className="space-y-6">
              <VideoSummary 
                transcript={transcript}
                videoTitle={videoInfo?.title}
                videoDuration={videoInfo?.duration}
              />
              
              <TranscriptionResult 
                transcript={transcript}
                format={settings.format}
                videoTitle={videoInfo?.title}
                videoDuration={videoInfo?.duration}
                onDownload={handleDownload}
              />
              
              <div className="flex justify-center">
                <button
                  onClick={resetForm}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all font-medium shadow-lg hover:shadow-xl"
                >
                  <span>Transcribe Another Video</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          ) : null}
        </main>

        <footer className="mt-20 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center text-gray-600 dark:text-gray-400">
              <p>© 2024 YouTube Transcriber Pro. Built with Next.js and Azure AI.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
