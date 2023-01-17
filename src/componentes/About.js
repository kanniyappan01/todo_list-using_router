import React, { useContext, useState } from 'react'
import { globalContext } from '../context/Context'
// import { DataGrid } from '@mui/x-data-grid';

// meterial ui

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
// import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


function About() {
  const [search,setSearch] = useState()
  const [form,setForm] = useState(false)
  const {state,dispatch} = useContext(globalContext)

  // delete product
  const deleteProduct = (id)=>{
    dispatch({
      type:"add_to_cart",
      payload :  state.products.filter((item)=> item.id !== id)
    })
  }

  // edit product
  const initialFormState = {id:null,productName:'',price:"",qty:""}
  const [updateProduct,setUpdateProduct] = useState(initialFormState)
  const [data,setData] = useState(updateProduct)
  console.log(data)
  const editProduct=(product)=>{
    setForm(true)
    setUpdateProduct({id:product.id,productName:product.productName,price:product.price,qty:product.qty})
  }
  
  // form handle Changes
  
  const handleChange = (event)=>{
    const {name,value} = event.target;
    setUpdateProduct({...updateProduct,[name]:value})
  }

  const handleSubmit = (event)=>{
    event.preventDefault();
    if(!(updateProduct.productName&&updateProduct.price && updateProduct.qty)){
      return
    }else{
      // updateProduct(data.id,data)
      dispatch({
        type:"add_to_cart",
        payload: state.products.map((item)=> item.id === updateProduct.id ? updateProduct : item)
      })
      setForm(false)

    }
  }

  // quantity increment and decrement

  const decrementQty = (product)=>{
    dispatch({
      type:"add_to_cart",
      payload: state.products.map((item)=> item.id === product.id ? {...product,qty:product.qty-1} : item)
    })
    if(product.qty <= 1 ){
      deleteProduct(product.id)
    }
  }

  const incrementQty =(product)=>{
    dispatch({
      type:"add_to_cart",
      payload: state.products.map((item)=> item.id === product.id ? {...product,qty:product.qty+1}:item)
    })
  }


  return (
    <div>
        <TableContainer component={Paper} style={{marginTop:"10px"}}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">No</StyledTableCell>
            <StyledTableCell align="center">Product Name</StyledTableCell>
            <StyledTableCell align="center">price</StyledTableCell>
            <StyledTableCell align="center">Quantity</StyledTableCell>
            <StyledTableCell align="center">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {state.products.length > 0 ?(state.products.map((product,index) => (
            <StyledTableRow key={index}>
              <StyledTableCell align="center" component="th" scope="row">
                {index+1}
              </StyledTableCell>
              <StyledTableCell align="center">{product.productName}</StyledTableCell>
              <StyledTableCell align="center">₹ {product.price}</StyledTableCell>
              <StyledTableCell align="center" sx={{
                  display:"flex",
                  justifyContent:"center",
                  flexDirection:"row"
                }}>
                <Box  sx={{
                  display:"flex",
                
                }}>
                  <Button size="medium"  onClick={()=>decrementQty(product)}>{<RemoveIcon fontSize='small'/>}</Button>
                  <p className="quantity">{product.qty}</p>
                  <Button size="medium" onClick={()=>incrementQty(product)}>{<AddIcon fontSize='small'/>}</Button>
                </Box>
                </StyledTableCell>
              <StyledTableCell align="center">
                <Button size='small' variant='contained' onClick={()=>editProduct(product)} startIcon={<EditIcon/>}>EDIT</Button>

                <Button  variant='outline' color="success" onClick={()=> deleteProduct(product.id)} startIcon={<DeleteIcon color='error'/>}>
                  DELETE
                </Button>

              </StyledTableCell>

            </StyledTableRow>
          ))):(
            <StyledTableRow >
              <StyledTableCell colSpan={5} align="center"><h3>No User Data</h3> </StyledTableCell>
            </StyledTableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
    {form ? (<div className='edit-form-container'>
      <h2>Update Products</h2>
      
      <form>
        <div className='input-field'>
            <TextField style={{width:"100%"}} type="text" label="Product Name"  size='small' margin='dense'  required name='productName' value={updateProduct.productName} onChange={handleChange}/>
        </div>
        <div className='input-field'>
            <TextField style={{width:"100%"}} type={"number"} label="price" size='small'  name='price' required value={updateProduct.price} onChange={handleChange}/>
        </div>
        <div className='input-field'>
            <TextField style={{width:"100%"}} type={"number"} label="quantity" size='small'  name='qty' required value={updateProduct.qty} onChange={handleChange}/>
        </div>
        <div className='btn-group'>
          <Button variant='contained' className='submit-btn' onClick={handleSubmit} >Update Product</Button>
          <Button variant='contained' className='cancel-btn' onClick={()=>setForm(false)} color='error' >cancel</Button>
        </div>
      </form>
    </div>):null}
    </div>
    
  )
}

export default About