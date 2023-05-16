// Common types for all modules in frontend.

interface polarPoint {
    az: number,
    el: number
}

interface cartesianPoint {
    x: number,
    y: number
}

interface satPosition {
    azimuth: number,
    elevation: number,
    altitude: number,
    latitude: number,
    longitude: number,
    valid: boolean
}

interface horizons {
    // Tuple of az and el for radio start
    radioStart: polarPoint,
    radioEnd: polarPoint,
    visualStart: polarPoint,
    visualEnd: polarPoint,
}


export type {satPosition, horizons, polarPoint, cartesianPoint}