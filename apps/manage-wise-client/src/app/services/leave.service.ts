/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  private url = "http://localhost:3333/leaves";

  constructor(private http: HttpClient) { }

  addLeave(leave: unknown): Observable<unknown> {
    return this.http.post(this.url, leave);
  }

  getLeaves(limit: number, skip: number): Observable<unknown> {
    return this.http.get(`${this.url} ? limit = ${limit} & skip=${skip}`);
  }

  getLeaveById(id: string): Observable<unknown> {
    return this.http.get(`${this.url} / ${id}`);
  }

  updateLeave(id: string, leave: unknown): Observable<unknown> {
    return this.http.patch(`${this.url} / ${id}`, leave);
  }

  deleteLeave(id: string): Observable<unknown> {
    return this.http.delete(`${this.url} / ${id}`);
  }

}
