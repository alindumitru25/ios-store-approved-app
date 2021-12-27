export const SET_POSITION = 'SET_POSITION';
export const SET_EXISTING_LOCATION = 'SET_EXISTING_LOCATION';
export const SET_NEW_MARKER = 'SET_NEW_MARKER';
export const SET_CUSTOM_POSITION = 'SET_CUSTOM_POSITION';
export const VIEW_CUSTOM_POSITION = 'VIEW_CUSTOM_POSITION';
export const SHOW_EXISTING_LOCATION = 'SHOW_EXISTING_LOCATION';
export const SHOW_NEW_MARKER = 'SHOW_NEW_MARKER';
export const CLEAR_LOCATION_CHOOSER = 'CLEAR_LOCATION_CHOOSER';

// points to gps position always updated with latest
export function setPosition(newPosition: any) {
    return {
        type: SET_POSITION,
        position: newPosition
    };
}

// Set marker on existing location
export function setExistingLocation(existingLocation: any) {
    return {
        type: SET_EXISTING_LOCATION,
        existingLocation
    };
}

// Set marker on a new location
export function setNewMarker(markerPosition: any) {
    return {
        type: SET_NEW_MARKER,
        newMarker: markerPosition
    };
}

// sets custom position that overrides the gps position
export function setCustomPosition(newPosition: any) {
    return {
        type: SET_CUSTOM_POSITION,
        customPosition: newPosition
    };
}

export function viewCustomPosition(viewCustomPosition: boolean) {
    return {
        type: VIEW_CUSTOM_POSITION,
        viewCustomPosition
    }
}

export function showNewMarker(showNewMarker: boolean) {
    return {
        type: SHOW_NEW_MARKER,
        showNewMarker
    };
}

export function clearLocationChooser() {
    return {
        type: CLEAR_LOCATION_CHOOSER
    };
}
