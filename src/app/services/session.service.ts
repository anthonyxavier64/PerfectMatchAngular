import { Injectable } from '@angular/core';

import { Student } from '../models/student'

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { 
    this.setIsLogin(false);
  }

  getCurrentStudent(): Student
	{
		return JSON.parse(sessionStorage.currentStudent);
	}

  setCurrentStudent(student: Student | null): void {
    sessionStorage.students = JSON.stringify(student);
  }

  getIsLogin(): boolean
	{
		if(sessionStorage.isLogin == "true")
		{
			return true;
		}
		else
		{
			return false;
		}
	}

	setIsLogin(isLogin: boolean): void
	{
		sessionStorage.isLogin = isLogin;
	}

}
