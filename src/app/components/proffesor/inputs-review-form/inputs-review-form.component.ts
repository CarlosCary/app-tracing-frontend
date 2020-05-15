import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  inputsForm: FormGroup;
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
  
  @Input ('title') title = new FormControl('', [Validators.required]);
  @Input ('description2') description2 = new FormControl('', [Validators.required]);

  @Output() isInvalid = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit() {
  }

  remove() {
    this.isRemoved = true;
    this.title.clearValidators;
    this.description2.clearValidators;
  }

  isInvalidForm() {
    this.isInvalid.emit(this.title.invalid || this.description2.invalid);
  }
  
}
