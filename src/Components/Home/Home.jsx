import React, { useContext, useEffect, useState } from "react";
import { Box, Paper, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import Swal from "sweetalert2";
import Loading from "../Loading/Loading";
import { DataContext } from "../../DataContext/DataContext";

export default function Home() {
  const [shawData, setshawData] = useState([]);
  const [isLoading, setisLoading] = useState(false)
  let {getData , setcount} = useContext(DataContext)
  // const url = `http://localhost:3000/myData`
  useEffect(() => {
    document.title = "Home"; 
  }, []);
 async function getDataContext() {
   setisLoading(true)
  let res = await getData()
   
    setisLoading(false)
        setshawData(res.data);

  }

  const total = shawData.reduce((acc, item) => acc + item.price, 0);
  function deleteData(id) {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn-success",
      cancelButton: "btn-danger"
    },
    buttonsStyling: false
  });
  swalWithBootstrapButtons.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!",
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      axios
      .delete(`https://674f8478bb559617b26f6380.mockapi.io/api/v1/data/${id}`)
      .then((res) => {
        setshawData((prevData) => prevData.filter((item) => item.id !== id));
        setcount(res.data.length)
        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      })
      .catch((err) => {
        console.log(err.data);
      });
     
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire({
        title: "Cancelled",
        text: "Your imaginary file is safe :)",
        icon: "error"
      });
    }
  });
  
  }

  useEffect(() => {
    getDataContext();
  }, []);
  
  return (
    <>
    { shawData.length === 0 &&
    <Typography fontSize={20} color="info">No purchases yet.</Typography>}
      <Box component={'section'}>
      {  isLoading ? (
        <Loading /> 
      ) : (
        shawData.map((item) => (
          <Paper
            key={item.id}
            sx={{
              width: '366px',
              display: 'flex',
              justifyContent: 'space-between',
              mt: '22px',
              pt: '38px',
              pb: '12px',
              px: '20px',
              borderRadius: '10px',
              position: 'relative',
               transition:"0.5s",
                '&:hover':{
                  scale:"1.04"
                }
            }}
          >
            <Typography variant="h6" sx={{ fontSize: '1.3rem' }}>
              {item.title}
            </Typography>
            <Typography
              variant="h6"
              sx={{ fontSize: '1.4rem', opacity: 0.8, fontWeight: 600 }}
            >
              $ {item.price}
            </Typography>

            <IconButton
              onClick={() => deleteData(item.id)}
              aria-label="delete"
              sx={{ position: 'absolute', top: '3px', right: '5px' , transition:'0.5s'}}
            >
              <CloseIcon sx={{ fontSize: '20px' }} />
            </IconButton>
          </Paper>
        ))
      )}

      {total  ?
        <Typography sx={{ mt: '12px', textAlign: 'center' }} variant="h6" color="inherit">
          total price: $ 
          <Typography component="span" sx={{ fontWeight: '700' }} color="inherit">
            {total}
          </Typography>
        </Typography>:null
      }
    </Box>
    </>
  );
}
