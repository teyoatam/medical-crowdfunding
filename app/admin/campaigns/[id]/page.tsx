"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  AlertTriangle,
  FileText,
  Download,
  Eye,
  Flag,
  MessageSquare,
  Calendar,
  MapPin,
  DollarSign,
  Users,
  Shield,
} from "lucide-react"
import Link from "next/link"

// Mock campaign data for admin review
const campaignData = {
  id: 1,
  patientName: "Sarah Chen",
  age: 34,
  condition: "Rare Heart Condition",
  location: "San Francisco, CA",
  goal: 120000,
  raised: 45000,
  donors: 234,
  status: "active",
  priority: "high",
  submittedDate: "2024-01-10",
  lastUpdate: "2024-01-15",
  documentsVerified: true,
  flagged: false,
  story:
    "Sarah is a loving mother of two and a dedicated teacher who has been diagnosed with a rare heart condition...",
  medicalDocuments: [
    { name: "Medical_Report_Dr_Johnson.pdf", size: "2.4 MB", uploadDate: "2024-01-10", verified: true },
    { name: "Treatment_Plan_Munich_Hospital.pdf", size: "1.8 MB", uploadDate: "2024-01-10", verified: true },
    { name: "Insurance_Denial_Letter.pdf", size: "0.9 MB", uploadDate: "2024-01-10", verified: true },
    { name: "Cost_Estimate_Surgery.pdf", size: "1.2 MB", uploadDate: "2024-01-10", verified: false },
  ],
  adminNotes: [
    {
      id: 1,
      admin: "Dr. Martinez",
      date: "2024-01-12",
      note: "Medical documentation reviewed and verified. All documents appear authentic and support the medical need.",
      type: "verification",
    },
    {
      id: 2,
      admin: "Admin Johnson",
      date: "2024-01-11",
      note: "Campaign approved for publication. Patient story is compelling and well-documented.",
      type: "approval",
    },
  ],
  flagReports: [],
  recentActivity: [
    { date: "2024-01-15", action: "Campaign update posted", details: "Medical consultation scheduled" },
    { date: "2024-01-14", action: "Large donation received", details: "$1,000 donation from Anonymous" },
    { date: "2024-01-13", action: "Media coverage", details: "Featured in local news story" },
  ],
}

