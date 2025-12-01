import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, DollarSign, Users, TrendingUp, Calendar, Bell, Settings, ArrowLeft, Star, Gift } from "lucide-react"
import { Link } from "react-router-dom"

// Mock donor data
const donorData = {
  name: "John Smith",
  email: "john.smith@email.com",
  totalDonated: 2450,
  campaignsSupported: 8,
  livesImpacted: 5,
  memberSince: "January 2023",
  avatar: "/donor-avatar-john-smith.jpg",
  donationStreak: 12,
}

// Mock donation history
const donationHistory = [
  {
    id: 1,
    campaignName: "Sarah Chen - Heart Surgery",
    patientAge: 34,
    amount: 500,
    date: "2024-01-15",
    status: "completed",
    message: "Praying for Sarah's recovery",
    campaignImage: "/young-woman-smiling-hospital-bed.jpg",
    campaignId: 1,
  },
  {
    id: 2,
    campaignName: "Miguel Rodriguez - Cancer Treatment",
    patientAge: 8,
    amount: 250,
    date: "2024-01-10",
    status: "completed",
    message: "Stay strong little warrior!",
    campaignImage: "/young-boy-child-hospital-treatment.jpg",
    campaignId: 2,
  },
  {
    id: 3,
    campaignName: "Elena Popov - Neurological Treatment",
    patientAge: 67,
    amount: 100,
    date: "2024-01-05",
    status: "completed",
    message: "Hope this helps with treatment",
    campaignImage: "/elderly-woman-grandmother-smiling.jpg",
    campaignId: 3,
  },
  {
    id: 4,
    campaignName: "James Wilson - Kidney Transplant",
    patientAge: 45,
    amount: 750,
    date: "2023-12-28",
    status: "completed",
    message: "Get well soon James",
    campaignImage: "/middle-aged-man-hospital-patient.jpg",
    campaignId: 4,
  },
  {
    id: 5,
    campaignName: "Aisha Patel - Spinal Surgery",
    patientAge: 12,
    amount: 300,
    date: "2023-12-20",
    status: "completed",
    message: "For a bright future ahead",
    campaignImage: "/young-girl-child-smiling-wheelchair.jpg",
    campaignId: 5,
  },
]

// Mock followed campaigns
const followedCampaigns = [
  {
    id: 1,
    name: "Sarah Chen",
    condition: "Heart Surgery",
    progress: 75,
    raised: 90000,
    goal: 120000,
    daysLeft: 30,
    lastUpdate: "Medical consultation scheduled",
    image: "/young-woman-smiling-hospital-bed.jpg",
  },
  {
    id: 2,
    name: "Miguel Rodriguez",
    condition: "Cancer Treatment",
    progress: 82,
    raised: 78000,
    goal: 95000,
    daysLeft: 23,
    lastUpdate: "Started new treatment cycle",
    image: "/young-boy-child-hospital-treatment.jpg",
  },
]

// Mock impact stories
const impactStories = [
  {
    id: 1,
    patientName: "Maria Santos",
    outcome: "Successfully completed surgery and is now cancer-free",
    yourContribution: 200,
    totalRaised: 85000,
    date: "2023-11-15",
    image: "/success-story-maria-santos.jpg",
  },
  {
    id: 2,
    patientName: "David Kim",
    outcome: "Received kidney transplant and is recovering well",
    yourContribution: 500,
    totalRaised: 150000,
    date: "2023-10-22",
    image: "/success-story-david-kim.jpg",
  },
]

