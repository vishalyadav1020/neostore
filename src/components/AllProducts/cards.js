import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import useStyles from "../TopProducts/productstyles";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { BaseUrl } from "../constants/baseUrl";
import LinesEllipsis from "react-lines-ellipsis";
import SnackbarAlert from "../constants/SnackbarAlert";

export default function MediaCard(props) {
    const classes = useStyles();
    const history = useHistory();
    const [open, setOpen] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [openNotLogin, setOpenNotLogin] = useState(false);

    //Snackbar Functions
    const handleClick = (msg) => {
        if (msg === "success") {
            setOpen(true);
        } else if (msg === "error") {
            setOpenError(true);
        } else if (msg === "notlogin") {
            setOpenNotLogin(true);
        }
    };
    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };
    const handleCloseError = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenError(false);
    };
    const handleCloseNotLogin = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenNotLogin(false);
    };

    const handleAddToCart = (product_id, quantity) => {
        const userdata = JSON.parse(localStorage.getItem("userdata"));
        if (userdata) {
            const token = userdata.token;
            const cartData = {
                productId: product_id,
                quantity: quantity,
            };
            axios
                .post(`${BaseUrl}/api/cart`, cartData, {
                    headers: {
                        Authorization: token,
                    },
                })
                .then(() => {
                    handleClick("success");
                })
                .catch(() => {
                    handleClick("error");
                });
        } else {
            handleClick("notlogin");
        }
    };

    const AddToCart = () => {
        handleAddToCart(props.id, 1);
    };

    return (
        <>
            <Card className={classes.root}>
                <CardActionArea
                    onClick={() => history.push(`/product/${props.product.id}`)}
                >
                    <CardMedia
                        onClick={() =>
                            history.push(`/product/${props.product.id}`)
                        }
                        className={classes.media}
                        image={props.image}
                    />
                    <CardContent>
                        {/* <Typography gutterBottom className={classes.card_title}>
                            {props.title}
                        </Typography> */}
                        <LinesEllipsis
                            className={classes.card_title}
                            text={props.title}
                            maxLine="1"
                            ellipsis=".."
                            trimRight
                            basedOn="letters"
                        />
                    </CardContent>
                </CardActionArea>
                <div>
                    <Typography gutterBottom variant="h6">
                        ₹ {props.price}
                    </Typography>
                    <Button
                        onClick={() => AddToCart(props.product)}
                        variant="contained"
                        size="small"
                        color="primary"
                    >
                        Add to Cart
                    </Button>
                    <br />
                    <br />
                    <Rating value={props.rating} precision={0.5} readOnly />
                </div>
            </Card>

            <SnackbarAlert
                open={open}
                close={handleClose}
                type={"success"}
                msg={"Product Added To Cart"}
            />
            <SnackbarAlert
                open={openError}
                close={handleCloseError}
                type={"error"}
                msg={"Product is Already in Cart!"}
            />
            <SnackbarAlert
                open={openNotLogin}
                close={handleCloseNotLogin}
                type={"error"}
                msg={"Please Login to Add in Cart!"}
            />
        </>
    );
}