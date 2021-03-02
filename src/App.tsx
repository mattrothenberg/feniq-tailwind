import React from "react";
import "@reach/accordion/styles.css";

import { Header } from "./components/header";
import { Sidebar } from "./components/sidebar";

function App() {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex-1 bg-gray-200 flex">
        <Sidebar />
        <main className="flex-1"></main>
      </div>
    </div>
  );
}

export default App;
