"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Heart, MapPin, Calendar, Share2, ArrowLeft, DollarSign } from "lucide-react"
import Link from "next/link"

// Mock data for individual campaign
const campaignData = {
  id: 1,
  name: "Sarah Chen",
  age: 34,
  condition: "Rare Heart Condition",
  location: "San Francisco, CA",
  story:
    "Sarah is a loving mother of two and a dedicated teacher who has been diagnosed with a rare heart condition called hypertrophic cardiomyopathy. This condition causes the heart muscle to become abnormally thick, making it harder for the heart to pump blood effectively. Sarah's condition has progressed to a point where she needs specialized cardiac surgery that is only available at a few medical centers in Germany.",
  fullStory:
    "Over the past year, Sarah's symptoms have worsened significantly. She experiences severe shortness of breath, chest pain, and fatigue that prevents her from doing the activities she loves with her children. Local cardiologists have exhausted all treatment options available in the United States, and her only hope for a normal life is a specialized procedure called septal myectomy combined with mitral valve repair, which is pioneered by Dr. Mueller at the Heart Center in Munich, Germany. The total cost including surgery, hospital stay, travel, and recovery is estimated at $120,000. Sarah's insurance will not cover international treatment, leaving her family to find alternative funding. Every donation, no matter the size, brings Sarah one step closer to being the active mother and teacher she dreams of being again.",
  raised: 45000,
  goal: 120000,
  donors: 234,
  daysLeft: 45,
  category: "Heart Disease",
  urgency: "High",
  images: ["/young-woman-smiling-hospital-bed.jpg", "/family-photo-mother-children.jpg", "/medical-documents-heart-condition.jpg"],
  updates: [
    {
      id: 1,
      date: "2024-01-15",
      title: "Medical Consultation Scheduled",
      content:
        "Great news! We've scheduled a video consultation with Dr. Mueller in Munich for next week. Thank you for all your support so far!",
    },
    {
      id: 2,
      date: "2024-01-10",
      title: "Halfway to Our Goal!",
      content:
        "We've reached 50% of our fundraising goal! Sarah is overwhelmed by the generosity and support from everyone. Every donation brings us closer to this life-saving treatment.",
    },
  ],
  recentDonations: [
    { name: "Anonymous", amount: 500, message: "Praying for Sarah's recovery", time: "2 hours ago" },
    { name: "Michael R.", amount: 100, message: "Stay strong Sarah!", time: "5 hours ago" },
    { name: "Jennifer L.", amount: 250, message: "From one teacher to another", time: "1 day ago" },
    { name: "Anonymous", amount: 50, message: "Every little bit helps", time: "1 day ago" },
    { name: "David K.", amount: 1000, message: "Hope this helps with the treatment", time: "2 days ago" },
  ],
}

export default function CampaignDetailPage({ params }: { params: { id: string } }) {
  const [donationAmount, setDonationAmount] = useState("")
  const [donationMessage, setDonationMessage] = useState("")
  const [selectedImage, setSelectedImage] = useState(0)

  const progressPercentage = (campaignData.raised / campaignData.goal) * 100

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "Critical":
        return "bg-red-100 text-red-800"
      case "High":
        return "bg-orange-100 text-orange-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/campaigns">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Campaigns
                </Link>
              </Button>
              <div className="flex items-center space-x-2">
                <Heart className="h-6 w-6 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">HealFund</span>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share Campaign
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Campaign Header */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-3xl mb-2">
                      {campaignData.name}, {campaignData.age}
                    </CardTitle>
                    <div className="flex items-center gap-4 text-gray-600 mb-4">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {campaignData.location}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {campaignData.daysLeft} days left
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Badge className="bg-blue-600">{campaignData.condition}</Badge>
                      <Badge className={getUrgencyColor(campaignData.urgency)}>{campaignData.urgency} Priority</Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Image Gallery */}
            <Card>
              <CardContent className="p-0">
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <img
                    src={campaignData.images[selectedImage] || "/placeholder.svg"}
                    alt={`${campaignData.name}'s campaign image ${selectedImage + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex gap-2 overflow-x-auto">
                    {campaignData.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                          selectedImage === index ? "border-blue-600" : "border-gray-200"
                        }`}
                      >
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Campaign Details Tabs */}
            <Tabs defaultValue="story" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="story">Story</TabsTrigger>
                <TabsTrigger value="updates">Updates</TabsTrigger>
                <TabsTrigger value="donations">Donations</TabsTrigger>
              </TabsList>

              <TabsContent value="story" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Sarah's Story</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed text-pretty">{campaignData.fullStory}</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="updates" className="space-y-4">
                {campaignData.updates.map((update) => (
                  <Card key={update.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{update.title}</CardTitle>
                        <span className="text-sm text-gray-500">{update.date}</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">{update.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="donations" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Donations</CardTitle>
                    <CardDescription>
                      Thank you to all {campaignData.donors} donors who have contributed so far!
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {campaignData.recentDonations.map((donation, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback>{donation.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="font-medium">{donation.name}</span>
                              <div className="flex items-center text-green-600 font-semibold">
                                <DollarSign className="h-4 w-4" />
                                {donation.amount}
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{donation.message}</p>
                            <span className="text-xs text-gray-500">{donation.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Donation Sidebar */}
          <div className="space-y-6">
            {/* Progress Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-center">${campaignData.raised.toLocaleString()}</CardTitle>
                <CardDescription className="text-center">
                  raised of ${campaignData.goal.toLocaleString()} goal
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Progress value={progressPercentage} className="h-3" />
                <div className="text-center text-sm text-gray-600">{Math.round(progressPercentage)}% funded</div>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{campaignData.donors}</div>
                    <div className="text-sm text-gray-600">donors</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-600">{campaignData.daysLeft}</div>
                    <div className="text-sm text-gray-600">days left</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Donation Form */}
            <Card>
              <CardHeader>
                <CardTitle>Make a Donation</CardTitle>
                <CardDescription>
                  Every contribution helps Sarah get closer to her life-saving treatment.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-2">
                  {[25, 50, 100].map((amount) => (
                    <Button
                      key={amount}
                      variant={donationAmount === amount.toString() ? "default" : "outline"}
                      onClick={() => setDonationAmount(amount.toString())}
                      className="text-sm"
                    >
                      ${amount}
                    </Button>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {[250, 500, 1000].map((amount) => (
                    <Button
                      key={amount}
                      variant={donationAmount === amount.toString() ? "default" : "outline"}
                      onClick={() => setDonationAmount(amount.toString())}
                      className="text-sm"
                    >
                      ${amount}
                    </Button>
                  ))}
                </div>

                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Custom amount"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Textarea
                  placeholder="Leave a message of support (optional)"
                  value={donationMessage}
                  onChange={(e) => setDonationMessage(e.target.value)}
                  rows={3}
                />

                <Button className="w-full" size="lg">
                  <Heart className="h-4 w-4 mr-2" />
                  Donate ${donationAmount || "0"}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  Your donation is secure and will go directly to Sarah's medical expenses.
                </p>
              </CardContent>
            </Card>

            {/* Share Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Share This Campaign</CardTitle>
                <CardDescription>Help Sarah by sharing her story with your network.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full bg-transparent">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Campaign
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
