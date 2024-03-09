import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
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
  editing: boolean;

  constructor(private fb: FormBuilder, private failureService: FailureService, private router: Router, private route: ActivatedRoute) {
    this.editing = false;
    if (!isNaN(+this.route.snapshot.params['id'])){
      this.editing=true;
    }
    this.form = this.fb.group({
      failureType: [{ value: '', disabled: this.editing }, Validators.required],
      name: [{ value: '', disabled: this.editing }, [Validators.minLength(1), Validators.maxLength(250), Validators.required]],
      date: [{ value: '', disabled: this.editing },[this.validateDate,Validators.required] ],
      potentialCost: [{ value: '', disabled: false }, [Validators.min(0), Validators.required]],
      potentialDate: [{ value: '', disabled: false }, [this.validatePotentialDate, Validators.required]],
      repairDescription: [{ value: '', disabled: false }, [Validators.minLength(1), Validators.maxLength(750), Validators.required]],
      status: [{ value: '', disabled: false}, Validators.required]
    });
  }

  ngOnInit(): void {
    this.id_edycji = +this.route.snapshot.params['id'];

    this.failureService.getFailureTypes().subscribe(types => {
      this.failureTypes = types;
    });

    this.failureService.getStatuses().subscribe(statuses => {
      this.statuses = statuses;
    });

    if (!isNaN(this.id_edycji)) {
      console.log(this.editing);
      this.editing = true;
      console.log(this.editing);
      this.failureService.getSingleFailure(this.id_edycji).subscribe(failure => {
        if (failure) {
          const potentialDate = new Date(failure.potentialDate);
          const formattedDate = `${potentialDate.getFullYear()}-${('0' + (potentialDate.getMonth() + 1)).slice(-2)}-${('0' + potentialDate.getDate()).slice(-2)}`;
          const date = new Date(failure.date);
          const formattedNormalDate = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`;
          this.form.patchValue({
            failureType: failure.failureType,
            name: failure.name,
            date:formattedNormalDate,
            potentialCost: failure.potentialCost,
            potentialDate: formattedDate,
            status: failure.status,
            repairDescription: failure.repairDescription
          });
        }
      });
    }
    console.log(this.editing);
  }

  onBlur(fieldName: string) {
    this.fieldBlurred[fieldName] = true;
  }

  add() {
    console.log(this.editing);
    if (this.form.valid) {
      const failure = new DTOModel(
        1000,
        this.form.value.failureType,
        this.form.value.name,
        this.form.value.date,
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
      Object.keys(this.form.controls).forEach(field => {
        const control = this.form.get(field);
        if (control) {
          control.markAsDirty();
          control.markAsTouched();
          this.fieldBlurred[field] = true;
        }
      });
    }
  }
  validatePotentialDate(control: AbstractControl): { [key: string]: boolean } | null {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();
    if (selectedDate < currentDate) {
      return { 'invalidDate': true };
    }
    return null;
  }
  validateDate(control: AbstractControl): { [key: string]: boolean } | null {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();
    if (selectedDate > currentDate) {
      return { 'invalidDate': true };
    }
    return null;
  }
}
