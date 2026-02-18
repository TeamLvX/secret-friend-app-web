export interface Assignment {
    id: string;
    giver_id: string;
    giver_name: string
    receiver_id: string
    receiver_name: string
    status: boolean;
    shown_at?: string;
}