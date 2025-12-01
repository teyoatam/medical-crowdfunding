import { useState } from "react"
import { Link } from "react-router-dom"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Heart,
  Users,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  XCircle,
  MoreHorizontal,
  Search,
  Download,
  Eye,
  Edit,
  Trash2,
  Shield,
  FileText,
  Bell,
  Settings,
  LogOut,
} from "lucide-react"

// Mock admin data
const adminStats = {
  totalCampaigns: 156,
  activeCampaigns: 89,
  totalRaised: 2847500,
  totalDonors: 15234,
  pendingReviews: 12,
  flaggedCampaigns: 3,
  monthlyGrowth: 15.2,
  successRate: 94.3,
}

// Mock campaigns data for admin review
const campaignsData = [
  {
    id: 1,
    patientName: "Sarah Chen",
    age: 34,
    condition: "Rare Heart Condition",
    goal: 120000,
    raised: 45000,
    status: "active",
    priority: "high",
    submittedDate: "2024-01-10",
    lastUpdate: "2024-01-15",
    documentsVerified: true,
    flagged: false,
    donors: 234,
  },
  {
    id: 2,
    patientName: "Miguel Rodriguez",
    age: 8,
    condition: "Pediatric Cancer",
    goal: 95000,
    raised: 78000,
    status: "active",
    priority: "critical",
    submittedDate: "2024-01-08",
    lastUpdate: "2024-01-14",
    documentsVerified: true,
    flagged: false,
    donors: 456,
  },
  {
    id: 3,
    patientName: "John Doe",
    age: 45,
    condition: "Kidney Transplant",
    goal: 150000,
    raised: 0,
    status: "pending",
    priority: "medium",
    submittedDate: "2024-01-16",
    lastUpdate: "2024-01-16",
    documentsVerified: false,
    flagged: true,
    donors: 0,
  },
  {
    id: 4,
    patientName: "Elena Popov",
    age: 67,
    condition: "Neurological Disorder",
    goal: 85000,
    raised: 32000,
    status: "active",
    priority: "medium",
    submittedDate: "2024-01-05",
    lastUpdate: "2024-01-12",
    documentsVerified: true,
    flagged: false,
    donors: 189,
  },
  {
    id: 5,
    patientName: "Lisa Wang",
    age: 29,
    condition: "Brain Surgery",
    goal: 200000,
    raised: 0,
    status: "rejected",
    priority: "high",
    submittedDate: "2024-01-14",
    lastUpdate: "2024-01-15",
    documentsVerified: false,
    flagged: true,
    donors: 0,
  },
]

