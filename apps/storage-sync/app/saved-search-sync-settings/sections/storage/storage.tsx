'use client'

import React, { Dispatch, SetStateAction, useState } from "react";

import { Checkbox, Collapsible, ComboboxFactory, ComboboxOption, Input } from "@workspace/ui/components";
import { FilePenLine, FilePlus2 } from "lucide-react";
import { FormFieldOptions } from "@workspace/ui/components";
import { StorageSettingsForm, StorageSettingsFormProps } from "./settings";
import { useStorageSettingsOptions } from "./storage.api";

const Combobox = ComboboxFactory()

const StorageSettingsLabel = "Storage Settings"
const CREATE_PERIOD_FOLDER_DEFAULT = false
const APPEND_EXECUTION_DATE_TO_FILE_NAME_DEFAULT = false

type StorageSettingsFormMode = StorageSettingsFormProps['mode'] | 'closed'

interface StorageSettingsSection {
  storageSettings?: ComboboxOption
  setStorageSettings: Dispatch<SetStateAction<ComboboxOption | undefined>>
  destinyFolderPath: string
  setDestinyFolderPath: Dispatch<SetStateAction<string>>
  createPeriodFolder: boolean
  setCreatePeriodFolder: Dispatch<SetStateAction<boolean>>
  fileNamePrefix: string
  setFileNamePrefix: Dispatch<SetStateAction<string>>
  appendExecutionDateToFileName: boolean
  setAppendExecutionDateToFileName: Dispatch<SetStateAction<boolean>>
}

export const StorageSection: React.FC<StorageSettingsSection> = ({
  destinyFolderPath,
  fileNamePrefix,
  setAppendExecutionDateToFileName,
  setCreatePeriodFolder,
  setDestinyFolderPath,
  setFileNamePrefix,
  setStorageSettings,
  storageSettings,
  appendExecutionDateToFileName,
  createPeriodFolder
}) => {
    const { storageSettingsOptions } = useStorageSettingsOptions()

    const [storageSettingsFormMode, setStorageSettingsFormMode] = useState<StorageSettingsFormMode>('closed')
    const [storageSettingsFormId, setStorageSettingFormId] = useState<string>()

    const addNewStorageSetting = () => {
      setStorageSettingsFormMode('add')
      setStorageSettingFormId(undefined)
    }

    const editStorageSetting = () => {
      setStorageSettingsFormMode('edit')
      setStorageSettingFormId(storageSettings?.id)
    }

    const onStorageSave: StorageSettingsFormProps['onSave'] = (res) => {
      setStorageSettings({id: res.id, label: res.name, value: res.name})
    }

    return (
        <>
          <Collapsible title="Storage" initialState="open">
              <div className="grid grid-cols-3 gap-14">
                  <div className="flex flex-col gap-2 max-w-[350px]"> 
                      <div className="flex gap-2 items-end relative">
                        <Combobox
                          required
                          label={StorageSettingsLabel}
                          name="storage_settings"
                          options={storageSettingsOptions}
                          onSelect={setStorageSettings}
                          optionSelected={storageSettings}
                        />
                        
                        <div className="h-[fit-content] absolute top-8 -right-6">
                          <FormFieldOptions
                            fieldLabel={StorageSettingsLabel}
                            options={[
                              {icon: FilePlus2, id: 'add', name: 'New Storage Setting', onSelected: addNewStorageSetting},
                              {icon: FilePenLine, id: 'edit', name: 'Edit Storage Setting', disabled: !storageSettings, onSelected: editStorageSetting}
                            ]}
                          />
                        </div>
                      </div>

                      <Input
                        required  
                        name="destiny_folder_path"
                        label="Destiny Folder Path"
                        onChange={setDestinyFolderPath}
                        value={destinyFolderPath}
                      />
                  </div>

                  <div className="flex flex-col gap-2 self-end max-w-[350px]"> 
                    <Checkbox 
                      id="storage-create-period-folder" 
                      label="Create Period Folder" 
                      defaultChecked={CREATE_PERIOD_FOLDER_DEFAULT}
                      onChange={setCreatePeriodFolder}
                      value={createPeriodFolder}
                    />

                    <Input
                        required
                        name="file_name_prefix"
                        label="File Name Prefix"
                        onChange={setFileNamePrefix}
                        value={fileNamePrefix}
                      />
                  </div>

                  <div className="flex flex-col gap-2 pt-11 max-w-[350px]">
                    <Checkbox 
                        id="append_execution_date_to_file_name" 
                        label="Append Execution Date To File Name" 
                        defaultChecked={APPEND_EXECUTION_DATE_TO_FILE_NAME_DEFAULT}
                        onChange={setAppendExecutionDateToFileName}
                        value={appendExecutionDateToFileName}
                      />
                  </div>
              </div>
          </Collapsible>

          {storageSettingsFormMode !== 'closed' && (
            <StorageSettingsForm 
              mode={storageSettingsFormMode}
              afterClose={() => setStorageSettingsFormMode('closed')}
              storageId={storageSettingsFormId}
              onSave={onStorageSave}
            />
        )}
        </>
    )
}

