// setting up the tenant interface/model
export interface Tenant {
    id: number;
    name: string;
    email: string;
    phone?: string;
    move_in_date: string;
    is_active: boolean;
    created_at: string;
}