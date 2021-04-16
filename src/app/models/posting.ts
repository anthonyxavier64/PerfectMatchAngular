import { Industry } from "../enumeration/industry.enum";
import { Application } from "./application";
import { Offer } from "./offer";
import { Startup } from "./startup";
import { StudentWrapper } from "./student-wrapper";

export abstract class Posting {
    postingId: number | undefined;
    title: string | undefined;
    description: string | undefined;
    pay: number | undefined;
    earliestStartDate: Date | undefined;
    latestStartDate: Date | undefined;
    industry: Industry | undefined;
    requiredSkills: string[] | undefined;
    isProject: boolean | undefined;

    offers: Offer[] | undefined;
    applications: Application[] | undefined;
    startup: Startup | undefined;
    acceptedStudentId: number | undefined;

    constructor(postingId?: number, title?: string,
        description?: string, pay?: number,
        earliestStartDate?: Date, latestStartDate?: Date,
        industry?: Industry, requiredSkills?: string[], acceptedStudentId?: number, isProject?: boolean) {
        this.postingId = postingId;
        this.title = title;
        this.description = description;
        this.pay = pay;
        this.earliestStartDate = earliestStartDate;
        this.latestStartDate = latestStartDate;
        this.industry = industry;
        this.requiredSkills = requiredSkills;
        this.acceptedStudentId = acceptedStudentId;
        this.isProject = isProject;
    }
}
