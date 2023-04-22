import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerformanceService {

  private url = "http://localhost:3333/performances";

  constructor(private http: HttpClient) { }

  addPerformance(performance: unknown): Observable<unknown> {
    return this.http.post(this.url, performance);
  }

  getPerformances(limit: number, skip: number): Observable<unknown> {
    return this.http.get(`${this.url} ? limit = ${limit} & skip=${skip}`);
  }

  getPerformanceByEmployeeId(id: string, limit: number, skip: number): Observable<unknown> {
    return this.http.get(`${this.url}/employee/${id} ? limit = ${limit} & skip=${skip}`);
  }

}
