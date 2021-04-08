import { Industry } from "../enumeration/industry.enum";
import { Posting } from "./posting";

export class Project extends Posting {
    postingId: number | undefined;
    projectTitle: string | undefined;
    projectDescription: string | undefined;
    compensation: number | undefined;
    earliestStartDate: string | undefined;
    latestStartDate: string | undefined;
    industry: Industry | undefined;
    requiredSkills: string[] | undefined;
    projectSpecialisation: string | undefined;
    isComplete: boolean | undefined;
    milestones: string[] | undefined;

    constructor(postingId?: number, projectTitle?: string,
        projectDescription?: string, compensation?: number, 
        earliestStartDate?: string, latestStartDate?: string, 
        industry?: Industry, requiredSkills?: string[], 
        projectSpecialisation?: string, isComplete?: boolean, milestones?:string[]) {
            super(postingId);
            this.projectTitle = projectTitle;
            this.projectDescription = projectDescription;
            this.compensation = compensation;
            this.earliestStartDate = earliestStartDate;
            this.latestStartDate = latestStartDate;
            this.industry = industry;
            this.requiredSkills = requiredSkills;
            this.projectSpecialisation = projectSpecialisation;
            this.isComplete = isComplete;
            this.milestones = milestones;
    }
}
