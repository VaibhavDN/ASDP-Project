import React, {useState, useEffect, useRef, useMemo} from 'react'
import ReactDOM from 'react-dom'
import "../CSS/threedcarmodel.css"

const ShowCar = props => {
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
}
