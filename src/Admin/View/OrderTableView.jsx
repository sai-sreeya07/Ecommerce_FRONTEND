// src/admin/components/OrdersTable.jsx

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { confirmOrder, deleteOrder, deliveredOrder, getOrders, shipOrder } from '../../state/Admin/order/Action';
import {
    Button, Card, CardHeader, Paper, Table, TableCell,
    TableContainer, TableHead, TableRow, TableBody, Avatar, AvatarGroup, Menu, MenuItem
} from '@mui/material';

const OrdersTable = () => {
    const dispatch = useDispatch();
    const { adminOrder } = useSelector(store => store);

    const [anchorEl, setAnchorEl] = useState(null);
    const [currentOrderId, setCurrentOrderId] = useState(null);

    const handleClick = (event, orderId) => {
        setAnchorEl(event.currentTarget);
        setCurrentOrderId(orderId);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setCurrentOrderId(null);
    };

    useEffect(() => {
        dispatch(getOrders());
    }, []);

    const handleShipOrder = (orderId) => {
        dispatch(shipOrder(orderId));
        handleClose();
        setTimeout(() => dispatch(getOrders()), 500);
    };

    const handleConfirmedOrder = (orderId) => {
        dispatch(confirmOrder(orderId));
        console.log("handle confirmed Order ", orderId);
        handleClose();
        setTimeout(() => dispatch(getOrders()), 500);
    };

    const handleDeliveredOrder = (orderId) => {
        dispatch(deliveredOrder(orderId));
        handleClose();
        setTimeout(() => dispatch(getOrders()), 500);
    };

    const handleDeleteOrder = (orderId) => {
        console.log("--- handleDeleteOrder called for ID:", orderId); // Added log for debugging
        dispatch(deleteOrder(orderId));
        // handleClose(); // No need to close a menu if this is a separate button click
        setTimeout(() => dispatch(getOrders()), 500);
    };

    console.log("admin orders", adminOrder); // Logs the admin orders state

    return (
        <div className='p-10'>
            <Card className='mt-2'>
                <CardHeader title="Total Order Placed" />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>IMAGE</TableCell>
                                <TableCell align="left">TITLE</TableCell>
                                <TableCell align="left">ID</TableCell>
                                <TableCell align="left">PRICE</TableCell>
                                <TableCell align="left">STATUS</TableCell>
                                <TableCell align="left">UPDATE ACTION</TableCell> {/* Renamed for clarity */}
                                <TableCell align="left">DELETE ACTION</TableCell> {/* New column for delete button */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {adminOrder?.orders?.length > 0 ? (
                                adminOrder.orders.map((item) => (
                                    <TableRow
                                        key={item.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align='left'>
                                            <AvatarGroup max={3} sx={{ justifyContent: "start" }}>
                                                {item?.orderItems.map((orderItem) => (
                                                    <Avatar key={orderItem.id} src={orderItem.product.imageUrl} alt={orderItem.product.title}></Avatar>
                                                ))}
                                            </AvatarGroup>
                                        </TableCell>

                                        <TableCell align='left' component="th" scope="row">
                                            {item?.orderItems.map((orderItem) => (
                                                <p key={orderItem.id}>{orderItem.product.title}</p>
                                            ))}
                                        </TableCell>

                                        <TableCell align="left">{item.id}</TableCell>
                                        <TableCell align="left">{item.totalPrice}</TableCell>
                                        <TableCell align="left">
                                            <span className={`text-white px-5 py-2 rounded-full ${
                                                item.orderStatus === "CONFIRMED" ? "bg-green-600" :
                                                item.orderStatus === "SHIPPED" ? "bg-blue-600" :
                                                item.orderStatus === "PLACED" ? "bg-blue-800" :
                                                item.orderStatus === "PENDING"  ? "bg-yellow-600" :
                                                item.orderStatus === "DELIVERED" ? "bg-purple-600" :
                                                "bg-gray-500"
                                            }`}>
                                                {item.orderStatus}
                                            </span>
                                        </TableCell>
                                        <TableCell align="left">
                                            <Button
                                                id={`status-button-${item.id}`}
                                                aria-controls={anchorEl && currentOrderId === item.id ? `basic-menu-${item.id}` : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={anchorEl && currentOrderId === item.id ? 'true' : undefined}
                                                onClick={(e) => handleClick(e, item.id)}
                                            >
                                                UPDATE STATUS
                                            </Button>
                                            <Menu
                                                id={`basic-menu-${item.id}`}
                                                anchorEl={anchorEl}
                                                open={Boolean(anchorEl) && currentOrderId === item.id}
                                                onClose={handleClose}
                                                MenuListProps={{
                                                    'aria-labelledby': `status-button-${item.id}`,
                                                }}
                                            >
                                                <MenuItem onClick={() => handleConfirmedOrder(item.id)}>Confirmed</MenuItem>
                                                <MenuItem onClick={() => handleShipOrder(item.id)}>Shipped</MenuItem>
                                                <MenuItem onClick={() => handleDeliveredOrder(item.id)}>Delivered</MenuItem>
                                                {/* <MenuItem onClick={() => handleCanceledOrder(item.id)}>Canceled</MenuItem> */}
                                            </Menu>
                                        </TableCell>
                                        <TableCell align="left">
                                            {/* SEPARATE DELETE BUTTON */}
                                            <Button
                                                onClick={() => handleDeleteOrder(item.id)}
                                                variant="contained" // Added variant for better visibility
                                                color="error" // Added color for delete action
                                            >
                                                DELETE
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={7} align="center"> {/* Adjusted colspan */}
                                        {adminOrder.loading ? "Loading orders..." : "No orders found."}
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </div>
    );
};

export default OrdersTable;