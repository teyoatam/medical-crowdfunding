"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Users, MapPin, Calendar, Search, Filter, ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

// Mock data for campaigns
const allCampaigns = [
  {
    id: 1,
    name: "Sarah Chen",
    age: 34,
    condition: "Rare Heart Condition",
    location: "San Francisco, CA",
    story:
      "Sarah needs specialized cardiac surgery that's only available in Germany. Your support can help save her life.",
    raised: 45000,
    goal: 120000,
    donors: 234,
    daysLeft: 45,
    category: "Heart Disease",
    urgency: "High",
    image: "/young-woman-smiling-hospital-bed.jpg",
  },
  {
    id: 2,
    name: "Miguel Rodriguez",
    age: 8,
    condition: "Pediatric Cancer",
    location: "Phoenix, AZ",
    story:
      "Miguel is a brave 8-year-old fighting leukemia. He needs advanced treatment at a specialized children's hospital.",
    raised: 78000,
    goal: 95000,
    donors: 456,
    daysLeft: 23,
    category: "Cancer",
    urgency: "Critical",
    image: "/young-boy-child-hospital-treatment.jpg",
  },
  {
    id: 3,
    name: "Elena Popov",
    age: 67,
    condition: "Neurological Disorder",
    location: "Miami, FL",
    story:
      "Elena needs experimental treatment for a rare neurological condition. Every donation brings hope to her family.",
    raised: 32000,
    goal: 85000,
    donors: 189,
    daysLeft: 67,
    category: "Neurological",
    urgency: "Medium",
    image: "/elderly-woman-grandmother-smiling.jpg",
  },
  {
    id: 4,
    name: "James Wilson",
    age: 45,
    condition: "Kidney Failure",
    location: "Chicago, IL",
    story: "James needs a kidney transplant and specialized post-operative care. Help him get back to his family.",
    raised: 23000,
    goal: 150000,
    donors: 127,
    daysLeft: 89,
    category: "Organ Transplant",
    urgency: "High",
    image: "/middle-aged-man-hospital-patient.jpg",
  },
  {
    id: 5,
    name: "Aisha Patel",
    age: 12,
    condition: "Spinal Surgery",
    location: "Austin, TX",
    story: "Aisha needs corrective spinal surgery to prevent paralysis. Time is critical for this brave young girl.",
    raised: 67000,
    goal: 110000,
    donors: 298,
    daysLeft: 34,
    category: "Orthopedic",
    urgency: "Critical",
    image: "/young-girl-child-smiling-wheelchair.jpg",
  },
  {
    id: 6,
    name: "Robert Kim",
    age: 58,
    condition: "Rare Blood Disorder",
    location: "Seattle, WA",
    story: "Robert has a rare blood disorder requiring specialized treatment only available in specialized centers.",
    raised: 41000,
    goal: 95000,
    donors: 203,
    daysLeft: 56,
    category: "Blood Disorders",
    urgency: "Medium",
    image: "/asian-man-middle-aged-hospital.jpg",
  },
]

const categories = [
  "All",
  "Cancer",
  "Heart Disease",
  "Neurological",
  "Organ Transplant",
  "Orthopedic",
  "Blood Disorders",
]
const urgencyLevels = ["All", "Critical", "High", "Medium"]

export default function CampaignsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedUrgency, setSelectedUrgency] = useState("All")
  const [sortBy, setSortBy] = useState("recent")

  const filteredCampaigns = allCampaigns.filter((campaign) => {
    const matchesSearch =
      campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.condition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || campaign.category === selectedCategory
    const matchesUrgency = selectedUrgency === "All" || campaign.urgency === selectedUrgency

    return matchesSearch && matchesCategory && matchesUrgency
  })

  type UrgencyType = "Critical" | "High" | "Medium";
  const urgencyOrder: Record<UrgencyType, number> = { Critical: 3, High: 2, Medium: 1 };

  const sortedCampaigns = [...filteredCampaigns].sort((a, b) => {
    switch (sortBy) {
      case "urgent":
        return (urgencyOrder[b.urgency as UrgencyType] ?? 0) - (urgencyOrder[a.urgency as UrgencyType] ?? 0);
      case "progress":
        return b.raised / b.goal - a.raised / a.goal;
      case "goal":
        return b.goal - a.goal;
      default:
        return b.id - a.id; // Most recent first
    }
  });

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
                <Link href="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
              <div className="flex items-center space-x-2">
                <Heart className="h-6 w-6 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">HealFund</span>
              </div>
            </div>
            <Button asChild>
              <Link href="/start-campaign">Start Campaign</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Browse Campaigns</h1>
          <p className="text-xl text-gray-600">Discover patients who need your support for life-changing treatments.</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-5 w-5 text-gray-500" />
            <h2 className="text-lg font-semibold">Filter Campaigns</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search campaigns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedUrgency} onValueChange={setSelectedUrgency}>
              <SelectTrigger>
                <SelectValue placeholder="Urgency" />
              </SelectTrigger>
              <SelectContent>
                {urgencyLevels.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="urgent">Most Urgent</SelectItem>
                <SelectItem value="progress">Most Progress</SelectItem>
                <SelectItem value="goal">Highest Goal</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {sortedCampaigns.length} of {allCampaigns.length} campaigns
          </p>
        </div>

        {/* Campaigns Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedCampaigns.map((campaign, idx) => (
            <motion.div
              key={campaign.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: idx * 0.15 }}
            >
              <Card className="overflow-hidden hover:shadow-2xl transition-shadow border-2 border-blue-100 bg-white/90">
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={campaign.image || "/placeholder.svg"}
                    alt={`${campaign.name}'s campaign`}
                    className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge className="bg-gradient-to-r from-blue-600 to-pink-500 animate-pulse shadow-lg">{campaign.condition}</Badge>
                    <Badge className={getUrgencyColor(campaign.urgency)}>{campaign.urgency}</Badge>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl text-blue-900 font-bold">
                      {campaign.name}, {campaign.age}
                    </CardTitle>
                    <div className="flex items-center text-sm text-blue-600">
                      <MapPin className="h-4 w-4 mr-1" />
                      {campaign.location}
                    </div>
                  </div>
                  <CardDescription className="text-pretty line-clamp-3 text-blue-700 font-medium">{campaign.story}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium text-blue-900">${campaign.raised.toLocaleString()} raised</span>
                        <span className="text-blue-500">${campaign.goal.toLocaleString()} goal</span>
                      </div>
                      <Progress value={(campaign.raised / campaign.goal) * 100} className="h-2 bg-gradient-to-r from-blue-400 to-pink-400" />
                      <div className="text-xs text-blue-500 mt-1">
                        {Math.round((campaign.raised / campaign.goal) * 100)}% funded
                      </div>
                    </div>
                    <div className="flex justify-between text-sm text-blue-700">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {campaign.donors} donors
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {campaign.daysLeft} days left
                      </div>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-pink-500 text-white font-bold shadow-lg hover:scale-105 transition-transform" asChild>
                      <Link href={`/campaign/${campaign.id}`}>View Campaign</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {sortedCampaigns.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No campaigns found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search criteria or browse all campaigns.</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("All")
                setSelectedUrgency("All")
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
