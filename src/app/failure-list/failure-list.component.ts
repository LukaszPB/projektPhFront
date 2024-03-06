import { Component, OnDestroy } from '@angular/core';
import { FailureService } from "../service/failure.service";
import { Failure } from "../Klasa/failure.model";
import { Router } from "@angular/router";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-failure-list',
  templateUrl: './failure-list.component.html',
  styleUrls: ['./failure-list.component.css']
})
export class FailureListComponent implements OnDestroy {
  failures: Failure[];
  private failureListUpdateSubscription: Subscription;

  constructor(private failureService: FailureService, private router: Router) {
    this.failureListUpdateSubscription = this.failureService.failureListUpdated.subscribe(() => {
      this.updateFailureList();
    });
    this.updateFailureList();
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
}
