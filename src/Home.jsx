import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BsArrowThroughHeartFill,
  BsAsterisk,
  BsPeopleFill,
  BsFillBellFill,
} from 'react-icons/bs';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

function Home() {
  const [covidData, setCovidData] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    if (selectedDate) {
      fetchHistoricalData(selectedDate);
    }
  }, [selectedDate]);

  const fetchHistoricalData = async (date) => {
    const apiUrl = 'https://disease.sh/v3/covid-19/all';
    try {
      const response = await axios.get(apiUrl);
      const historicalData = response.data;
      setCovidData(historicalData);
    } catch (error) {
      console.error('Error fetching historical COVID-19 data:', error);
    }
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const renderChart = () => {
    if (!covidData) {
      return null;
    }

    const data = [
      { name: 'Cases', value: covidData.todayCases },
      { name: 'Deaths', value: covidData.deaths },
      { name: 'Recovered', value: covidData.recovered },
    ];

    return (
      <ResponsiveContainer width='100%' height={300}>
        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey='value' fill='#8884d8' />
        </BarChart>
      </ResponsiveContainer>
    );
  };

  return (
    <main className='main-container'>
      <div className='main-title'>
        <h3>DASHBOARD</h3>
      </div>

      <div>
        <label>Select Date: </label>
        <input type='date' value={selectedDate} onChange={handleDateChange} />
      </div>

      <div className='main-cards'>
        <div className='card'>
          <div className='card-inner'>
            <h3>TodayCases</h3>
            <BsArrowThroughHeartFill className='card_icon' />
          </div>
          <h1>{covidData && covidData.todayCases.toLocaleString()}</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>TodayDeaths</h3>
            <BsAsterisk className='card_icon' />
          </div>
          <h1>{covidData && covidData.todayDeaths.toLocaleString()}</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>Recovered</h3>
            <BsPeopleFill className='card_icon' />
          </div>
          <h1>
            {covidData && covidData.recovered && covidData.recovered.toLocaleString()}
          </h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>Deaths</h3>
            <BsFillBellFill className='card_icon' />
          </div>
          <h1>{covidData && covidData.deaths && covidData.deaths.toLocaleString()}</h1>
        </div>
      </div>

      <div className='charts'>
        {renderChart()}
      </div>
    </main>
  );
}

export default Home;