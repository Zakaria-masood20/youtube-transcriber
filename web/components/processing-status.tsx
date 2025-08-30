'use client'

import { useEffect, useState } from 'react'
import { Loader2, CheckCircle, XCircle, Download, FileText, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

export type ProcessingStep = 'validating' | 'downloading' | 'extracting' | 'transcribing' | 'formatting' | 'complete' | 'error'

interface ProcessingStatusProps {
  currentStep: ProcessingStep
  progress?: number
  error?: string
  videoInfo?: {
    title: string
    duration: number
    thumbnail?: string
  }
}

const steps = [
  { id: 'validating', label: 'Validating URL', icon: FileText },
  { id: 'downloading', label: 'Downloading Video', icon: Download },
  { id: 'extracting', label: 'Extracting Audio', icon: FileText },
  { id: 'transcribing', label: 'Transcribing Audio', icon: FileText },
  { id: 'formatting', label: 'Formatting Output', icon: FileText },
]

export function ProcessingStatus({ currentStep, progress = 0, error, videoInfo }: ProcessingStatusProps) {
  const [elapsedTime, setElapsedTime] = useState(0)
  
  useEffect(() => {
    if (currentStep !== 'complete' && currentStep !== 'error') {
      const interval = setInterval(() => {
        setElapsedTime(prev => prev + 1)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [currentStep])
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }
  
  const currentStepIndex = steps.findIndex(s => s.id === currentStep)
  
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-6">
      {videoInfo && (
        <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="flex items-start space-x-4">
            {videoInfo.thumbnail && (
              <img 
                src={videoInfo.thumbnail} 
                alt={videoInfo.title}
                className="w-32 h-20 object-cover rounded-lg"
              />
            )}
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2">
                {videoInfo.title}
              </h3>
              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>Duration: {formatTime(videoInfo.duration)}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>Elapsed: {formatTime(elapsedTime)}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="space-y-4">
        {steps.map((step, index) => {
          const Icon = step.icon
          const isComplete = index < currentStepIndex || currentStep === 'complete'
          const isCurrent = steps[index].id === currentStep
          const isError = currentStep === 'error' && isCurrent
          
          return (
            <div key={step.id} className="flex items-center space-x-4">
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center transition-all",
                isComplete && "bg-green-100 dark:bg-green-900",
                isCurrent && !isError && "bg-blue-100 dark:bg-blue-900 animate-pulse",
                isError && "bg-red-100 dark:bg-red-900",
                !isComplete && !isCurrent && "bg-gray-100 dark:bg-gray-800"
              )}>
                {isComplete ? (
                  <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                ) : isError ? (
                  <XCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
                ) : isCurrent ? (
                  <Loader2 className="w-6 h-6 text-blue-600 dark:text-blue-400 animate-spin" />
                ) : (
                  <Icon className="w-6 h-6 text-gray-400 dark:text-gray-600" />
                )}
              </div>
              
              <div className="flex-1">
                <div className={cn(
                  "font-medium",
                  isComplete && "text-green-600 dark:text-green-400",
                  isCurrent && !isError && "text-blue-600 dark:text-blue-400",
                  isError && "text-red-600 dark:text-red-400",
                  !isComplete && !isCurrent && "text-gray-400 dark:text-gray-600"
                )}>
                  {step.label}
                </div>
                {isCurrent && progress > 0 && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                      <span>Progress</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
      
      {error && (
        <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <div className="flex items-start space-x-3">
            <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
            <div>
              <div className="font-medium text-red-900 dark:text-red-100">
                Processing Error
              </div>
              <div className="text-sm text-red-700 dark:text-red-300 mt-1">
                {error}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {currentStep === 'complete' && (
        <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
            <div className="font-medium text-green-900 dark:text-green-100">
              Transcription completed successfully!
            </div>
          </div>
        </div>
      )}
    </div>
  )
}