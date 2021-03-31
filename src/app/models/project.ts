import { Industry } from "../enumeration/industry.enum";

export class Project {
    projectId: number | undefined;
    projectTitle: string | undefined;
    projectDescription: string | undefined;
    compensation: number | undefined;
    earliestStartDate: Date | undefined;
    latestStartDate: Date | undefined;
    industry: Industry | undefined;
    requiredSkills: string[] | undefined;
    projectSpecialisation: string | undefined;
    isComplete: boolean | undefined;

    constructor(projectId?: number, projectTitle?: string,
        projectDescription?: string, compensation?: number, 
        earliestStartDate?: Date, latestStartDate?: Date, 
        industry?: Industry, requiredSkills?: string[], 
        projectSpecialisation?: string, isComplete?: boolean) {
            this.projectId = projectId;
            this.projectTitle = projectTitle;
            this.projectDescription = projectDescription;
            this.compensation = compensation;
            this.earliestStartDate = earliestStartDate;
            this.latestStartDate = latestStartDate;
            this.industry = industry;
            this.requiredSkills = requiredSkills;
            this.projectSpecialisation = projectSpecialisation;
            this.isComplete = isComplete;
    }
}
