import { Component, OnInit } from '@angular/core';
import { ClassroomsService } from 'src/app/services/classrooms.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-assign-classroom',
  templateUrl: './new-assign-classroom.component.html',
  styleUrls: ['./new-assign-classroom.component.css']
})
export class NewAssignClassroomComponent implements OnInit {

  classroom:string;
  idTaskSubmitted:string;
  constructor(private classroomsService:ClassroomsService,
              private router: Router,
              private route: ActivatedRoute,) { 
    this.idTaskSubmitted = this.route.snapshot.params.idTaskSubmitted;
  }

  ngOnInit() {
  }

  async assignClassroom() {
    await this.classroomsService.assignClassroom(this.classroom, this.idTaskSubmitted)
                          .subscribe(assign => {
      this.router.navigate(['/proffesor/home']);
    });
  }
}
