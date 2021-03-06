import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    root:{
        marginTop: "8%"
    },
    image_grid: {
       marginTop: "3%",
       display: "flex",
       flexDirection: "column",
       justifyContent: "center",
       alignItems: "center"
    },
    details_grid:{
        marginTop: "3%",
        textAlign: "left"
    },
    small_img_root:{
        marginTop: "8%",
        display: "flex",
        justifyContent: "center"
    },
    small_img:{
        height:"80px",
        width: "80px",
        margin: "0 10%"
    },
    hor_rule: {
        opacity: "0.3",
    },
    price_color: {
        color: "green"
    },
    color_display: {
        width: "30px",
        height: "20px",
        border: "1px black solid"
    },
    share_icon: {
        display: "flex",
        alignItems: "center"
    },
    socialMediaButton: {
        margin: "0 1%"        
    },
    add_cart_btn: {
        color: "white",
        backgroundColor: "#2dcbf7",
        '&:hover': {
            color: "white",
            backgroundColor: "#2dcbf7", 
        }
    },
    rate_product_btn: {
        marginLeft: "2%",
        backgroundColor: "#a16f3d",
        color: "white",
        '&:hover': {
            backgroundColor: "#a16f3d",
            color: "white",
        }
    },
    tab_root:{
        margin: "3% 0"
    },
    tab_details: {
        padding: "2%",
        textAlign: "left"
    },
    color_box: {
        display: "flex",
        alignItems: "center",
    },
    dailog_root: {
        textAlign: "center"
    },


    //Media Query
    '@media (min-width:320px) and (max-width:550px)': { 
        root: {
            marginTop: "25%"
        }
    },
    '@media (min-width:550px) and (max-width:750px)': { 
        root: {
            marginTop: "17%"
        }
    },
    '@media (min-width:750px) and (max-width:950px)': { 
        root: {
            marginTop: "10%"
        }
    },
}))
export default useStyles