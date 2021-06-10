export interface Employee {
    employee_id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    hire_date: Date;
    salary: number;
    active?: boolean;
    profile?: string;
    job_title?: string;
    job_id?: number;
}