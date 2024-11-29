import React, { useEffect, useState } from 'react'

function Cards(props) {
  
  
  let [menu,setmenu]=useState([]);
  function getAll(){
    
  }

  
 useEffect(()=>{
  setmenu(props.items);
  console.log(menu);
 })
  
  return (
    
    <>
   
    {
      // menu.map((x)=>{
      //   return (<div>{x.food_id}
      //   <br/>{x.food_name}</div>
      //   )
      // })
    }
       
    </>
  )
}

export default Cards
