export const environments = {
    route_home: process.env.NEXT_PUBLIC_ROUTE_HOME ?? '',
    isProduction: process.env.NODE_ENV === 'production',
    api_schedule_queue_manage: process.env.NEXT_PUBLIC_API_SCHEDULE_QUEUE_MANAGE ?? ''
}