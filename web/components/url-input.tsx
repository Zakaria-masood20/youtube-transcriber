'use client'

import { useState } from 'react'
import { Link, Search, X, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface UrlInputProps {
  onSubmit: (url: string) => void
  isLoading?: boolean
}

export function UrlInput({ onSubmit, isLoading }: UrlInputProps) {
  const [url, setUrl] = useState('')
  const [error, setError] = useState('')

  const validateUrl = (url: string) => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/|v\/)|youtu\.be\/)[\w-]+/
    return youtubeRegex.test(url)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (!url.trim()) {
      setError('Please enter a YouTube URL')
      return
    }
    
    if (!validateUrl(url)) {
      setError('Please enter a valid YouTube URL')
      return
    }
    
    onSubmit(url)
  }

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText()
      setUrl(text)
      setError('')
    } catch (err) {
      setError('Failed to paste from clipboard')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Link className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value)
                setError('')
              }}
              placeholder="Enter YouTube URL (e.g., https://youtube.com/watch?v=...)"
              className={cn(
                "block w-full pl-12 pr-12 py-4 text-base border rounded-xl focus:outline-none focus:ring-2 transition-all",
                error
                  ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 dark:border-gray-700 focus:ring-blue-500 focus:border-blue-500",
                "bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              )}
              disabled={isLoading}
            />
            {url && (
              <button
                type="button"
                onClick={() => {
                  setUrl('')
                  setError('')
                }}
                className="absolute inset-y-0 right-0 pr-4 flex items-center"
              >
                <X className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
              </button>
            )}
          </div>
          
          <button
            type="button"
            onClick={handlePaste}
            className="px-4 py-4 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-medium"
            disabled={isLoading}
          >
            Paste
          </button>
          
          <button
            type="submit"
            disabled={isLoading || !url}
            className={cn(
              "px-6 py-4 rounded-xl font-medium transition-all flex items-center space-x-2",
              isLoading || !url
                ? "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl"
            )}
          >
            <Search className="w-5 h-5" />
            <span>{isLoading ? 'Processing...' : 'Analyze'}</span>
          </button>
        </div>
        
        {error && (
          <div className="mt-2 flex items-center space-x-2 text-red-600 dark:text-red-400">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm">{error}</span>
          </div>
        )}
      </div>
      
      <div className="mt-4 flex items-center justify-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
        <span>Supports:</span>
        <span className="flex items-center space-x-1">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          <span>Videos</span>
        </span>
        <span className="flex items-center space-x-1">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          <span>Shorts</span>
        </span>
        <span className="flex items-center space-x-1">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          <span>Playlists</span>
        </span>
      </div>
    </form>
  )
}