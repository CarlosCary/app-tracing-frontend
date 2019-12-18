import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-requested-document',
  templateUrl: './requested-document.component.html',
  styleUrls: ['./requested-document.component.css']
})
export class RequestedDocumentComponent implements OnInit {
  @Input('documentIdCount') documentIdCount;
  constructor() { }

  ngOnInit() {
  }

}
