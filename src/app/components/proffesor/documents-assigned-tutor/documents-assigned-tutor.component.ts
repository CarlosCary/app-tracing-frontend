import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { ToolbarComponent } from '../../utils/toolbar/toolbar.component';
import { ReviewsService } from 'src/app/services/reviews.service';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-documents-assigned-tutor',
  templateUrl: './documents-assigned-tutor.component.html',
  styleUrls: ['./documents-assigned-tutor.component.css']
})
export class DocumentsAssignedTutorComponent implements OnInit {
  @ViewChild('toolbar', {read: ViewContainerRef, static:false}) container: ViewContainerRef;
  
  toolbarComponent = ToolbarComponent;

  columnsHeaderToDisplay: string[] = ['taskName', 'studentName', 'options'];
  dataSource;
  idProffesor;
  documentsData:any = [];

  constructor(private reviewsService: ReviewsService,
              private notificationsService: NotificationsService,
              private componentFactoryResolver: ComponentFactoryResolver) { 
    this.idProffesor = (JSON.parse(localStorage.getItem("currentUser")))._id;
    this.notificationsService.clearTutorNotifications(this.idProffesor).subscribe(clearNotification => {
      
    });
  }

  ngOnInit() {
    this.reviewsService.getAssignedReviews(this.idProffesor, 'tutor').subscribe(reviewData => {
      this.documentsData = reviewData;
      this.addToolbar();
      // this.documentsData.reverse();
    })
  }

  addToolbar() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.toolbarComponent);
    const component = <ToolbarComponent>this.container.createComponent(componentFactory).instance;
  }
}
