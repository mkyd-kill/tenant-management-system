export type TenantGet = {
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    phone: string,
    property_id: number,
    move_in_date: string,
    move_out_date: string,
    created_at: string,
}

export type TenantPost = {
    first_name: string,
    last_name: string,
    email: string,
    phone: string,
    move_in_date: string,
    move_out_date: string,
}