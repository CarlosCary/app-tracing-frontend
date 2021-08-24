import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubjectsService } from 'src/app/services/subjects.service';
import { ReviewsService } from 'src/app/services/reviews.service';

@Component({
  selector: 'app-list-students-enrolled',
  templateUrl: './list-students-enrolled.component.html',
  styleUrls: ['./list-students-enrolled.component.css']
})
export class ListStudentsEnrolledComponent implements OnInit {
  columnsHeaderToDisplay: string[] = ['name', 'options'];
  idSubject;
  studentsData;
  areReviewersAssigned:boolean = false;

  constructor(private route: ActivatedRoute,
              private subjectService: SubjectsService,
              private reviewsService: ReviewsService) { 
    this.idSubject = this.route.snapshot.params.idSubject; 
  }

  async ngOnInit() {  
    await this.subjectService.getStudentsDataEnrolledSubject(this.idSubject).subscribe((data) => {
      this.studentsData = data;
      console.log(data);
    });
    
    
  }

}
