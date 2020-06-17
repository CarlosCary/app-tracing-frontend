import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { ReviewsService } from 'src/app/services/reviews.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { ToolbarComponent } from '../../utils/toolbar/toolbar.component';

@Component({
  selector: 'app-documents-assigned-rapporteur',
  templateUrl: './documents-assigned-rapporteur.component.html',
  styleUrls: ['./documents-assigned-rapporteur.component.css']
})
export class DocumentsAssignedRapporteurComponent {
  @ViewChild('toolbar', {read: ViewContainerRef, static:false}) container: ViewContainerRef;
  
  toolbarComponent = ToolbarComponent;
  columnsHeaderToDisplay: string[] = ['taskName', 'studentName', 'options'];
  dataSource;
  idProffesor;
  documentsData;

  constructor(private reviewsService: ReviewsService,
              private notificationsService: NotificationsService,
              private componentFactoryResolver: ComponentFactoryResolver,) { 
    this.idProffesor = (JSON.parse(localStorage.getItem("currentUser")))._id;
    this.notificationsService.clearRapporteurNotifications(this.idProffesor).subscribe(clearNotification => {
    });
    
    this.reviewsService.getAssignedReviews(this.idProffesor, 'rapporteur').subscribe(reviewData => {
      this.documentsData = reviewData; 
      this.addToolbar();
      this.documentsData.reverse();
    });
    

  }

  ngOnInit() {
  }

  addToolbar() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.toolbarComponent);
    const component = <ToolbarComponent>this.container.createComponent(componentFactory).instance;
  }
}
