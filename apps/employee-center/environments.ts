export const environments = {
    route_home: process.env.NEXT_PUBLIC_ROUTE_HOME ?? '',
    isProduction: process.env.NODE_ENV === 'production',
}