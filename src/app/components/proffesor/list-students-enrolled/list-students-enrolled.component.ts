import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubjectsService } from 'src/app/services/subjects.service';

@Component({
  selector: 'app-list-students-enrolled',
  templateUrl: './list-students-enrolled.component.html',
  styleUrls: ['./list-students-enrolled.component.css']
})
export class ListStudentsEnrolledComponent implements OnInit {
  columnsHeaderToDisplay: string[] = ['name'];
  idSubject;
  studentsData;
  
  constructor(private route: ActivatedRoute,
              private subjectService: SubjectsService) { 
    this.idSubject = this.route.snapshot.params.idSubject; 
  }

  async ngOnInit() {  
    await this.subjectService.getStudentsDataEnrolledSubject(this.idSubject).subscribe((data) => {
      this.studentsData = data;
    });
    
  }

}
