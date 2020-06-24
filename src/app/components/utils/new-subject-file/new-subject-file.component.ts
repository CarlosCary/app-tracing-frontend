import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { SubjectsService } from 'src/app/services/subjects.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-new-subject-file',
  templateUrl: './new-subject-file.component.html',
  styleUrls: ['./new-subject-file.component.css']
})
export class NewSubjectFileComponent implements OnInit {
  filesForm: FormGroup;
  isButtonSendTouched:boolean = false;
  idSubject;

  get filesF() { return this.filesForm.controls; }
  get file() { return this.filesForm.get('file').value; }
  get fileName() { return this.filesForm.get('fileName').value };
  constructor(private formBuilder: FormBuilder,
              private subjectsService:SubjectsService,
              private router:Router,
              private route: ActivatedRoute) { 
    this.idSubject = this.route.snapshot.params.idSubject;
  }

  ngOnInit() {
    this.filesForm = this.formBuilder.group({
      file: ['', [Validators.required, 
        RxwebValidators.extension({extensions:["pdf", "docx", "docm", "doc", , "dotx", "docm"]}),
      ]],
      fileName: ['', Validators.required]
    });
  }

  async addDocument() {
    if(this.filesForm.invalid) {
      
      return;
    }
    
    let fileUpload: Array<File> = new Array<File>();
    fileUpload.push(((<HTMLInputElement>document.getElementById("file")).files)[0]);
    
    
    const idStudent = JSON.parse(localStorage.getItem("currentUser"))._id;
    
    await this.subjectsService.addDocumentSubject(this.idSubject, this.fileName, fileUpload).
    subscribe(document => {
      this.router.navigate(['/subject/files/' + this.idSubject]);
      return document;
    });
  }

  touchButton() {
    this.isButtonSendTouched = true;
  }
}
