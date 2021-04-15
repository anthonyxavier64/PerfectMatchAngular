import { Application } from "./application";
import { Favourites } from "./favourites";
import { Offer } from "./offer";
import { Payment } from "./payment";
import { Posting } from "./posting";

export class StudentWrapper {
    studentId: number | undefined;
    name: string | undefined;
    biography: string | undefined;
    email: string | undefined;
    password: string | undefined;
    educationalInstitute: string | undefined;
    courseOfStudy: string | undefined;
    yearOfStudy: number | undefined;
    projectedGraduationYear: string | undefined;
    relevantSkills: string[] | undefined;
    availabilityPeriod: string[] | undefined;
    favorites: Favourites[];

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
            this.relevantSkills = new Array();
            this.availabilityPeriod = new Array();
            this.favorites = new Array();
    }
}
