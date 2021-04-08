import { Industry } from "../enumeration/industry.enum";
import { Posting } from "./posting";

export class Job extends Posting {
    postingId: number | undefined;
    jobTitle: string | undefined;
    jobDescription: string | undefined;
    monthlySalary: number | undefined;
    earliestStartDate: Date | undefined;
    latestStartDate: Date | undefined;
    industry: Industry | undefined;
    requiredSkills: string[] | undefined;
    
    constructor(postingId?: number, jobTitle?: string,
        jobDescription?: string, monthlySalary?: number, 
        earliestStartDate?: Date, latestStartDate?: Date, 
        industry?: Industry, requiredSkills?: string[]) {
            super(postingId);
            this.jobTitle = jobTitle;
            this.jobDescription = jobDescription;
            this.monthlySalary = monthlySalary;
            this.earliestStartDate = earliestStartDate;
            this.latestStartDate = latestStartDate;
            this.industry = industry;
            this.requiredSkills = requiredSkills;
    }
}
