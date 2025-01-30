interface Register {
    id: string
    name: string
}

export interface SavedSearchSyncSettings {
    id: string,
    name: string,
    isInactive: false,
    savedSearch: Register,
    dateFilterField: string,
    period: Register | null,
    destinyFolderPath: string,
    fileNamePrefix: string,
    appendExecutionDateToFileName: boolean,
    createPeriodFolder: boolean,
    notificationSettings: Register,
    storageSettings: Register
    scriptDeploymentLink: string
}

export interface GetSavedSearchSyncSettingsResponse {
    summary: {
        page: {
            count: number,
            index: number,
            isLast: boolean,
            isFirst: boolean
        },
        result: {
            currentCount: number,
            totalCount: number
        }
    },
    data: SavedSearchSyncSettings[]
}


export interface ResponseGetSavedSearchSyncSettingsById {
    id: string,
    name: string,
    isInactive: boolean,
    savedSearch: {
        id: string,
        name: string
    },
    dateFilterField?: string,
    period: {
        id: string,
        name: string,
        delayInDays: string,
        code: string,
        settings: {
            filter: [
                [
                    "trandate",
                    "onorafter",
                    "01/12/2025"
                ],
                "AND",
                [
                    "trandate",
                    "onorbefore",
                    "01/18/2025"
                ]
            ],
            folder: string
        }
    },
    destinyFolderPath: string,
    fileNamePrefix: string,
    appendExecutionDateToFileName: boolean,
    createPeriodFolder: boolean,
    notificationSettings: {
        id: string,
        name: string
    },
    storageSettings: {
        id: string,
        name: string
    },
    fileName: string
    scriptDeploymentLink: string
    dateExecutionSettings?: {
        id: string,
        name: string
    }
}

export interface SaveSavedSearchSyncSettingsBody {
    id?: string,
    name: string,
    savedSearch: { id: string, name: string },
    dateFilterField?: string,
    period?: { id: string, name: string },
    periodDelayInDays: string,
    destinyFolderPath: string,
    fileNamePrefix: string,
    appendExecutionDateToFileName: boolean,
    createPeriodFolder: boolean,
    notificationSettings: { id: string, name: string },
    storageSettings: { id: string, name: string },
    dateExecutionSettings?: {id: string}
    scriptDeplymentLink?: string
};
