import { Student } from '../models/student';



export class CreateStudentReq
{
    email: string | undefined;
    password: string | undefined;
    student: Student | undefined;
    categoryId: number | undefined | null;
    tagIds: number[] | undefined;

    constructor(email?: string, password?: string, student?: Student)
	{		
		this.email = email;
        this.password = password;
        this.student = student;
	}
}
