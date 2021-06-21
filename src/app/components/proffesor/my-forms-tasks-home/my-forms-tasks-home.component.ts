import { Component, OnInit } from '@angular/core';
import { FormsService } from 'src/app/services/forms.service';
import { isEmpty } from 'rxjs/operators';

@Component({
  selector: 'app-my-forms-tasks-home',
  templateUrl: './my-forms-tasks-home.component.html',
  styleUrls: ['./my-forms-tasks-home.component.css']
})

export class MyFormsTasksHomeComponent implements OnInit {
  columnsHeaderToDisplay: string[] = ['name', 'options'];
  dataSource:any = [];
  isEmpty:boolean = false;
  constructor(private taskFormService: FormsService) { 
    
  }

  async ngOnInit() {
    const idProffesor = (JSON.parse(localStorage.getItem("currentUser")))._id;
    await this.taskFormService
    .getFormsTasks(idProffesor)
    .subscribe( taskForms => {
      this.dataSource = taskForms;
    });
  }

}