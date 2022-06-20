import React, { useState } from 'react'

export default function Header({IPaddressData,setIPaddressData,loading,setloading,setcoords}) {
  const [InputText, setInputText] = useState('')
  const [IsIpAddressValid, setIsIpAddressValid] = useState(true)
  const getIPAddressLocationBySearch = async() => {
    if(!InputText)return

    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(InputText)){
      console.log('valid IP address');
      setIsIpAddressValid(true)
      setloading(true)
      const response = await fetch(
      ` https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.REACT_APP_API_KEY}&ipAddress=${InputText}`
      )
      const data = await response.json()
      setIPaddressData(data)
      setcoords({lat : data.location.lat , lng  : data.location.lng})
    
    
      setloading(false)

    }
    else{
      setIsIpAddressValid(false)
      return;
    }
    
    

  }
  return (
    <div className='relative flex items-center justify-center bg-heaader-pattern bg-cover h-[200px] w-full'>
        <div className='absolute z-[999999] w-4/5  top-2 xl:top-10  flex flex-col items-center justify-center'>
            <h2 className='font-bold text-2xl text-white my-4'>IP Address Tracker</h2>
            <div className='flex w-full lg:w-1/2'>
                <input value={InputText} onChange={(e) => setInputText(e.target.value)} className={`p-3 w-full rounded-l-md outline-0 text-sm ${IsIpAddressValid ? 'text-black' : 'text-red-600'}`} type="text" placeholder='Search for only IP address or domain' />
                <span onClick={getIPAddressLocationBySearch} className='bg-black hover:opacity-70 p-3 flex items-center justify-center rounded-r-md cursor-pointer '>
                    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="14"><path fill="none" stroke="#FFF" stroke-width="3" d="M2 1l6 6-6 6"/></svg>
                </span>
            </div>
            {!IsIpAddressValid ? <p className='text-red-500 font-bold '>Invalid Ip Address!</p> : null}
            
            {
              !loading &&
                <div className=' flex flex-col lg:flex-row lg:divide-x-2  items-center justify-center mt-5 ml-3  w-full lg:w-4/5 bg-white rounded-md shadow-lg p-3'>
                    <div className='p-3 w-full flex flex-col items-center '>
                      <span className='text-[#777] font-bold text-sm'>IP Address</span>
                      <p className='font-bold '>{IPaddressData.ip}</p>
                      
                    </div>
                    <div className='p-3 w-full flex flex-col items-center'>
                      <span className='text-[#777] font-bold text-sm'>Location</span>
                      <p className='font-bold '>{IPaddressData.location.region}</p>
                      
                    </div>
                    <div className='p-3 w-full flex flex-col items-center'>
                      <span className='text-[#777] font-bold text-sm'>Timezone</span>
                      <p className='font-bold '>{IPaddressData.location.timezone}</p>
                      
                    </div>
                    <div className='p-3 w-full flex flex-col items-center'>
                      <span className='text-[#777] font-bold text-sm'>ISP</span>
                      <p className='font-bold '>{IPaddressData.isp}</p>
                      
                    </div>
                </div>
            }
        </div>
        
        
    </div>
  )
}
