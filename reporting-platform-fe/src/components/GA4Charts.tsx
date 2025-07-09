"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, AreaChart, Area, ComposedChart, Bar } from "recharts"
import { useGA4Data } from "@/hooks/use-analytics-data"
import { Loader2, Users, Activity, UserCheck, Zap } from "lucide-react"

const chartConfig = {
    active_users: {
        label: "Active Users",
        color: "hsl(var(--chart-1))",
    },
    sessions: {
        label: "Sessions",
        color: "hsl(var(--chart-2))",
    },
    engagement_rate: {
        label: "Engagement Rate",
        color: "hsl(var(--chart-3))",
    },
    new_users: {
        label: "New Users",
        color: "hsl(var(--chart-4))",
    },
}

export function GA4Charts() {
    const { data, isLoading, error } = useGA4Data()

    if (isLoading) {
        return (
            <Card className="col-span-full">
                <CardContent className="flex items-center justify-center h-[400px]">
                    <Loader2 className="h-8 w-8 animate-spin" />
                    <span className="ml-2">Loading GA4 data...</span>
                </CardContent>
            </Card>
        )
    }

    if (error) {
        return (
            <Card className="col-span-full">
                <CardContent className="flex items-center justify-center h-[400px]">
                    <p className="text-destructive">Error loading GA4 data</p>
                </CardContent>
            </Card>
        )
    }

    const totalUsers = data?.reduce((sum: number, item: any) => sum + item.active_users, 0) || 0
    const totalSessions = data?.reduce((sum: number, item: any) => sum + item.sessions, 0) || 0
    const totalNewUsers = data?.reduce((sum: number, item: any) => sum + item.new_users, 0) || 0
    const avgEngagement =
        data?.reduce((sum: number, item: any) => sum + item.engagement_rate, 0) / (data?.length || 1) || 0

    return (
        <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalUsers.toLocaleString()}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Sessions</CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalSessions.toLocaleString()}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">New Users</CardTitle>
                        <UserCheck className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalNewUsers.toLocaleString()}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
                        <Zap className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{(avgEngagement * 100).toFixed(1)}%</div>
                    </CardContent>
                </Card>
            </div>

            {/* Charts */}
            <Card>
                <CardHeader>
                    <CardTitle>Google Analytics (GA4)</CardTitle>
                    <CardDescription>User engagement and session analytics</CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="overview" className="w-full">
                        <TabsList className="grid w-full grid-cols-4">
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="users">Users</TabsTrigger>
                            <TabsTrigger value="sessions">Sessions</TabsTrigger>
                            <TabsTrigger value="engagement">Engagement</TabsTrigger>
                        </TabsList>

                        <TabsContent value="overview" className="space-y-4">
                            <ChartContainer config={chartConfig} className="h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <ComposedChart data={data}>
                                        <XAxis dataKey="date" tickLine={false} axisLine={false} className="text-xs" />
                                        <YAxis tickLine={false} axisLine={false} className="text-xs" />
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                        <Bar dataKey="sessions" fill="var(--color-sessions)" radius={[2, 2, 0, 0]} opacity={0.8} />
                                        <Line
                                            type="monotone"
                                            dataKey="active_users"
                                            stroke="var(--color-active_users)"
                                            strokeWidth={3}
                                            dot={false}
                                        />
                                    </ComposedChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                        </TabsContent>

                        <TabsContent value="users">
                            <ChartContainer config={chartConfig} className="h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={data}>
                                        <XAxis dataKey="date" tickLine={false} axisLine={false} className="text-xs" />
                                        <YAxis tickLine={false} axisLine={false} className="text-xs" />
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                        <Area
                                            type="monotone"
                                            dataKey="active_users"
                                            stroke="var(--color-active_users)"
                                            fill="var(--color-active_users)"
                                            fillOpacity={0.3}
                                            stackId="1"
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="new_users"
                                            stroke="var(--color-new_users)"
                                            fill="var(--color-new_users)"
                                            fillOpacity={0.3}
                                            stackId="1"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                        </TabsContent>

                        <TabsContent value="sessions">
                            <ChartContainer config={chartConfig} className="h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={data}>
                                        <XAxis dataKey="date" tickLine={false} axisLine={false} className="text-xs" />
                                        <YAxis tickLine={false} axisLine={false} className="text-xs" />
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                        <Line
                                            type="monotone"
                                            dataKey="sessions"
                                            stroke="var(--color-sessions)"
                                            strokeWidth={3}
                                            dot={{ fill: "var(--color-sessions)", strokeWidth: 2, r: 4 }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                        </TabsContent>

                        <TabsContent value="engagement">
                            <ChartContainer config={chartConfig} className="h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={data}>
                                        <XAxis dataKey="date" tickLine={false} axisLine={false} className="text-xs" />
                                        <YAxis
                                            tickLine={false}
                                            axisLine={false}
                                            className="text-xs"
                                            domain={[0, 1]}
                                            tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
                                        />
                                        <ChartTooltip
                                            content={
                                                <ChartTooltipContent
                                                    formatter={(value: any) => [`${(value * 100).toFixed(1)}%`, "Engagement Rate"]}
                                                />
                                            }
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="engagement_rate"
                                            stroke="var(--color-engagement_rate)"
                                            fill="var(--color-engagement_rate)"
                                            fillOpacity={0.4}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    )
}
