import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { PlanRow, RowStatus } from "../types";
import { ActiveModule, ApprovalStatus, ProcurementRow } from "../types/procurement";
import { tableRows } from "../data/tableRows";
import { procurementRows } from "../data/procurementRows";

export interface AppState {
  // Module switching
  activeModule: ActiveModule;

  // Replenishment state
  rows: PlanRow[];
  selectedRowIds: Set<string>;
  sortColumn: string | null;
  sortDirection: "asc" | "desc";
  currentPage: number;
  pageSize: number;
  drawerOpen: boolean;
  drawerRowId: string | null;
  drawerTab: number;
  viewMode: "table" | "chart";

  // RM state
  rmRows: ProcurementRow[];
  rmSelectedRowIds: Set<string>;
  rmSortColumn: string | null;
  rmSortDirection: "asc" | "desc";
  rmCurrentPage: number;
  rmPageSize: number;
  rmDrawerOpen: boolean;
  rmDrawerRowId: string | null;
  rmDrawerTab: number;

  // RM Planner Actions state
  editMode: boolean;
  editFormData: Partial<ProcurementRow> | null;
  approveModalOpen: boolean;
  approveModalRowId: string | null;
  rejectModalOpen: boolean;
  rejectModalRowId: string | null;
}

export type Action =
  // Module
  | { type: "SET_ACTIVE_MODULE"; module: ActiveModule }
  // Replenishment
  | { type: "SET_SORT"; column: string }
  | { type: "SET_PAGE"; page: number }
  | { type: "SET_PAGE_SIZE"; size: number }
  | { type: "TOGGLE_ROW"; id: string }
  | { type: "TOGGLE_ALL"; ids: string[] }
  | { type: "OPEN_DRAWER"; rowId: string }
  | { type: "CLOSE_DRAWER" }
  | { type: "SET_DRAWER_TAB"; tab: number }
  | { type: "SET_VIEW_MODE"; mode: "table" | "chart" }
  | { type: "UPDATE_ROW_STATUS"; ids: string[]; status: RowStatus }
  // RM Table
  | { type: "RM_SET_SORT"; column: string }
  | { type: "RM_SET_PAGE"; page: number }
  | { type: "RM_SET_PAGE_SIZE"; size: number }
  | { type: "RM_TOGGLE_ROW"; id: string }
  | { type: "RM_TOGGLE_ALL"; ids: string[] }
  | { type: "RM_OPEN_DRAWER"; rowId: string }
  | { type: "RM_CLOSE_DRAWER" }
  | { type: "RM_SET_DRAWER_TAB"; tab: number }
  | { type: "RM_UPDATE_ROW_STATUS"; ids: string[]; status: ApprovalStatus }
  // RM Edit
  | { type: "RM_START_EDIT"; rowId: string }
  | { type: "RM_UPDATE_EDIT_FIELD"; field: string; value: string | number }
  | { type: "RM_SAVE_EDIT" }
  | { type: "RM_CANCEL_EDIT" }
  // RM Modals
  | { type: "RM_OPEN_APPROVE_MODAL"; rowId: string }
  | { type: "RM_CLOSE_APPROVE_MODAL" }
  | { type: "RM_OPEN_REJECT_MODAL"; rowId: string }
  | { type: "RM_CLOSE_REJECT_MODAL" };

const initialState: AppState = {
  activeModule: "replenishment",

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

  rmRows: procurementRows,
  rmSelectedRowIds: new Set(),
  rmSortColumn: null,
  rmSortDirection: "asc",
  rmCurrentPage: 0,
  rmPageSize: 10,
  rmDrawerOpen: false,
  rmDrawerRowId: null,
  rmDrawerTab: 0,

  editMode: false,
  editFormData: null,
  approveModalOpen: false,
  approveModalRowId: null,
  rejectModalOpen: false,
  rejectModalRowId: null,
};

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    // Module switching
    case "SET_ACTIVE_MODULE":
      return { ...state, activeModule: action.module };

    // Replenishment actions
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
      return { ...state, drawerOpen: false, editMode: false, editFormData: null };
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

    // RM Table actions
    case "RM_SET_SORT": {
      const sameColumn = state.rmSortColumn === action.column;
      return {
        ...state,
        rmSortColumn: action.column,
        rmSortDirection: sameColumn && state.rmSortDirection === "asc" ? "desc" : "asc",
        rmCurrentPage: 0,
      };
    }
    case "RM_SET_PAGE":
      return { ...state, rmCurrentPage: action.page };
    case "RM_SET_PAGE_SIZE":
      return { ...state, rmPageSize: action.size, rmCurrentPage: 0 };
    case "RM_TOGGLE_ROW": {
      const next = new Set(state.rmSelectedRowIds);
      if (next.has(action.id)) next.delete(action.id);
      else next.add(action.id);
      return { ...state, rmSelectedRowIds: next };
    }
    case "RM_TOGGLE_ALL": {
      const allSelected = action.ids.every((id) => state.rmSelectedRowIds.has(id));
      if (allSelected) {
        const next = new Set(state.rmSelectedRowIds);
        action.ids.forEach((id) => next.delete(id));
        return { ...state, rmSelectedRowIds: next };
      }
      const next = new Set(state.rmSelectedRowIds);
      action.ids.forEach((id) => next.add(id));
      return { ...state, rmSelectedRowIds: next };
    }
    case "RM_OPEN_DRAWER":
      return { ...state, rmDrawerOpen: true, rmDrawerRowId: action.rowId, rmDrawerTab: 0, editMode: false, editFormData: null };
    case "RM_CLOSE_DRAWER":
      return { ...state, rmDrawerOpen: false, editMode: false, editFormData: null };
    case "RM_SET_DRAWER_TAB":
      return { ...state, rmDrawerTab: action.tab };
    case "RM_UPDATE_ROW_STATUS":
      return {
        ...state,
        rmRows: state.rmRows.map((r) =>
          action.ids.includes(r.po_id) ? { ...r, approval_status: action.status } : r
        ),
        rmSelectedRowIds: new Set(),
        approveModalOpen: false,
        approveModalRowId: null,
        rejectModalOpen: false,
        rejectModalRowId: null,
      };

    // RM Edit actions
    case "RM_START_EDIT": {
      const row = state.rmRows.find((r) => r.po_id === action.rowId);
      return { ...state, editMode: true, editFormData: row ? { ...row } : null };
    }
    case "RM_UPDATE_EDIT_FIELD":
      return {
        ...state,
        editFormData: state.editFormData
          ? { ...state.editFormData, [action.field]: action.value }
          : null,
      };
    case "RM_SAVE_EDIT": {
      if (!state.editFormData || !state.editFormData.po_id) return state;
      const editId = state.editFormData.po_id;
      return {
        ...state,
        rmRows: state.rmRows.map((r) =>
          r.po_id === editId ? { ...r, ...state.editFormData } as ProcurementRow : r
        ),
        editMode: false,
        editFormData: null,
      };
    }
    case "RM_CANCEL_EDIT":
      return { ...state, editMode: false, editFormData: null };

    // RM Modals
    case "RM_OPEN_APPROVE_MODAL":
      return { ...state, approveModalOpen: true, approveModalRowId: action.rowId };
    case "RM_CLOSE_APPROVE_MODAL":
      return { ...state, approveModalOpen: false, approveModalRowId: null };
    case "RM_OPEN_REJECT_MODAL":
      return { ...state, rejectModalOpen: true, rejectModalRowId: action.rowId };
    case "RM_CLOSE_REJECT_MODAL":
      return { ...state, rejectModalOpen: false, rejectModalRowId: null };

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
