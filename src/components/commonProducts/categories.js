import { Accordion, AccordionDetails, AccordionSummary, Button, Typography } from '@material-ui/core';
import React from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import useStyles from './styles'

function Categories() {
    const classes = useStyles()
    // const [products,setProducts] = useState(Data)
    // const filterProduct = (data,parameter) => {
    //     // let list = []
    //     if(parameter === 'table'){
    //         const list = data.filter((current,data)=> {
    //             return (current.categories === data[0].categories) ? current : null
    //         })
    //         console.log(list)
    //     }
    //     // setProducts([...list])
    // }
    return (
        <>

            <Accordion className={classes.categories_root}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                >
                <Typography className={classes.heading}>Categories</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Button 
                        className={classes.list_button}
                        // onClick={() => filterProduct(Data,'table')}
                    >
                        Table
                    </Button>
                </AccordionDetails>
                <AccordionDetails>
                    <Button className={classes.list_button}>
                        Sofa
                    </Button>
                </AccordionDetails>
                <AccordionDetails>
                    <Button className={classes.list_button}>
                        Bed
                    </Button>
                </AccordionDetails>
                <AccordionDetails>
                    <Button className={classes.list_button}>
                        Cupboard
                    </Button>
                </AccordionDetails>
            </Accordion>
        </>
    )
}

export default Categories
