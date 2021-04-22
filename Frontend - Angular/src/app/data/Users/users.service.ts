import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { from, Observable } from 'rxjs';
import {Users} from './users'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseURL =environment.baseServiceUrl;
  constructor( private httpClient: HttpClient ) { }
  

  getAllUsers(): Observable<Users[]>{
    return this.httpClient.get<Users[]>(`${this.baseURL}User/allusers`);
  }
  getUsersById(userId : String): Observable<Users>{
    return this.httpClient.get<Users>(`${this.baseURL}User/allusers/${userId}`);
  }
  updateUser(userId : String, value:any): Observable<object>{
    return this.httpClient.put(`${this.baseURL}User/update/${userId}`,value);
  }
  updatePassword(userId : String, value:any): Observable<object>{
    return this.httpClient.put(`${this.baseURL}User/updatePassword/${userId}`,value);
  }
}

