

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { FileUpload } from "@/components/file-upload"
import { ImageUpload } from "@/components/image-upload"
import {
  Heart,
  ArrowLeft,
  ArrowRight,
  FileText,
  DollarSign,
  MapPin,
  AlertCircle,
  CheckCircle,
  Info,
} from "lucide-react"
import { Link } from "react-router-dom"

const steps = [
  { id: 1, title: "Basic Information", description: "Tell us about the patient" },
  { id: 2, title: "Medical Details", description: "Provide medical information" },
  { id: 3, title: "Campaign Story", description: "Share your story" },
  { id: 4, title: "Documents", description: "Upload medical documents" },
  { id: 5, title: "Review", description: "Review and submit" },
]

export default function StartCampaignPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Basic Information
    patientName: "",
    patientAge: "",
    relationship: "",
    location: "",
    contactEmail: "",
    contactPhone: "",

    // Medical Details
    condition: "",
    diagnosis: "",
    treatmentNeeded: "",
    hospital: "",
    doctor: "",
    urgency: "",

    // Campaign Story
    title: "",
    story: "",
    goalAmount: "",

    // Documents
    uploadedFiles: [] as File[],
    campaignImages: [] as File[],

    // Agreements
    agreeToTerms: false,
    verifyInformation: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleInputChange = (field: string, value: string | boolean | File[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    setError("")

    try {
      // Here you would implement actual campaign submission logic
      await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulate API call

      // Redirect to success page or campaign page
      window.location.href = "/campaign-submitted"
    } catch (err) {
      setError("An error occurred while submitting your campaign. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="patientName">Patient's Full Name *</Label>
                <Input
                  id="patientName"
                  placeholder="Enter patient's full name"
                  value={formData.patientName}
                  onChange={(e) => handleInputChange("patientName", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="patientAge">Patient's Age *</Label>
                <Input
                  id="patientAge"
                  type="number"
                  placeholder="Age"
                  value={formData.patientAge}
                  onChange={(e) => handleInputChange("patientAge", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="relationship">Your Relationship to Patient *</Label>
              <Select value={formData.relationship} onValueChange={(value) => handleInputChange("relationship", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your relationship" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="self">I am the patient</SelectItem>
                  <SelectItem value="parent">Parent</SelectItem>
                  <SelectItem value="spouse">Spouse/Partner</SelectItem>
                  <SelectItem value="child">Child</SelectItem>
                  <SelectItem value="sibling">Sibling</SelectItem>
                  <SelectItem value="friend">Friend</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="location"
                  placeholder="City, State/Country"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contactEmail">Contact Email *</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.contactEmail}
                  onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactPhone">Contact Phone</Label>
                <Input
                  id="contactPhone"
                  type="tel"
                  placeholder="Phone number"
                  value={formData.contactPhone}
                  onChange={(e) => handleInputChange("contactPhone", e.target.value)}
                />
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="condition">Medical Condition *</Label>
              <Input
                id="condition"
                placeholder="e.g., Rare Heart Condition, Cancer, etc."
                value={formData.condition}
                onChange={(e) => handleInputChange("condition", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="diagnosis">Detailed Diagnosis *</Label>
              <Textarea
                id="diagnosis"
                placeholder="Provide detailed medical diagnosis from your doctor"
                value={formData.diagnosis}
                onChange={(e) => handleInputChange("diagnosis", e.target.value)}
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="treatmentNeeded">Treatment Needed *</Label>
              <Textarea
                id="treatmentNeeded"
                placeholder="Describe the treatment, surgery, or medical care needed"
                value={formData.treatmentNeeded}
                onChange={(e) => handleInputChange("treatmentNeeded", e.target.value)}
                rows={3}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="hospital">Hospital/Medical Center</Label>
                <Input
                  id="hospital"
                  placeholder="Name of hospital or medical center"
                  value={formData.hospital}
                  onChange={(e) => handleInputChange("hospital", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="doctor">Primary Doctor</Label>
                <Input
                  id="doctor"
                  placeholder="Doctor's name"
                  value={formData.doctor}
                  onChange={(e) => handleInputChange("doctor", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="urgency">Urgency Level *</Label>
              <Select value={formData.urgency} onValueChange={(value) => handleInputChange("urgency", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select urgency level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="critical">Critical - Immediate treatment needed</SelectItem>
                  <SelectItem value="high">High - Treatment needed within weeks</SelectItem>
                  <SelectItem value="medium">Medium - Treatment needed within months</SelectItem>
                  <SelectItem value="low">Low - Treatment can be scheduled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Campaign Title *</Label>
              <Input
                id="title"
                placeholder="e.g., Help Sarah Get Life-Saving Heart Surgery"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                required
              />
              <p className="text-xs text-gray-500">Make it compelling and specific</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="story">Your Story *</Label>
              <Textarea
                id="story"
                placeholder="Tell your story... Why do you need help? What treatment is needed? How will donations be used? Share personal details that help donors connect with your situation."
                value={formData.story}
                onChange={(e) => handleInputChange("story", e.target.value)}
                rows={8}
                required
              />
              <p className="text-xs text-gray-500">
                Be honest, detailed, and personal. Explain the medical situation, treatment costs, and how donations
                will help.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="goalAmount">Fundraising Goal *</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="goalAmount"
                  type="number"
                  placeholder="50000"
                  value={formData.goalAmount}
                  onChange={(e) => handleInputChange("goalAmount", e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
              <p className="text-xs text-gray-500">
                Set a realistic goal based on medical costs, travel expenses, and other related costs
              </p>
            </div>

            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                <strong>Tips for a successful campaign:</strong>
                <ul className="mt-2 space-y-1 text-sm">
                  <li>• Be specific about how funds will be used</li>
                  <li>• Include personal details that help donors connect</li>
                  <li>• Explain the urgency and importance of the treatment</li>
                  <li>• Share your hopes and dreams for recovery</li>
                </ul>
              </AlertDescription>
            </Alert>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <Alert>
              <FileText className="h-4 w-4" />
              <AlertDescription>
                <strong>Required Documents:</strong> Please upload medical documents to verify your campaign. This helps
                build trust with donors.
              </AlertDescription>
            </Alert>

            <FileUpload
              onFilesChange={(files) => handleInputChange("uploadedFiles", files)}
              acceptedTypes={[".pdf", ".jpg", ".jpeg", ".png", ".doc", ".docx"]}
              maxFileSize={10}
              maxFiles={5}
              existingFiles={[]}
            />

            <div className="pt-6 border-t">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Campaign Images</h3>
              <ImageUpload
                onImagesChange={(images) => handleInputChange("campaignImages", images)}
                maxImages={5}
                maxFileSize={5}
                aspectRatio="landscape"
              />
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Review Your Campaign</h3>
              <p className="text-gray-600">Please review all information before submitting</p>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Campaign Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Patient:</span> {formData.patientName}, {formData.patientAge}
                    </div>
                    <div>
                      <span className="font-medium">Condition:</span> {formData.condition}
                    </div>
                    <div>
                      <span className="font-medium">Location:</span> {formData.location}
                    </div>
                    <div>
                      <span className="font-medium">Goal:</span> $
                      {Number.parseInt(formData.goalAmount || "0").toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <span className="font-medium">Title:</span> {formData.title}
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="verifyInfo"
                    checked={formData.verifyInformation}
                    onCheckedChange={(checked) => handleInputChange("verifyInformation", checked as boolean)}
                  />
                  <Label htmlFor="verifyInfo" className="text-sm leading-relaxed">
                    I verify that all information provided is accurate and truthful. I understand that providing false
                    information may result in campaign removal and legal consequences.
                  </Label>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="agreeTerms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
                  />
                  <Label htmlFor="agreeTerms" className="text-sm leading-relaxed">
                    I agree to the{" "}
                    <Link to="/terms" className="text-blue-600 hover:text-blue-700">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="text-blue-600 hover:text-blue-700">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>
              </div>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  <strong>What happens next?</strong>
                  <p className="mt-1 text-sm">
                    Your campaign will be reviewed by our team within 24-48 hours. We'll verify your medical documents
                    and contact you if we need additional information. Once approved, your campaign will go live and you
                    can start sharing it with your network.
                  </p>
                </AlertDescription>
              </Alert>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <Heart className="h-6 w-6 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">HealFund</span>
              </Link>
            </div>
            <Button variant="outline" asChild>
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                      currentStep >= step.id
                        ? "bg-blue-600 border-blue-600 text-white"
                        : "border-gray-300 text-gray-500"
                    }`}
                  >
                    {currentStep > step.id ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <span className="text-sm font-medium">{step.id}</span>
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-full h-1 mx-4 ${currentStep > step.id ? "bg-blue-600" : "bg-gray-300"}`} />
                  )}
                </div>
              ))}
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{steps[currentStep - 1].title}</h2>
              <p className="text-gray-600">{steps[currentStep - 1].description}</p>
            </div>
          </div>

          {/* Form Content */}
          <Card>
            <CardContent className="p-8">
              {error && (
                <Alert variant="destructive" className="mb-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {renderStepContent()}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className="bg-transparent"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>

                {currentStep < steps.length ? (
                  <Button onClick={handleNext}>
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={!formData.agreeToTerms || !formData.verifyInformation || isLoading}
                  >
                    {isLoading ? "Submitting..." : "Submit Campaign"}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
