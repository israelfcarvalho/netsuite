export interface StorageSettingsFormProps {
    mode: 'add' | 'edit'
    storageId?: string
    afterClose?: VoidFunction
    onSave: (res: GetStorageSettingsByIdResponse) => void
}

export interface GetStorageSettingsByIdResponse {
    id: string
    name: string
    storage: {
        id: string
        name: string
        code: string
    }
    microsoftSharePointSiteId: string
}

export interface SaveStorageSettingsBody {
    id?: string
    name: string
    storage: {
        id: string
    }
    microsoftSharePointSiteId?: string
}