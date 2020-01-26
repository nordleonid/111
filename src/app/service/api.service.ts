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

// ROLE


  // get table role
  getRoles() {
    // console.log("get create!!!")
    return this.http.get(`${this.baseUri}/role/roles`);
  }

  // Get role
  getRole(id): Observable<any> {
    console.log('get role by id', id);
    const url = `${this.baseUri}/role/update/${id}`;
    return this.http.get(url);
  }

    // Create
  createRole(data): Observable<any> {
    console.log(data);
    const url = `${this.baseUri}/role/create`;
    return this.http.post(url, data);
  }

  // Update
  updateRole(id, data): Observable<any> {
    console.log('update api on send role', data);
    const url = `${this.baseUri}/role/${id}`;
    return this.http.put(url, data);
  }

  // Delete
  deleteRole(id): Observable<any> {
  console.log('delete id=', id);
  const url = `${this.baseUri}/role/${id}`;
  return this.http.delete(url, { headers: this.headers }).pipe(
    catchError(this.errorMgmt)
  );
}




// USER

  // Get all users
  getUsers() {
    return this.http.get(`${this.baseUri}/user/`);
  }

  // Get user
  getUser(id): Observable<any> {
    console.log("get user", );
    let url = `${this.baseUri}/user/update/${id}`;
    return this.http.get(url)
  }

  // Update user
  updateUser(id, data): Observable<any> {
    console.log('update api on send', data);
    const url = `${this.baseUri}/user/${id}`;
    return this.http.put(url, data);
  }

  // Create
  createUser(data): Observable<any> {
    let url = `${this.baseUri}/user`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Delete user
  deleteUser(id): Observable<any> {
    console.log('delete id=', id);
    const url = `${this.baseUri}/user/${id}`;
    return this.http.delete(url, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    );
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
