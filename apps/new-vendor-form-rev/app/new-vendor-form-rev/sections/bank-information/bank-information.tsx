'use client'

import React, { Dispatch, SetStateAction, useState } from "react";

import { Checkbox, Collapsible, ComboboxFactory, ComboboxOption, Input, Separator } from "@workspace/ui/components";
import { useAccountTypeOptions, useWireOrAchOptions } from "./bank-information.api";

const Combobox = ComboboxFactory()

interface BankInformationProps {
  name: string 
  setName: Dispatch<SetStateAction<string>>
  address: string 
  setAddress: Dispatch<SetStateAction<string>>
  city: string 
  setCity: Dispatch<SetStateAction<string>>
  state: string 
  setState: Dispatch<SetStateAction<string>>
  zipcode: string 
  setZipcode: Dispatch<SetStateAction<string>>
  accountType?: ComboboxOption 
  setAccountType: Dispatch<SetStateAction<ComboboxOption | undefined>>
  wireOrAch?: ComboboxOption 
  setWireOrAch: Dispatch<SetStateAction<ComboboxOption | undefined>>
  account: string 
  setAccount: Dispatch<SetStateAction<string>>  
  abaRouting: string 
  setAbaRouting: Dispatch<SetStateAction<string>>  
  swiftOrIban: string 
  setSwiftOrIban: Dispatch<SetStateAction<string>>
  }

export const BankInformation: React.FC<BankInformationProps> = ({
  name,
  setName,
  address,
  setAddress,
  city,
  setCity,
  state,
  setState,
  zipcode,
  setZipcode,
  accountType,
  setAccountType,
  wireOrAch,
  setWireOrAch,
  account,
  setAccount,
  abaRouting,
  setAbaRouting,
  swiftOrIban,
  setSwiftOrIban
}) => {
    const { accountTypeOptions } = useAccountTypeOptions()
    const { wireOrAchOptions } = useWireOrAchOptions()

    const [yes, setYes] = useState<ComboboxOption>()
    const [a, seta] = useState('')
    const [b, setb] = useState('')
    const [c, setc] = useState('')



    return (
      <Collapsible title="Bank Information" initialState="open">
          <div className="w-full grid gap-y-2 gap-x-16 grid-cols-[repeat(3,minmax(0,1fr))] 2xl:gap-x-32">
            <Input
              required
              name="bank-name"
              label="Bank Name"
              value={name}
              onChange={setName}
            />

            <Combobox 
              required
              name="account-type"
              label="Account Type"
              onSelect={setAccountType}
              options={accountTypeOptions}
              optionSelected={accountType}
            />
            
            <Combobox 
              required
              name="wire-or-ach"
              label="Wire/ACH"
              onSelect={setWireOrAch}
              options={wireOrAchOptions}
              optionSelected={wireOrAch}
            />

            <Input 
              required
              name="bank-account"
              label="Account#"
              value={account}
              onChange={setAccount}
            />

            <Input 
              required
              name="bank-aba-routing"
              label="ABA Routing#"
              value={abaRouting}
              onChange={setAbaRouting}
            />

            <Input 
              required
              name="bank-swift-iban"
              label="SWIFT/IBAN"
              value={swiftOrIban}
              onChange={setSwiftOrIban}
            />

            <div className="col-span-3 flex flex-nowrap pt-8">
              <h3 className="font-bold text-light-neutral-100 flex-[0_1_fit-content]">Address</h3>
            </div>

            <Input 
              required
              name="bank-address"
              label="Address"
              value={address}
              onChange={setAddress}
            />

            <Input 
              required
              name="bank-city"
              label="City"
              value={city}
              onChange={setCity}
            />

            <Input 
              required
              name="bank-state"
              label="State"
              value={state}
              onChange={setState}
            />

            <Input 
              required
              name="bank-zipcode"
              label="Zipcode"
              value={zipcode}
              onChange={setZipcode}
            />


            <div className="col-span-3 flex flex-nowrap pt-8">
              <p className="font-semibold text-light-neutral-100 flex-[0_1_fit-content] max-w-[1024px]">
                Does this agreement involve certain payments or transfers of value to Healthcare Professionals (HCPs) or
                Teaching Hospitals, which may trigger reporting requirements under the US Federal or International
                transparency reporting requirements?
              </p>
            </div>

            <div className="col-span-3 flex flex-nowrap pt-8">
              <div>
                <Combobox
                  label="Yes"
                  name="yes"
                  options={[{id: 'yes', label: 'Yes', value: 'Yes'}, {id: 'n-a', label: 'N/A', value: 'N/A'}]}
                  onSelect={setYes}
                  optionSelected={yes}
                />
              </div>
            </div>

            {yes?.id === 'yes' && (
               <>
                <p className="col-span-3 flex flex-nowrap pt-2 font-semibold text-light-neutral-100">
                  Please complete the following as applicable:
                </p>

                <Input 
                  required
                  name="HCP NPI Number or Ex-US Identifier: "
                  label="HCP NPI Number or Ex-US Identifier: "
                  value={a}
                  onChange={seta}
                />

                <Input 
                  required
                  name="HCP State License Number:"
                  label="HCP State License Number:"
                  value={b}
                  onChange={setb}
                />

                <Input 
                  required
                  name="Teaching Hospital TIN:"
                  label="Teaching Hospital TIN:"
                  value={c}
                  onChange={setc}
                />
               </>
            )}
          </div>
      </Collapsible>
    )
}