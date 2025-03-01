import React from "react";
import { AppBar, Container, MenuItem, Select, Toolbar, Typography } from "@mui/material"; // Updated imports for MUI v5
import { createTheme, ThemeProvider } from "@mui/material/styles"; // Updated imports for MUI v5
import { useNavigate } from "react-router-dom"; // Replaced useHistory with useNavigate
import { CryptoState } from "../CryptoContex"; // Your custom context

// Create a custom theme with MUI v5
const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    type: "dark",
  },
});

function Header() {
  const { currency, setCurrency } = CryptoState(); // Access the currency context
  const navigate = useNavigate(); // Replaced history.push with useNavigate

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="static" color="transparent">
        <Container>
          <Toolbar>
            {/* Title that navigates to home */}
            <Typography
              onClick={() => navigate("/")}
              variant="h6"
              sx={{
                flex: 1,
                color: "gold",
                fontFamily: "Montserrat",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Crypto Hunter
            </Typography>

            {/* Currency selector */}
            <Select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              sx={{
                width: 100,
                height: 40,
                marginLeft: 2, // Adjusted margin for consistency
                backgroundColor: "rgba(255, 255, 255, 0.1)", // Added background color for contrast
                color: "white",
                borderRadius: "4px",
                borderColor: "gold",
                "& .MuiOutlinedInput-root": {
                  borderColor: "gold", // Adjust border color
                },
              }}
              variant="outlined"
            >
              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="INR">INR</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

export default Header;
