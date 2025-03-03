import "./App.css";
import DataDashboard from "./components/dataDashboard";
import PartitionDataContextProvider from "./lib/store/PartitionDataContext";
import PartitionIdContextProvider from "./lib/store/PartitionIDContext";
import PerfReportContextProvider from "./lib/store/PerfReportStoreContext";
import SourcesContextProvider from "./lib/store/SourcesStoreContext";
import SummaryContextProvider from "./lib/store/SummaryStoreContext";

function App() {
  return (
    <div className="App">
      <div className="rectangularContainer">
        <h1>Partition Data Dashboard</h1>
        <PartitionIdContextProvider>
          <SourcesContextProvider>
            <SummaryContextProvider>
              <PerfReportContextProvider>
                <PartitionDataContextProvider>
                  <DataDashboard />
                </PartitionDataContextProvider>
              </PerfReportContextProvider>
            </SummaryContextProvider>
          </SourcesContextProvider>
        </PartitionIdContextProvider>
      </div>
    </div>
  );
}

export default App;
