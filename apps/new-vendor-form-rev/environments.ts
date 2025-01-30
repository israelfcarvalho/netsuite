export const environments = {
    netsuite_path: process.env.NEXT_PUBLIC_NETSUITE_PATH ?? '',
    isProduction: process.env.NODE_ENV === 'production',
    api_employee: process.env.NEXT_PUBLIC_API_EMPLOYEE ?? '',
    api_saved_search_sync_settings: process.env.NEXT_PUBLIC_API_SAVED_SEARCH_SYNC_SETTINGS ?? '',
    api_email_template: process.env.NEXT_PUBLIC_API_EMAIL_TEMPLATE ?? '',
    api_notification_settings: process.env.NEXT_PUBLIC_API_NOTIFICATION_SETTINGS ?? '',
    api_saved_search: process.env.NEXT_PUBLIC_API_SAVED_SEARCH ?? '',
    api_period: process.env.NEXT_PUBLIC_API_PERIOD ?? '',
    api_storage: process.env.NEXT_PUBLIC_API_STORAGE ?? '',
    api_storage_settings: process.env.NEXT_PUBLIC_API_STORAGE_SETTINGS ?? '',
    api_holiday_settings: process.env.NEXT_PUBLIC_API_HOLIDAY_SETTINGS ?? '',
    api_date_execution_settings: process.env.NEXT_PUBLIC_API_DATE_EXECUTION_SETTINGS ?? ''
}