import Image from 'next/image'
import { 
    SearchIcon,
    MenuIcon,
    UserCircleIcon,
    UsersIcon,
    GlobeAltIcon
 } from '@heroicons/react/solid'
 import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

import { useState } from 'react'
import { DateRangePicker } from 'react-date-range';
import { useRouter } from 'next/dist/client/router';




function Header({placeholder}) {
    const [searchInput, setSearchInput] = useState('');
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndtDate] = useState(new Date())
    const [numberGuests, setNumberGuests] = useState(1)
    const handleSelect = (ranges) =>{
        setStartDate(ranges.selection.startDate);
        setEndtDate(ranges.selection.endDate)
    }
    const router = useRouter();


    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: 'selection'
    }

    const resetInput = () => {
        setSearchInput("")
    }

    const search = () => {
        router.push({
            pathname:'/search',
            query:{
                location: searchInput,
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                numberGuests: numberGuests
            }
        })
    }


   

    return (
        <header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md p-5 md:px-10">
            <div className="relative flex items-center h-10 cursor-pointer my-auto">
                <Image 
                onClick={()=> router.push('/')}
                src="https://links.papareact.com/qd3"
                width={150}
                height={40}
                objectFit="contain"
                />
            </div>
            {/* midddle seach input  */}
            <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm">
                <input 
                value={searchInput}
                onChange={(e)=> setSearchInput(e.target.value)}
                 className=" flex-grow pl-5 bg-transparent outline-none text-sm text-gray-600" 
                 placeholder={placeholder || "Start your Search"}
                 type="text" />
                <SearchIcon className=" hidden md:inline-flex h-8 bg-red-500 text-white rounded-full p-2 cursor-pointer md:mx-2"/>
            </div>
            {/* right */}
            <div className="flex items-center justify-end text-gray-500 space-x-4">
                <p className="hidden md:inline cursor-pointer">Become a host</p>
                <GlobeAltIcon className="h-6"/>
                <div className="flex  items-center space-x-2 border-2 p-2 rounded-full">
                    <MenuIcon className="h-6"/>
                    <UserCircleIcon className="h-6"/>
                </div>
            </div>
            {searchInput && (
                <div className="flex flex-col col-span-3 mx-auto">
                     <DateRangePicker 
                        ranges={[selectionRange]}
                        minDate={new Date()}
                        rangeColors={["#fd5b61"]}
                        onChange={handleSelect}
                        />
                    <div className="flex items-center border-b mb-4">
                        <h2 className="text-2xl flex-grow font-semibold">Number Of Guests</h2>
                        <UsersIcon className="h-5"/>
                        <input type="number" 
                        value={numberGuests}
                        onChange={(e)=>setNumberGuests(e.target.value)}
                        min={1}
                        className="w-12 pl-2 text-lg text-red-400 outline-none"/>
                    </div>
                    <div className="flex">
                        <button onClick={resetInput} className="flex-grow text-gray-500">Cancel</button>
                        <button onClick={search} className="flex-grow text-red-400">Search</button>
                    </div>
                </div>
               
            )}
        </header>
    )
}

export default Header
