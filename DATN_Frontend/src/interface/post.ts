interface IPost {
    _id: string;
    job_name: string;
    job_description: string;
    job_salary: any;
    working_form: string;
    number_of_recruits: number;
    requirements: string;
    gender: string;
    work_location: string;
    post_status: boolean;
    user_id: string;
    career: string;
    logo: string;
    priority: boolean;
    isSave: boolean;
    isDone: boolean;
    isRead : boolean;
    newCandidates: number;
    period: Date
    createdAt?: string;
    min_job_salary?: number; 
    max_job_salary?: number;
}

export default IPost