import { DataState } from "../enum/data-state.enum";

export interface AppState {
    dataState: DataState;
    appData?: any;
    error?: string;
}