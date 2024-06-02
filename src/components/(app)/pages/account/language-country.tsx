import { Layout, Select, Typography } from 'antd'
import React, { useState } from 'react'

const { Text } = Typography

const { Option } = Select
const languages = ['English', 'Spanish', 'French', 'German', 'Chinese']
const countriesData = [
   {
      name: 'United States',
      code: 'US',
      regions: [
         { name: 'California', code: 'CA' },
         { name: 'New York', code: 'NY' },
         // Add more regions as needed
      ],
   },
   {
      name: 'Canada',
      code: 'CA',
      regions: [
         { name: 'Ontario', code: 'ON' },
         { name: 'Quebec', code: 'QC' },
         // Add more regions as needed
      ],
   },
   // Add more countries and regions as needed
]

const CountryAndRegionSelector = () => {
   const [selectedCountry, setSelectedCountry] = useState('')
   const [regions, setRegions] = useState([])
   const [selectedLanguage, setSelectedLanguage] = useState('English')

   const handleCountryChange = (value: any) => {
      setSelectedCountry(value)
      const selectedCountryData = countriesData.find(
         (country: any) => country.name === value,
      )
   }

   const handleLanguageChange = (value: any) => {
      setSelectedLanguage(value)
      // Add logic to change language based on selection
   }

   return (
      <Layout
         className="p-6 min-h-screen w-full flex flex-col justify-center items-center
       rounded-xl shadow-md space-y-4"
      >
         <div className="mb-4">
            <Text className="block text-sm font-medium">Select Country</Text>
            <Select
               id="country"
               className="mt-1 block w-full"
               placeholder="Select a country"
               onChange={handleCountryChange}
            >
               {countriesData.map((country: any) => (
                  <Option key={country.code} value={country.name}>
                     {country.name}
                  </Option>
               ))}
            </Select>
         </div>

         {regions.length > 0 && (
            <Layout>
               <Text className="block text-sm font-medium">Select Region</Text>
               <Select
                  id="region"
                  className="mt-1 block w-full"
                  placeholder="Select a region"
                  disabled={!selectedCountry}
               >
                  {regions.map((region: any) => (
                     <Option key={region.code} value={region.name}>
                        {region.name}
                     </Option>
                  ))}
               </Select>
            </Layout>
         )}

         <Layout className="mt-4">
            <label htmlFor="language" className="block text-sm font-medium">
               Select Language
            </label>
            <Select
               id="language"
               className="mt-1 block w-full"
               placeholder="Select a language"
               onChange={handleLanguageChange}
               value={selectedLanguage}
            >
               {languages.map((language) => (
                  <Option key={language} value={language}>
                     {language}
                  </Option>
               ))}
            </Select>
         </Layout>
      </Layout>
   )
}

export default CountryAndRegionSelector
