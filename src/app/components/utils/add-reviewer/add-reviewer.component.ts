import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-reviewer',
  templateUrl: './add-reviewer.component.html',
  styleUrls: ['./add-reviewer.component.css']
})
export class AddReviewerComponent implements OnInit {
  @Input('proffesors') proffesors;
  
  @Input('proffesorFormControl') proffesorFormControl = new FormControl('', [
    Validators.required,
  ]);

  constructor() { }

  ngOnInit() {
  }

}
