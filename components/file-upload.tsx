"use client"

import type React from "react"

import { useState, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Upload, FileText, ImageIcon, X, CheckCircle, AlertCircle, Eye } from "lucide-react"

interface FileUploadProps {
  onFilesChange: (files: File[]) => void
  acceptedTypes?: string[]
  maxFileSize?: number // in MB
  maxFiles?: number
  existingFiles?: UploadedFile[]
  className?: string
}

interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  url?: string
  uploadProgress?: number
  status: "uploading" | "completed" | "error"
  error?: string
}

export function FileUpload({
  onFilesChange,
  acceptedTypes = [".pdf", ".jpg", ".jpeg", ".png", ".doc", ".docx"],
  maxFileSize = 10,
  maxFiles = 5,
  existingFiles = [],
  className = "",
}: FileUploadProps) {
  const [files, setFiles] = useState<UploadedFile[]>(existingFiles)
  const [isDragOver, setIsDragOver] = useState(false)
  const [error, setError] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validateFile = (file: File): string | null => {
    // Check file size
    if (file.size > maxFileSize * 1024 * 1024) {
      return `File size must be less than ${maxFileSize}MB`
    }

    // Check file type
    const fileExtension = "." + file.name.split(".").pop()?.toLowerCase()
    if (!acceptedTypes.includes(fileExtension)) {
      return `File type not supported. Accepted types: ${acceptedTypes.join(", ")}`
    }

    return null
  }

  const simulateUpload = async (file: File): Promise<UploadedFile> => {
    return new Promise((resolve, reject) => {
      const uploadedFile: UploadedFile = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
        uploadProgress: 0,
        status: "uploading",
      }

      // Simulate upload progress
      const interval = setInterval(() => {
        uploadedFile.uploadProgress = Math.min((uploadedFile.uploadProgress || 0) + 10, 90)
        setFiles((prev) => prev.map((f) => (f.id === uploadedFile.id ? { ...uploadedFile } : f)))
      }, 200)

      // Complete upload after 2 seconds
      setTimeout(() => {
        clearInterval(interval)
        uploadedFile.uploadProgress = 100
        uploadedFile.status = "completed"
        uploadedFile.url = URL.createObjectURL(file) // In real app, this would be the server URL
        setFiles((prev) => prev.map((f) => (f.id === uploadedFile.id ? { ...uploadedFile } : f)))
        resolve(uploadedFile)
      }, 2000)
    })
  }

  const handleFiles = async (newFiles: FileList | File[]) => {
    setError("")
    const fileArray = Array.from(newFiles)

    // Check total file limit
    if (files.length + fileArray.length > maxFiles) {
      setError(`Maximum ${maxFiles} files allowed`)
      return
    }

    // Validate each file
    for (const file of fileArray) {
      const validationError = validateFile(file)
      if (validationError) {
        setError(validationError)
        return
      }
    }

    // Add files to state and start upload
    const newUploadedFiles: UploadedFile[] = fileArray.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      uploadProgress: 0,
      status: "uploading" as const,
    }))

    setFiles((prev) => [...prev, ...newUploadedFiles])

    // Simulate upload for each file
    for (let i = 0; i < fileArray.length; i++) {
      try {
        await simulateUpload(fileArray[i])
      } catch (error) {
        setFiles((prev) =>
          prev.map((f) => (f.id === newUploadedFiles[i].id ? { ...f, status: "error", error: "Upload failed" } : f)),
        )
      }
    }

    // Notify parent component
    onFilesChange(fileArray)
  }

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)
      const droppedFiles = e.dataTransfer.files
      if (droppedFiles.length > 0) {
        handleFiles(droppedFiles)
      }
    },
    [files.length, maxFiles],
  )

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files
    if (selectedFiles && selectedFiles.length > 0) {
      handleFiles(selectedFiles)
    }
  }

  const removeFile = (fileId: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== fileId))
    // In a real app, you'd also delete from server
  }

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split(".").pop()?.toLowerCase()
    if (["jpg", "jpeg", "png", "gif"].includes(extension || "")) {
      return <ImageIcon className="h-5 w-5 text-blue-600" />
    }
    return <FileText className="h-5 w-5 text-blue-600" />
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragOver
            ? "border-blue-500 bg-blue-50"
            : files.length >= maxFiles
              ? "border-gray-200 bg-gray-50"
              : "border-gray-300 hover:border-gray-400"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Upload className={`h-12 w-12 mx-auto mb-4 ${isDragOver ? "text-blue-500" : "text-gray-400"}`} />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Medical Documents</h3>
        <p className="text-gray-600 mb-4">
          {files.length >= maxFiles
            ? `Maximum ${maxFiles} files reached`
            : "Drag and drop files here, or click to select files"}
        </p>
        <Button
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={files.length >= maxFiles}
          className="bg-transparent"
        >
          <Upload className="h-4 w-4 mr-2" />
          Choose Files
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedTypes.join(",")}
          onChange={handleFileSelect}
          className="hidden"
          disabled={files.length >= maxFiles}
        />
        <p className="text-xs text-gray-500 mt-2">
          Accepted formats: {acceptedTypes.join(", ")} • Max size: {maxFileSize}MB per file • Max {maxFiles} files
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">
            Uploaded Files ({files.length}/{maxFiles})
          </h4>
          <div className="space-y-2">
            {files.map((file) => (
              <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3 flex-1">
                  {getFileIcon(file.name)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-900 truncate">{file.name}</span>
                      {file.status === "completed" && <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />}
                      {file.status === "error" && <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0" />}
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-gray-500">{formatFileSize(file.size)}</span>
                      {file.status === "uploading" && (
                        <Badge variant="secondary" className="text-xs">
                          Uploading...
                        </Badge>
                      )}
                      {file.status === "completed" && (
                        <Badge className="text-xs bg-green-100 text-green-800">Uploaded</Badge>
                      )}
                      {file.status === "error" && (
                        <Badge variant="destructive" className="text-xs">
                          Failed
                        </Badge>
                      )}
                    </div>
                    {file.status === "uploading" && <Progress value={file.uploadProgress || 0} className="h-1 mt-2" />}
                    {file.status === "error" && file.error && <p className="text-xs text-red-600 mt-1">{file.error}</p>}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {file.status === "completed" && file.url && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(file.url, "_blank")}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(file.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload Guidelines */}
      <div className="bg-blue-50 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">Document Guidelines</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Upload clear, legible copies of all medical documents</li>
          <li>• Include diagnosis reports, treatment plans, and cost estimates</li>
          <li>• Ensure all personal information is visible for verification</li>
          <li>• Documents will be reviewed by our medical verification team</li>
        </ul>
      </div>
    </div>
  )
}
