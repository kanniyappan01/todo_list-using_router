import { Button, TextField } from '@mui/material'
import React, { useContext, useState } from 'react'
// import { useParams } from 'react-router-dom'
import { globalContext } from '../context/Context'

function Home() {

  const {state,dispatch} = useContext(globalContext)

  const initialFormState = {id:null,productName:'',price:"",qty:null}

  const [data,setData] = useState(initialFormState)
  const [id,setId] = useState(4)
  const handleInput = (event)=>{
    const {name,value} = event.target;

    setData({...data,[name]:value})
  }
  console.log(data)

  const handleSubmit = (event)=>{
    event.preventDefault();

    if(!(data.price&&data.productName)){
      return;
    }else{
      const isproductExist = state.products.find((item)=> item.productName === data.productName )
      if(isproductExist){
        // const prod = state.products.map((item)=> item.productName === data.productName ? {...isproductExist,qty:isproductExist.qty+1}: item)
        // console.log(prod)
        dispatch({
          type:"add_to_cart",
          payload : state.products.map((item)=> item.productName === data.productName ? {...isproductExist,qty:isproductExist.qty+1}: item)
        })
      }else{
        setId(id+1)
        data.id = id;
        dispatch({
          type:"add_to_cart",
          payload: [...state.products,{...data,qty:1}],
        })
      }
      
      setData(initialFormState)
    }
  }
  return (
    <div>
      <div className='edit-form-container'>
        <h1>Add Products</h1>
        <div className='form-container'>

          <form >
            <div className='input-field'>
                <TextField  type="text" style={{width:"100%"}} label="Product Name" size='small' margin='dense' value={data.productName} required name='productName' onChange={handleInput}/>
            </div>
            <div className='input-field'>
                <TextField  type={"number"} style={{width:"100%"}} label="Product price" size='small' value={data.price} name='price' required onChange={handleInput}/>
            </div>

            <Button variant='contained' className='submit-btn' onClick={handleSubmit}>Submit</Button>

          </form>
        </div>
      </div>
    </div>
    
  )
}

export default Home