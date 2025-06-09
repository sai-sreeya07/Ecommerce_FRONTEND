import { Avatar, Button, Card, CardHeader, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { store } from '../../state/store';
import { deleteProduct, findProducts } from '../../state/Product/Action';

// const rows =[
    
// ];

const ProductsTable = () => {
  const dispatch=useDispatch();
  const {products}=useSelector(store=>store);

  console.log("products ---- ",products)

  const handleProductDelete=(productId)=>{
    dispatch(deleteProduct(productId))
  }

  useEffect(()=>{
    const data={
      category:"",
      colors: [],
      sizes: [],
      minPrice:null,
      maxPrice:100000,
      minDiscount: 0,
      sort : "price_low",
      pageNumber: 0,
      pageSize:5,
      stock:""
    }
    dispatch(findProducts(data))
  },[])
  // console.log("Peosextcfvgbuhnjm",products.product.content)

  const productData=products.products
const productObject = {
  products: {
    content: productData,
  },
};
  
  return (
    <div className='p-5'>

<Card className='mt-2'>
  <CardHeader title="All Products"/>
  <TableContainer  component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>IMAGE</TableCell>
            <TableCell align="left">tittle</TableCell>
            <TableCell align="left">Description</TableCell>
            <TableCell align="left">Price</TableCell>
            <TableCell align="left">Quantity</TableCell>

            <TableCell align="left">Delate</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productData.map((item) => (
            <TableRow
              key={item.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align='left'>
                <Avatar src={item.imageUrl}></Avatar>
              </TableCell>

              <TableCell align='' scope="row">
                {item.title}
              </TableCell>

              
              <TableCell align="left">{item.description}</TableCell>
              <TableCell align="left">{item.price}</TableCell>
              <TableCell align="left">{item.quantity}</TableCell>
              <TableCell align="left">
                <Button onClick={()=>handleProductDelete(item.id)} variant='outlined'>DELETE</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

</Card>
        
    </div>
  )
}

export default ProductsTable