// Mock users data
const usersData = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@email.com",
    type: "donor",
    joinDate: "2023-01-15",
    totalDonated: 2450,
    campaignsSupported: 8,
    status: "active",
  },
  {
    id: 2,
    name: "Sarah Chen",
    email: "sarah.chen@email.com",
    type: "patient",
    joinDate: "2024-01-10",
    totalDonated: 0,
    campaignsSupported: 0,
    status: "active",
  },
  {
    id: 3,
    name: "Michael Johnson",
    email: "michael.j@email.com",
    type: "donor",
    joinDate: "2023-06-20",
    totalDonated: 1200,
    campaignsSupported: 5,
    status: "active",
  },
]

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")

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

  const filteredCampaigns = campaignsData.filter((campaign) => {
    const matchesSearch =
      campaign.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.condition.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || campaign.status === statusFilter
    const matchesPriority = priorityFilter === "all" || campaign.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-6 w-6 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">HealFund Admin</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/login">
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Dashboard Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Campaigns</p>
                  <p className="text-3xl font-bold text-gray-900">{adminStats.totalCampaigns}</p>
                  <p className="text-sm text-green-600">+{adminStats.monthlyGrowth}% this month</p>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Heart className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Raised</p>
                  <p className="text-3xl font-bold text-gray-900">${(adminStats.totalRaised / 1000000).toFixed(1)}M</p>
                  <p className="text-sm text-green-600">Success rate: {adminStats.successRate}%</p>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Donors</p>
                  <p className="text-3xl font-bold text-gray-900">{adminStats.totalDonors.toLocaleString()}</p>
                  <p className="text-sm text-blue-600">Active community</p>
                </div>
                <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Reviews</p>
                  <p className="text-3xl font-bold text-gray-900">{adminStats.pendingReviews}</p>
                  <p className="text-sm text-orange-600">{adminStats.flaggedCampaigns} flagged</p>
                </div>
                <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="campaigns" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="campaigns" className="space-y-6">
            {/* Campaign Management */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Campaign Management</CardTitle>
                    <CardDescription>Review and manage all medical crowdfunding campaigns</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                    <Button size="sm">Add Campaign</Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Filters */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search campaigns..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Priority</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Campaigns Table */}
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Patient</TableHead>
                        <TableHead>Condition</TableHead>
                        <TableHead>Goal</TableHead>
                        <TableHead>Raised</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Verification</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCampaigns.map((campaign) => (
                        <TableRow key={campaign.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{campaign.patientName}</div>
                              <div className="text-sm text-gray-500">Age {campaign.age}</div>
                            </div>
                          </TableCell>
                          <TableCell>{campaign.condition}</TableCell>
                          <TableCell>${campaign.goal.toLocaleString()}</TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">${campaign.raised.toLocaleString()}</div>
                              <div className="text-sm text-gray-500">{campaign.donors} donors</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(campaign.status)}>
                              {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={getPriorityColor(campaign.priority)}>
                              {campaign.priority.charAt(0).toUpperCase() + campaign.priority.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              {campaign.documentsVerified ? (
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              ) : (
                                <XCircle className="h-4 w-4 text-red-600" />
                              )}
                              {campaign.flagged && <AlertTriangle className="h-4 w-4 text-orange-600" />}
                            </div>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem asChild>
                                  <Link to={`/admin/campaigns/${campaign.id}`}>
                                    <Eye className="h-4 w-4 mr-2" />
                                    View Details
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit Campaign
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <FileText className="h-4 w-4 mr-2" />
                                  Review Documents
                                </DropdownMenuItem>
                                {campaign.status === "pending" && (
                                  <>
                                    <DropdownMenuItem className="text-green-600">
                                      <CheckCircle className="h-4 w-4 mr-2" />
                                      Approve
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-red-600">
                                      <XCircle className="h-4 w-4 mr-2" />
                                      Reject
                                    </DropdownMenuItem>
                                  </>
                                )}
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            {/* User Management */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>Manage donors, patients, and platform users</CardDescription>
                  </div>
                  <Button size="sm">Add User</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Join Date</TableHead>
                        <TableHead>Total Donated</TableHead>
                        <TableHead>Campaigns</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {usersData.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback>
                                  {user.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{user.name}</div>
                                <div className="text-sm text-gray-500">{user.email}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={user.type === "donor" ? "default" : "secondary"}>
                              {user.type.charAt(0).toUpperCase() + user.type.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>{user.joinDate}</TableCell>
                          <TableCell>${user.totalDonated.toLocaleString()}</TableCell>
                          <TableCell>{user.campaignsSupported}</TableCell>
                          <TableCell>
                            <Badge className="bg-green-100 text-green-800">
                              {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit User
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Suspend User
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            {/* Analytics Dashboard */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Campaign Performance</CardTitle>
                  <CardDescription>Success rates and funding metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Success Rate</span>
                      <span className="text-2xl font-bold text-green-600">{adminStats.successRate}%</span>
                    </div>
                    <Progress value={adminStats.successRate} className="h-2" />

                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{adminStats.activeCampaigns}</div>
                        <div className="text-sm text-gray-600">Active Campaigns</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">
                          {adminStats.totalCampaigns - adminStats.activeCampaigns}
                        </div>
                        <div className="text-sm text-gray-600">Completed</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Monthly Growth</CardTitle>
                  <CardDescription>Platform growth metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Growth Rate</span>
                      <span className="text-2xl font-bold text-blue-600">+{adminStats.monthlyGrowth}%</span>
                    </div>
                    <Progress value={adminStats.monthlyGrowth} className="h-2" />

                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">
                          {Math.round(adminStats.totalDonors * 0.12)}
                        </div>
                        <div className="text-sm text-gray-600">New Donors</div>
                      </div>
                      <div className="text-center p-4 bg-orange-50 rounded-lg">
                        <div className="text-2xl font-bold text-orange-600">
                          {Math.round(adminStats.totalCampaigns * 0.08)}
                        </div>
                        <div className="text-sm text-gray-600">New Campaigns</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Financial Overview</CardTitle>
                <CardDescription>Revenue and transaction metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-green-50 rounded-lg">
                    <div className="text-3xl font-bold text-green-600">
                      ${(adminStats.totalRaised / 1000000).toFixed(1)}M
                    </div>
                    <div className="text-sm text-gray-600 mt-2">Total Funds Raised</div>
                  </div>
                  <div className="text-center p-6 bg-blue-50 rounded-lg">
                    <div className="text-3xl font-bold text-blue-600">
                      ${Math.round((adminStats.totalRaised * 0.025) / 1000)}K
                    </div>
                    <div className="text-sm text-gray-600 mt-2">Platform Fees</div>
                  </div>
                  <div className="text-center p-6 bg-purple-50 rounded-lg">
                    <div className="text-3xl font-bold text-purple-600">
                      ${Math.round(adminStats.totalRaised / adminStats.totalDonors)}
                    </div>
                    <div className="text-sm text-gray-600 mt-2">Avg. Donation</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            {/* Platform Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Platform Settings</CardTitle>
                <CardDescription>Configure platform-wide settings and policies</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Campaign Settings</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="auto-approval">Auto-approve verified campaigns</Label>
                        <Switch id="auto-approval" />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="require-docs">Require medical documentation</Label>
                        <Switch id="require-docs" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="max-goal">Maximum campaign goal</Label>
                        <Input className="w-32" placeholder="$500,000" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Security Settings</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="two-factor">Require 2FA for admins</Label>
                        <Switch id="two-factor" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="fraud-detection">Enable fraud detection</Label>
                        <Switch id="fraud-detection" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="audit-logs">Enable audit logging</Label>
                        <Switch id="audit-logs" defaultChecked />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Platform Maintenance</h4>
                      <p className="text-sm text-gray-600">Manage system maintenance and updates</p>
                    </div>
                    <div className="space-x-2">
                      <Button variant="outline">Backup Data</Button>
                      <Button variant="outline">System Health</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
