'use client'

import { Button, ComboboxOption, Form, Input, Separator, tableFactory, Tabs } from "@workspace/ui/components"
import { VendorInformation, BankInformation } from "./sections"
import { useRouter, useSearchParams } from "next/navigation"
import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useEffect, useState } from "react"
import { useSavedSearchSyncSettings } from "./new-vendor-form-rev.api"
import { environments } from "@/environments"
import { useAlert } from "@workspace/ui/hooks"
import { NetsuiteFieldOption } from "@workspace/services/api"
import { Trash2 } from "lucide-react"
import { DropZoneFile } from "@workspace/ui/components/drag-and-drop/file/file"
import { Logo } from "@/components/logo"

const { path_home } = environments

export default function Page() {
  const { alert } = useAlert()
  const {data, setData} = useContext(tableContext) 

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
    router.push(path_home)
  }

  return (
    <div className="flex items-center justify-center w-dvw h-dvh">
        <Form
          title="New Vendor Form"
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          onReset={savedSearchSyncSettingsData ?  () => setInitialData() : undefined}
          contentClassname="pr-7"
          logo={<Logo />}
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

          <Separator className="my-3 bg-transparent" orientation="horizontal"/>


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

        <Separator className="my-3 bg-transparent" orientation="horizontal"/>

          <Tabs
            tabs={[
              {
                id: 'notes',
                label: 'Notes',
                content: (
                  <div className="flex flex-col gap-2">
                    <Button
                      className="w-fit"
                      onClick={() => setData(old => [...old, {id: id()}])}
                    >
                      New Note
                    </Button>
                    <Table 
                      data={data}
                      pageSize={1000}
                    />
                  </div>
                )
              },
              {
                id: 'files',
                label: 'Files',
                content: (
                  <DropZoneFile/>
                )
              }
            ]}
          />


        </Form>
    </div>
  )
}


//#region Table
interface Table {
  id: string
  title?: string
  memo?: string
  date?: string
  time?: string
  type?: NetsuiteFieldOption
  direction?: NetsuiteFieldOption
}

let _id = 0

const id = () => {
  return (_id++).toString()
}

const tableData: Table[] = [
  ...Array.from({length: 3}, (_, index) => ({id: id(), title: `title ${index}`, memo: `memo ${index}`, date: `date ${index}`, time: `time ${index}`, type: {id: '1', name: 'test'}, direction: {id: '1', name: 'test'}})),
]

const Table = tableFactory<Table, ''>([
  {
    accessorKey: "title",
    header: ({column}) => {
        return (
            <div
                className="px-4 py-2 rounded-none w-full justify-start text-xs"
                style={{width: column.getSize()}}
            >
              Title
            </div>
        )
    },
    cell: ({ row }) => {
      const [title, setTitle] = useState(row.getValue<Table['title']>('title'))

      return (
        <div className="px-[1px]">
          <Input
            variant="outline" 
            label="Title"
            name="title"
            labeless
            value={title}
            onChange={setTitle}
          />
        </div>
      )
    },
    size: 60
  },
  {
    accessorKey: "memo",
    header: ({column}) => {
        return (
            <div
                className="px-4 py-2 rounded-none w-full justify-start text-xs"
                style={{width: column.getSize()}}
            >
              Memo
            </div>
        )
    },
    cell: ({ row }) => {
      const [memo, setMemo] = useState(row.getValue<Table['memo']>('memo'))

      return (
        <div className="px-[1px]">
          <Input
            variant="outline" 
            label="Memo"
            name="Memo"
            labeless
            value={memo}
            onChange={setMemo}
          />
        </div>
      )
    }
  },
  {
    accessorKey: "date",
    header: ({column}) => {
        return (
            <div
                className="px-4 py-2 rounded-none w-full justify-start text-xs"
                style={{width: column.getSize()}}
            >
              Date
            </div>
        )
    },
    cell: ({ row }) => {
      const [date, setDate] = useState(row.getValue<Table['date']>('date'))

      return (
        <div className="px-[1px]">
          <Input
            variant="outline" 
            label="Date"
            name="Date"
            labeless
            value={date}
            onChange={setDate}
          />
        </div>
      )
    }
  },
  {
    accessorKey: "time",
    header: ({column}) => {
        return (
            <div
                className="px-4 py-2 rounded-none w-full justify-start text-xs"
                style={{width: column.getSize()}}
            >
              Time
            </div>
        )
    },
    cell: ({ row }) => {
      const [time, setTime] = useState(row.getValue<Table['time']>('time'))

      return (
        <div className="px-[1px]">
          <Input
            variant="outline" 
            label="Time"
            name="Time"
            labeless
            value={time}
            onChange={setTime}
          />
        </div>
      )
    },
  },
  {
    accessorKey: "action",
    header: ({column}) => {

        return (
            <div
                className="px-4 py-2 rounded-none w-full justify-start text-xs"
                style={{width: column.getSize()}}
            >
              
            </div>
        )
    },
    cell: ({ row }) => {
      const {setData} = useContext(tableContext)

      const onRemove = () => {
        console.log(row.getValue('id'))

        setData(old => old.filter((data) => data.id !== row.getValue('id')))
      }

      return (
        <div className="px-[1px]">
          <Button onClick={onRemove} variant="ghost">
            <Trash2 className="size-4"/>
          </Button>
        </div>
      )
    },
    size: 60
  },
  {
    accessorKey: "id",
    header: ({column}) => {

        return (
            <div
                className="px-4 py-2 rounded-none w-full justify-start text-xs hidden"
                style={{width: column.getSize()}}
            >
              
            </div>
        )
    },
    cell: ({ row }) => null,
  },
  
])
//#endregion Table

interface Data {
  data: Table[]
  setData: Dispatch<SetStateAction<Table[]>>
}

const tableContext = createContext<Data>({} as any)

export const Provider = ({children}: PropsWithChildren) => {
  const [data, setData] = useState(tableData)

  return (
    <tableContext.Provider value={{data, setData}}>
      {children}
    </tableContext.Provider>
  )
}