import { useEffect , useState } from 'react';
import './App.css';
import Header from './components/Header';
import Map from './components/Map';

function App() {
  const [IPaddressData, setIPaddressData] = useState({})
  const [coords, setcoords] = useState({})
  const [loading, setloading] = useState(true)
  useEffect(() => {
    
    getIPAddressLocation()
  
    
  }, [])

  const getIPAddressLocation = async() => {
    const response = await fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.REACT_APP_API_KEY}`
    )
    const data = await response.json()
    setIPaddressData(data)
    setcoords({lat : data.location.lat , lng  : data.location.lng})
    
    setloading(false)
    

  }
  
  return (
    <div className="App ">
      <Header IPaddressData={IPaddressData} setIPaddressData={setIPaddressData} loading = {loading} setloading={setloading} setcoords={setcoords}/>

      <Map coords={coords} loading = {loading} />
    </div>
  );
}

export default App;
