// State manager - frontend wrapper containing and managing all state the frontend
//                 can interact with.
// Matt Rossouw (omeh-a)
// 05/2023
import { satellite, track, groundstation, backendStatus } from "../types/backendTypes";

// Tracking state
export interface TrackingState {
    target: satellite
    track: track
    stations: groundstation[]
    server: backendStatus
}

// Singleton export for statemanager
export function getStateManager(): StateManager {
    if (!StateManager.instance) {
        StateManager.instance = new StateManager();
    }
    return StateManager.instance;
}

// State manager
class StateManager {
    // private tracking: TrackingState;
    private pollingRate: number = 1000;
    static instance: StateManager;

    // Triggers the state manager to 
    
    
}