export interface NotificationSettingsFormProps {
    mode: 'add' | 'edit'
    notificationId?: string
    afterClose?: VoidFunction
    onSave: (res: GetNotificationSettingsByIdResponse) => void
}

interface Register {
    id: string
    name: string
}

export interface GetNotificationSettingsByIdResponse {
    id: string
    name: string
    emailTemplate: Register
    emailSender: Register
    emailMainRecipientsEmployees: Register[]
    emailMainRecipientsEmails: string[]
    copiesToEmployees: Register[]
    copiesToEmails: string[]
}

export interface SaveNotificationSettingsBody {
    id?: string,
    name: string,
    emailTemplate: {id: string}
    emailSender: { id: string }
    emailMainRecipientsEmployees: { id: string }[]
    emailMainRecipientsEmails: string
    copiesToEmployees: { id: string }[]
    copiesToEmails: string
}