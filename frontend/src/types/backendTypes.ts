// Types corresponding to rust structs in the backend
import {satPosition, horizons, polarPoint} from "./commonTypes";
interface gpsPosition {     // note: we encode cardinality by sign. 
    latitude : string   //      negative = south, positive = north
    longitude : string  //      negative = west, positive = east
    altitude : string
    valid : boolean     //     output from hardware bit representing validity. always positive
                        //      for manual input. 
  }

interface satellite {
    tle: string
    name: string
    norad_id: number
    int_designator: string
}

interface track {
    positions: satPosition[]
    horizons: horizons
    completion: number
}

enum groundstationStatus {
    OFFLINE,
    IDLE,
    TRACKING,
    OVERHEAT,
    FAULT
}

enum antennaType {
    HELICAL,
    DIPOLE,
    YAGI,
    PARABOLIC,
    PATCH
}

enum gsKinematics {
    STATIC,
    AZ,
    AZEL
}

interface groundstation {
    name: string
    location: gpsPosition
    orientation: polarPoint
    signalStrength: number
    status: groundstationStatus
    freqResponse: [number, number]
    antennaType: antennaType
    kinematics: gsKinematics
}

interface backendStatus {
    libState: string,
    cpu: number,
    mem: number,
    clientList: string[],
}

export type {gpsPosition as gps_pos, groundstation, backendStatus, satellite, track, polarPoint};