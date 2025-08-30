'use client'

import { useState } from 'react'
import { Sparkles, BookOpen, Hash, Clock, TrendingUp, Users, AlertCircle, ChevronDown, ChevronUp, Brain, Lightbulb, Target } from 'lucide-react'
import { cn } from '@/lib/utils'

interface VideoSummaryProps {
  transcript: string
  videoTitle?: string
  videoDuration?: number
}

interface SummaryData {
  briefOverview: string
  keyPoints: string[]
  topics: string[]
  sentiment: 'positive' | 'neutral' | 'negative' | 'mixed'
  category: string
  targetAudience: string
  mainPurpose: string
  actionableInsights?: string[]
  estimatedReadTime: number
}

export function VideoSummary({ transcript, videoTitle, videoDuration }: VideoSummaryProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [summaryData, setSummaryData] = useState<SummaryData | null>(null)
  const [showFullSummary, setShowFullSummary] = useState(false)
  const [activeTab, setActiveTab] = useState<'overview' | 'insights' | 'details'>('overview')

  const generateSummary = async () => {
    setIsGenerating(true)
    
    // Simulate AI summary generation
    setTimeout(() => {
      const mockSummary: SummaryData = {
        briefOverview: "This video provides a comprehensive introduction to modern web development practices, focusing on React and Next.js frameworks. The speaker discusses best practices for building scalable applications, performance optimization techniques, and the importance of user experience design.",
        keyPoints: [
          "Introduction to React's component-based architecture",
          "Benefits of server-side rendering with Next.js",
          "Performance optimization strategies for web applications",
          "Best practices for responsive design",
          "State management patterns and solutions"
        ],
        topics: ["Web Development", "React", "Next.js", "Performance", "UX Design", "JavaScript"],
        sentiment: 'positive',
        category: "Technology & Education",
        targetAudience: "Web developers and students learning modern frameworks",
        mainPurpose: "Educational content for improving web development skills",
        actionableInsights: [
          "Implement code splitting to improve initial load times",
          "Use React.memo() for performance optimization",
          "Consider server-side rendering for SEO-critical pages",
          "Adopt a mobile-first design approach"
        ],
        estimatedReadTime: Math.ceil(transcript.split(' ').length / 200)
      }
      setSummaryData(mockSummary)
      setIsGenerating(false)
    }, 3000)
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30'
      case 'negative': return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30'
      case 'mixed': return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30'
      default: return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/30'
    }
  }

  if (!summaryData && !isGenerating) {
    return (
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30 rounded-xl p-8 border border-purple-200 dark:border-purple-800">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            AI-Powered Video Summary
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
            Get an instant AI-generated summary of the video content, including key points, topics, and actionable insights.
          </p>
          <button
            onClick={generateSummary}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-medium transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2 mx-auto"
          >
            <Brain className="w-5 h-5" />
            <span>Generate AI Summary</span>
          </button>
        </div>
      </div>
    )
  }

  if (isGenerating) {
    return (
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30 rounded-xl p-8 border border-purple-200 dark:border-purple-800">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full mb-4 animate-pulse">
            <Brain className="w-8 h-8 text-white animate-spin" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Analyzing Video Content...
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Our AI is processing the transcript to generate insights
          </p>
          <div className="mt-6 space-y-2 max-w-md mx-auto">
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse" style={{ width: '70%' }}></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 rounded-lg p-2">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold">AI Video Summary</h3>
              <p className="text-purple-100 text-sm">Intelligent content analysis</p>
            </div>
          </div>
          <button
            onClick={() => setShowFullSummary(!showFullSummary)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            {showFullSummary ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>
        
        <div className="grid grid-cols-4 gap-3 mt-4">
          <div className="bg-white/10 rounded-lg p-2 text-center">
            <Clock className="w-4 h-4 mx-auto mb-1" />
            <div className="text-xs">{summaryData.estimatedReadTime} min read</div>
          </div>
          <div className="bg-white/10 rounded-lg p-2 text-center">
            <Hash className="w-4 h-4 mx-auto mb-1" />
            <div className="text-xs">{summaryData.topics.length} topics</div>
          </div>
          <div className="bg-white/10 rounded-lg p-2 text-center">
            <Target className="w-4 h-4 mx-auto mb-1" />
            <div className="text-xs">{summaryData.keyPoints.length} key points</div>
          </div>
          <div className="bg-white/10 rounded-lg p-2 text-center">
            <TrendingUp className="w-4 h-4 mx-auto mb-1" />
            <div className="text-xs capitalize">{summaryData.sentiment}</div>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex space-x-2 mb-6 border-b border-gray-200 dark:border-gray-700">
          {(['overview', 'insights', 'details'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-4 py-2 font-medium capitalize transition-all relative",
                activeTab === tab
                  ? "text-purple-600 dark:text-purple-400"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              )}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600 dark:bg-purple-400" />
              )}
            </button>
          ))}
        </div>
        
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div>
              <h4 className="flex items-center space-x-2 text-lg font-semibold text-gray-900 dark:text-white mb-3">
                <BookOpen className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <span>Brief Overview</span>
              </h4>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {summaryData.briefOverview}
              </p>
            </div>
            
            {showFullSummary && (
              <>
                <div>
                  <h4 className="flex items-center space-x-2 text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    <Target className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    <span>Key Points</span>
                  </h4>
                  <ul className="space-y-2">
                    {summaryData.keyPoints.map((point, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-purple-600 dark:text-purple-400 mt-1">•</span>
                        <span className="text-gray-700 dark:text-gray-300">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="flex items-center space-x-2 text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    <Hash className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    <span>Topics Covered</span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {summaryData.topics.map((topic, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
        
        {activeTab === 'insights' && (
          <div className="space-y-6">
            <div>
              <h4 className="flex items-center space-x-2 text-lg font-semibold text-gray-900 dark:text-white mb-3">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                <span>Actionable Insights</span>
              </h4>
              {summaryData.actionableInsights && summaryData.actionableInsights.length > 0 ? (
                <ul className="space-y-3">
                  {summaryData.actionableInsights.map((insight, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </span>
                      <span className="text-gray-700 dark:text-gray-300">{insight}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 italic">No specific actionable insights identified</p>
              )}
            </div>
            
            <div>
              <h4 className="flex items-center space-x-2 text-lg font-semibold text-gray-900 dark:text-white mb-3">
                <Target className="w-5 h-5 text-blue-500" />
                <span>Main Purpose</span>
              </h4>
              <p className="text-gray-700 dark:text-gray-300">{summaryData.mainPurpose}</p>
            </div>
          </div>
        )}
        
        {activeTab === 'details' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Category</h4>
                <p className="text-gray-900 dark:text-white font-medium">{summaryData.category}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Sentiment</h4>
                <span className={cn("px-3 py-1 rounded-full text-sm font-medium capitalize", getSentimentColor(summaryData.sentiment))}>
                  {summaryData.sentiment}
                </span>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Target Audience</h4>
                <p className="text-gray-900 dark:text-white">{summaryData.targetAudience}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Estimated Read Time</h4>
                <p className="text-gray-900 dark:text-white">{summaryData.estimatedReadTime} minutes</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}