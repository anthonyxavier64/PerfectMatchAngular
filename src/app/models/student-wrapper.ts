import { Application } from "./application";
import { Offer } from "./offer";
import { Payment } from "./payment";

export class StudentWrapper {
    studentId: number | undefined;
    name: string | undefined;
    biography: string | undefined;
    email: string | undefined;
    password: string | undefined;
    educationalInstitute: string | undefined;
    courseOfStudy: string | undefined;
    yearOfStudy: number | undefined;
    projectedGraduationYear: String | undefined;
    relevantSkills: string[] | undefined;
    availabilityPeriod: string[] | undefined;
    applications: Application[] | undefined;
    payments: Payment[] | undefined;
    offers: Offer[] | undefined;

    constructor(studentId?: number, name?: string,
        biography?: string, email?: string, password?: string,
        educationalInstitute?: string, courseOfStudy?: string,
        yearOfStudy?: number, projectedGraduationYear?: string, 
        relevantSkills?: string[], availabilityPeriod?: string[]) {
            this.studentId = studentId;
            this.name = name;
            this.biography = biography;
            this.email = email;
            this.password = password;
            this.educationalInstitute = educationalInstitute;
            this.courseOfStudy = courseOfStudy;
            this.yearOfStudy = yearOfStudy;
            this.projectedGraduationYear = projectedGraduationYear;
            this.relevantSkills = relevantSkills;
            this.availabilityPeriod = availabilityPeriod;
    }
}
