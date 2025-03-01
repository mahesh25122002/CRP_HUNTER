import { makeStyles } from "@mui/styles"; // Corrected import for makeStyles
import Homepage from "./Pages/HomePage";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom"; // Updated for React Router v6
import CoinPage from "./Pages/CoinPage";
import Header from "./components/Header";

const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: "#14161a",
    color: "white",
    minHeight: "100vh",
  },
}));

function App() {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header />
        <Routes> {/* Updated from Route to Routes in React Router v6 */}
          <Route path="/" element={<Homepage />} /> {/* Use element instead of component */}
          <Route path="/coins/:id" element={<CoinPage />} /> {/* Use element instead of component */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
