import { Container, Typography, Box } from "@mui/material"; // MUI v5 imports
import axios from "axios";
import { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import { TrendingCoins } from "../../config/api";
import { CryptoState } from "../../CryptoContex";

// Utility function to format numbers with commas
export const numberWithCommas = (x) => {
  return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const { currency, symbol } = CryptoState();

  // Fetch trending coins from the API
  const fetchTrendingCoins = async () => {
    try {
      const { data } = await axios.get(TrendingCoins(currency));
      setTrending(data);
    } catch (error) {
      console.error("Error fetching trending coins: ", error);
    }
  };

  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

  // Map over the trending coins and generate the carousel items
  const items = trending.map((coin) => {
    let profit = coin?.price_change_percentage_24h >= 0;

    return (
      <Link
        key={coin.id}
        to={`/coins/${coin.id}`}
        style={{
          textDecoration: "none",
          color: "white",
          textTransform: "uppercase",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
        <Typography
          variant="body2"
          sx={{
            color: profit ? "rgb(14, 203, 129)" : "red",
            fontWeight: 500,
            marginBottom: 2,
          }}
        >
          {coin?.symbol} {profit && "+"}
          {coin?.price_change_percentage_24h?.toFixed(2)}%
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </Typography>
      </Link>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <Box sx={{ height: "50%", display: "flex", alignItems: "center" }}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
        autoPlay
      />
    </Box>
  );
};

export default Carousel;
