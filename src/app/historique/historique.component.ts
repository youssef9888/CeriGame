import { Component, OnInit } from '@angular/core';

import {QuizService} from '../services/quiz.service';
import {HistoriqueService} from '../services/historique.service';

import {Router} from '@angular/router';
@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent implements OnInit {
 hist : JSON;

 id :String;
 nbreponse :any;
 temps :string;
 score :string;
  constructor(public historiqueService :HistoriqueService,  private router : Router,public quizService : QuizService) { }

  ngOnInit(): void {
	  
	  this.id=JSON.parse(localStorage.getItem('user')).id;
	
  } 
  
 
  
  getHistoryByUserThemes(){
      console.log(this.id);
      this.historiqueService.getHistoryByUserAPI(this.id).subscribe((response : any) =>{
       
        this.hist = response;
       
       // console.log(this.hist);
      },(error) =>{
        console.log('Error is : ' , error);
    })


  }

  


  






}
