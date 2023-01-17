import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'

function Service() {
  const navigate = useNavigate()
  const handleData = ()=>{
    navigate({
      pathname: "/contact",
      search: "?id=20&&name=kavi"
    })
  }
  return (
    <div>
        <h1>Service Page</h1>
        <Button onClick={handleData} variant="contained" >Contained</Button>
    </div>
  )
}

export default Service