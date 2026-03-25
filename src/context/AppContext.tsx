import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { PlanRow, RowStatus } from "../types";
import { tableRows } from "../data/tableRows";

interface AppState {
  rows: PlanRow[];
  selectedRowIds: Set<string>;
  sortColumn: keyof PlanRow | null;
  sortDirection: "asc" | "desc";
  currentPage: number;
  pageSize: number;
  drawerOpen: boolean;
  drawerRowId: string | null;
  drawerTab: number;
  viewMode: "table" | "chart";
}

type Action =
  | { type: "SET_SORT"; column: keyof PlanRow }
  | { type: "SET_PAGE"; page: number }
  | { type: "SET_PAGE_SIZE"; size: number }
  | { type: "TOGGLE_ROW"; id: string }
  | { type: "TOGGLE_ALL"; ids: string[] }
  | { type: "OPEN_DRAWER"; rowId: string }
  | { type: "CLOSE_DRAWER" }
  | { type: "SET_DRAWER_TAB"; tab: number }
  | { type: "SET_VIEW_MODE"; mode: "table" | "chart" }
  | { type: "UPDATE_ROW_STATUS"; ids: string[]; status: RowStatus };

const initialState: AppState = {
  rows: tableRows,
  selectedRowIds: new Set(),
  sortColumn: null,
  sortDirection: "asc",
  currentPage: 0,
  pageSize: 10,
  drawerOpen: false,
  drawerRowId: null,
  drawerTab: 0,
  viewMode: "table",
};

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "SET_SORT": {
      const sameColumn = state.sortColumn === action.column;
      return {
        ...state,
        sortColumn: action.column,
        sortDirection: sameColumn && state.sortDirection === "asc" ? "desc" : "asc",
        currentPage: 0,
      };
    }
    case "SET_PAGE":
      return { ...state, currentPage: action.page };
    case "SET_PAGE_SIZE":
      return { ...state, pageSize: action.size, currentPage: 0 };
    case "TOGGLE_ROW": {
      const next = new Set(state.selectedRowIds);
      if (next.has(action.id)) next.delete(action.id);
      else next.add(action.id);
      return { ...state, selectedRowIds: next };
    }
    case "TOGGLE_ALL": {
      const allSelected = action.ids.every((id) => state.selectedRowIds.has(id));
      if (allSelected) {
        const next = new Set(state.selectedRowIds);
        action.ids.forEach((id) => next.delete(id));
        return { ...state, selectedRowIds: next };
      }
      const next = new Set(state.selectedRowIds);
      action.ids.forEach((id) => next.add(id));
      return { ...state, selectedRowIds: next };
    }
    case "OPEN_DRAWER":
      return { ...state, drawerOpen: true, drawerRowId: action.rowId, drawerTab: 0 };
    case "CLOSE_DRAWER":
      return { ...state, drawerOpen: false };
    case "SET_DRAWER_TAB":
      return { ...state, drawerTab: action.tab };
    case "SET_VIEW_MODE":
      return { ...state, viewMode: action.mode };
    case "UPDATE_ROW_STATUS":
      return {
        ...state,
        rows: state.rows.map((r) =>
          action.ids.includes(r.stoId) ? { ...r, status: action.status } : r
        ),
        selectedRowIds: new Set(),
      };
    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used within AppProvider");
  return ctx;
}
