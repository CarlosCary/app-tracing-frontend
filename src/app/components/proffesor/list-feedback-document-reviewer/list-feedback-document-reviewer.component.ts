import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { ToolbarComponent } from '../../utils/toolbar/toolbar.component';
import { ReviewsService } from 'src/app/services/reviews.service';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-list-feedback-document-reviewer',
  templateUrl: './list-feedback-document-reviewer.component.html',
  styleUrls: ['./list-feedback-document-reviewer.component.css']
})
export class ListFeedbackDocumentReviewerComponent implements OnInit {
  @ViewChild('toolbar', {read: ViewContainerRef, static:false}) container: ViewContainerRef;
  
  toolbarComponent = ToolbarComponent;

  columnsHeaderToDisplay: string[] = ['taskName', 'studentName', 'options'];
  dataSource;
  idProffesor;
  documentsData;

  constructor(private reviewsService: ReviewsService,
              private notificationsService: NotificationsService,
              private componentFactoryResolver: ComponentFactoryResolver) { 
    this.idProffesor = (JSON.parse(localStorage.getItem("currentUser")))._id;
    this.notificationsService.clearAllNotifications(this.idProffesor).subscribe(clearNotification => {
      this.addToolbar();
    })
  }

  ngOnInit() {
    this.reviewsService.getAssignedReviews(this.idProffesor, 'all').subscribe(reviewData => {
      this.documentsData = reviewData;
      console.log(this.documentsData);
      // this.addToolbar();
    })
  }

  addToolbar() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.toolbarComponent);
    const component = <ToolbarComponent>this.container.createComponent(componentFactory).instance;
  }
}
