import {Component, Input} from '@angular/core';
import {Failure} from "../../Klasa/failure.model";

@Component({
  selector: 'app-failure-element',
  templateUrl: './failure-element.component.html',
  styleUrl: './failure-element.component.css'
})
export class FailureElementComponent {
  @Input() public failure: Failure;
  constructor() {
  }
  zamienDate(date: Date): string {
    return new Date(date).toLocaleString();
  }
}
