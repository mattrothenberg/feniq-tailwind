import React from "react";
import "@reach/accordion/styles.css";

import { Header } from "./components/header";
import { Sidebar } from "./components/sidebar";
import { Results } from "./components/results";

function App() {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <main className="flex-1">
          <Results />
        </main>
      </div>
    </div>
  );
}

export default App;
