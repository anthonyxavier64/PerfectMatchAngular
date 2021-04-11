import { Industry } from "../enumeration/industry.enum";
import { Posting } from "./posting";

export class Job extends Posting {

    constructor(postingId?: number, title?: string,
        description?: string, pay?: number,
        earliestStartDate?: Date, latestStartDate?: Date,
        industry?: Industry, requiredSkills?: string[]) {
        super(postingId, title, description, pay, earliestStartDate, latestStartDate, industry, requiredSkills);
    }
}
