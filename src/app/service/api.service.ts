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

  // Create
  createUser(data): Observable<any> {
    let url = `${this.baseUri}/user/create`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Create
  getRoles() {
    console.log("get create!!!")
    return this.http.get(`${this.baseUri}/user/roles`);
  }

  // Get all users
  getUsers() {
    return this.http.get(`${this.baseUri}/user/`);
  }

  // Get user
  getUser(id): Observable<any> {
    let url = `${this.baseUri}/user/${id}`;
    return this.http.get(url, {headers: this.headers}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  // Update user
  updateUser(id, data): Observable<any> {
    let url = `${this.baseUri}/user/${id}`;
    return this.http.put(url, data, { headers: this.headers }).pipe(
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

  // Create
  createRole(data): Observable<any> {
    let url = `${this.baseUri}/role/`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }


  // Get role
  getRole(id): Observable<any> {
    let url = `${this.baseUri}/role/${id}`;
    return this.http.get(url, {headers: this.headers}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  // // Update user
  // updateRole(id, data): Observable<any> {
  //   let url = `${this.baseUri}/role/${id}`;
  //   return this.http.put(url, data, { headers: this.headers }).pipe(
  //     catchError(this.errorMgmt)
  //   )
  // }

  // Delete user
  deleteRole(id): Observable<any> {
    console.log("delete req to back")
    let url = `${this.baseUri}/role/${id}`;
    return this.http.delete(url, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

}