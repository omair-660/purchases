import { Box, Button, InputAdornment, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import styled from "@emotion/styled";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { purple } from "@mui/material/colors";
import { useFormik } from "formik";
import * as Yup from 'yup'
import { DataContext } from "../../DataContext/DataContext";

export default function Create() {
 let {setcount} = useContext(DataContext)
  
  useEffect(() => {
    document.title = "Create"; 
  }, []);
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    '&:hover': {
      backgroundColor: purple[700],
    },
  }));

  const [loading, setLoading] = useState(false);
  
  let schema = Yup.object().shape({
    title: Yup.string("title must be string").required("this input required").min(3, "min length must be 3"),
    price: Yup.number("price must be number").required("this input required").min(0, "min length must be 1")
  });
  // const url = `http://localhost:3000/myData`
//https://674f8478bb559617b26f6380.mockapi.io/api/v1/data
  function sendData(value) {
    setLoading(true);
    axios.post(`https://674f8478bb559617b26f6380.mockapi.io/api/v1/data`, value)
      .then((res) => {
        setLoading(false);
        formik.resetForm();
        setcount(res.data.length)
        if (res.status === 201) {
          toast.success('created');
        }
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

let formik = useFormik({
  initialValues:{
    title:'',
    price: ''
  },
  onSubmit:sendData,
  validationSchema: schema
})

  return (
    <>
    <Toaster
     position="bottom-left"
     reverseOrder={false}
     
    />
      <Box component="form"  autoComplete="off" onSubmit={formik.handleSubmit} sx={{ width: {xs: "90%", md:"50%"} }}>
        <TextField
        type="text"
        name="title"
       value={formik.values.title}
       onChange={formik.handleChange}
       onBlur={formik.handleBlur}
          label="Title"
          fullWidth
          sx={{ mt: "12px", display: "block" }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">&#128073;</InputAdornment>
              ),
            },
          }}
          variant="filled"
           error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />
  
        <TextField
        type="number"
        name="price"
        value={formik.values.price}
        onChange={(e) =>
          formik.setFieldValue("price", Number(e.target.value))
        }
        onBlur={formik.handleBlur}

          label="Price"
          fullWidth
          sx={{ mt: "12px", display: "block" }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            },
          }}
          variant="filled"
          error={formik.touched.price && Boolean(formik.errors.price)}
          helperText={formik.touched.price && formik.errors.price}
        />
      
        <ColorButton
        type="submit"
        disabled={loading || !formik.isValid || !formik.dirty} 
        sx={{
          mt: "12px",
          transition: "0.5s",
        }}
        variant="contained">  {loading ? "Submitting..." : "Submit"} 
        <ArrowForwardIosIcon fontSize="small" sx={{ml:"5px"}}/> 
        </ColorButton>
      </Box>
    </>
  );
}
