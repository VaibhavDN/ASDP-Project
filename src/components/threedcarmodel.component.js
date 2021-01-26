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
    
    const RenderCar = (props) => {
    const { scene, animations } = useLoader(GLTFLoader, "carModels/" + props.carName + "/scene.gltf") //props.carName
    console.log("Car Rendered: ",  props.carName)
    console.log('Scene: ', scene)
    console.log('Animations: ', animations)

    const mixer = useMemo(() => new THREE.AnimationMixer(scene), [scene])
    
    useEffect(() => animations.forEach(clip => mixer.clipAction(clip).play()), [animations, mixer])

    return <primitive object={scene} />
    }
    
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
    
    console.log("cameraZoom: ", cameraZoom)

    let zoomlevel = parseInt(window.innerWidth/ cameraZoom)
    let cameraConfig = { zoom: 1*zoomlevel+19, position: [80, 50, 200] }
    console.log("cz: ", cameraConfig.zoom)
            
    <div className="col-* showCarDiv">
                    <div>
                        <ShowCarName carName={carSelected}/>
                    </div>
                    <center>
                    <Canvas style={{ height:window.innerHeight/1.5, width:window.innerWidth/1.95, zoom: 1, backgroundColor:"#EEE" }} orthographic camera={cameraConfig}>
                        <ambientLight />
                        <directionalLight intensity={lightInt} position={[0, 0, -45]} />
                        <directionalLight intensity={lightInt} position={[0, 0, -135]} />
                        <directionalLight intensity={lightInt} position={[45, 0, 0]} />
                        <directionalLight intensity={lightInt} position={[135, 0, 0]} />
                        <directionalLight intensity={lightInt} position={[-45, 0, 0]} />
                        <directionalLight intensity={lightInt} position={[-135, 0, 0]} />
                        <directionalLight intensity={lightInt} position={[0, 45, 0]} />
                        <directionalLight intensity={lightInt} position={[0, 135, 0]} />
                        <directionalLight intensity={lightInt} position={[0, 0, 45]} />
                        <directionalLight intensity={lightInt} position={[0, 0, 135]} />
                        <directionalLight intensity={lightInt} position={[0, 0, -45]} />
                        <directionalLight intensity={lightInt} position={[0, 0, -135]} />
                        <rectAreaLight width={3} height={3} color={"#FFF"} intensity={10} 
                            position={[-2, 0, 5]} lookAt={[0, 0, 0]} penumbra={1} castShadow 
                        />

                        <OrbitControls />
                        <camera position={[0, 100, 100]} />

                        <Suspense fallback={<Loading/>}>
                            <RenderCar carName={carSelected} />
                        </Suspense>
                    </Canvas>
                    </center>
                </div>
    
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
