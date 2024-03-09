import {Component, OnDestroy, OnInit} from '@angular/core';
import { FailureService } from "../service/failure.service";
import { Failure } from "../Klasa/failure.model";
import { Router } from "@angular/router";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-failure-list',
  templateUrl: './failure-list.component.html',
  styleUrls: ['./failure-list.component.css']
})
export class FailureListComponent implements OnDestroy,OnInit {
  failures: Failure[];
  statuses: string[] = [];
  sortowanieDaty: string;
  private failureListUpdateSubscription: Subscription;

  constructor(private failureService: FailureService, private router: Router) {
    this.failureListUpdateSubscription = this.failureService.failureListUpdated.subscribe(() => {
      this.updateFailureList();
    });
    this.updateFailureList();
  }
  ngOnInit(): void {
    this.failureService.getStatuses().subscribe(types => {
      this.statuses = types;
    });
  }
  ngOnDestroy(): void {
    this.failureListUpdateSubscription.unsubscribe();
  }

  updateFailureList(): void {
    this.failureService.getFailures().subscribe(failures => {
      this.failures = failures;
    });
  }

  navigateToAddForm(): void {
    this.router.navigate(['/dodaj']);
  }

  sortFailures(event: any): void {
    this.sortowanieDaty= event.target.value;
    if (this.sortowanieDaty === 'asc') {
      this.failures.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else if (this.sortowanieDaty === 'desc') {
      this.failures.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
  }

  filterStatuses(event: any): void {
    const order = event.target.value;
    if (order === 'all') {
      this.failureService.getFailures().subscribe(failures => {
        this.failures = failures;
      });
    } else {
      this.failures =[];
      console.log(order);
      this.failureService.getFailures().subscribe(failures => {
       failures.map(failure=>{
         console.log(failure.status);
         if(failure.status===order){
           this.failures.push(failure);
         }
       })
      });
    }
  }
}
