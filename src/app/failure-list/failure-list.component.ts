import { Component } from '@angular/core';
import {FailureService} from "../service/failure.service";
import {Failure} from "../Klasa/failure.model";

@Component({
  selector: 'app-failure-list',
  templateUrl: './failure-list.component.html',
  styleUrl: './failure-list.component.css'
})
export class FailureListComponent {
  failures: Failure[]
  constructor(private failureService: FailureService) {
    failureService.getFailures().subscribe(failures=>{this.failures=failures;   console.log(this.failures);})

  }

}
