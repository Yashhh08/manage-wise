/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private url = "http://localhost:3333/departments";

  constructor(private http: HttpClient) { }

  addDepartment(department: unknown): Observable<any> {
    return this.http.post(`${this.url}`, department);
  }

  getDepartments(limit: number, skip: number): Observable<any> {
    return this.http.get(`${this.url}?limit=${limit}&skip=${skip}`);
  }

  getDepartmentById(id: string): Observable<any> {
    return this.http.get(`${this.url}/${id}`);
  }

  updateDepartment(id: string, department: unknown): Observable<any> {
    return this.http.put(`${this.url}/${id}`, department);
  }

  deleteDepartment(id: string): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }

}
