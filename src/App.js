import "./App.css";
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { Route, Routes } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const App = () => {
  const pageSize = 6;
  const apiKey = "94a09211947949fd933b0162eab7988b";
  const [progress, setProgress] = useState(0);

  return (
    <div>
      <Navbar />
      <LoadingBar height={3} color="#f11946" progress={progress} />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <News
              setProgress={setProgress}
              apiKey={apiKey}
              key="Home"
              pageSize={pageSize}
              country="in"
              category="general"
            />
          }
        />
        <Route
          exact
          path="business"
          element={
            <News
              setProgress={setProgress}
              apiKey={apiKey}
              key="business"
              pageSize={pageSize}
              country="in"
              category="business"
            />
          }
        />
        <Route
          exact
          path="entertainment"
          element={
            <News
              setProgress={setProgress}
              apiKey={apiKey}
              key="entertainment"
              pageSize={pageSize}
              country="in"
              category="entertainment"
            />
          }
        />
        <Route
          exact
          path="general"
          element={
            <News
              setProgress={setProgress}
              apiKey={apiKey}
              key="general"
              pageSize={pageSize}
              country="in"
              category="general"
            />
          }
        />
        <Route
          exact
          path="health"
          element={
            <News
              setProgress={setProgress}
              apiKey={apiKey}
              key="health"
              pageSize={pageSize}
              country="in"
              category="health"
            />
          }
        />
        <Route
          exact
          path="science"
          element={
            <News
              setProgress={setProgress}
              apiKey={apiKey}
              key="science"
              pageSize={pageSize}
              country="in"
              category="science"
            />
          }
        />
        <Route
          exact
          path="sports"
          element={
            <News
              setProgress={setProgress}
              apiKey={apiKey}
              key="sport"
              pageSize={pageSize}
              country="in"
              category="sport"
            />
          }
        />
        <Route
          exact
          path="technology"
          element={
            <News
              setProgress={setProgress}
              apiKey={apiKey}
              key="technology"
              pageSize={pageSize}
              country="in"
              category="technology"
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
