'use client'

import React, { Dispatch, SetStateAction } from "react";

import { Collapsible, ComboboxFactory, ComboboxOption, Input, Separator } from "@workspace/ui/components";
import { useCountryOptions } from "./vendor-information.api";

const Combobox = ComboboxFactory()

interface VendorInformationProps {
  name: string 
  setName: Dispatch<SetStateAction<string>>
  businessAddress: string 
  setBusinessAddress: Dispatch<SetStateAction<string>>
  businessCountry?: ComboboxOption
  setBusinessCountry: Dispatch<SetStateAction<ComboboxOption | undefined>>
  businessCity: string 
  setBusinessCity: Dispatch<SetStateAction<string>>
  businessState: string 
  setBusinessState: Dispatch<SetStateAction<string>>
  businessZipcode: string 
  setBusinessZipcode: Dispatch<SetStateAction<string>>
  remittanceAddress: string 
  setRemittanceAddress: Dispatch<SetStateAction<string>>
  remittanceCountry?: ComboboxOption
  setRemittanceCountry: Dispatch<SetStateAction<ComboboxOption | undefined>>
  remittanceCity: string 
  setRemittanceCity: Dispatch<SetStateAction<string>>
  remittanceState: string 
  setRemittanceState: Dispatch<SetStateAction<string>>
  remittanceZipcode: string 
  setRemittanceZipcode: Dispatch<SetStateAction<string>>
  emailAddress: string
  setEmailAddress: Dispatch<SetStateAction<string>>
  phone: string
  setPhone: Dispatch<SetStateAction<string>>
}

export const VendorInformation: React.FC<VendorInformationProps> = ({
  name,
  setName,
  businessAddress,
  setBusinessAddress,
  businessCountry,
  setBusinessCountry,
  businessCity,
  setBusinessCity,
  businessState,
  setBusinessState,
  businessZipcode,
  setBusinessZipcode,
  remittanceAddress,
  setRemittanceAddress,
  remittanceCountry,
  setRemittanceCountry,
  remittanceCity,
  setRemittanceCity,
  remittanceState,
  setRemittanceState,
  remittanceZipcode,
  setRemittanceZipcode,
  emailAddress,
  setEmailAddress,
  phone,
  setPhone
}) => {
    const { countryOptions } = useCountryOptions()

    return (
      <Collapsible title="Vendor Information" initialState="open">
          <div className="w-full grid gap-y-2 gap-x-16 grid-cols-[repeat(3,minmax(0,1fr))] 2xl:gap-x-32">
            <Input 
              required
              name="vendor-name"
              label="Vendor Name"
              value={name}
              onChange={setName}
            />

            <Input 
              required
              name="vendor-email"
              label="E-mail Address"
              value={emailAddress}
              onChange={setEmailAddress}
            />

            <Input 
              required
              name="vendor-phone"
              label="Phone"
              value={phone}
              onChange={setPhone}
            />

            <div className="col-span-3 flex flex-nowrap pt-8">
              <h3 className="font-bold text-light-neutral-100 flex-[0_1_fit-content]">Business Address</h3>
            </div>

            <Input 
              required
              name="business-address"
              label="Address"
              value={businessAddress}
              onChange={setBusinessAddress}
            />

            <Combobox 
              required
              name="business-country"
              label="Country"
              onSelect={setBusinessCountry}
              options={countryOptions}
              optionSelected={businessCountry}
            />

            <Input 
              required
              name="business-city"
              label="City"
              value={businessCity}
              onChange={setBusinessCity}
            />

            <Input 
              required
              name="business-state"
              label="State"
              value={businessState}
              onChange={setBusinessState}
            />

            <Input 
              required
              name="business-zipcode"
              label="Zipcode"
              value={businessZipcode}
              onChange={setBusinessZipcode}
            />

            <div className="col-span-3 flex flex-nowrap pt-8">
              <h3 className="font-bold text-light-neutral-100 flex-[0_1_fit-content]">Remittance Address</h3>
            </div>

            <Input 
              required
              name="remittance-address"
              label="Address"
              value={remittanceAddress}
              onChange={setRemittanceAddress}
            />

            <Combobox 
              required
              name="remittance-country"
              label="Country"
              onSelect={setRemittanceCountry}
              options={countryOptions}
              optionSelected={remittanceCountry}
            />

            <Input 
              required
              name="remittance-city"
              label="City"
              value={remittanceCity}
              onChange={setRemittanceCity}
            />

            <Input 
              required
              name="remittance-state"
              label="State"
              value={remittanceState}
              onChange={setRemittanceState}
            />

            <Input 
              required
              name="remittance-zipcode"
              label="Zipcode"
              value={remittanceZipcode}
              onChange={setRemittanceZipcode}
            />

          </div>
      </Collapsible>
    )
}