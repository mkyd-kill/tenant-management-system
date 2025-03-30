export type InspectionGet = {
    id: number,
    property_id: number,
    condition: string,
    date: string,
}

export type InspectionPost = {
    property_id: number,
    condition: string,
}