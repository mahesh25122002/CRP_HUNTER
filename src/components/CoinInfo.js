import axios from "axios";
import { useEffect, useState } from "react";
import { HistoricalChart } from "../config/api";
import { Line } from "react-chartjs-2";
import { CircularProgress, Box, Typography, useTheme } from "@mui/material"; // MUI v5 imports
import SelectButton from "./SelectButton";
import { chartDays } from "../config/data";
import { CryptoState } from "../CryptoContex";

// Utility function to fetch historical data
const fetchHistoricData = async (coinId, days, currency, setHistoricData) => {
  try {
    const { data } = await axios.get(HistoricalChart(coinId, days, currency));
    setHistoricData(data.prices);
  } catch (error) {
    console.error("Error fetching historical data:", error);
  }
};

const CoinInfo = ({ coin }) => {
  const [historicData, setHistoricData] = useState([]);
  const [days, setDays] = useState(1);
  const { currency } = CryptoState();
  const theme = useTheme(); // Use MUI theme

  useEffect(() => {
    if (coin?.id) {
      fetchHistoricData(coin.id, days, currency, setHistoricData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days, coin?.id, currency]); // Added coin?.id to ensure effect runs when coin changes

  return (
    <Box
      sx={{
        width: "75%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 2,
        padding: 4,
        [theme.breakpoints.down("md")]: {
          width: "100%",
          marginTop: 0,
          padding: 2,
          paddingTop: 0,
        },
      }}
    >
      {!historicData.length ? (
        <CircularProgress
          sx={{ color: "gold", size: 250, thickness: 1 }}
        />
      ) : (
        <>
          <Line
            data={{
              labels: historicData.map((coin) => {
                let date = new Date(coin[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;
                return days === 1 ? time : date.toLocaleDateString();
              }),

              datasets: [
                {
                  data: historicData.map((coin) => coin[1]),
                  label: `Price ( Past ${days} Days ) in ${currency}`,
                  borderColor: "#EEBC1D",
                  fill: false, // This will make the graph line only, without fill
                },
              ],
            }}
            options={{
              elements: {
                point: {
                  radius: 1,
                },
              },
            }}
          />
          <Box
            sx={{
              display: "flex",
              marginTop: 2,
              justifyContent: "space-around",
              width: "100%",
            }}
          >
            {chartDays.map((day) => (
              <SelectButton
                key={day.value}
                onClick={() => setDays(day.value)}
                selected={day.value === days}
              >
                {day.label}
              </SelectButton>
            ))}
          </Box>
        </>
      )}
    </Box>
  );
};

export default CoinInfo;
