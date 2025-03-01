import { LinearProgress, Typography, Container } from "@mui/material"; // Updated import
import { createTheme } from "@mui/material/styles"; // Corrected import
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import CoinInfo from "../components/CoinInfo";
import { SingleCoin } from "../config/api";
import { numberWithCommas } from "../components/CoinsTable";
import { CryptoState } from "../CryptoContex";

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { currency, symbol } = CryptoState();

  // Fetch coin data with error handling
  const fetchCoin = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(SingleCoin(id));
      setCoin(data);
    } catch (err) {
      setError("Error fetching coin data.");
      console.error("Error fetching coin data: ", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoin();
  }, [id, currency]); // Re-fetch when either id or currency changes

  // Styles using sx prop (recommended)
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    sidebar: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 25,
      borderRight: "2px solid grey",
    },
    heading: {
      fontWeight: "bold",
      marginBottom: 20,
      fontFamily: "Montserrat",
    },
    description: {
      width: "100%",
      fontFamily: "Montserrat",
      padding: 25,
      paddingBottom: 15,
      paddingTop: 0,
      textAlign: "justify",
    },
    marketData: {
      alignSelf: "start",
      padding: 25,
      paddingTop: 10,
      width: "100%",
      display: "flex",
      justifyContent: "space-around",
      flexDirection: "column",
      alignItems: "center",
    },
  };

  // Show loading indicator while fetching data
  if (loading) return <LinearProgress style={{ backgroundColor: "gold" }} />;
  
  // Show error message if fetching fails
  if (error) return <Typography variant="h6" color="error">{error}</Typography>;

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h3" style={styles.heading}>
          {coin?.name}
        </Typography>
        <Typography variant="subtitle1" style={styles.description}>
          {ReactHtmlParser(coin?.description.en.split(". ")[0])}.
        </Typography>
        <div style={styles.marketData}>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" style={styles.heading}>
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
              {numberWithCommas(coin?.market_cap_rank)}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography variant="h5" style={styles.heading}>
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" style={styles.heading}>
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>
        </div>
      </div>
      <CoinInfo coin={coin} />
    </div>
  );
};

export default CoinPage;
