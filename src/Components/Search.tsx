import React from 'react'

function Search({search, setSearch , handleGetWeather ,className}) {
  return (
    <div className='flex gap-3 '>
      <input type="text"
      className={`   px-4 rounded-md border-2 w-[14rem] border-black text-lg font-bold underline ${className}`} 
      placeholder='Enter City Name'
      value={search}
      onChange={(e)=> setSearch(e.target.value)}
      />
      <button className=' p-4 bg-black rounded-lg border-2 text-white font-bold border-white' onClick={handleGetWeather}>Get Weather</button>
    </div>
  )
}

export default Search