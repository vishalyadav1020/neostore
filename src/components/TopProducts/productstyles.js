import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
        textAlign: "center"
      },
      media: {
        display:"flex",
        justifyContent: "center",
        height: "250px",
        margin: "5%"
      },
      top_product_container: {
          marginTop: "5%"
      },
      cards_header: {
          fontWeight: "bold"  
      },
      card_container: {
        margin: "1%"
      },
      card_title: {
        fontSize: "2.4vh"
      }
}))

export default useStyles