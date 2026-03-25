import { AppProvider, useAppContext } from "./context/AppContext";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import SummaryCards from "./components/SummaryCards";
import ActionBar from "./components/ActionBar";
import DataTable from "./components/DataTable/DataTable";
import ExplainDrawer from "./components/Drawer/ExplainDrawer";
import ChartView from "./components/ChartView";

function DashboardContent() {
  const { state } = useAppContext();

  return (
    <div className="flex h-screen bg-bg">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-auto">
          <SummaryCards />
          {state.viewMode === "table" ? (
            <>
              <ActionBar />
              <DataTable />
            </>
          ) : (
            <ChartView />
          )}
        </main>
      </div>
      <ExplainDrawer />
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <DashboardContent />
    </AppProvider>
  );
}

export default App;
