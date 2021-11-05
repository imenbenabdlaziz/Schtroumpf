import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SignupService {


  urlRegister=" http://localhost:8084/api/v2/home/users/signup";

  constructor(private HttpClient:HttpClient) { }




  Register( email:string ,password:string,fullName: string,phone: number,companyEmployeesNumber: number){
    return this.HttpClient.post(this.urlRegister,{email:email,password:password,fullName:fullName,phoneNumber:phone,companyEmployeesNumber:companyEmployeesNumber})


  }

}
