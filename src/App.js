import React,{useState,useEffect} from 'react'
import {CssBaseline,Grid} from '@material-ui/core'
import Header from './Components/Headers/Header'
import List  from './Components/List/Lists.jsx'
import Map from './Components/Map/Map'
import { getPlacesData } from './api'
const App = () => {
  const [places,setplaces]=useState([])
  const [coordinates,setCoordinates]=useState({})
  const [bounds,setBounds]=useState(null)

  useEffect(()=>{
       navigator.geolocation.getCurrentPosition(({coords:{latitude,longitude}})=>{
        setCoordinates({lat:latitude,lng:longitude})
       })
   },[])
   useEffect(() => {
  if (bounds) {
    getPlacesData(bounds.sw, bounds.ne)
      .then((data) => {
        console.log(data);
        setplaces(data);
      });
  }
}, [coordinates, bounds]);
  return (
    <>
       <CssBaseline/>
       <Header/>
       <Grid container spacing={3} style={{width:'100%'}}>
          <Grid item xs={12} md={4}>
            <List places={places}/>
          </Grid>
          <Grid item xs={12} md={8}>
            <Map
              setCoordinates={setCoordinates}
              setBounds={setBounds}
              coordinates={coordinates}
              places={places}
            />
          </Grid>
       </Grid>
    </>
  )
}

export default App