export default function AdminCampaignDetail({ params }: { params: { id: string } }) {
  const [reviewStatus, setReviewStatus] = useState(campaignData.status)
  const [adminNote, setAdminNote] = useState("")
  const [priority, setPriority] = useState(campaignData.priority)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-100 text-red-800"
      case "high":
        return "bg-orange-100 text-orange-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleApprove = () => {
    setReviewStatus("active")
    // Here you would make an API call to approve the campaign
  }

  const handleReject = () => {
    setReviewStatus("rejected")
    // Here you would make an API call to reject the campaign
  }

  const handleAddNote = () => {
    if (adminNote.trim()) {
      // Here you would add the admin note via API
      setAdminNote("")
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
                <Link href="/admin/dashboard">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Link>
              </Button>
              <div className="flex items-center space-x-2">
                <Shield className="h-6 w-6 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">Campaign Review</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Campaign Overview */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl">
                      {campaignData.patientName}, {campaignData.age}
                    </CardTitle>
                    <CardDescription className="text-lg mt-2">{campaignData.condition}</CardDescription>
                    <div className="flex items-center gap-4 text-gray-600 mt-4">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {campaignData.location}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        Submitted {campaignData.submittedDate}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={getStatusColor(reviewStatus)}>
                      {reviewStatus.charAt(0).toUpperCase() + reviewStatus.slice(1)}
                    </Badge>
                    <Badge className={getPriorityColor(priority)}>
                      {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium">${campaignData.raised.toLocaleString()} raised</span>
                      <span className="text-gray-500">${campaignData.goal.toLocaleString()} goal</span>
                    </div>
                    <Progress value={(campaignData.raised / campaignData.goal) * 100} className="h-3" />
                    <div className="flex justify-between text-sm text-gray-600 mt-2">
                      <span>{Math.round((campaignData.raised / campaignData.goal) * 100)}% funded</span>
                      <span>{campaignData.donors} donors</span>
                    </div>
                  </div>

                  <div className="pt-4">
                    <h4 className="font-medium mb-2">Patient Story</h4>
                    <p className="text-gray-700 leading-relaxed">{campaignData.story}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Review Tabs */}
            <Tabs defaultValue="documents" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="notes">Admin Notes</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
              </TabsList>

              <TabsContent value="documents" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="h-5 w-5 mr-2" />
                      Medical Documentation
                    </CardTitle>
                    <CardDescription>Review and verify uploaded medical documents</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {campaignData.medicalDocuments.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <FileText className="h-8 w-8 text-blue-600" />
                            <div>
                              <div className="font-medium">{doc.name}</div>
                              <div className="text-sm text-gray-500">
                                {doc.size} • Uploaded {doc.uploadDate}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            {doc.verified ? (
                              <Badge className="bg-green-100 text-green-800">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Verified
                              </Badge>
                            ) : (
                              <Badge className="bg-yellow-100 text-yellow-800">
                                <AlertTriangle className="h-3 w-3 mr-1" />
                                Pending
                              </Badge>
                            )}
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="activity" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Timeline of campaign activities and updates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {campaignData.recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                          <div className="flex-1">
                            <div className="font-medium">{activity.action}</div>
                            <div className="text-sm text-gray-600">{activity.details}</div>
                            <div className="text-xs text-gray-500 mt-1">{activity.date}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notes" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Admin Notes</CardTitle>
                    <CardDescription>Internal notes and review comments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {campaignData.adminNotes.map((note) => (
                        <div key={note.id} className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">{note.admin}</span>
                            <div className="flex items-center space-x-2">
                              <Badge variant="secondary">{note.type}</Badge>
                              <span className="text-sm text-gray-500">{note.date}</span>
                            </div>
                          </div>
                          <p className="text-gray-700">{note.note}</p>
                        </div>
                      ))}

                      <div className="pt-4 border-t">
                        <Label htmlFor="admin-note" className="text-base font-medium">
                          Add Admin Note
                        </Label>
                        <Textarea
                          id="admin-note"
                          placeholder="Add your review notes here..."
                          value={adminNote}
                          onChange={(e) => setAdminNote(e.target.value)}
                          className="mt-2"
                          rows={3}
                        />
                        <Button onClick={handleAddNote} className="mt-2" disabled={!adminNote.trim()}>
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Add Note
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reports" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Flag className="h-5 w-5 mr-2" />
                      Reports & Flags
                    </CardTitle>
                    <CardDescription>User reports and flagged content</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {campaignData.flagReports.length === 0 ? (
                      <div className="text-center py-8">
                        <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No Reports</h3>
                        <p className="text-gray-600">This campaign has no user reports or flags.</p>
                      </div>
                    ) : (
                      <div className="space-y-4">{/* Reports would be displayed here */}</div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Action Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Review Actions</CardTitle>
                <CardDescription>Approve, reject, or modify this campaign</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="priority-select">Priority Level</Label>
                  <Select value={priority} onValueChange={setPriority}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="critical">Critical</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {reviewStatus === "pending" && (
                  <div className="space-y-2">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button className="w-full">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approve Campaign
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Approve Campaign</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will make the campaign live and visible to donors. Are you sure you want to approve
                            this campaign?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={handleApprove}>Approve</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" className="w-full">
                          <XCircle className="h-4 w-4 mr-2" />
                          Reject Campaign
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Reject Campaign</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will reject the campaign and notify the patient. This action cannot be undone. Are you
                            sure?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={handleReject} className="bg-red-600 hover:bg-red-700">
                            Reject
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                )}

                <Button variant="outline" className="w-full bg-transparent">
                  <Flag className="h-4 w-4 mr-2" />
                  Flag for Review
                </Button>

                <Button variant="outline" className="w-full bg-transparent">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Contact Patient
                </Button>
              </CardContent>
            </Card>

            {/* Campaign Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Campaign Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm">Total Raised</span>
                  </div>
                  <span className="font-medium">${campaignData.raised.toLocaleString()}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 text-blue-600 mr-2" />
                    <span className="text-sm">Donors</span>
                  </div>
                  <span className="font-medium">{campaignData.donors}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-purple-600 mr-2" />
                    <span className="text-sm">Days Active</span>
                  </div>
                  <span className="font-medium">
                    {Math.floor(
                      (new Date().getTime() - new Date(campaignData.submittedDate).getTime()) / (1000 * 60 * 60 * 24),
                    )}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 text-orange-600 mr-2" />
                    <span className="text-sm">Documents</span>
                  </div>
                  <span className="font-medium">
                    {campaignData.medicalDocuments.filter((doc) => doc.verified).length}/
                    {campaignData.medicalDocuments.length} verified
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
