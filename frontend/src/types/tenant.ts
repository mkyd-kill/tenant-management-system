export interface Tenant {
    id: number;
    property_id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
    move_in_date: string;
    move_out_date?: string;
    created_at: string;
    updated_at: string;
}