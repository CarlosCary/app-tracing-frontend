import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SubjectsService } from 'src/app/services/subjects.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list-subject-files',
  templateUrl: './list-subject-files.component.html',
  styleUrls: ['./list-subject-files.component.css']
})
export class ListSubjectFilesComponent implements OnInit {
  columnsHeaderToDisplay: string[] = ['fileName', 'download', 'options'];
  APILink = environment.APIEndpoint;
  filesData:any = [];
  accountRole;
  idSubject;
  isProffesor:boolean = true;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private subjectsService: SubjectsService) { 
    this.idSubject = this.route.snapshot.params.idSubject;
  }

  async ngOnInit() {
    this.accountRole = (JSON.parse(localStorage.getItem("currentUser"))).role;
    this.isProffesorAccount();
    this.loadProffesorAccounts();

    
  }

  isProffesorAccount() {
    if(this.accountRole !== 'proffesor') 
      this.isProffesor = false;
  }

  async loadProffesorAccounts() { 
    await this.subjectsService.getFilesSubject(this.idSubject).subscribe((files) => {
      this.filesData = files;
    });
  }

  deleteFile(id) {
    
    this.subjectsService.deleteFile(id).subscribe( account => {
      this.loadProffesorAccounts();
    });
  }

}
