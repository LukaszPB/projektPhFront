import { Component } from '@angular/core';
import {FailureService} from "../service/failure.service";
import {Failure} from "../Klasa/failure.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-failure-list',
  templateUrl: './failure-list.component.html',
  styleUrl: './failure-list.component.css'
})
export class FailureListComponent {
  failures: Failure[]
  constructor(private failureService: FailureService, private router: Router) {
    failureService.getFailures().subscribe(failures=>{this.failures=failures;   console.log(this.failures); this.failureService.setFailuresService(this.failures);})

  }
  navigateToAddForm() {
    this.router.navigate(['/dodaj']);
  }

}
