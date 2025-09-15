"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, User, Bell, Shield, CreditCard, ArrowLeft, Camera, Save, Mail, Phone, MapPin } from "lucide-react"
import Link from "next/link"

// Mock user profile data
const profileData = {
  name: "John Smith",
  email: "john.smith@email.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  bio: "Passionate about helping others access life-saving medical treatments. Believe everyone deserves a chance at health and happiness.",
  avatar: "/donor-avatar-john-smith.jpg",
  memberSince: "January 2023",
  preferences: {
    emailNotifications: true,
    smsNotifications: false,
    campaignUpdates: true,
    monthlyNewsletter: true,
    donationReceipts: true,
  },
  privacy: {
    showNameOnDonations: true,
    allowContactFromPatients: true,
    publicProfile: false,
  },
  paymentMethods: [
    {
      id: 1,
      type: "card",
      last4: "4242",
      brand: "Visa",
      isDefault: true,
    },
    {
      id: 2,
      type: "card",
      last4: "8888",
      brand: "Mastercard",
      isDefault: false,
    },
  ],
}

export default function DonorProfile() {
  const [profile, setProfile] = useState(profileData)
  const [isEditing, setIsEditing] = useState(false)

  const handleSave = () => {
    // Here you would save the profile data
    setIsEditing(false)
    // Show success message
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/donor/dashboard">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Link>
              </Button>
              <div className="flex items-center space-x-2">
                <Heart className="h-6 w-6 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">HealFund</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile Settings</h1>
            <p className="text-gray-600">Manage your account information and preferences</p>
          </div>

          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="privacy">Privacy</TabsTrigger>
              <TabsTrigger value="payment">Payment</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center">
                        <User className="h-5 w-5 mr-2" />
                        Personal Information
                      </CardTitle>
                      <CardDescription>Update your personal details and profile information</CardDescription>
                    </div>
                    <Button
                      variant={isEditing ? "default" : "outline"}
                      onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                    >
                      {isEditing ? (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </>
                      ) : (
                        "Edit Profile"
                      )}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Avatar Section */}
                  <div className="flex items-center space-x-6">
                    <div className="relative">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src={profile.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="text-2xl">
                          {profile.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {isEditing && (
                        <Button size="sm" className="absolute -bottom-2 -right-2 rounded-full h-8 w-8 p-0">
                          <Camera className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{profile.name}</h3>
                      <p className="text-gray-600">Member since {profile.memberSince}</p>
                      {isEditing && (
                        <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                          Change Photo
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="email"
                          type="email"
                          value={profile.email}
                          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                          disabled={!isEditing}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="phone"
                          value={profile.phone}
                          onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                          disabled={!isEditing}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="location"
                          value={profile.location}
                          onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                          disabled={!isEditing}
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={profile.bio}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                      disabled={!isEditing}
                      rows={4}
                      placeholder="Tell us a bit about yourself and why you support medical crowdfunding..."
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bell className="h-5 w-5 mr-2" />
                    Notification Preferences
                  </CardTitle>
                  <CardDescription>
                    Choose how you want to be notified about campaign updates and activities
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email-notifications" className="text-base font-medium">
                          Email Notifications
                        </Label>
                        <p className="text-sm text-gray-600">Receive updates via email</p>
                      </div>
                      <Switch
                        id="email-notifications"
                        checked={profile.preferences.emailNotifications}
                        onCheckedChange={(checked) =>
                          setProfile({
                            ...profile,
                            preferences: { ...profile.preferences, emailNotifications: checked },
                          })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="sms-notifications" className="text-base font-medium">
                          SMS Notifications
                        </Label>
                        <p className="text-sm text-gray-600">Receive urgent updates via text message</p>
                      </div>
                      <Switch
                        id="sms-notifications"
                        checked={profile.preferences.smsNotifications}
                        onCheckedChange={(checked) =>
                          setProfile({
                            ...profile,
                            preferences: { ...profile.preferences, smsNotifications: checked },
                          })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="campaign-updates" className="text-base font-medium">
                          Campaign Updates
                        </Label>
                        <p className="text-sm text-gray-600">Get notified when campaigns you support post updates</p>
                      </div>
                      <Switch
                        id="campaign-updates"
                        checked={profile.preferences.campaignUpdates}
                        onCheckedChange={(checked) =>
                          setProfile({
                            ...profile,
                            preferences: { ...profile.preferences, campaignUpdates: checked },
                          })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="monthly-newsletter" className="text-base font-medium">
                          Monthly Newsletter
                        </Label>
                        <p className="text-sm text-gray-600">
                          Receive our monthly impact report and featured campaigns
                        </p>
                      </div>
                      <Switch
                        id="monthly-newsletter"
                        checked={profile.preferences.monthlyNewsletter}
                        onCheckedChange={(checked) =>
                          setProfile({
                            ...profile,
                            preferences: { ...profile.preferences, monthlyNewsletter: checked },
                          })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="donation-receipts" className="text-base font-medium">
                          Donation Receipts
                        </Label>
                        <p className="text-sm text-gray-600">Automatically receive receipts for tax purposes</p>
                      </div>
                      <Switch
                        id="donation-receipts"
                        checked={profile.preferences.donationReceipts}
                        onCheckedChange={(checked) =>
                          setProfile({
                            ...profile,
                            preferences: { ...profile.preferences, donationReceipts: checked },
                          })
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="privacy" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="h-5 w-5 mr-2" />
                    Privacy Settings
                  </CardTitle>
                  <CardDescription>Control your privacy and how your information is displayed</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="show-name" className="text-base font-medium">
                          Show Name on Donations
                        </Label>
                        <p className="text-sm text-gray-600">Display your name when you make donations</p>
                      </div>
                      <Switch
                        id="show-name"
                        checked={profile.privacy.showNameOnDonations}
                        onCheckedChange={(checked) =>
                          setProfile({
                            ...profile,
                            privacy: { ...profile.privacy, showNameOnDonations: checked },
                          })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="allow-contact" className="text-base font-medium">
                          Allow Contact from Patients
                        </Label>
                        <p className="text-sm text-gray-600">Let patients send you thank you messages</p>
                      </div>
                      <Switch
                        id="allow-contact"
                        checked={profile.privacy.allowContactFromPatients}
                        onCheckedChange={(checked) =>
                          setProfile({
                            ...profile,
                            privacy: { ...profile.privacy, allowContactFromPatients: checked },
                          })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="public-profile" className="text-base font-medium">
                          Public Profile
                        </Label>
                        <p className="text-sm text-gray-600">Make your donor profile visible to other users</p>
                      </div>
                      <Switch
                        id="public-profile"
                        checked={profile.privacy.publicProfile}
                        onCheckedChange={(checked) =>
                          setProfile({
                            ...profile,
                            privacy: { ...profile.privacy, publicProfile: checked },
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="pt-6 border-t">
                    <h4 className="font-medium mb-4">Data & Account</h4>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        Download My Data
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-red-600 hover:text-red-700 bg-transparent"
                      >
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payment" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Payment Methods
                  </CardTitle>
                  <CardDescription>Manage your saved payment methods for faster donations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    {profile.paymentMethods.map((method) => (
                      <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                            <CreditCard className="h-4 w-4 text-gray-600" />
                          </div>
                          <div>
                            <div className="font-medium">
                              {method.brand} ending in {method.last4}
                            </div>
                            {method.isDefault && <span className="text-sm text-blue-600">Default payment method</span>}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {!method.isDefault && (
                            <Button variant="outline" size="sm">
                              Set as Default
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700 bg-transparent"
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Button className="w-full">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Add New Payment Method
                  </Button>

                  <div className="pt-6 border-t">
                    <h4 className="font-medium mb-4">Donation Settings</h4>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="default-amount">Default Donation Amount</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select default amount" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="25">$25</SelectItem>
                            <SelectItem value="50">$50</SelectItem>
                            <SelectItem value="100">$100</SelectItem>
                            <SelectItem value="250">$250</SelectItem>
                            <SelectItem value="custom">Custom Amount</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
