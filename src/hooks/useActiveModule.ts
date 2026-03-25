import { useAppContext } from "../context/AppContext";
import { getModuleConfig, ModuleConfig } from "../config/modules";

export interface ActiveModuleState {
  module: "replenishment" | "rm";
  config: ModuleConfig;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rows: any[];
  selectedRowIds: Set<string>;
  sortColumn: string | null;
  sortDirection: "asc" | "desc";
  currentPage: number;
  pageSize: number;
  drawerOpen: boolean;
  drawerRowId: string | null;
  drawerTab: number;
  // Action type prefixes
  actions: {
    setSort: string;
    setPage: string;
    setPageSize: string;
    toggleRow: string;
    toggleAll: string;
    openDrawer: string;
    closeDrawer: string;
    setDrawerTab: string;
    updateRowStatus: string;
  };
}

export function useActiveModule(): ActiveModuleState {
  const { state } = useAppContext();
  const module = state.activeModule;
  const config = getModuleConfig(module);

  if (module === "rm") {
    return {
      module,
      config,
      rows: state.rmRows,
      selectedRowIds: state.rmSelectedRowIds,
      sortColumn: state.rmSortColumn,
      sortDirection: state.rmSortDirection,
      currentPage: state.rmCurrentPage,
      pageSize: state.rmPageSize,
      drawerOpen: state.rmDrawerOpen,
      drawerRowId: state.rmDrawerRowId,
      drawerTab: state.rmDrawerTab,
      actions: {
        setSort: "RM_SET_SORT",
        setPage: "RM_SET_PAGE",
        setPageSize: "RM_SET_PAGE_SIZE",
        toggleRow: "RM_TOGGLE_ROW",
        toggleAll: "RM_TOGGLE_ALL",
        openDrawer: "RM_OPEN_DRAWER",
        closeDrawer: "RM_CLOSE_DRAWER",
        setDrawerTab: "RM_SET_DRAWER_TAB",
        updateRowStatus: "RM_UPDATE_ROW_STATUS",
      },
    };
  }

  return {
    module,
    config,
    rows: state.rows,
    selectedRowIds: state.selectedRowIds,
    sortColumn: state.sortColumn,
    sortDirection: state.sortDirection,
    currentPage: state.currentPage,
    pageSize: state.pageSize,
    drawerOpen: state.drawerOpen,
    drawerRowId: state.drawerRowId,
    drawerTab: state.drawerTab,
    actions: {
      setSort: "SET_SORT",
      setPage: "SET_PAGE",
      setPageSize: "SET_PAGE_SIZE",
      toggleRow: "TOGGLE_ROW",
      toggleAll: "TOGGLE_ALL",
      openDrawer: "OPEN_DRAWER",
      closeDrawer: "CLOSE_DRAWER",
      setDrawerTab: "SET_DRAWER_TAB",
      updateRowStatus: "UPDATE_ROW_STATUS",
    },
  };
}
