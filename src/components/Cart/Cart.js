import {
    Button,
    Grid,
    Paper,
    Step,
    StepLabel,
    Stepper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    IconButton,
    Container,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import { useHistory } from "react-router-dom";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import axios from "axios";
import { BaseUrl, rupees } from "../constants/baseUrl";
import SweetAlert from "react-bootstrap-sweetalert";
import Loader from "../Loader";
import EmptyCart from "../constants/EmptyCart";
import { connect } from 'react-redux'
import {removeCart} from '../Redux/actions/actions'

function Cart(props) {
    const classes = useStyles();
    const history = useHistory();
    const [activeStep, setActiveStep] = useState(0);
    const [productQuantity, setProductQuantity] = useState([]);
    const [productPrice, setProductPrice] = useState([]);
    const [grandTotal, setGrandTotal] = useState();
    const [cartProducts, setCartProducts] = useState();
    const [sweetAlert, setSweetAlert] = useState(null);
    const [loading, setLoading] = useState(true);
    const [deleteFlag, setDeleteFlag] = useState(false)

    const Additem = (index, price, id) => {
        /**
         * @author Vishal  Yadav
         * @param BaseUrl                   Url from where the data is being fetch
         * @param price                     Price of a single Product
         * @param id                        Product ID of product to be added
         * @param quantity_arr              Quantity Array to update the quantity
         * @param productcost               Product Cost array to update the product Cost
         * @param userdata                  Store logged In userdata from localstorage  
         * @param totalCost                 To calculate the total price of all products in array
         * @package axios                   Library to make HTTP request    
         * @package axios                   Library to make HTTP request        
        */
        const quantity_arr = [...productQuantity];
        const productcost = [...productPrice];
        const userdata = JSON.parse(localStorage.getItem("userdata"));
        const token = userdata.token;
        if (quantity_arr[index] < 10) {
            quantity_arr[index] += 1;

            setProductQuantity(quantity_arr);

            const putQuantity = {
                quantity: `${quantity_arr[index]}`,
            };
            axios.put(`${BaseUrl}/api/cart/${id}`, putQuantity, {
                headers: {
                    Authorization: `${token}`,
                },
            });

            const updatePrice = productcost.map((val, newindex) => {
                if (index === newindex) {
                    const newPrice = price * quantity_arr[newindex];
                    return newPrice;
                }
                return val;
            });
            setProductPrice(updatePrice);
            const totalCost = updatePrice.reduce((a, b) => a + b, 0);
            setGrandTotal(totalCost);
        }
    };

    const Removeitem = (index, price, id) => {
        /**
         * @author Vishal  Yadav
         * @param BaseUrl                   Url from where the data is being fetch
         * @param price                     Price of a single Product
         * @param id                        Product ID of product to be removed
         * @param quantity_arr              Quantity Array to update the quantity
         * @param productcost               Product Cost array to update the product Cost
         * @param userdata                  Store logged In userdata from localstorage  
         * @param totalCost                 To calculate the total price of all products in array  
         * @package axios                   Library to make HTTP request        
        */
        const quantity_arr = [...productQuantity];
        const productcost = [...productPrice];
        const userdata = JSON.parse(localStorage.getItem("userdata"));
        const token = userdata.token;
        if (quantity_arr[index] > 1) {
            quantity_arr[index] -= 1;

            setProductQuantity(quantity_arr);

            const putQuantity = {
                quantity: `${quantity_arr[index]}`,
            };
            axios.put(`${BaseUrl}/api/cart/${id}`, putQuantity, {
                headers: {
                    Authorization: `${token}`,
                },
            });

            const updatePrice = productcost.map((val, newindex) => {
                if (index === newindex) {
                    const newPrice = price * quantity_arr[newindex];
                    return newPrice;
                }
                return val;
            });
            setProductPrice(updatePrice);
            const totalCost = updatePrice.reduce((a, b) => a - b, 0);
            setGrandTotal(Math.abs(totalCost));
        }
    };

    useEffect(() => {
        const userdata = JSON.parse(localStorage.getItem("userdata"));
        if (userdata) {
            const token = userdata.token;
            const price_arr = [];
            const q_arr = [];
            axios
                .get(`${BaseUrl}/api/cart`, {
                    headers: {
                        Authorization: `${token}`,
                    },
                })
                .then((res) => {
                    const temp = res.data.data.products;
                    setCartProducts(temp);
                    setGrandTotal(res.data.data.grandTotal);
                    if (res.status === 200) {
                        temp.map((val) => {
                            return q_arr.push(val.quantity);
                        });

                        setProductQuantity(q_arr);

                        temp.map((val) => {
                            return price_arr.push(val.productId.price);
                        });

                        setProductPrice(price_arr);
                    }
                    setLoading(false)
                });
        } 
        if (props.isLogin) {
            history.push("/cart")
        }
        else {
            history.push("/login")
        }
        setDeleteFlag(false)
    }, [deleteFlag,history]);


    const deleteCartProduct = (p_id) => {
        /**
         * @author Vishal Yadav
         * @param BaseUrl                   Url from where the data is being fetch
         * @param userdata                  Store logged In userdata from localstorage  
         * @function props.removeCart()     Redux function to decrement the navbar product count  
         * @function setDeleteFlag          Update the DeleteFlag by boolean value  
         * @function hideAlert()            Call hideAlert function To hide the SweetAlert Pop-up
         * @package axios                   Library to make HTTP request                  
         */
        const userdata = JSON.parse(localStorage.getItem("userdata"));
        if (userdata) {
            const token = userdata.token;
            axios
                .delete(`${BaseUrl}/api/cart/${p_id}`, {
                    headers: {
                        Authorization: `${token}`,
                    },
                })
                .then(() => {
                    props.removeCart()
                    setDeleteFlag(true)
                });
            hideAlert();
        }
    };


    const deleteProduct = (id) => {
        /**
         * @function getAlert               To open the SweetAlert Pop-up for delete confirmation
         * @function deleteCartProduct      Call deleteCartProduct function by click on Confirm
         * @function hideAlert              Call hideAlert() function to hide the SweetAlert Pop-up
         * @returns JSX
        */
        const getAlert = () => (
            <SweetAlert
                warning
                showCancel
                confirmBtnText="Yes, remove it!"
                confirmBtnBsStyle="danger"
                title="Are you sure?"
                onConfirm={() => deleteCartProduct(id)}
                onCancel={() => hideAlert()}
                focusCancelBtn
            >
                Are you sure, want to remove this product?
            </SweetAlert>
        );
        setSweetAlert(getAlert());
    };
    const hideAlert = () => {
        /**
         * @author Vishal Yadav
         * @function setSweetAlert              useState() Hook function to Hide the SweetAlert
         */
        setSweetAlert(null);        
    };

    return (
        <>
            {loading ? <Loader /> :
                <>
                    {grandTotal !== 0 ? (
                        <>
                            {cartProducts && (
                                <div>
                                    <div className={classes.stepper_root}>
                                        <Stepper
                                            style={
                                                {backgroundColor: "rgb(243, 241, 241)"}}
                                                activeStep={activeStep}
                                            >
                                            <Step>
                                                <StepLabel>Cart</StepLabel>
                                            </Step>
                                            <Step>
                                                <StepLabel>
                                                    Delivery Address
                                                </StepLabel>
                                            </Step>
                                        </Stepper>
                                    </div>

                                    <div>
                                        <Grid container>
                                            <Grid item xs={12} sm={12} md={8}>
                                                <Container>
                                                    <TableContainer
                                                        component={Paper}
                                                    >
                                                        <Table
                                                            className={
                                                                classes.table
                                                            }
                                                            aria-label="simple table"
                                                        >
                                                            <TableHead>
                                                                <TableRow>
                                                                    <TableCell>
                                                                        Product
                                                                    </TableCell>
                                                                    <TableCell align="center">
                                                                        Quantity
                                                                    </TableCell>
                                                                    <TableCell align="center">
                                                                        Price
                                                                    </TableCell>
                                                                    <TableCell align="center">
                                                                        Total
                                                                    </TableCell>
                                                                    <TableCell/>
                                                                </TableRow>
                                                            </TableHead>
                                                            <TableBody>
                                                                {cartProducts &&
                                                                    cartProducts.map(
                                                                        (cartProduct,index) => (
                                                                            <TableRow
                                                                                key={index}
                                                                            >
                                                                                <TableCell
                                                                                    style={{borderBottom:"none",}}
                                                                                    component="th"
                                                                                    className={classes.product_name_root}
                                                                                >
                                                                            
                                                                                    <img
                                                                                        onClick={() => history.push(`product/${cartProduct.productId.id}`)}
                                                                                        src={cartProduct.productId.mainImage}
                                                                                        alt=""
                                                                                        width="70px"
                                                                                        height="70px"
                                                                                    />
                                                                                    
                                                                                    <div className={classes.product_name}>
                                                                                        <Typography className={classes.cart_product_names}>
                                                                                            {cartProduct.productId.name}
                                                                                        </Typography>
                                                                                        <Typography className={classes.cart_product_names}>
                                                                                            Status:{" "}
                                                                                            <span className={classes.status_color}>
                                                                                                In Stock
                                                                                            </span>
                                                                                        </Typography>
                                                                                    </div>
                                                                                </TableCell>

                                                                                <TableCell
                                                                                    style={{ borderBottom: "none", }}
                                                                                    align="center"
                                                                                >
                                                                                    <div
                                                                                        className={classes.quantity_root}>
                                                                                        <IconButton
                                                                                            onClick={() =>
                                                                                                Additem(index,cartProduct.productId.price,cartProduct.id)
                                                                                            }
                                                                                            color="secondary"
                                                                                            component="span"
                                                                                        >
                                                                                            <AddCircleIcon />
                                                                                        </IconButton>
                                                                                        {productQuantity[index]}
                                                                                        <IconButton
                                                                                            onClick={() =>
                                                                                                Removeitem(index,cartProduct.productId.price,cartProduct.id)
                                                                                            }
                                                                                            color="secondary"
                                                                                            component="span"
                                                                                        >
                                                                                            <RemoveCircleIcon />
                                                                                        </IconButton>
                                                                                    </div>
                                                                                </TableCell>

                                                                                <TableCell
                                                                                    align="center"
                                                                                    style={{
                                                                                        borderBottom:"none",
                                                                                    }}
                                                                                >
                                                                                    {rupees}
                                                                                    {
                                                                                        cartProduct.productId.price
                                                                                    }
                                                                                </TableCell>

                                                                                <TableCell
                                                                                    align="center"
                                                                                    style={{
                                                                                        borderBottom: "none",
                                                                                    }}
                                                                                >
                                                                                    {rupees}
                                                                                    {
                                                                                        cartProduct.productId.price * productQuantity[index]
                                                                                    }
                                                                                </TableCell>

                                                                                <TableCell
                                                                                    align="center"
                                                                                    style={{
                                                                                        borderBottom:
                                                                                            "none",
                                                                                    }}
                                                                                >
                                                                                    <IconButton
                                                                                        onClick={() =>
                                                                                            deleteProduct(cartProduct.id)
                                                                                        }
                                                                                        color="secondary"
                                                                                        component="span"
                                                                                    >
                                                                                        <DeleteOutlineIcon />
                                                                                    </IconButton>
                                                                                </TableCell>
                                                                            </TableRow>
                                                                        )
                                                                    )}
                                                            </TableBody>
                                                        </Table>
                                                    </TableContainer>
                                                </Container>
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={4} className={classes.order_summary_grid}>
                                                <Container>
                                                    <TableContainer
                                                        component={Paper}
                                                    >
                                                        <Table>
                                                            <TableHead>
                                                                <TableRow>
                                                                    <Typography
                                                                        className={
                                                                            classes.review_heading
                                                                        }
                                                                    >
                                                                        Review
                                                                        Order
                                                                    </Typography>
                                                                </TableRow>
                                                            </TableHead>
                                                            <TableBody>
                                                                <TableRow>
                                                                    <TableCell>
                                                                        Subtotal
                                                                    </TableCell>
                                                                    <TableCell align="right">
                                                                        {rupees}
                                                                        {
                                                                            grandTotal
                                                                        }
                                                                    </TableCell>
                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell>
                                                                        GST(5%)
                                                                    </TableCell>
                                                                    <TableCell align="right">
                                                                        {rupees}
                                                                        {
                                                                            ((grandTotal / 100) * 5).toFixed(2)
                                                                        }
                                                                    </TableCell>
                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell>
                                                                        Order
                                                                        Total
                                                                    </TableCell>
                                                                    <TableCell align="right">
                                                                        {rupees}
                                                                        {(grandTotal + (grandTotal / 100) * 5).toFixed(2)}
                                                                    </TableCell>
                                                                </TableRow>

                                                                {/* <TableCell
                                                                    align="center"
                                                                    className={
                                                                        classes.buy_button_root
                                                                    }
                                                                > */}
                                                                    <Button
                                                                        onClick={() => {
                                                                            setActiveStep(activeStep + 1);                                             
                                                                            setTimeout(
                                                                                () => {
                                                                                    history.push({
                                                                                        pathname: "/ordersummary",
                                                                                    });
                                                                                },
                                                                                1000
                                                                            );
                                                                        }}
                                                                        className={classes.buy_button}
                                                                        variant="contained"
                                                                        color="primary"
                                                                    >
                                                                        Proceed to Buy
                                                                    </Button>
                                                                {/* </TableCell> */}
                                                            </TableBody>
                                                        </Table>
                                                    </TableContainer>
                                                </Container>
                                            </Grid>
                                        </Grid>
                                    </div>

                                    {/* Sweet Alert----------------------------------------- */}
                                    {sweetAlert}
                                </div>
                            )}
                        </>
                    ) : (
                       <EmptyCart/>
                    )}
                </>
            }
        </>
    );
}
const mapStateToProps = (state) => ({
    isLogin : state.perReducer.isLogin
})
const mapDispatchToProps = (dispatch) => ({
    removeCart: () => {
        dispatch(removeCart())
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(Cart)
