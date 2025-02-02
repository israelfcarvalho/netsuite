'use client'

import React, { Dispatch, SetStateAction, useState } from "react";

import { Collapsible, ComboboxFactory, ComboboxOption } from "@workspace/ui/components";
import { FilePenLine, FilePlus2 } from "lucide-react";
import { FormFieldOptions } from "@workspace/ui/components";
import { useNotificationSettingsOptions } from "./notifications.api";
import { NotificationSettingsForm, NotificationSettingsFormProps } from './settings'

const Combobox = ComboboxFactory()
const NotificationSettingsLabel = "Notification Settings"

type NotificationSettingsFormMode = NotificationSettingsFormProps['mode'] | 'closed'

interface NotificationsSectionProps {
  notificationSettings?: ComboboxOption
  setNotificationSettings: Dispatch<SetStateAction<ComboboxOption | undefined>>
}

export const NotificationsSection: React.FC<NotificationsSectionProps> = ({
  notificationSettings,
  setNotificationSettings
}) => {
    const { notificationSettingsOptions} = useNotificationSettingsOptions()

    const [notificationSettingsFormMode, setNotificationSettingsFormMode] = useState<NotificationSettingsFormMode>('closed')

    const addNewNotificationSetting = () => {
      setNotificationSettingsFormMode('add')
    }

    const editNotificationSetting = () => {
      setNotificationSettingsFormMode('edit')
    }

    const onNotificationSave: NotificationSettingsFormProps['onSave'] = (res) => {
      setNotificationSettings({
        id: res.id,
        label: res.name,
        value: res.name
      })
    }

    return (
      <>
        <Collapsible className="pr-8" title="Notification" initialState="open">
            <div className="grid grid-rows-2 md:grid-rows-1 grid-flow-col auto-cols-[1fr] gap-x-14 gap-y-4 items-center">
              <div className="flex gap-2 relative">
                <Combobox
                  required
                  label={NotificationSettingsLabel}
                  name="notification_settings"
                  options={notificationSettingsOptions}
                  onSelect={setNotificationSettings}
                  optionSelected={notificationSettings}
                />
                
                <div className="h-[fit-content] absolute top-8 -right-6">
                  <FormFieldOptions
                    fieldLabel={NotificationSettingsLabel}
                    options={[
                      {icon: FilePlus2, id: 'add', name: 'New Notification Setting', onSelected: addNewNotificationSetting},
                      {icon: FilePenLine, id: 'edit', name: 'Edit Notification Setting', disabled: !notificationSettings, onSelected: editNotificationSetting}
                    ]}
                  />
                </div>
              </div>
              <div></div>
              <div></div>
            </div>
        </Collapsible>

        {notificationSettingsFormMode !== 'closed' && (
          <NotificationSettingsForm 
            mode={notificationSettingsFormMode} 
            notificationId={notificationSettingsFormMode === 'edit' ? notificationSettings?.id : undefined}
            afterClose={() => setNotificationSettingsFormMode('closed')}
            onSave={onNotificationSave}
          />
        )}
      </>
    )
}