import React, { useEffect ,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { store } from '../../state/store'
import { getOrders } from '../../state/Admin/order/Action'
import { Button, Card, CardHeader, Paper, Table, TableCell,TableContainer,TableHead,TableRow,TableBody,Avatar, AvatarGroup, Menu ,MenuItem} from '@mui/material'
import { Start } from '@mui/icons-material'

const OrdersTable = () => {
    // const YourComponent = () => {
        // Define state to manage the anchor element for the menu
        const [anchorEl, setAnchorEl] = useState(null);
        const [open, setOpen] = useState(false); 
        // Define the handleClose function to close the menu
       
        const handleClose = () => {
          setAnchorEl(null); // Set the anchor element to null to close the menu
          setOpen(false);
        };
      
        // Define the handleClick function to open the menu
        const handleClick = (event) => {
            console.log("Button clicked");
          setAnchorEl(event.currentTarget); // Set the anchor element to the clicked target to open the menu
        };

  const dispatch=useDispatch()


  const {adminOrder}=useSelector(store=>store)

  useEffect(()=>{
  dispatch(getOrders())
  },[])

  console.log("admin orders", adminOrder)

//   const 
  return (
    <div className='p-10'>
      <Card className='mt-2'>
  <CardHeader title="Total Order Placed"/>
  <TableContainer  component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>IMAGE</TableCell>
            <TableCell align="left">tittle</TableCell>
            <TableCell align="left">Id</TableCell>
            <TableCell align="left">Price</TableCell>
            <TableCell align="left">Status</TableCell>
            <TableCell align="left">Update</TableCell>
            <TableCell align="left">Delate</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {adminOrder?.orders?.map((item) => (
            <TableRow
              key={item.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align='left'>
                <AvatarGroup max={3} sx={{justifyContent:"start"}}>
                  {item?.orderItems.map((orderItem)=><Avatar src={orderItem.product.imageUrl}></Avatar>)}
                </AvatarGroup>
                
              </TableCell>

              <TableCell align='' scope="row">
              {item?.orderItems.map((orderItem)=><p >{orderItem.product.title}</p>)}
                {/* {item.title} */}
              </TableCell>

              
              <TableCell align="left">{item.id}</TableCell>
              <TableCell align="left">{item.totalPrice}</TableCell>
              <TableCell align="left"><span className={`text-white px-5 py-2 rounded-full ${
            item.orderStatus==="CONFIRMED"?"bg-[green]":
            item.orderStatus==="SHIPPED"?"bg-[blue]":
            item.orderStatus==="PLACED"?"bg-[hsl(206,53%,36%)]":
            item.orderStatus==="PANDING"?"bg-[#2d9eba]":
            "bg-[#49e74e]"}`}>{item.orderStatus}</span></TableCell>

              <TableCell align="left">
              <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Status
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        // id="basic-menu"
        // anchorEl={anchorEl}
        // open={open}
        // onClose={handleClose}
        // MenuListProps={{
        //   'aria-labelledby': 'basic-button',
        // }}
      >
        <MenuItem onClick={handleClose}>Confirmed Order</MenuItem>
        <MenuItem onClick={handleClose}>Shipped Order</MenuItem>
        <MenuItem onClick={handleClose}>Deliver Order</MenuItem>
      </Menu>
              </TableCell>
              
              <TableCell align="left">
                <Button  variant='outlined'>DELETE</Button>
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

export default OrdersTable;
