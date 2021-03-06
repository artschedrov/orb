import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Server } from '../interface/server.interface';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { CustomResponse } from '../interface/custom-response.interface';
import { Status } from '../enum/status.enum';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  private readonly apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  servers$ = <Observable<CustomResponse>>
  this.http.get<CustomResponse>(`${this.apiUrl}/server/list`)
  .pipe(tap(console.log), catchError(this.handleError));

  // save$ = (server: Server) => <Observable<CustomResponse>>
  // this.http.post<CustomResponse>(`${this.apiUrl}/server/save`, server)
  // .pipe(tap(console.log), catchError(this.handleError));

  // ping$ = (ipAddress: string) => <Observable<CustomResponse>>
  // this.http.get<CustomResponse>(`${this.apiUrl}/server/path/${ipAddress}`)
  // .pipe(tap(console.log), catchError(this.handleError));

  // delete$ = (serverId: number) => <Observable<CustomResponse>>
  // this.http.delete<CustomResponse>(`${this.apiUrl}/server/delete/${serverId}`)
  // .pipe(tap(console.log), catchError(this.handleError));

  getServers(): Observable<CustomResponse>  {
    return this.http.get<CustomResponse>(`${this.apiUrl}/server/list`)
    .pipe(tap(console.log), catchError(this.handleError));
  }

  saveServer(server: Server): Observable<CustomResponse> {
    return this.http.post<CustomResponse>(`${this.apiUrl}/server/save`, server)
    .pipe(tap(console.log), catchError(this.handleError));
  }

  pingServer(ipAddress: string): Observable<CustomResponse> {
    return this.http.get<CustomResponse>(`${this.apiUrl}/server/path/${ipAddress}`)
    .pipe(tap(console.log), catchError(this.handleError));
  }

  deleteServer(serverId: number): Observable<CustomResponse> {
    return this.http.delete<CustomResponse>(`${this.apiUrl}/server/delete/${serverId}`)
    .pipe(tap(console.log), catchError(this.handleError));
  }
  
  // handleError(handleError: any) {
  //   return throwError('Method not implemented');
  // }

  private handleError( error: HttpErrorResponse): Observable<never> {
    console.log(error);
    return throwError(`An error ocurred - Error code: ${error.status}`);
  }
}
