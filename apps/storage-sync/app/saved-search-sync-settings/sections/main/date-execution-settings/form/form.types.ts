export interface ExecutionDateSettingsFormProps {
    mode: 'add' | 'edit'
    dateExecutionId?: string
    afterClose?: VoidFunction
    onSave: (res: GetDateExecutionSettingsByIdResponse) => void
}

interface Register {
    id: string
    name: string
}

export interface GetDateExecutionSettingsByIdResponse {
    id: string,
    isInactive: boolean,
    name: string,
    runOnSunday: boolean,
    runOnMonday: boolean,
    runOnTuesday: boolean,
    runOnWednesday: boolean,
    runOnThursday: boolean,
    runOnFriday: boolean,
    runOnSaturday: boolean,
    holidaySettings: Register
}

export interface SaveDateExecutionSettingsBody {
    id?: string,
    name: string,
    runOnSunday: boolean,
    runOnMonday: boolean,
    runOnTuesday: boolean,
    runOnWednesday: boolean,
    runOnThursday: boolean,
    runOnFriday: boolean,
    runOnSaturday: boolean,
    holidaySettings?: { id: string }
}