'use client'

import { ComboboxOption, Form, Separator } from "@workspace/ui/components"
import { VendorInformation, BankInformation } from "./sections"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useSavedSearchSyncSettings, useSaveSavedSearchSyncSettings } from "./new-vendor-form-rev.api"
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

  //#region Bank Info
  const [bankName, setBankName] = useState('')
  const [account, setAccount] = useState('')
  const [abaRouting, setAbaRouting] = useState('')
  const [swiftOrIban, setSwiftOrIban] = useState('')
  const [wireOrAch, setWireOrAch] = useState<ComboboxOption>()
  const [accountType, setAccountType] = useState<ComboboxOption>()

  const [bankAddress, setBankAddress] = useState('')
  const [bankcity, setBankcity] = useState('')
  const [bankState, setBankState] = useState('')
  const [bankZipcode, setBankZipcode] = useState('')


  //#endregion Bank Info

  //#region Vendor Info
  const [vendorName, setVendorName] = useState('')
  const [businessAddress, setBusinessAddress] = useState('')
  const [businessCountry, setBusinessCountry] = useState<ComboboxOption>()
  const [businessCity, setBusinessCity] = useState('')
  const [businessState, setBusinessState] = useState('')
  const [businessZipcode, setBusinessZipcode] = useState('')
  const [vendorEmail, setVendorEmail] = useState('')
  const [vendorPhone, setVendorPhone] = useState('')

  const [RemittanceAddress, setRemittanceAddress] = useState('')
  const [remittanceCountry, setRemittanceCountry] = useState<ComboboxOption>()
  const [remittanceCity, setRemittanceCity] = useState('')
  const [remittanceState, setRemittanceState] = useState('')
  const [remittanceZipcode, setRemittanceZipcode] = useState('')

  //#endregion Vendor Info

    useEffect(() => {
      setInitialData()
    }, [savedSearchSyncSettingsData])

    const setInitialData = () => {
      if(savedSearchSyncSettingsData){
          
        }
  }

  const handleSubmit = () => {
    const requiredFields = {
      name: !!vendorName,
    }

    const canSubmit = 
      requiredFields.name && !!vendorName

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
      // mutate()
    }
  }

  const handleCancel = () => {
    router.push(savedSearchSettingsPath)
  }

  return (
    <div className="flex items-center justify-center w-dvw h-dvh">
        <Form
          title="New Vendor Form"
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          onReset={savedSearchSyncSettingsData ?  () => setInitialData() : undefined}
          contentClassname="pr-7"
        >
          <VendorInformation 
            name={vendorName}
            setName={setVendorName}
            businessAddress={businessAddress}
            setBusinessAddress={setBusinessAddress}
            businessCountry={businessCountry}
            setBusinessCountry={setBusinessCountry}
            businessCity={businessCity}
            setBusinessCity={setBusinessCity}
            businessState={businessState}
            setBusinessState={setBusinessState}
            businessZipcode={businessZipcode}
            setBusinessZipcode={setBusinessZipcode}
            emailAddress={vendorEmail}
            setEmailAddress={setVendorEmail}
            phone={vendorPhone}
            setPhone={setVendorPhone}
            remittanceCountry={remittanceCountry}
            setRemittanceCountry={setRemittanceCountry}
            remittanceAddress={RemittanceAddress}
            setRemittanceAddress={setRemittanceAddress}
            remittanceCity={remittanceCity}
            setRemittanceCity={setRemittanceCity}
            remittanceState={remittanceState}
            setRemittanceState={setRemittanceState}
            remittanceZipcode={remittanceZipcode}
            setRemittanceZipcode={setRemittanceZipcode}
          />

          <Separator className="my-8" orientation="horizontal"/>

          <BankInformation 
            name={bankName}
            setName={setBankName}
            account={account}
            setAccount={setAccount}
            abaRouting={abaRouting}
            setAbaRouting={setAbaRouting}
            accountType={accountType}
            setAccountType={setAccountType}
            swiftOrIban={swiftOrIban}
            setSwiftOrIban={setSwiftOrIban}
            wireOrAch={wireOrAch}
            setWireOrAch={setWireOrAch}
            address={bankAddress}
            setAddress={setBankAddress}
            city={bankcity}
            setCity={setBankcity}
            state={bankState}
            setState={setBankState}
            zipcode={bankZipcode}
            setZipcode={setBankZipcode}
          />
        </Form>
    </div>
  )
}
