import { ApplicationStatus } from "../enumeration/application-status.enum";
import { Posting } from "./posting";
import { StudentWrapper } from "./student-wrapper";

export class Application {
    applicationId: number | undefined;
    offerSent: boolean | undefined;
    applicationStatus: String | undefined;
    postingId: number | undefined;
    studentId: number | undefined;

    constructor(applicationId?: number, offerSent?: boolean,
        applicationStatus?: String) {
            this.applicationId = applicationId;
            this.offerSent = offerSent;
            this.applicationStatus = applicationStatus;
    }
}