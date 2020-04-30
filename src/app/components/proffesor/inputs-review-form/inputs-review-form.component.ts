import { Component, OnInit, Input } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { ThrowStmt } from '@angular/compiler';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-inputs-review-form',
  templateUrl: './inputs-review-form.component.html',
  styleUrls: ['./inputs-review-form.component.css']
})
export class InputsReviewFormComponent implements OnInit {
  emailFormControl = new FormControl('', [
    Validators.required
  ]);
  matcher = new MyErrorStateMatcher();
  @Input('isRemoved') isRemoved:boolean = false;
  @Input('isShowClearButton') isShowClearButton:boolean = true;
  @Input('idNumber') idNumber;
  @Input('tittle') tittle;
  @Input('description') description;
  @Input('tittleLabel') tittleLabel = "Ingrese el título de la sección";
  @Input('descriptionLabel') descriptionLabel = "Descripción de la sección";
  @Input('isTittleDisabled') isTittleDisabled:boolean = false;
  @Input('hintTittleLabel') hintTittleLabel = "Máximo 30 carácteres";
  constructor() { }

  ngOnInit() {
  }

  remove() {
    this.isRemoved = true;
  }
}
