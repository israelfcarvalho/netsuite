'use client'

import React, { Dispatch, SetStateAction } from "react";

import { Collapsible, ComboboxFactory, ComboboxOption, Input, Separator } from "@workspace/ui/components";
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


    return (
      <Collapsible title="Bank Information" initialState="open">
          <div className="w-full grid grid-cols-[repeat(3,minmax(0,300px))] grid-rows gap-x-16">
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

            <div className="col-span-3 flex flex-nowrap items-center pt-4">
              <Separator className="flex-initial"/>

              <h3 className="font-bold text-light-neutral-100 flex-[1_0_fit-content] px-3">Address</h3>

              <Separator className="flex-initial"/>
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
          </div>
      </Collapsible>
    )
}