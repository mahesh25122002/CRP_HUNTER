import React, { useEffect, useState } from "react";
import { Container, LinearProgress, Typography, TextField, TableCell, TableBody, TableRow, TableHead, TableContainer, Table, Paper, Pagination, Box } from "@mui/material"; // MUI v5 imports
import axios from "axios";
import { CoinList } from "../config/api";
import { useNavigate } from "react-router-dom"; // Use useNavigate hook
import { CryptoState } from "../CryptoContex";

// Utility function for formatting numbers with commas
export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function CoinsTable() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);

  const { currency, symbol } = CryptoState();
  const navigate = useNavigate(); // Navigate hook

  // Fetch coins data from API
  const fetchCoins = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(CoinList(currency));
      setCoins(data);
    } catch (err) {
      setError("Error fetching data. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  // Handle search functionality
  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
    );
  };

  // Handle pagination
  const handlePagination = (e, value) => {
    setPage(value);
    window.scroll(0, 450); // Scroll to the top
  };

  return (
    <Container sx={{ textAlign: "center", marginTop: 2 }}>
      <Typography variant="h4" sx={{ margin: 2, fontFamily: "Montserrat" }}>
        Cryptocurrency Prices by Market Cap
      </Typography>
      
      {/* Search input */}
      <TextField
        label="Search For a Crypto Currency.."
        variant="outlined"
        fullWidth
        sx={{ marginBottom: 2 }}
        onChange={(e) => setSearch(e.target.value)}
      />
      
      {/* Table with coins data */}
      <TableContainer component={Paper}>
        {loading ? (
          <LinearProgress sx={{ backgroundColor: "gold" }} />
        ) : error ? (
          <Typography variant="h6" color="error">{error}</Typography>
        ) : (
          <Table aria-label="simple table">
            <TableHead sx={{ backgroundColor: "#EEBC1D" }}>
              <TableRow>
                {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                  <TableCell
                    key={head}
                    sx={{
                      color: "black",
                      fontWeight: "700",
                      fontFamily: "Montserrat",
                    }}
                    align={head === "Coin" ? "" : "right"}
                  >
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {handleSearch()
                .slice((page - 1) * 10, (page - 1) * 10 + 10)
                .map((row) => {
                  const profit = row.price_change_percentage_24h > 0;
                  return (
                    <TableRow
                      onClick={() => navigate(`/coins/${row.id}`)} // Navigate to coin details
                      key={row.id}
                      sx={{
                        backgroundColor: "#16171a",
                        cursor: "pointer",
                        "&:hover": {
                          backgroundColor: "#131111",
                        },
                        fontFamily: "Montserrat",
                      }}
                    >
                      <TableCell component="th" scope="row" sx={{ display: "flex", gap: 1 }}>
                        <img src={row.image} alt={row.name} height="50" />
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                          <Typography variant="body1" sx={{ textTransform: "uppercase", fontSize: 22 }}>
                            {row.symbol}
                          </Typography>
                          <Typography variant="body2" sx={{ color: "darkgrey" }}>
                            {row.name}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        {symbol} {numberWithCommas(row.current_price.toFixed(2))}
                      </TableCell>
                      <TableCell align="right" sx={{ color: profit ? "rgb(14, 203, 129)" : "red", fontWeight: 500 }}>
                        {profit && "+"}
                        {row.price_change_percentage_24h.toFixed(2)}%
                      </TableCell>
                      <TableCell align="right">
                        {symbol} {numberWithCommas((row.market_cap / 1e6).toFixed(0))}M
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        )}
      </TableContainer>

      {/* Pagination */}
      <Pagination
        count={Math.ceil(handleSearch().length / 10)}
        sx={{ padding: 2, width: "100%", display: "flex", justifyContent: "center" }}
        onChange={handlePagination}
      />
    </Container>
  );
}
