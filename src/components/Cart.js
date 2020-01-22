import React, {  useRef, useState, useEffect } from 'react';
import CartItem from './CartItem'
import {Rtif} from '../Rtif';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

export default function Cart({cart, setCart}) {
    const tableStyle = {
        border: '1px solid #bdbaba'
    }    
    const colStyle = {
        border: '1px solid #bdbaba'
    } 
    const numStyle = {
        border: '1px solid #bdbaba',
        textAlign: 'right'
    }     
    const subTitleStyle = {
        border: '1px solid #bdbaba',
        fontSize: '22px'
    } 
    const [total, setTotal] = useState([ ]);

    // Dialog
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
        setCart( [] );      
    };
    
    // End of Dialog

    useEffect(()=>{
        if(cart === null || cart === undefined){
            cart = []
            setCart(cart);            
            setTotal(0);
        }else{
            calculateTotal(cart);
        }
    },[cart]) ; //Since array is empty it will be called once. 
    function calculateTotal(newCart){
        let total = 0;
        newCart.map((cartItem) => {
            total = total + cartItem.totalItemCost;
        });    
        setTotal(total);
    }          
    function togglecart(id){
        const newCart = [...cart];
        const cartItem = newCart.find( cart => cart.id ===id );
        cartItem.complete =  !cartItem.complete;
        setCart(newCart);        
    }   
    function clearCart(){
        const newCart = [...cart];
        setCart( newCart.filter( cartItem => !cartItem.complete ) );      
        calculateTotal(newCart);
    }    
    function checkOut(){
        // alert('You will be charged a total of $'+ total + ". Your items will be shipped shortly." );
        handleClickOpen();
    }       
    return (
        <> 
            <Rtif boolean={total === 0}>
                <h1 style={subTitleStyle}>Your Shopping Cart is empty.</h1>
            </Rtif>                                  
            <Rtif boolean={total > 0}>
                <table style={tableStyle}>
                    <tbody>
                        <tr>
                            <th style={subTitleStyle} colSpan="5">Shopping Cart</th>
                        </tr>                        
                        <tr>
                            <th style={colStyle}>#</th><th style={colStyle}></th><th style={colStyle}>Item</th>
                            <th style={colStyle}>Quantity</th><th style={colStyle}>Total $</th>
                        </tr>
                        {cart.map( data => (
                            <tr  key={data.id}>
                                <CartItem cartItem={data} toggleCartItem={togglecart}></CartItem>
                            </tr>
                        ))}
                        <tr>
                            <th style={colStyle} colSpan="4">Grand Total</th><th style={numStyle}>
                                {new Intl.NumberFormat("en-US", {
                                    minimumFractionDigits: 2, maximumFractionDigits: 2
                                }).format(total)}                                  
                            </th>
                        </tr>
                        <tr>
                            {/* <th style={colStyle} ></th>     */}
                            <th style={colStyle} colSpan="3">
                                <Button variant="contained"  onClick={clearCart}>Clear Selected</Button>
                            </th>
                            <th style={colStyle} colSpan="2">
                                <Button variant="contained" color="primary" onClick={checkOut}>Check Out</Button>
                            </th>
                        </tr>
                    </tbody>
                </table>
            </Rtif>                            

                <Dialog
                    fullScreen={fullScreen}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">{"Shipping Confirmation"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <br></br>
                            <b>You will be charged a total of ${total}. Your items will be shipped shortly.</b>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={handleClose} autoFocus>OK</Button>
                    </DialogActions>
                </Dialog>
            
        </> 

    )
}
