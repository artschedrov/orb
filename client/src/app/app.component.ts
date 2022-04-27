import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, startWith } from 'rxjs';
import { DataState } from './enum/data-state.enum';
import { AppState } from './interface/app-state.interface';
import { CustomResponse } from './interface/custom-response.interface';
import { ServerService } from './service/server.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Main Page';
  appState$: Observable<AppState<CustomResponse>>;
  readonly DataState = DataState;
  private filterSubject = new BehaviorSubject<string>('');
  private dataSubject = new BehaviorSubject<CustomResponse>(null);
  filterStatus$ = this.filterSubject.asObservable();

  viewTerminal: boolean = false;


  constructor(private serverService: ServerService) {}

  ngOnInit(): void {
    this.appState$ = this.serverService.getServers()
    .pipe(
      map(response => {
        this.dataSubject.next(response);
        return { dataState: DataState.LOADED, appData: response}
      }), 
      startWith({ dataState: DataState.LOADING}), 
      catchError((error: string) => {
        return of({ dataState: DataState.ERROR, error })
      }))
  }

  pingServer(ipAddress: string): void {
    this.filterSubject.next(ipAddress);
    this.appState$ = this.serverService.pingServer(ipAddress).pipe(
      map(response => {
        const index = this.dataSubject.value.data.servers.findIndex( server => server.id === response.data.server.id);
        this.dataSubject.value.data.servers[index] = response.data.server;
        this.filterSubject.next('');
        return { dataState: DataState.LOADED, appData: this.dataSubject.value }
      }),
      startWith({ dataState: DataState.LOADED, appData: this.dataSubject.value }),
      catchError((error: string) => {
        this.filterSubject.next('');
        return of({ dataState: DataState.ERROR, error })
      })
    );
  }

  toggleTerminal() {
    if(this.viewTerminal) {
      this.viewTerminal = false;
      console.log('f')
    } else {
      this.viewTerminal = true;
      console.log('t')
    }
  }
}
