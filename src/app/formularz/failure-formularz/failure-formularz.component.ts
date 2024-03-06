import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { FailureService } from "../../service/failure.service";
import { Failure } from "../../Klasa/failure.model";
import { DTOModel } from "../../Klasa/DTO.model";

@Component({
  selector: 'app-failure-formularz',
  templateUrl: './failure-formularz.component.html',
  styleUrls: ['./failure-formularz.component.css']
})
export class FailureFormularzComponent implements OnInit {
  form: FormGroup;
  id_edycji: number;
  fieldBlurred: { [key: string]: boolean } = {};
  failureTypes: string[] = [];
  statuses: string[] = [];

  constructor(private fb: FormBuilder, private failureService: FailureService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id_edycji = +this.route.snapshot.params['id'];
    this.form = this.fb.group({
      failureType: ['', Validators.required],
      name: ['', Validators.required],
      potentialCost: ['', Validators.required],
      potentialDate: ['', Validators.required],
      repairDescription: ['', Validators.required],
      status: ['', Validators.required]
    });

    this.failureService.getFailureTypes().subscribe(types => {
      this.failureTypes = types;
    });

    this.failureService.getStatuses().subscribe(statuses => {
      this.statuses = statuses;
    });

    if (!isNaN(this.id_edycji)) {
      this.failureService.getSingleFailure(this.id_edycji).subscribe(failure => {
        if (failure) {
          const potentialDate = new Date(failure.potentialDate);
          const formattedDate = `${potentialDate.getFullYear()}-${('0' + (potentialDate.getMonth() + 1)).slice(-2)}-${('0' + potentialDate.getDate()).slice(-2)}`;
          console.log(formattedDate);
          this.form.patchValue({
            failureType: failure.failureType,
            name: failure.name,
            potentialCost: failure.potentialCost,
            potentialDate: formattedDate,
            status: failure.status,
            repairDescription: failure.repairDescription
          });
        }
      });
    }
  }

  onBlur(fieldName: string) {
    this.fieldBlurred[fieldName] = true;
  }

  add() {
    if (this.form.valid) {
      const failure = new DTOModel(
        1000,
        this.form.value.failureType,
        this.form.value.name,
        this.form.value.potentialCost,
        this.form.value.potentialDate,
        this.form.value.status,
        this.form.value.repairDescription
      );

      if (isNaN(this.id_edycji)) {
        console.log("Dodaję nowy failure:", this.form.value);
        this.failureService.addFailure(failure).subscribe(() => {
          this.failureService.updateFailureList(); // Aktualizacja listy po dodaniu
          this.router.navigate(['/']);
        });
      } else {
        console.log("Edytuję istniejący failure:", this.form.value);
        this.failureService.putFailure(this.id_edycji, failure).subscribe(() => {
          this.failureService.updateFailureList(); // Aktualizacja listy po edycji
          this.router.navigate(['/']);
        });
      }
    } else {
      console.log("Nie udało się - formularz niepoprawny");
    }
  }
}
