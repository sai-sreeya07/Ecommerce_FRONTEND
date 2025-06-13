import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { store } from '../../state/store';
import { getOrders, deleteOrder, confirmOrder, shipOrder, deliveredOrder } from '../../state/Admin/order/Action'; // Import the new actions
import { Button, Card, CardHeader, Paper, Table, TableCell, TableContainer, TableHead, TableRow, TableBody, Avatar, AvatarGroup, Menu, MenuItem } from '@mui/material';
import { Start } from '@mui/icons-material';

const OrdersTable = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [openMenuId, setOpenMenuId] = useState(null); // State to track which order's menu is open

    const dispatch = useDispatch();
    const { adminOrder } = useSelector(store => store);

    useEffect(() => {
        dispatch(getOrders());
    }, [dispatch]); // Add dispatch to dependency array

    console.log("admin orders", adminOrder);

    const handleClose = () => {
        setAnchorEl(null);
        setOpenMenuId(null); // Reset the open menu ID
    };

    // Modified handleClick to store the orderId
    const handleClick = (event, orderId) => {
        setAnchorEl(event.currentTarget);
        setOpenMenuId(orderId); // Set the ID of the order whose menu is open
    };

    const handleOrderDelete = (orderId) => {
        dispatch(deleteOrder(orderId));
    };

    // New handler functions for status updates
    const handleConfirmOrder = (orderId) => {
        dispatch(confirmOrder(orderId));
        handleClose(); // Close the menu after dispatching
    };

    const handleShipOrder = (orderId) => {
        dispatch(shipOrder(orderId));
        handleClose();
    };

    const handleDeliverOrder = (orderId) => {
        dispatch(deliveredOrder(orderId));
        handleClose();
    };

    return (
        <div className='p-10'>
            <Card className='mt-2'>
                <CardHeader title="Total Order Placed" />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>IMAGE</TableCell>
                                <TableCell align="left">Title</TableCell>
                                <TableCell align="left">Id</TableCell>
                                <TableCell align="left">Price</TableCell>
                                <TableCell align="left">Status</TableCell>
                                <TableCell align="left">Update</TableCell>
                                <TableCell align="left">Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {adminOrder?.orders?.map((item) => (
                                <TableRow
                                    key={item.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align='left'>
                                        <AvatarGroup max={3} sx={{ justifyContent: "start" }}>
                                            {item?.orderItems.map((orderItem) => <Avatar key={orderItem.product.id} src={orderItem.product.imageUrl}></Avatar>)}
                                        </AvatarGroup>
                                    </TableCell>

                                    <TableCell align='' scope="row">
                                        {item?.orderItems.map((orderItem) => <p key={orderItem.product.id}>{orderItem.product.title}</p>)}
                                    </TableCell>

                                    <TableCell align="left">{item.id}</TableCell>
                                    <TableCell align="left">{item.totalPrice}</TableCell>
                                    <TableCell align="left">
                                        <span className={`text-white px-5 py-2 rounded-full ${
                                            item.orderStatus === "CONFIRMED" ? "bg-[green]" :
                                            item.orderStatus === "SHIPPED" ? "bg-[blue]" :
                                            item.orderStatus === "PLACED" ? "bg-[hsl(206,53%,36%)]" :
                                            item.orderStatus === "PENDING" ? "bg-[#EBEB00]" :
                                            "bg-[#49e74e]"
                                        }`}>
                                            {item.orderStatus}
                                        </span>
                                    </TableCell>

                                    <TableCell align="left">
                                        <Button
                                            id={`status-button-${item.id}`} // Unique ID for each button
                                            aria-controls={openMenuId === item.id ? `status-menu-${item.id}` : undefined} // Only open if this order's menu is active
                                            aria-haspopup="true"
                                            aria-expanded={openMenuId === item.id ? 'true' : undefined}
                                            onClick={(event) => handleClick(event, item.id)} // Pass item.id to handleClick
                                        >
                                            Status
                                        </Button>
                                        <Menu
                                            id={`status-menu-${item.id}`} // Unique ID for each menu
                                            aria-labelledby={`status-button-${item.id}`}
                                            anchorEl={anchorEl}
                                            open={openMenuId === item.id} // Only open if this order's menu is active
                                            onClose={handleClose}
                                            anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'left',
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'left',
                                            }}
                                        >
                                            <MenuItem onClick={() => handleConfirmOrder(openMenuId)}>Confirmed Order</MenuItem>
                                            <MenuItem onClick={() => handleShipOrder(openMenuId)}>Shipped Order</MenuItem>
                                            <MenuItem onClick={() => handleDeliverOrder(openMenuId)}>Deliver Order</MenuItem>
                                        </Menu>
                                    </TableCell>

                                    <TableCell align="left">
                                        <Button onClick={() => handleOrderDelete(item.id)} variant='outlined'>DELETE</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </div>
    );
};

export default OrdersTable;