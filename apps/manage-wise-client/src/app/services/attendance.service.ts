import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  private url = "http://localhost:3333/attendances";

  constructor(private http: HttpClient) { }

  addAttendance(attendance: unknown): Observable<any> {
    return this.http.post(`${this.url}`, attendance);
  }

  getAttendances(limit: number, skip: number): Observable<any> {
    return this.http.get(`${this.url}?limit=${limit}&skip=${skip}`);
  }

  getAttendanceById(id: string): Observable<any> {
    return this.http.get(`${this.url}/${id}`);
  }

  getAttendancesByEmployeeId(employeeId: string, limit: number, skip: number): Observable<any> {
    return this.http.get(`${this.url}/employee/${employeeId}?limit=${limit}&skip=${skip}`);
  }

  updateAttendance(id: string, body: unknown): Observable<any> {
    return this.http.patch(`${this.url}/${id}`, body);
  }

  deleteAttendance(id: string): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }

}
