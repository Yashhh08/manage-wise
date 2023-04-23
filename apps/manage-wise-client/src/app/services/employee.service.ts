import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private url = 'http://localhost:3333/employees';

  constructor(private http: HttpClient) { }

  addEmployee(employee: unknown): Observable<any> {
    return this.http.post(`${this.url}`, employee);
  }

  getAllEmployees(limit: number, skip: number): Observable<any> {
    return this.http.get(`${this.url}?limit=${limit}&skip=${skip}`);
  }

  getEmployeeById(id: string): Observable<any> {
    return this.http.get(`${this.url}/${id}`);
  }

  getEmployeesByDepartmentId(departmentId: string, limit: number, skip: number): Observable<any> {
    return this.http.get(`${this.url}/department/${departmentId}?limit=${limit}&skip=${skip}`);
  }

  editEmployee(id: string, employee: unknown): Observable<any> {
    return this.http.patch(`${this.url}/${id}`, employee);
  }

  deleteEmployee(id: string): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }

}
