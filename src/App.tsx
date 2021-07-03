import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import { Layout } from "./components/Layout";
import { fetchPrices } from "./store/slice";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPrices());
  }, [dispatch]);
  return <Layout />;
}

export default App;
