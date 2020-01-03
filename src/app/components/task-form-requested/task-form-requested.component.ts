import { Component, OnInit } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-task-form-requested',
  templateUrl: './task-form-requested.component.html',
  styleUrls: ['./task-form-requested.component.css']
})
export class TaskFormRequestedComponent implements OnInit {
  columnsHeaderToDisplay: string[] = ['tittle', 'description'];
  tittlesForm;
  descriptionsForm;
  documentsRequested;
  dataSource = [];
  constructor(private tasksService: TasksService) { 
  }

   generateDataTableData() {
    let dataTable = [];
    for(let i =0; i < this.tittlesForm.length; i++) {
      dataTable.push({tittle: this.tittlesForm[i], description: this.descriptionsForm[i]});
    }
    return dataTable;
  }

  ngOnInit() {
    const idTask = localStorage.getItem("taskId");
    this.tasksService.getFormRequestedTask(idTask).subscribe((data) => {
      this.tittlesForm = data[0].formRequested.tittleForm;
      this.descriptionsForm = data[0].formRequested.descriptionForm;
      this.documentsRequested = data[0].documentsRequested;
      this.dataSource = this.generateDataTableData();
    });

    
  }


}
