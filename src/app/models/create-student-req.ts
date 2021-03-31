import { StudentWrapper } from '../models/student-wrapper';



export class CreateStudentReq
{
    email: string | undefined;
    password: string | undefined;
    student: StudentWrapper | undefined;
    categoryId: number | undefined | null;
    tagIds: number[] | undefined;

    constructor(email?: string, password?: string, student?: StudentWrapper)
	{		
		this.email = email;
        this.password = password;
        this.student = student;
	}
}
