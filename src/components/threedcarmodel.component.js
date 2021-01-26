import React, {useState, useEffect, useRef, useMemo} from 'react'
import ReactDOM from 'react-dom'
import "../CSS/threedcarmodel.css"

const ShowCar = props => {
        
      const [carStats, setCarStats] = useState({
        bhp: 0.0,
        mileage: 0.0,
        engine: 0.0,
        seats: 0,
        transmission: "automatic",
    })

          useEffect(()=>{
        setCarList(Object.keys(props.carConfig))

        let list = Object.keys(props.carConfig)
        setCarList(list)
        console.log("Car: ", list)

        if(objsize !== 0){
            let carConfig = props.carConfig
            console.log(carSelected)
            let configData = carConfig[carSelected]
            console.log("configData: ", configData)
            let lightIntValue = configData['light_intensity']
            let zoomValue = configData['zoom']
            console.log("light_intensity: ", lightIntValue, "Zoom: ", zoomValue)
            let bhp = configData['bhp']
            let engine = configData['engine']
            let mileage = configData['mileage']
            let transmission = configData['transmission']
            let seats = configData['seats']
    
            setLightInt(lightIntValue)
            setCameraZoom(zoomValue)
            setCarStats({
                bhp: bhp,
                engine: engine,
                mileage: mileage,
                transmission: transmission,
                seats: seats
            })
        }
    }, [objsize, carSelected, props.carConfig])
    
    
    function filterFunction(){
        let input = document.getElementById("filterCarSelectList")
        let filter = input.value.toUpperCase()
        let li = document.getElementsByTagName("li")

        for(let itr=0; itr < li.length; itr++){
            let text = li[itr].textContent || li[itr].innerText

            if( text.toUpperCase().indexOf(filter) !== -1 ){
                li[itr].style.display = ""
            } 
            else{
                li[itr].style.display = "none"
            }
        }
    }
    
    // Implement setNewCarItem function here
  
    const carListItems = carList.map((carItem)=>{
        return (
            <li key={carItem} onClick={setNewCarItem}>
                {carItem}
            </li>
        )
    })
    
    <div className="col-* statDiv">
                    <center>
                        <h5>Stats</h5>
                        <div className="vehicleStats">
                            <div>Car name: <span className="vehicleStatsValues"> {carSelected} </span></div>
                            <div>BHP: <span className="vehicleStatsValues"> {carStats.bhp} </span></div>
                            <div>Engine: <span className="vehicleStatsValues"> {carStats.engine} cc </span></div>
                            <div>Mileage: <span className="vehicleStatsValues"> {carStats.mileage} per litre </span></div>
                            <div>Seats: <span className="vehicleStatsValues"> {carStats.seats} </span></div>
                            <div>Transmission: <span className="vehicleStatsValues"> {carStats.transmission} </span></div>
                        </div>
                    </center>
                </div>
}
