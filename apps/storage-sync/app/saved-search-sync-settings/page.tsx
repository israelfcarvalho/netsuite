'use client'

import { ComboboxOption, Form, Separator } from "@workspace/ui/components"
import { MainSection, NotificationsSection, StorageSection } from "./sections"
import { ScheduleSection } from "./sections/schedule"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useSavedSearchSyncSettings, useSaveSavedSearchSyncSettings } from "./saved-search-sync-settings.api"
import { environments } from "@/environments"
import { useAlert } from "@workspace/ui/hooks"

const { netsuite_path, isProduction } = environments
const localPath = '/'

const savedSearchSettingsPath = isProduction ? netsuite_path : localPath

export default function Page() {
  const { alert } = useAlert()
  const { mutate } = useSaveSavedSearchSyncSettings()

  const router = useRouter()
  const params = useSearchParams()
  const savedSearchSyncSettingsId = params.get('id')
  const { savedSearchSyncSettingsData } = useSavedSearchSyncSettings(savedSearchSyncSettingsId)

    const [name, setName] = useState<string>("");
    const [savedSearch, setSavedSearch] = useState<ComboboxOption>();
    const [dateFilterField, setDateFilterField] = useState<string>()
    const [period, setPeriod] = useState<ComboboxOption>();
    const [periodDelay, setPeriodDelay] = useState("")
    const [dateExecutionSettings, setDateExecutionSettings] = useState<ComboboxOption>()

    const [notificationSettings, setNotificationSettings] = useState<ComboboxOption>();

    const [storageSettings, setStorageSettings] = useState<ComboboxOption>();
    const [destinyFolderPath, setDestinyFolderPath] = useState<string>("");
    const [createPeriodFolder, setCreatePeriodFolder] = useState(false)
    const [fileNamePrefix, setFileNamePrefix] = useState<string>("");
    const [appendExecutionDateToFileName, setAppendExecutionDateToFileName] = useState(false)
    const [link, setLink] = useState<string>();

    useEffect(() => {
      setInitialData()
    }, [savedSearchSyncSettingsData])

    const setInitialData = () => {
      if(savedSearchSyncSettingsData){
          setName(savedSearchSyncSettingsData.name)
          setSavedSearch({
              id: savedSearchSyncSettingsData.savedSearch.id,
              label: savedSearchSyncSettingsData.savedSearch.name,
              value: savedSearchSyncSettingsData.savedSearch.name
          })

          setDateFilterField(savedSearchSyncSettingsData.dateFilterField)
          setPeriod({
            id: savedSearchSyncSettingsData.period.id,
            label: savedSearchSyncSettingsData.period.name,
            value: savedSearchSyncSettingsData.period.name
          })
          setPeriodDelay(savedSearchSyncSettingsData.period.delayInDays)
          setNotificationSettings({
            id: savedSearchSyncSettingsData.notificationSettings.id,
            label: savedSearchSyncSettingsData.notificationSettings.name,
            value: savedSearchSyncSettingsData.notificationSettings.name
          })

          setStorageSettings({
            id: savedSearchSyncSettingsData.storageSettings.id,
            label: savedSearchSyncSettingsData.storageSettings.name,
            value: savedSearchSyncSettingsData.storageSettings.name
          })
          setDestinyFolderPath(savedSearchSyncSettingsData.destinyFolderPath)
          setCreatePeriodFolder(savedSearchSyncSettingsData.createPeriodFolder)
          setFileNamePrefix(savedSearchSyncSettingsData.fileNamePrefix)
          setAppendExecutionDateToFileName(savedSearchSyncSettingsData.appendExecutionDateToFileName)
          setLink(savedSearchSyncSettingsData.scriptDeploymentLink)
          savedSearchSyncSettingsData.dateExecutionSettings && setDateExecutionSettings({
            id: savedSearchSyncSettingsData.dateExecutionSettings.id,
            label: savedSearchSyncSettingsData.dateExecutionSettings.name,
            value: savedSearchSyncSettingsData.dateExecutionSettings.name
          })
        }
  }

  const handleSubmit = () => {
    const requiredFields = {
      name: !!name,
      storageSettings: !!storageSettings,
      destinyFolderPath: !!destinyFolderPath,
      savedSearch: !!savedSearch,
      fileNamePrefix: !!fileNamePrefix,
      period: !!period,
      periodDelay: !!periodDelay,
      notificationSettings: !!notificationSettings
    }

    const canSubmit = 
      requiredFields.name && !!name &&
      requiredFields.storageSettings && !!storageSettings &&
      requiredFields.destinyFolderPath && !!destinyFolderPath &&
      requiredFields.savedSearch && !!savedSearch &&
      requiredFields.fileNamePrefix && !!fileNamePrefix &&
      requiredFields.period && !!period &&
      requiredFields.periodDelay && !!periodDelay &&
      requiredFields.notificationSettings && !!notificationSettings

    if(!canSubmit){
      const message: string[] = Object.entries(requiredFields).reduce((message, [field, fieldFuffiled]) => {
        return fieldFuffiled ? message : [...message, field]
      }, [] as string[])

      alert({
        title: "Missing Required Fields",
        message,
        automaticColumns: {
          enable: true,
          rowsLimit: 4
        }
      })
    } else {
      mutate({
        id: savedSearchSyncSettingsId ?? undefined,
        appendExecutionDateToFileName,
        createPeriodFolder,
        dateFilterField,
        destinyFolderPath,
        fileNamePrefix,
        name,
        notificationSettings: {
          id: notificationSettings.id, name: notificationSettings.value
        },
        period: {id: period.id, name: period.value},
        periodDelayInDays: periodDelay,
        savedSearch: {id: savedSearch?.id, name: savedSearch.label},
        scriptDeplymentLink: link,
        storageSettings: {id: storageSettings.id, name: storageSettings.value},
        dateExecutionSettings: dateExecutionSettings ? {id: dateExecutionSettings.id} : undefined
      }, {
        onSuccess(){
          router.push(savedSearchSettingsPath)
        },
        onError(err){
          alert({
            title: "Error",
            message: [err.message]
          })
        }
      })
    }
 
  }

  const handleCancel = () => {
    router.push(savedSearchSettingsPath)
  }

  return (
    <div className="flex items-center justify-center w-dvw h-dvh">
        <Form
          title="SM | Saved Search Sync Settings"
          subtitle="All Transactions"
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          onReset={savedSearchSyncSettingsData ?  () => setInitialData() : undefined}
        >
          <MainSection 
            name={name}
            setName={setName}
            period={period}
            setPeriod={setPeriod}
            periodDelay={periodDelay}
            setPeriodDelay={setPeriodDelay}
            dateFilterField={dateFilterField}
            setDateFilterField={setDateFilterField}
            savedSearch={savedSearch}
            setSavedSearch={setSavedSearch}
            dateExecutionSettings={dateExecutionSettings}
            setDateExecutionSettings={setDateExecutionSettings}
          />

          <Separator className="my-2 bg-transparent" orientation="horizontal"/>

          <StorageSection 
            destinyFolderPath={destinyFolderPath}
            fileNamePrefix={fileNamePrefix}
            setAppendExecutionDateToFileName={setAppendExecutionDateToFileName}
            setCreatePeriodFolder={setCreatePeriodFolder}
            setDestinyFolderPath={setDestinyFolderPath}
            setFileNamePrefix={setFileNamePrefix}
            setStorageSettings={setStorageSettings}
            storageSettings={storageSettings}
            appendExecutionDateToFileName={appendExecutionDateToFileName}
            createPeriodFolder={createPeriodFolder}
          />

          <Separator className="my-2 bg-transparent" orientation="horizontal"/>

          <NotificationsSection 
            notificationSettings={notificationSettings}
            setNotificationSettings={setNotificationSettings}
          />

          <Separator className="my-2 bg-transparent" orientation="horizontal"/>

          {link != undefined && (
            <ScheduleSection link={link}/>
          )}
        </Form>
    </div>
  )
}
