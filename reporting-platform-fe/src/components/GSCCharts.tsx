"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from "recharts"
import { useGSCData } from "@/hooks/use-analytics-data"
import { Loader2, TrendingUp, MousePointer, Eye, Target } from "lucide-react"

const chartConfig = {
    clicks: {
        label: "Clicks",
        color: "hsl(var(--chart-1))",
    },
    impressions: {
        label: "Impressions",
        color: "hsl(var(--chart-2))",
    },
    position: {
        label: "Position",
        color: "hsl(var(--chart-3))",
    },
    ctr: {
        label: "CTR",
        color: "hsl(var(--chart-4))",
    },
}

export function GSCCharts() {
    const { data, isLoading, error } = useGSCData()

    if (isLoading) {
        return (
            <Card className="col-span-full">
                <CardContent className="flex items-center justify-center h-[400px]">
                    <Loader2 className="h-8 w-8 animate-spin" />
                    <span className="ml-2">Loading GSC data...</span>
                </CardContent>
            </Card>
        )
    }

    if (error) {
        return (
            <Card className="col-span-full">
                <CardContent className="flex items-center justify-center h-[400px]">
                    <p className="text-destructive">Error loading GSC data</p>
                </CardContent>
            </Card>
        )
    }

    const totalClicks = data?.reduce((sum: number, item: any) => sum + item.clicks, 0) || 0
    const totalImpressions = data?.reduce((sum: number, item: any) => sum + item.impressions, 0) || 0
    const avgPosition = data?.reduce((sum: number, item: any) => sum + item.position, 0) / (data?.length || 1) || 0
    const avgCTR = data?.reduce((sum: number, item: any) => sum + item.ctr, 0) / (data?.length || 1) || 0

    return (
        <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
                        <MousePointer className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalClicks.toLocaleString()}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Impressions</CardTitle>
                        <Eye className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalImpressions.toLocaleString()}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Avg Position</CardTitle>
                        <Target className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{avgPosition.toFixed(1)}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Avg CTR</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{(avgCTR * 100).toFixed(2)}%</div>
                    </CardContent>
                </Card>
            </div>

            {/* Charts */}
            <Card>
                <CardHeader>
                    <CardTitle>Google Search Console Analytics</CardTitle>
                    <CardDescription>Search performance metrics over time</CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="overview" className="w-full">
                        <TabsList className="grid w-full grid-cols-4">
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="clicks">Clicks</TabsTrigger>
                            <TabsTrigger value="impressions">Impressions</TabsTrigger>
                            <TabsTrigger value="position">Position</TabsTrigger>
                        </TabsList>

                        <TabsContent value="overview" className="space-y-4">
                            <ChartContainer config={chartConfig} className="h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={data}>
                                        <XAxis dataKey="date" tickLine={false} axisLine={false} className="text-xs" />
                                        <YAxis tickLine={false} axisLine={false} className="text-xs" />
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                        <Line type="monotone" dataKey="clicks" stroke="var(--color-clicks)" strokeWidth={2} dot={false} />
                                        <Line
                                            type="monotone"
                                            dataKey="impressions"
                                            stroke="var(--color-impressions)"
                                            strokeWidth={2}
                                            dot={false}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                        </TabsContent>

                        <TabsContent value="clicks">
                            <ChartContainer config={chartConfig} className="h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={data}>
                                        <XAxis dataKey="date" tickLine={false} axisLine={false} className="text-xs" />
                                        <YAxis tickLine={false} axisLine={false} className="text-xs" />
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                        <Area
                                            type="monotone"
                                            dataKey="clicks"
                                            stroke="var(--color-clicks)"
                                            fill="var(--color-clicks)"
                                            fillOpacity={0.2}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                        </TabsContent>

                        <TabsContent value="impressions">
                            <ChartContainer config={chartConfig} className="h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={data}>
                                        <XAxis dataKey="date" tickLine={false} axisLine={false} className="text-xs" />
                                        <YAxis tickLine={false} axisLine={false} className="text-xs" />
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                        <Bar dataKey="impressions" fill="var(--color-impressions)" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                        </TabsContent>

                        <TabsContent value="position">
                            <ChartContainer config={chartConfig} className="h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={data}>
                                        <XAxis dataKey="date" tickLine={false} axisLine={false} className="text-xs" />
                                        <YAxis
                                            tickLine={false}
                                            axisLine={false}
                                            className="text-xs"
                                            domain={["dataMin - 5", "dataMax + 5"]}
                                        />
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                        <Line
                                            type="monotone"
                                            dataKey="position"
                                            stroke="var(--color-position)"
                                            strokeWidth={3}
                                            dot={{ fill: "var(--color-position)", strokeWidth: 2, r: 4 }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    )
}
