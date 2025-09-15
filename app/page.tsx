// ...existing code...

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Heart, Users, Shield, ArrowRight, MapPin, Calendar, Target } from "lucide-react"
import Link from "next/link"
// Removed framer-motion import

// Mock data for demonstration
const featuredCampaigns = [
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
    image: "/elderly-woman-grandmother-smiling.jpg",
  },
]

const stats = [
  { label: "Lives Helped", value: "2,847", icon: Heart },
  { label: "Donors", value: "15,234", icon: Users },
  { label: "Funds Raised", value: "$4.2M", icon: Target },
  { label: "Success Rate", value: "94%", icon: Shield },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 via-white to-blue-50 animate-fade-in">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">HealFund</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/campaigns" className="text-gray-600 hover:text-blue-600 transition-colors">
                Browse Campaigns
              </Link>
              <Link href="/how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors">
                How It Works
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors">
                About Us
              </Link>
              <Button variant="outline" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/start-campaign">Start Campaign</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center transition-all duration-700 ease-out translate-y-0 opacity-100">
          <h1 className="text-5xl md:text-6xl font-extrabold text-blue-900 mb-6 text-balance drop-shadow-lg">
            Hope Through <span className="text-blue-600 animate-pulse">Community</span>
          </h1>
          <p className="text-xl text-blue-700 mb-8 max-w-3xl mx-auto text-pretty">
            Connect patients with life-saving treatments to a global community of donors. <span className="bg-gradient-to-r from-pink-400 via-blue-400 to-green-400 bg-clip-text text-transparent font-semibold">Together, we can make advanced healthcare accessible to everyone.</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center transition-transform duration-500 scale-100">
            <Button size="lg" className="text-lg px-8 shadow-lg" asChild>
              <Link href="/campaigns">
                Browse Campaigns <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 bg-white border-blue-600 text-blue-600 shadow-lg" asChild>
              <Link href="/start-campaign">Start Your Campaign</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <stat.icon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Campaigns */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Campaigns</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Meet some of the brave individuals who need our support for life-changing treatments.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCampaigns.map((campaign, idx) => (
              // Replace motion.div with a regular div since framer-motion is removed
              <div
                key={campaign.id}
                style={{
                  opacity: 1,
                  transform: "translateY(0)",
                  transition: `opacity 0.7s ${idx * 0.2}s, transform 0.7s ${idx * 0.2}s`
                }}
              >
                <Card className="overflow-hidden hover:shadow-2xl transition-shadow border-2 border-blue-100 bg-white/90">
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={campaign.image || "/placeholder.svg"}
                      alt={`${campaign.name}'s campaign`}
                      className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-500"
                    />
                    <Badge className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-pink-500 animate-pulse shadow-lg">{campaign.condition}</Badge>
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
                    <CardDescription className="text-pretty text-blue-700 font-medium">{campaign.story}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="font-medium text-blue-900">${campaign.raised.toLocaleString()} raised</span>
                          <span className="text-blue-500">${campaign.goal.toLocaleString()} goal</span>
                        </div>
                        <Progress value={(campaign.raised / campaign.goal) * 100} className="h-2 bg-gradient-to-r from-blue-400 to-pink-400" />
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
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link href="/campaigns">
                View All Campaigns <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How HealFund Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform makes it easy to support patients and access life-saving treatments.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full mb-6 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-4">Create Campaign</h3>
              <p className="text-gray-600">
                Patients or their families create a campaign with medical documentation and treatment details.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full mb-6 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-4">Community Support</h3>
              <p className="text-gray-600">
                Donors browse verified campaigns and contribute to treatments that resonate with them.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full mb-6 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-4">Life-Saving Treatment</h3>
              <p className="text-gray-600">
                Funds are securely transferred to medical providers, enabling access to advanced treatments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="h-6 w-6 text-blue-400" />
                <span className="text-xl font-bold">HealFund</span>
              </div>
              <p className="text-gray-400">
                Connecting patients with life-saving treatments through community support.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">For Patients</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/start-campaign" className="hover:text-white transition-colors">
                    Start Campaign
                  </Link>
                </li>
                <li>
                  <Link href="/resources" className="hover:text-white transition-colors">
                    Resources
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="hover:text-white transition-colors">
                    Get Support
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">For Donors</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/campaigns" className="hover:text-white transition-colors">
                    Browse Campaigns
                  </Link>
                </li>
                <li>
                  <Link href="/impact" className="hover:text-white transition-colors">
                    See Impact
                  </Link>
                </li>
                <li>
                  <Link href="/tax-info" className="hover:text-white transition-colors">
                    Tax Information
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 HealFund. All rights reserved. Helping save lives, one campaign at a time.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
