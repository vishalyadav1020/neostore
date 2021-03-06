import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    root_container: {
        marginTop: "7%"
    },
    root_paper_address: {
        width: "50%",
        margin: "0 25%",
        borderRadius: "2%"
    },
    root_paper_payment: {
        width: "60%",
        margin: "0 20%",
        borderRadius: "2%"   
    },
    hor_rule: {
        opacity: "0.4",
    },
    address_text: {
        textAlign: "left",
        display: "flex"
    },
    product_text: {
        display: "flex",
        justifyContent: 'center'
    },
    select_button: {
        textTransform: "none",
        marginBottom: "2%"
    },
    place_order_btn: {
        marginBottom: "4%",
        width: "40%"
    },
    no_ordersummary: {
        margin: "20% 0"
    },
    add_address_btn: {
        display: "flex",
        marginBottom: "2%"
    },
    error_msg: {
        color: "red"
    },
    googlepay_text: {
        // display: "flex",
        fontSize: "5vh",
        padding: "2% 0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    googlepay_paper: {
        marginBottom: "6%"  
    },
    select_payment_text: {
        fontWeight: "bold",
        padding: "2% 0",
        fontSize: "5vh"
    },


    //Media Query 
    '@media (min-width:320px) and (max-width:550px)': { 
        root_container: {
            marginTop: "20%"
        },
        root_paper_address: {
            width: "80%",
            margin: "2% 10%"
        },
        root_paper_payment: {
            width: "80%",
            margin: "2% 10%"
        },
    },
    '@media (min-width:550px) and (max-width:750px)': { 
        root_container: {
            marginTop: "15%"
        },
        root_paper_address: {
            width: "70%",
            margin: "2% 15%"
        },
        root_paper_payment: {
            width: "70%",
            margin: "2% 15%"
        },
    },
    '@media (min-width:750px) and (max-width:950px)': { 
        root_container: {
            marginTop: "10%"
        },
        root_paper_address: {
            width: "70%",
            margin: "2% 15%"
        },
        root_paper_payment: {
            width: "70%",
            margin: "2% 15%"
        },
    },
}))
export default useStyles