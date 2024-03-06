import { Injectable } from '@angular/core';
import {Failure} from "../Klasa/failure.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, of, Subject, tap} from "rxjs";
import {DTOModel} from "../Klasa/DTO.model";

@Injectable({
  providedIn: 'root'
})
export class FailureService {

  url='http://localhost:8080/';
  failures: Failure[] =[];
  private failureListUpdated$ = new Subject<void>();
  constructor(private http:HttpClient) { }

  getFailures(): Observable<Failure[]>{
    return this.http.get<Failure[]>(`${this.url}Failures`);;
  }
  getSingleFailure(id:number):Observable<Failure>{

    return this.http.get<Failure>(`${this.url}Failures/${id}`);
  }
  get failureListUpdated(): Observable<void> {
    return this.failureListUpdated$.asObservable();
  }

  addFailure(failure: DTOModel):Observable<Failure> {
    console.log(this.failures);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json'})
    };
    console.log(`${this.url}Failure`);
    const jsonFailure = JSON.stringify(failure)
    console.log(jsonFailure);
    return this.http.post<Failure>(`${this.url}Failure`, failure).pipe(
      catchError(this.handleError<Failure>('addFailure')),
      tap(() => this.failureListUpdated$.next())
    );
  }
  deleteFailure(failureId: number): Observable<void> {
    return this.http.delete<void>(`${this.url}Failure/${failureId}`).pipe(
      catchError(this.handleError<void>('deleteFailure'))
    );
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(operation + ' failed' + error);
      return of(result as T);
    };
  }
  updateFailureList(): void {
    this.failureListUpdated$.next();
  }
  setFailuresService(failures: Failure[]){
    this.failures=failures;
  }
}
