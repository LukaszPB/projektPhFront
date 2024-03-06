import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {FailureService} from "../../service/failure.service";
import {Failure} from "../../Klasa/failure.model";
import {DTOModel} from "../../Klasa/DTO.model";

@Component({
  selector: 'app-failure-formularz',
  templateUrl: './failure-formularz.component.html',
  styleUrl: './failure-formularz.component.css'
})
export class FailureFormularzComponent {
  form: FormGroup;
  id_edycji: number;
  fieldBlurred: { [key: string]: boolean } = {};
  constructor(private fb: FormBuilder, private failureService: FailureService, private router: Router,route: ActivatedRoute) {
    //const specialCharacters = ['.', ',', ';', '?', '!', '<', '>', '{', '}', '+', '*', '#', '$', '%','@'];
    this.id_edycji = +route.snapshot.params['id'];
    let failure;
    let failureType='',name='',potentialCost='',potentialDate='',status='',repairDescription='';
    if(!isNaN(this.id_edycji)){
      failure = this.failureService.getSingleFailure(this.id_edycji);
      failureType=failure.failureType;
      name = failure.name;
      potentialCost=failure.potentialCost;
      potentialDate = failure.potentialDate;
      status =failure.status
      repairDescription = failure.repairDescription;

    }
    this.form = this.fb.group({
      failureType: [failureType],
      name: [name],
      potentialCost: [potentialCost],
      potentialDate: [potentialDate],
      repairDescription:[repairDescription],
      status: [status]
    })

  }
  onBlur(fieldName: string) {
    this.fieldBlurred[fieldName] = true;
  }
  get failureType(){
    return this.form.get('failureType')
  }
  get name() {
    return this.form.get('name')
  }
  get potentialCost() {
    return this.form.get('potentialCost')
  }
  get potentialDate() {
    return this.form.get('potentialDate')
  }
  get repairDescription() {
    return this.form.get('repairDescription')
  }
  get status() {
    return this.form.get('status')
  }
  add() {
    if (this.form.valid) {
      if(isNaN(this.id_edycji))
      {
         console.log("dodałem failure: ",this.form.value)
         let failure=new DTOModel(1000,this.form.value.failureType,this.form.value.name,this.form.value.potentialCost,this.form.value.potentialDate,this.form.value.status,this.form.value.repairDescription)
         this.failureService.addFailure(failure).subscribe();
      }
      else
      {
        // this.failureService.editUserHttp(this.id_edycji,this.form.value.email,this.form.value.nickname,this.form.value.password,this.form.value.name,this.form.value.surname);
      }
      this.router.navigate([`/`]);
    } else {
      console.log("nie udalo sie");
    }
  }

}
