import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-inputs-review-form',
  templateUrl: './inputs-review-form.component.html',
  styleUrls: ['./inputs-review-form.component.css']
})
export class InputsReviewFormComponent implements OnInit {
  
  @Input('idNumber') idNumber;

  constructor() { }

  ngOnInit() {
  }

}