export default function DonorDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
              <div className="flex items-center space-x-2">
                <Heart className="h-6 w-6 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">HealFund</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <Avatar className="h-8 w-8">
                <AvatarImage src={donorData.avatar || "/placeholder.svg"} />
                <AvatarFallback>
                  {donorData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={donorData.avatar || "/placeholder.svg"} />
              <AvatarFallback className="text-xl">
                {donorData.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome back, {donorData.name.split(" ")[0]}!</h1>
              <p className="text-gray-600">Member since {donorData.memberSince}</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-2">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">${donorData.totalDonated.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Total Donated</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-2">
                  <Heart className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{donorData.livesImpacted}</div>
                <div className="text-sm text-gray-600">Lives Impacted</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mx-auto mb-2">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{donorData.campaignsSupported}</div>
                <div className="text-sm text-gray-600">Campaigns Supported</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mx-auto mb-2">
                  <TrendingUp className="h-6 w-6 text-orange-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{donorData.donationStreak}</div>
                <div className="text-sm text-gray-600">Month Streak</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="donations">My Donations</TabsTrigger>
            <TabsTrigger value="following">Following</TabsTrigger>
            <TabsTrigger value="impact">Impact Stories</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest donations and campaign updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {donationHistory.slice(0, 3).map((donation) => (
                    <div key={donation.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                      <img
                        src={donation.campaignImage || "/placeholder.svg"}
                        alt={donation.campaignName}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{donation.campaignName}</span>
                          <div className="flex items-center text-green-600 font-semibold">
                            <DollarSign className="h-4 w-4" />
                            {donation.amount}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">{donation.message}</p>
                        <span className="text-xs text-gray-500">{donation.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Button variant="outline" className="w-full bg-transparent" onClick={() => setActiveTab("donations")}>
                    View All Donations
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recommended Campaigns */}
            <Card>
              <CardHeader>
                <CardTitle>Recommended for You</CardTitle>
                <CardDescription>Campaigns that might interest you based on your donation history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <img
                        src="/recommended-campaign-1.jpg"
                        alt="Recommended campaign"
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-medium">Lisa Chen - Brain Surgery</h4>
                        <p className="text-sm text-gray-600">Similar to Sarah's case</p>
                      </div>
                    </div>
                    <Progress value={45} className="mb-2" />
                    <div className="flex justify-between text-sm text-gray-600 mb-3">
                      <span>$45,000 raised</span>
                      <span>$100,000 goal</span>
                    </div>
                    <Button size="sm" className="w-full">
                      View Campaign
                    </Button>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <img
                        src="/recommended-campaign-2.jpg"
                        alt="Recommended campaign"
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-medium">Tommy Williams - Heart Defect</h4>
                        <p className="text-sm text-gray-600">Pediatric case like Miguel</p>
                      </div>
                    </div>
                    <Progress value={67} className="mb-2" />
                    <div className="flex justify-between text-sm text-gray-600 mb-3">
                      <span>$67,000 raised</span>
                      <span>$85,000 goal</span>
                    </div>
                    <Button size="sm" className="w-full">
                      View Campaign
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="donations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Donation History</CardTitle>
                <CardDescription>All your contributions to help save lives</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {donationHistory.map((donation) => (
                    <div key={donation.id} className="border rounded-lg p-4">
                      <div className="flex items-start space-x-4">
                        <img
                          src={donation.campaignImage || "/placeholder.svg"}
                          alt={donation.campaignName}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-medium text-lg">{donation.campaignName}</h4>
                              <p className="text-sm text-gray-600 mb-2">{donation.message}</p>
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <span className="flex items-center">
                                  <Calendar className="h-4 w-4 mr-1" />
                                  {donation.date}
                                </span>
                                <Badge variant="secondary" className="bg-green-100 text-green-800">
                                  {donation.status}
                                </Badge>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-green-600">${donation.amount}</div>
                              <Button variant="outline" size="sm" asChild className="mt-2 bg-transparent">
                                <Link to={`/campaign/${donation.campaignId}`}>View Campaign</Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="following" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Campaigns You're Following</CardTitle>
                <CardDescription>Stay updated on the campaigns you care about</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {followedCampaigns.map((campaign) => (
                    <div key={campaign.id} className="border rounded-lg p-4">
                      <div className="flex items-start space-x-4">
                        <img
                          src={campaign.image || "/placeholder.svg"}
                          alt={campaign.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="font-medium text-lg">{campaign.name}</h4>
                              <p className="text-sm text-gray-600">{campaign.condition}</p>
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-gray-500">{campaign.daysLeft} days left</div>
                            </div>
                          </div>

                          <div className="mb-3">
                            <div className="flex justify-between text-sm mb-1">
                              <span>${campaign.raised.toLocaleString()} raised</span>
                              <span>{campaign.progress}%</span>
                            </div>
                            <Progress value={campaign.progress} className="h-2" />
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-sm text-blue-600">
                              <Bell className="h-4 w-4 mr-1" />
                              {campaign.lastUpdate}
                            </div>
                            <div className="space-x-2">
                              <Button variant="outline" size="sm" asChild>
                                <Link to={`/campaign/${campaign.id}`}>View</Link>
                              </Button>
                              <Button size="sm">Donate</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="impact" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 mr-2" />
                  Your Impact Stories
                </CardTitle>
                <CardDescription>See the lives you've helped change through your generosity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {impactStories.map((story) => (
                    <div key={story.id} className="border rounded-lg p-6 bg-gradient-to-r from-green-50 to-blue-50">
                      <div className="flex items-start space-x-4">
                        <img
                          src={story.image || "/placeholder.svg"}
                          alt={story.patientName}
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="font-semibold text-lg text-gray-900">{story.patientName}</h4>
                              <p className="text-green-700 font-medium">{story.outcome}</p>
                            </div>
                            <Badge className="bg-green-100 text-green-800">Success Story</Badge>
                          </div>

                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="text-center p-3 bg-white rounded-lg">
                              <div className="text-2xl font-bold text-blue-600">${story.yourContribution}</div>
                              <div className="text-sm text-gray-600">Your Contribution</div>
                            </div>
                            <div className="text-center p-3 bg-white rounded-lg">
                              <div className="text-2xl font-bold text-green-600">
                                ${story.totalRaised.toLocaleString()}
                              </div>
                              <div className="text-sm text-gray-600">Total Raised</div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">Completed on {story.date}</span>
                            <div className="flex items-center text-yellow-500">
                              <Gift className="h-4 w-4 mr-1" />
                              <span className="text-sm font-medium">Life Saved</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center mt-8 p-6 bg-blue-50 rounded-lg">
                  <Heart className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Thank You for Making a Difference!</h3>
                  <p className="text-gray-600 mb-4">
                    Your generosity has directly contributed to saving {donorData.livesImpacted} lives. Every donation
                    matters and creates real impact.
                  </p>
                  <Button asChild>
                    <Link to="/campaigns">Continue Helping Others</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
