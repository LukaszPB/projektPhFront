import { Component, Input } from '@angular/core';
import { Failure } from "../../Klasa/failure.model";
import { FailureService } from "../../service/failure.service";
import {Router} from "@angular/router";
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-failure-element',
  templateUrl: './failure-element.component.html',
  styleUrls: ['./failure-element.component.css']
})
export class FailureElementComponent {
  @Input() public failure: Failure;

  constructor(private failureService: FailureService,private router:Router,private datePipe: DatePipe) {}

  zamienDate(date: Date | string): string {
    if (typeof date === 'string') {
      // Konwertuj datę na obiekt daty
      date = new Date(date);
    }
    return this.datePipe.transform(date, 'MM.dd.yyyy') ?? '';
  }


  deleteFailure(): void {
    this.failureService.deleteFailure(this.failure.id).subscribe(() => {
      this.failureService.getFailures().subscribe(failures => {
        this.failureService.setFailuresService(failures);
        this.failureService.updateFailureList(); // Wywołanie metody w serwisie po usunięciu elementu
      });
    });
  }
  editFailure () {
    this.router.navigate([`edit`,this.failure.id]);
  }
}
