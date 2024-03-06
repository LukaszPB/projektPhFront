import { Injectable } from '@angular/core';
import {Failure} from "../Klasa/failure.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FailureService {

  url='http://localhost:8080/Failures';
  failures: Failure[] =[];
  constructor(private http:HttpClient) { }
  getFailures(): Observable<Failure[]>{
    return this.http.get<Failure[]>(this.url);
  }
  getSingleFailure(id:number):Observable<Failure>{

    return this.http.get<Failure>(`${this.url}/${id}`);
  }
}
