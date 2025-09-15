"use client"

import type React from "react"

import { useState, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Upload, X, CheckCircle, AlertCircle, Eye, Camera } from "lucide-react"

interface ImageUploadProps {
  onImagesChange: (images: File[]) => void
  maxImages?: number
  maxFileSize?: number // in MB
  existingImages?: UploadedImage[]
  className?: string
  aspectRatio?: "square" | "landscape" | "portrait"
}

interface UploadedImage {
  id: string
  name: string
  size: number
  url: string
  uploadProgress?: number
  status: "uploading" | "completed" | "error"
  error?: string
}

export function ImageUpload({
  onImagesChange,
  maxImages = 5,
  maxFileSize = 5,
  existingImages = [],
  className = "",
  aspectRatio = "landscape",
}: ImageUploadProps) {
  const [images, setImages] = useState<UploadedImage[]>(existingImages)
  const [isDragOver, setIsDragOver] = useState(false)
  const [error, setError] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validateImage = (file: File): string | null => {
    // Check file size
    if (file.size > maxFileSize * 1024 * 1024) {
      return `Image size must be less than ${maxFileSize}MB`
    }

    // Check file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
    if (!allowedTypes.includes(file.type)) {
      return "Only JPEG, PNG, and WebP images are allowed"
    }

    return null
  }

  const simulateImageUpload = async (file: File): Promise<UploadedImage> => {
    return new Promise((resolve) => {
      const uploadedImage: UploadedImage = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        url: URL.createObjectURL(file),
        uploadProgress: 0,
        status: "uploading",
      }

      // Simulate upload progress
      const interval = setInterval(() => {
        uploadedImage.uploadProgress = Math.min((uploadedImage.uploadProgress || 0) + 15, 90)
        setImages((prev) => prev.map((img) => (img.id === uploadedImage.id ? { ...uploadedImage } : img)))
      }, 150)

      // Complete upload after 1.5 seconds
      setTimeout(() => {
        clearInterval(interval)
        uploadedImage.uploadProgress = 100
        uploadedImage.status = "completed"
        setImages((prev) => prev.map((img) => (img.id === uploadedImage.id ? { ...uploadedImage } : img)))
        resolve(uploadedImage)
      }, 1500)
    })
  }

  const handleImages = async (newFiles: FileList | File[]) => {
    setError("")
    const fileArray = Array.from(newFiles)

    // Check total image limit
    if (images.length + fileArray.length > maxImages) {
      setError(`Maximum ${maxImages} images allowed`)
      return
    }

    // Validate each image
    for (const file of fileArray) {
      const validationError = validateImage(file)
      if (validationError) {
        setError(validationError)
        return
      }
    }

    // Add images to state and start upload
    const newUploadedImages: UploadedImage[] = fileArray.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      url: URL.createObjectURL(file),
      uploadProgress: 0,
      status: "uploading" as const,
    }))

    setImages((prev) => [...prev, ...newUploadedImages])

    // Simulate upload for each image
    for (let i = 0; i < fileArray.length; i++) {
      try {
        await simulateImageUpload(fileArray[i])
      } catch (error) {
        setImages((prev) =>
          prev.map((img) =>
            img.id === newUploadedImages[i].id ? { ...img, status: "error", error: "Upload failed" } : img,
          ),
        )
      }
    }

    // Notify parent component
    onImagesChange(fileArray)
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
        handleImages(droppedFiles)
      }
    },
    [images.length, maxImages],
  )

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files
    if (selectedFiles && selectedFiles.length > 0) {
      handleImages(selectedFiles)
    }
  }

  const removeImage = (imageId: string) => {
    setImages((prev) => prev.filter((img) => img.id !== imageId))
    // In a real app, you'd also delete from server
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case "square":
        return "aspect-square"
      case "portrait":
        return "aspect-[3/4]"
      default:
        return "aspect-video"
    }
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          isDragOver
            ? "border-blue-500 bg-blue-50"
            : images.length >= maxImages
              ? "border-gray-200 bg-gray-50"
              : "border-gray-300 hover:border-gray-400"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Camera className={`h-10 w-10 mx-auto mb-3 ${isDragOver ? "text-blue-500" : "text-gray-400"}`} />
        <h3 className="text-base font-medium text-gray-900 mb-2">Upload Campaign Images</h3>
        <p className="text-sm text-gray-600 mb-4">
          {images.length >= maxImages ? `Maximum ${maxImages} images reached` : "Add photos to help tell your story"}
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          disabled={images.length >= maxImages}
          className="bg-transparent"
        >
          <Upload className="h-4 w-4 mr-2" />
          Choose Images
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/jpeg,image/jpg,image/png,image/webp"
          onChange={handleImageSelect}
          className="hidden"
          disabled={images.length >= maxImages}
        />
        <p className="text-xs text-gray-500 mt-2">
          JPEG, PNG, WebP • Max {maxFileSize}MB per image • Max {maxImages} images
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Image Grid */}
      {images.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">
            Campaign Images ({images.length}/{maxImages})
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((image) => (
              <div key={image.id} className="relative group">
                <div className={`${getAspectRatioClass()} relative overflow-hidden rounded-lg bg-gray-100`}>
                  <img src={image.url || "/placeholder.svg"} alt={image.name} className="w-full h-full object-cover" />

                  {/* Upload Progress Overlay */}
                  {image.status === "uploading" && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="text-sm font-medium mb-2">Uploading...</div>
                        <Progress value={image.uploadProgress || 0} className="w-20 h-1" />
                      </div>
                    </div>
                  )}

                  {/* Status Indicators */}
                  <div className="absolute top-2 left-2">
                    {image.status === "completed" && (
                      <Badge className="bg-green-600 text-white text-xs">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Uploaded
                      </Badge>
                    )}
                    {image.status === "error" && (
                      <Badge variant="destructive" className="text-xs">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Failed
                      </Badge>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex space-x-1">
                      <Button
                        variant="secondary"
                        size="sm"
                        className="h-8 w-8 p-0 bg-white bg-opacity-90 hover:bg-opacity-100"
                        onClick={() => window.open(image.url, "_blank")}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="h-8 w-8 p-0 bg-white bg-opacity-90 hover:bg-opacity-100 text-red-600 hover:text-red-700"
                        onClick={() => removeImage(image.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Image Info */}
                <div className="mt-2">
                  <p className="text-xs text-gray-600 truncate">{image.name}</p>
                  <p className="text-xs text-gray-500">{formatFileSize(image.size)}</p>
                  {image.status === "error" && image.error && (
                    <p className="text-xs text-red-600 mt-1">{image.error}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Image Guidelines */}
      <div className="bg-blue-50 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">Image Guidelines</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Use high-quality, clear images that tell your story</li>
          <li>• Include photos of the patient (with permission)</li>
          <li>• Show medical facilities, treatments, or relevant context</li>
          <li>• Avoid blurry, dark, or inappropriate images</li>
          <li>• First image will be used as the main campaign photo</li>
        </ul>
      </div>
    </div>
  )
}
