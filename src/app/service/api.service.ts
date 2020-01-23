import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  
  baseUri:string = 'http://localhost:4005/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  

  // Get all users
  getUsers() {
    return this.http.get(`${this.baseUri}/user/`);
  }

  // get table for create user 
  getRoles() {
    //console.log("get create!!!")
    return this.http.get(`${this.baseUri}/user/roles`);
  }

  // Get user
  getUser(id): Observable<any> {
    console.log("get user", );
    let url = `${this.baseUri}/user/update/${id}`;
    return this.http.get(url)
  }

  // Update user
  updateUser(id, data): Observable<any> {
    console.log("id-update", id);
    let url = `${this.baseUri}/user/update/${id}`;
    return this.http.put(url, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  // Create
  createUser(data): Observable<any> {
    let url = `${this.baseUri}/user/create`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }



  

  

  // Delete user
  deleteUser(id): Observable<any> {
    console.log("delete id=", id);
    let url = `${this.baseUri}/user/${id}`;
    return this.http.delete(url, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  // Error handling 
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}