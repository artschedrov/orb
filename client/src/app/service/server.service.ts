import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Server } from '../interface/server.interface';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { CustomResponse } from '../interface/custom-response.interface';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  private readonly apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  servers$ = <Observable<CustomResponse>>
  this.http.get<CustomResponse>(`${this.apiUrl}/server/list`)
  .pipe(
    tap(console.log), 
    catchError(this.handleError));

  save$ = (server: Server) => <Observable<CustomResponse>>
  this.http.post<CustomResponse>(`${this.apiUrl}/server/save`, server)
  .pipe(tap(console.log), catchError(this.handleError));

  handleError(handleError: any) {
    return throwError('Method not implemented');
  }
}
