import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewsService } from 'src/app/services/reviews.service';
import { InputsReviewFormComponent } from '../inputs-review-form/inputs-review-form.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-new-feedback-document-reviewer',
  templateUrl: './new-feedback-document-reviewer.component.html',
  styleUrls: ['./new-feedback-document-reviewer.component.css']
})
export class NewFeedbackDocumentReviewerComponent implements OnInit {
  @ViewChild('section', {read: ViewContainerRef, static:false}) container: ViewContainerRef;
  components = [];
  private count:number = 0;
  inputsReviewFormComponent = InputsReviewFormComponent;
  comment;

  APILink = environment.APIEndpoint;
  
  columnsHeaderToDisplay: string[] = ['author', 'file'];
  reviewData;
  idProffesor;
  idReview;
  taskName;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private route: ActivatedRoute,
              private reviewService: ReviewsService,
              private router: Router) { 
    this.idProffesor = (JSON.parse(localStorage.getItem("currentUser")))._id;
    this.idReview = this.route.snapshot.params.idReview;
    this.taskName = this.route.snapshot.params.taskName;
  }

  addSection() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.inputsReviewFormComponent);
    const component = <InputsReviewFormComponent>this.container.createComponent(componentFactory).instance;
    component.idNumber = ++this.count;
    component.isShowClearButton = false;
    this.components.push(component);
  }

  generateTable(review) {
    let reviewData = [];
    for(let i = 0; i < review.reviewDataTittles.length; i ++) {
      reviewData.push({tittle: review.reviewDataTittles[i], 
                      description: review.reviewDataDescriptions[i],
                      isText: true});
      
    }

    reviewData.push({tittle: 'Autor', description: review.studentName,
                    isText: true});

    for(let i = 0; i < review.documents.length; i ++) {
      reviewData.push({tittle: 'Archivos', 
                      path: review.documents[i],
                      isText: false});
    }

    return reviewData;
  }

  generateForm(review) {
    for(let i = 0; i < review.reviewDataTittles.length; i ++) {
      this.addSection();
      this.components[i].tittle = review.reviewDataTittles[i];
      this.components[i].descriptionLabel = "Detalle su respuesta";
      this.components[i].tittleLabel = "Sección a revisar";
      this.components[i].hintTittleLabel = "";
      this.components[i].isTittleDisabled = true;
    }
  }

  saveForm() {
    let tittlesForm = [];
    let feedBackAnswers = [];

    //revisamos todos los campos excepto el comentario
    //porque no es un campo obligatorio
    for(let i = 0; i < this.components.length; i ++) {
      if(this.components[i].description2.invalid) {
        this.components[i].description2.markAsTouched();
        return;
      }
      tittlesForm.push(this.components[i].tittle);
      feedBackAnswers.push(this.components[i].description);
    }
    
    //Revisamos si se hizo un comentario

    if(this.comment != undefined && this.comment != "") {
      tittlesForm.push("Comentario");
      feedBackAnswers.push(this.comment);
    }
    
    this.reviewService.saveRevisedDocument(tittlesForm, feedBackAnswers, this.idProffesor, this.idReview)
    .subscribe(() => {
      this.router.navigate(['/proffesor/documents/review']);
    });
  }

  generateCommentSection() {
    this.addSection();
    this.components[this.count - 1].tittle = "Comentario";
    this.components[this.count - 1].descriptionLabel = "Puede dejar un comentario...";
    this.components[this.count - 1].tittleLabel = "Sección extra";
    this.components[this.count - 1].hintTittleLabel = "";
    this.components[this.count - 1].isTittleDisabled = true;
  }

  ngOnInit() {
    this.reviewService.getAssignedReviewData(this.idReview).subscribe(review => {
      this.reviewData = this.generateTable(review);
      this.generateForm(review);
    });
  }

}
