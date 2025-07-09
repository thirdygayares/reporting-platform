import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, TrendingUp, Users, DollarSign } from "lucide-react"
import {FacebookAdsCharts} from "@/components/FacebookAdsCard";
import {GA4Charts} from "@/components/GA4Charts";
import {GSCCharts} from "@/components/GSCCharts";

export default function Home() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
            <div className="container mx-auto p-6 space-y-8">
                {/* Header */}
                <div className="text-center space-y-4">
                    <div className="flex items-center justify-center space-x-2">
                        <BarChart3 className="h-8 w-8 text-primary" />
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
                            Analytics Dashboard
                        </h1>
                    </div>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Centralized reporting platform for Google Analytics 4, Google Search Console, and Meta Ads performance
                        metrics
                    </p>
                </div>

                {/* Quick Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card className="border-l-4 border-l-blue-500">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Data Sources</CardTitle>
                            <BarChart3 className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">3</div>
                            <p className="text-xs text-muted-foreground">GA4, GSC, Meta Ads</p>
                        </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-green-500">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Real-time Updates</CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">5min</div>
                            <p className="text-xs text-muted-foreground">Refresh interval</p>
                        </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-purple-500">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Chart Types</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">12+</div>
                            <p className="text-xs text-muted-foreground">Visualization options</p>
                        </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-orange-500">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">API Status</CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">Live</div>
                            <p className="text-xs text-muted-foreground">All systems operational</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Dashboard Tabs */}
                <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="grid w-full grid-cols-4 h-12">
                        <TabsTrigger value="overview" className="text-sm">
                            📊 Overview
                        </TabsTrigger>
                        <TabsTrigger value="gsc" className="text-sm">
                            🔍 Search Console
                        </TabsTrigger>
                        <TabsTrigger value="ga4" className="text-sm">
                            📈 Analytics
                        </TabsTrigger>
                        <TabsTrigger value="facebook" className="text-sm">
                            📱 Meta Ads
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Dashboard Overview</CardTitle>
                                <CardDescription>Quick insights from all your marketing channels</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                    <div className="space-y-4">
                                        <h3 className="font-semibold text-lg">🔍 Search Performance</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Monitor your organic search visibility, click-through rates, and keyword rankings from Google
                                            Search Console.
                                        </p>
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span>Clicks Tracking</span>
                                                <span className="text-green-600">✓ Active</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span>Position Monitoring</span>
                                                <span className="text-green-600">✓ Active</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="font-semibold text-lg">📈 User Analytics</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Track user behavior, engagement rates, and session data from Google Analytics 4.
                                        </p>
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span>User Tracking</span>
                                                <span className="text-green-600">✓ Active</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span>Engagement Metrics</span>
                                                <span className="text-green-600">✓ Active</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="font-semibold text-lg">📱 Ad Performance</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Monitor your Facebook/Meta advertising campaigns, reach, impressions, and spend efficiency.
                                        </p>
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span>Campaign Tracking</span>
                                                <span className="text-green-600">✓ Active</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span>Cost Analysis</span>
                                                <span className="text-green-600">✓ Active</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="gsc">
                        <GSCCharts />
                    </TabsContent>

                    <TabsContent value="ga4">
                        <GA4Charts />
                    </TabsContent>

                    <TabsContent value="facebook">
                        <FacebookAdsCharts />
                    </TabsContent>
                </Tabs>
            </div>
        </main>
    )
}
