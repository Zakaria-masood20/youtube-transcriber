'use client'

import { FileText, FileCode, Film, Globe } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface TranscriptionSettings {
  format: 'txt' | 'json' | 'srt' | 'vtt'
  language: string
  quality: 'fast' | 'standard' | 'premium'
}

interface TranscriptionOptionsProps {
  settings: TranscriptionSettings
  onChange: (settings: TranscriptionSettings) => void
  disabled?: boolean
}

const formats = [
  { value: 'txt', label: 'Text', icon: FileText, description: 'Plain text format' },
  { value: 'json', label: 'JSON', icon: FileCode, description: 'Structured data' },
  { value: 'srt', label: 'SRT', icon: Film, description: 'Subtitle format' },
  { value: 'vtt', label: 'VTT', icon: Film, description: 'Web subtitle format' },
]

const languages = [
  { value: 'en-US', label: 'English (US)', flag: '🇺🇸' },
  { value: 'en-GB', label: 'English (UK)', flag: '🇬🇧' },
  { value: 'es-ES', label: 'Spanish', flag: '🇪🇸' },
  { value: 'fr-FR', label: 'French', flag: '🇫🇷' },
  { value: 'de-DE', label: 'German', flag: '🇩🇪' },
  { value: 'it-IT', label: 'Italian', flag: '🇮🇹' },
  { value: 'pt-BR', label: 'Portuguese', flag: '🇧🇷' },
  { value: 'ja-JP', label: 'Japanese', flag: '🇯🇵' },
  { value: 'ko-KR', label: 'Korean', flag: '🇰🇷' },
  { value: 'zh-CN', label: 'Chinese', flag: '🇨🇳' },
]

const qualities = [
  { 
    value: 'fast', 
    label: 'Fast', 
    description: 'Quick processing',
    time: '~2 min',
    accuracy: '85%'
  },
  { 
    value: 'standard', 
    label: 'Standard', 
    description: 'Balanced speed & accuracy',
    time: '~5 min',
    accuracy: '95%'
  },
  { 
    value: 'premium', 
    label: 'Premium', 
    description: 'Highest accuracy',
    time: '~10 min',
    accuracy: '99%'
  },
]

export function TranscriptionOptions({ settings, onChange, disabled }: TranscriptionOptionsProps) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Output Format
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {formats.map((format) => {
            const Icon = format.icon
            const isSelected = settings.format === format.value
            return (
              <button
                key={format.value}
                onClick={() => onChange({ ...settings, format: format.value as any })}
                disabled={disabled}
                className={cn(
                  "p-4 rounded-lg border-2 transition-all",
                  isSelected
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
                    : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600",
                  disabled && "opacity-50 cursor-not-allowed"
                )}
              >
                <Icon className={cn(
                  "w-6 h-6 mx-auto mb-2",
                  isSelected ? "text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-400"
                )} />
                <div className={cn(
                  "font-medium",
                  isSelected ? "text-blue-900 dark:text-blue-100" : "text-gray-900 dark:text-white"
                )}>
                  {format.label}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {format.description}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Language
        </label>
        <select
          value={settings.language}
          onChange={(e) => onChange({ ...settings, language: e.target.value })}
          disabled={disabled}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {languages.map((lang) => (
            <option key={lang.value} value={lang.value}>
              {lang.flag} {lang.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Processing Quality
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {qualities.map((quality) => {
            const isSelected = settings.quality === quality.value
            return (
              <button
                key={quality.value}
                onClick={() => onChange({ ...settings, quality: quality.value as any })}
                disabled={disabled}
                className={cn(
                  "p-4 rounded-lg border-2 transition-all text-left",
                  isSelected
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
                    : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600",
                  disabled && "opacity-50 cursor-not-allowed"
                )}
              >
                <div className={cn(
                  "font-medium mb-1",
                  isSelected ? "text-blue-900 dark:text-blue-100" : "text-gray-900 dark:text-white"
                )}>
                  {quality.label}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                  <div>{quality.description}</div>
                  <div className="flex justify-between">
                    <span>Time: {quality.time}</span>
                    <span>Accuracy: {quality.accuracy}</span>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}