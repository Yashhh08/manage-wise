/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // private url = "http://localhost:3333/users"

  private url = "mongodb+srv://yashhh08:Mongodb%40101@cluster0.p9ansmx.mongodb.net/users"

  constructor(private http: HttpClient) { }

  createUser(user: unknown): Observable<any> {
    return this.http.post(`${this.url}`, user);
  }

  login(user: unknown): Observable<any> {
    return this.http.post(`${this.url}/login`, user);
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.url}/logout`, {});
  }

  logoutAll(): Observable<void> {
    return this.http.post<void>(`${this.url}/logoutAll`, {});
  }

  getProfile(): Observable<any> {
    return this.http.get(`${this.url}/profile`);
  }

  getAllUsers(limit: number, skip: number): Observable<any> {
    return this.http.get(`${this.url}?limit=${limit}&skip=${skip}`);
  }

  getUserById(id: string): Observable<any> {
    return this.http.get(`${this.url}/${id}`);
  }

  updateUser(id: string, body: unknown): Observable<any> {
    return this.http.patch(`${this.url}/${id}`, body);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }

}
