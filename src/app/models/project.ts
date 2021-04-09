import { Industry } from "../enumeration/industry.enum";
import { Posting } from "./posting";

export class Project extends Posting {
    projectSpecialisation: string | undefined;
    isComplete: boolean | undefined;
    milestones: string[] | undefined;

    constructor(postingId?: number, title?: string,
        description?: string, pay?: number, 
        earliestStartDate?: Date, latestStartDate?: Date, 
        industry?: Industry, requiredSkills?: string[], 
        projectSpecialisation?: string, isComplete?: boolean, milestones?:string[]) {

            super(postingId, title, description, pay, earliestStartDate, latestStartDate, industry, requiredSkills);
            this.projectSpecialisation = projectSpecialisation;
            this.isComplete = isComplete;
            this.milestones = milestones;
    }
}
