import React, { useEffect, useState } from 'react'
import Search from './Search'
import axios from 'axios'
import Loader from './Loader'

function Weather() {
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(false)
    const [weatherData, setWeatherData] = useState(null)

    async function fetchWeatherApi(param) {
        setLoading(true)
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=${import.meta.env.VITE_API_KEY_WEATHER}&units=metric`)

            console.log("recived data is ", response)
            if (response) {
                setLoading(false)
                setWeatherData(response)
            }
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    function handleGetWeather() {
        fetchWeatherApi(search)
    }

    useEffect(() => {
        fetchWeatherApi("pune")
    }, [])

    const getCurrentDate = () => {
        return new Date().toLocaleDateString("en-us", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric"
        })
    }

    return (

        <div className='flex w-full border-4 h-full py-16 flex-col items-center justify-center gap-3  rounded-md'>
            <h1 className='text-2xl font-extrabold underline'>Weather App</h1>


            <Search
                search={search}
                setSearch={setSearch}
                handleGetWeather={handleGetWeather}
                className=""
            />

            

            {
                loading ? <div><Loader/></div> :

                    <div className='flex gap-2 flex-col mt-4'>

                        <div className='font-bold text-xl flex items-center justify-center gap-3'>

                            <h2>{weatherData?.data?.name}</h2> 
                            <span className='text-sm font-bold text-gray-600  '>
                                {weatherData?.data?.sys?.country}
                            </span> 
                            <img src={`https://openweathermap.org/img/wn/${weatherData?.data?.weather[0]?.icon}.png`} alt="" />
                        </div>
                        <div className='font-semibold'> <span>{getCurrentDate()}</span></div>


                        <div className='flex flex-col mt-4 gap-3 text-xl'>

                            <div>It is <span className='font-bold underline'>{weatherData?.data?.weather[0]?.description} </span>{" "}
                            Today
                            </div>

                            <div>
                                <h2>Temperature</h2>
                                <span className="font-bold">{weatherData?.data.main?.temp} &deg;C</span>

                            </div>
                            <div className='flex gap-4 justify-center items-center'>
                                <div><p>Wind Speed</p>
                                    <p>{weatherData?.data?.wind?.speed} Km/h</p>
                                </div>

                                <div><p>Humidity</p><p>{weatherData?.data?.main?.humidity}%</p>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </div>

    )
}

export default Weather