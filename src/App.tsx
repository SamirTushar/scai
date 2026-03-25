import { AppProvider, useAppContext } from "./context/AppContext";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import SummaryCards from "./components/SummaryCards";
import ActionBar from "./components/ActionBar";
import DataTable from "./components/DataTable/DataTable";
import ExplainDrawer from "./components/Drawer/ExplainDrawer";
import EditMode from "./components/Drawer/EditMode";
import ChartView from "./components/ChartView";
import ApproveModal from "./components/Modals/ApproveModal";
import RejectModal from "./components/Modals/RejectModal";

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
      {/* Edit mode overlay inside drawer */}
      {state.editMode && (
        <div className="fixed inset-y-0 right-0 w-[60vw] bg-white z-[55] shadow-[-6px_0_20px_rgba(0,0,0,0.12)] flex flex-col">
          <EditMode />
        </div>
      )}
      {/* Modals */}
      <ApproveModal />
      <RejectModal />
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
