import React, { useEffect, useState } from 'react'

import { useMediaQuery } from 'react-responsive';
import { Container, Grid, Button, Typography, TextField } from '@material-ui/core';
import MaterialDatatable from 'material-datatable';
import './PersonaMaterial.css';
import axios from 'axios';
import Swal from 'sweetalert2';


const PersonaMaterial = () => {
    const [accion, SetAccion] = useState("Guardar")
    const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
    const [isSelected, setIsSelected] = useState(false);
    const [personas, setPersonas] = useState([])
    const [id, setId] = useState(0);
    // const [index, setIndex] = useState(null)

    const columns = [
        {
            name: "Nombre",
            field: "nombre",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "Apellido",
            field: "apellido",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "Grupo",
            field: "grupo",
            options: {
                filter: true,
                sort: false,
            }
        }
    ];

    const getPersonas = async () => {
        try {
            const response = await axios.get('http://192.99.144.232:5000/api/personas?grupo=11');
            if (response.status === 200) {

                setPersonas(response.data.persona)
                console.log(response.data);
            }

        } catch (error) {
            console.error(error);
        }
    }



    // const data = [
    //     { name: "Name 1", title: "Title 1", location: "Location 1", age: 30, salary: 10 },
    //     { name: "Name 2", title: "Title 2", location: "Location 2", age: 31, salary: 11 },
    // ];

    const deletePersona = async (id) => {
        // console.log('antes del axios');
        // console.log(id);
        const response = await axios.delete(`http://192.99.144.232:5000/api/personas/${id}`)

        console.log('termino el axio');
        if (response.status === 200) {

            // console.log(response.data);
            console.log('se borro correctamente');
            Swal.fire(
                'Borrado!',
                'Se borró de forma exitosa.',
                'success'
            )

        }
        else {
            console.log('no se borro');
            Swal.fire(
                'UPS! :(',
                'No se pudo borrar.',
                'error'
            )
        }


        // console.log('termino la peticion a la api');

    }


    useEffect(() => {
        getPersonas()
    }, [])


    const handleRowClick = (rowData, rowMeta) => {

        // primera vez en apretar checkbox

        if (id === 0) {
            setId(rowData._id)
            setIsSelected(true)
        }
        else {
            // ya se presiono anteriormente algun checkbox
            if (isSelected) {
                setIsSelected(false)
                setId(0)
            } 
        }
        // console.log('isSelected: ' + isSelected);


        // -----------------


        // setId(rowData._id)

        // if(rowData._id === id){
        //     setIsSelected(true)
        //     setId(rowData._id)
        // }else{
        //     setIsSelected(false)
        //     setId(0)
        // // }

        // console.log('handle row click');
        // console.log(rowData);
        // console.log(rowData._id)
        // console.log(id);

    };


    // const handleCellClick = (cellData, cellMeta) => {
    //     console.log('handle Cell Click');
    //     console.log(cellData);
    //     console.log(cellMeta);
    // }


    const handleRowsSelect = (currentRowsSelected, allRowsSelected) => {
        console.log('handle row select');

        const [{rowIndex}] = currentRowsSelected
        console.log(rowIndex);
        // setIndex(rowIndex);

        // const {_id} = personas[rowIndex]

        // console.log(_id);
        // setId(_id)
        // setIsSelected(true)
    }


    const handleRowDelete = ({ data }) => {
        // console.log('handle row delete');
        // const [{rowIndex, dataIndex}] = data
        // console.log(data);
        // console.log(rowIndex);
    }

    const options = {
        filterType: 'checkbox',
        onlyOneRowCanBeSelected: true,
        onRowClick: handleRowClick,
        // onCellClick: handleCellClick,
        onRowsSelect: handleRowsSelect,
        onRowsDelete: handleRowDelete
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Estás seguro que quieres borrarlo?',
            text: "Estos cambios no se pueden revertir!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, estoy seguro!'
        }).then((result) => {
            // console.log('antes de confirmar');
            if (result.isConfirmed) {
                // console.log('antes de borrar');
                deletePersona(id)
                // console.log('despues de borrar');
            }


        })
    }

    return (

        <Container maxWidth="lg" >
            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                    <Typography variant="h6">
                        Personas
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6} fullWidth>
                    <TextField id="nombre" label="Nombre" variant="outlined" fullWidth />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField id="apellido" label="Apellido" variant="outlined" fullWidth />
                </Grid>
                <Grid item xs={12} md={2}>
                    <Button variant="contained" color="primary" fullWidth>{accion}</Button>

                </Grid>
                <Grid item xs={12} md={2}>
                    {
                        isSelected ?
                            <Button variant="contained" color="secondary" fullWidth
                                onClick={() => handleDelete(id)}
                            >Eliminar</Button>
                            :
                            <Button variant="contained" color="secondary" fullWidth disabled
                            >Eliminar</Button>
                    }

                </Grid>
            </Grid>


            <Grid item xs={12} md={12} className="tabla">
                <MaterialDatatable
                    title={"Lista"}
                    data={personas}
                    columns={columns}
                    options={options}


                />

            </Grid>


        </Container>
    )
}
export default PersonaMaterial;