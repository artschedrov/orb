import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BehaviorSubject, catchError, map, Observable, of, startWith } from 'rxjs';
import { DataState } from './enum/data-state.enum';
import { Status } from './enum/status.enum';
import { AppState } from './interface/app-state.interface';
import { CustomResponse } from './interface/custom-response.interface';
import { Server } from './interface/server.interface';
import { ServerService } from './service/server.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  title = 'Main Page';
  appState$: Observable<AppState<CustomResponse>>;
  readonly DataState = DataState;
  readonly Status = Status;
  private filterSubject = new BehaviorSubject<string>('');
  private dataSubject = new BehaviorSubject<CustomResponse>(null);
  filterStatus$ = this.filterSubject.asObservable();

  viewTerminal: boolean = false;
  addingServer: boolean = false;
  panelOpenState = false;


  constructor(private serverService: ServerService) {}

  ngOnInit(): void {
    this.appState$ = this.serverService.servers$
    .pipe(
      map(response => {
        this.dataSubject.next(response);
        return { 
          dataState: DataState.LOADED, 
          appData: response, 
          data: { servers: response.data.servers.reverse()
          }
        }
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

  saveServer(serverForm: NgForm): void {
    this.appState$ = this.serverService.saveServer(serverForm.value as Server)
    .pipe(
      map(response => {
        this.dataSubject.next({
          ...response, data: { servers: [response.data.server, ...this.dataSubject.value.data.servers]}
        });
        serverForm.resetForm({ status: this.Status.SERVER_DOWN})
        return { dataState: DataState.LOADED, appData: this.dataSubject.value }
      }),
      startWith({ dataState: DataState.LOADED, appData: this.dataSubject.value }),
      catchError((error: string) => {
        this.filterSubject.next('');
        return of({ dataState: DataState.ERROR, error })
      })
    );
  }

  deleteServer(server: Server): void {
    this.appState$ = this.serverService.deleteServer(server.id)
    .pipe(
      map(response => {
        this.dataSubject.next({
          ...response, data: { servers: this.dataSubject.value.data.servers.filter(s => s.id !== server.id)}
        });
        return { dataState: DataState.LOADED, appData: this.dataSubject.value }
      }),
      startWith({ dataState: DataState.LOADED, appData: this.dataSubject.value }),
      catchError((error: string) => {
        return of({ dataState: DataState.ERROR, error })
      })
    );
  }

  toggleTerminal() {
    if(this.viewTerminal) {
      this.viewTerminal = false;
    } else {
      this.viewTerminal = true;
      this.addingServer = false;
    }
  } 

  addServer() {
    if(this.addingServer) {
      this.addingServer = false;
    } else {
      this.addingServer = true;
      this.viewTerminal = false;
    }
  }
}
