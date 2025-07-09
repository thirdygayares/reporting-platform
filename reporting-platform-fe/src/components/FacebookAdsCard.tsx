"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from "recharts"
import { useFacebookAdsData } from "@/hooks/use-analytics-data"
import { Loader2, DollarSign, Eye, Users, Repeat } from "lucide-react"

const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))"]

export function FacebookAdsCharts() {
    const { data, isLoading, error } = useFacebookAdsData()

    if (isLoading) {
        return (
            <Card className="col-span-full">
                <CardContent className="flex items-center justify-center h-[400px]">
                    <Loader2 className="h-8 w-8 animate-spin" />
                    <span className="ml-2">Loading Facebook Ads data...</span>
                </CardContent>
            </Card>
        )
    }

    if (error) {
        return (
            <Card className="col-span-full">
                <CardContent className="flex items-center justify-center h-[400px]">
                    <p className="text-destructive">Error loading Facebook Ads data</p>
                </CardContent>
            </Card>
        )
    }

    const pieData = [
        { name: "Reach", value: data?.reach || 0 },
        { name: "Impressions", value: data?.impressions || 0 },
    ]

    const barData = [
        { name: "Reach", value: data?.reach || 0, color: COLORS[0] },
        { name: "Impressions", value: data?.impressions || 0, color: COLORS[1] },
        { name: "Frequency", value: (data?.frequency || 0) * 100, color: COLORS[2] }, // Scale frequency for visibility
    ]

    const cpm = data?.spend && data?.impressions ? (data.spend / data.impressions) * 1000 : 0
    const cpc = data?.spend && data?.reach ? data.spend / data.reach : 0

    return (
        <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Spend</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₱{data?.spend || "0.00"}</div>
                        <p className="text-xs text-muted-foreground">Campaign budget utilization</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Reach</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{data?.reach?.toLocaleString() || "0"}</div>
                        <p className="text-xs text-muted-foreground">Unique users reached</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Impressions</CardTitle>
                        <Eye className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{data?.impressions?.toLocaleString() || "0"}</div>
                        <p className="text-xs text-muted-foreground">Total ad views</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Frequency</CardTitle>
                        <Repeat className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{data?.frequency || "0.00"}</div>
                        <p className="text-xs text-muted-foreground">Avg views per user</p>
                    </CardContent>
                </Card>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium">Cost Per Mille (CPM)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₱{cpm.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground">Cost per 1,000 impressions</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium">Cost Per Click (CPC)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₱{cpc.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground">Average cost per click</p>
                    </CardContent>
                </Card>
            </div>

            {/* Charts */}
            <Card>
                <CardHeader>
                    <CardTitle>Facebook Ads Performance</CardTitle>
                    <CardDescription>Ad campaign metrics and performance analysis</CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="overview" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="reach-impressions">Reach vs Impressions</TabsTrigger>
                            <TabsTrigger value="performance">Performance</TabsTrigger>
                        </TabsList>

                        <TabsContent value="overview" className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <ChartContainer config={{}} className="h-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={pieData}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={60}
                                                outerRadius={100}
                                                paddingAngle={5}
                                                dataKey="value"
                                            >
                                                {pieData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <ChartTooltip
                                                content={({ active, payload }) => {
                                                    if (active && payload && payload.length) {
                                                        return (
                                                            <div className="rounded-lg border bg-background p-2 shadow-sm">
                                                                <div className="grid grid-cols-2 gap-2">
                                                                    <div className="flex flex-col">
                                    <span className="text-[0.70rem] uppercase text-muted-foreground">
                                      {payload[0].name}
                                    </span>
                                                                        <span className="font-bold text-muted-foreground">
                                      {payload[0].value?.toLocaleString()}
                                    </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                    return null
                                                }}
                                            />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </ChartContainer>

                                <div className="space-y-4">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[0] }}></div>
                                        <span className="text-sm">Reach: {data?.reach?.toLocaleString()}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[1] }}></div>
                                        <span className="text-sm">Impressions: {data?.impressions?.toLocaleString()}</span>
                                    </div>
                                    <div className="pt-4 space-y-2">
                                        <p className="text-sm text-muted-foreground">
                                            <strong>Account:</strong> {data?.account_name}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            <strong>Currency:</strong> {data?.account_currency}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="reach-impressions">
                            <ChartContainer config={{}} className="h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                        <XAxis dataKey="name" tickLine={false} axisLine={false} className="text-xs" />
                                        <YAxis tickLine={false} axisLine={false} className="text-xs" />
                                        <ChartTooltip
                                            content={({ active, payload, label }) => {
                                                if (active && payload && payload.length) {
                                                    const value =
                                                        label === "Frequency"
                                                            ? (payload[0].value / 100).toFixed(2)
                                                            : payload[0].value?.toLocaleString()
                                                    return (
                                                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                                                            <div className="grid grid-cols-2 gap-2">
                                                                <div className="flex flex-col">
                                                                    <span className="text-[0.70rem] uppercase text-muted-foreground">{label}</span>
                                                                    <span className="font-bold text-muted-foreground">{value}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                                return null
                                            }}
                                        />
                                        <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                                            {barData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                        </TabsContent>

                        <TabsContent value="performance">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg">Cost Efficiency</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-muted-foreground">CPM (Cost per 1K impressions)</span>
                                            <span className="font-bold">₱{cpm.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-muted-foreground">CPC (Cost per click estimate)</span>
                                            <span className="font-bold">₱{cpc.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-muted-foreground">Reach efficiency</span>
                                            <span className="font-bold">{(data?.reach / data?.spend || 0).toFixed(0)} users/₱</span>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg">Campaign Insights</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-muted-foreground">Impression/Reach Ratio</span>
                                            <span className="font-bold">{(data?.impressions / data?.reach || 0).toFixed(2)}x</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-muted-foreground">Frequency Score</span>
                                            <span className="font-bold">{data?.frequency || "0.00"}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-muted-foreground">Budget Utilization</span>
                                            <span className="font-bold">₱{data?.spend || "0.00"}</span>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    )
}
