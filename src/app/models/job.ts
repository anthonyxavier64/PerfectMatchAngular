import { Industry } from "../enumeration/industry.enum";

export class Job {
    jobId: number | undefined;
    jobTitle: string | undefined;
    jobDescription: string | undefined;
    monthlySalary: number | undefined;
    earliestStartDate: Date | undefined;
    latestStartDate: Date | undefined;
    industry: Industry | undefined;
    requiredSkills: string[] | undefined;
    
    constructor(jobId?: number, jobTitle?: string,
        jobDescription?: string, monthlySalary?: number, 
        earliestStartDate?: Date, latestStartDate?: Date, 
        industry?: Industry, requiredSkills?: string[], 
        projectSpecialisation?: string, isComplete?: boolean) {
            this.jobId = jobId;
            this.jobTitle = jobTitle;
            this.jobDescription = jobDescription;
            this.monthlySalary = monthlySalary;
            this.earliestStartDate = earliestStartDate;
            this.latestStartDate = latestStartDate;
            this.industry = industry;
            this.requiredSkills = requiredSkills;
    }
}
