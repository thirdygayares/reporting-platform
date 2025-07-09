import { useQuery } from '@tanstack/react-query'

// Configuration for different environments
const API_CONFIG = {
    baseUrl: process.env.NODE_ENV === 'production'
        ? process.env.NEXT_PUBLIC_API_URL || 'https://reporting-platform.thirdygayares.com'
        : 'http://localhost:8000',
    endpoints: {
        gsc: '/api/analytics/gsc-data',
        ga4: '/api/analytics/ga4-data',
        facebook: '/api/analytics/facebook-ads'
    }
}

export function useGSCData() {
    return useQuery({
        queryKey: ['gsc-data'],
        queryFn: async () => {
            const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.gsc}`)
            if (!response.ok) throw new Error('Failed to fetch GSC data')
            return response.json()
        },
        refetchInterval: 5 * 60 * 1000,
    })
}

export function useGA4Data() {
    return useQuery({
        queryKey: ['ga4-data'],
        queryFn: async () => {
            const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.ga4}`)
            if (!response.ok) throw new Error('Failed to fetch GA4 data')
            return response.json()
        },
        refetchInterval: 5 * 60 * 1000,
    })
}

export function useFacebookAdsData() {
    return useQuery({
        queryKey: ['facebook-ads'],
        queryFn: async () => {
            const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.facebook}`)
            if (!response.ok) throw new Error('Failed to fetch Facebook Ads data')
            return response.json()
        },
        refetchInterval: 5 * 60 * 1000,
    })
}
