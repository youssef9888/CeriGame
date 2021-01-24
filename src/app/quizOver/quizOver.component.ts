import { Component, OnInit } from '@angular/core';

import {QuizService} from '../services/quiz.service';
import {HistoriqueService} from '../services/historique.service';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-quizOver',
  templateUrl: './quizOver.component.html',
  styleUrls: ['./quizOver.component.scss']
})
export class QuizOverComponent implements OnInit {
 histo : JSON;
 id :String;
 nbreponse :number;
 temps :any;
 score :any;
 niveau :String;
  constructor(public historiqueService :HistoriqueService,public quizService : QuizService ,  private router : Router) { }

  ngOnInit(): void {
	  this.id=JSON.parse(localStorage.getItem('user')).id;
	  this.nbreponse= this.quizService.correctAnswerCount;
      this.temps=this.quizService.timer;
      this.score= Math.round((this.nbreponse * 1398.2) / this.temps);
      this.niveau='1';
      
    console.log(this.score);
  }


  Rejouer(){
    // commencer le quiz
    this.router.navigate(['quiz']);
  }

    setHistoryByUser(){
      
      this.historiqueService.setHistoryByUserAPI(this.id,this.nbreponse,this.temps,this.score,this.niveau).subscribe((response : any) =>{
         
       console.log('response from post data is ', response);

      },(error) =>{
        console.log('Error is : ' , error);
      })
}
}
