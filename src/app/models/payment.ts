import { Project } from "./project";
import { Startup } from "./startup";
import { StudentWrapper } from "./student-wrapper";

export class Payment {
    paymentId: number | undefined;
    paymentAmount: number | undefined;
    description: string | undefined;
    dateOfTransaction: String | undefined;
    project: Project | undefined;
    startup: Startup | undefined;
    student: StudentWrapper | undefined;

    constructor(paymentId?: number, paymentAmount?: number,
        description?: string, dateOfTransaction?: String) {
            this.paymentId = paymentId;
            this.paymentAmount = paymentAmount;
            this.description = description;
            this.dateOfTransaction = dateOfTransaction;
    }
}