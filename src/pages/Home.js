import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const Home = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box
          sx={{
            backgroundImage: backgroundImage: `url("../images/test.webp")` ,
            background: "cadetblue",
            height: "250px",
            width: "250px",
            borderRadius: "50%",
          }}
        ></Box>
      </Grid>
    </Grid>
  );
};

export default Home;
