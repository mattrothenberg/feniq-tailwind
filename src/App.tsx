import React from "react";
import {
  EuiButton,
  EuiButtonEmpty,
  EuiButtonIcon,
  EuiFlexGroup,
  EuiFlexItem,
} from "@elastic/eui";

function App() {
  return (
    <div className="h-screen flex flex-col">
      <header className="h-16 bg-gray-900 flex flex-shrink-0 px-4">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold tracking-tight text-white">
            FenIQ
          </h1>
        </div>
      </header>
      <div className="flex-1 bg-gray-100 flex">
        <aside className="w-64 flex-shrink-0 bg-white border-r border-red-800"></aside>
        <main className="flex-1">Main content goes here</main>
      </div>
    </div>
  );
}

export default App;
