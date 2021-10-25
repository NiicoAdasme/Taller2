import React from 'react';
import { Grid, List, ListItem, ListItemText, Typography } from '@material-ui/core';

const OtroComponente = () => {

    return (
        <>
            {/* <Typography variant="h3">LOS INTEGRANTES SON:</Typography> */}
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <Typography variant="h4" component="div">
                        LOS INTEGRANTES SON:
                    </Typography>
                    <List>
                        <ListItem>
                            <ListItemText primary="Omaro Aburto "/>
                            <ListItemText primary="Nicolas Vasquez "/>
                            <ListItemText primary="Nicolas Adasme "/>
                        </ListItem>,

                    </List>
                </Grid>
            </Grid>

        </>
    )
}

export default OtroComponente;