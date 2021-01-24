import { Component, OnInit } from '@angular/core';

import {QuizService} from '../services/quiz.service';

import {Router} from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

   showThemes = true;
   currentStep : number;
   level : number ;
  constructor(public quizService : QuizService ,  private router : Router) { }

  ngOnInit(): void {
	
    this.showThemes = true;
    this.quizService.seconds = 0;
    this.quizService.questionProgress = 0;
    this.quizService.correctAnswerCount = 0;
    this.getThemes();
    this.startTimer();
    this.currentStep =1;
    this.level=1;
  }

     nextStep(){
       this.currentStep++;
       console.log(this.level);
    };



  getThemes(){

      this.quizService.getThemesAPI().subscribe((response : any) =>{

        this.quizService.themes = response;
        
        
      },(error) =>{
        console.log('Error is : ' , error);
    })

  }


  selectTheme(theme : String ){
  
      this.quizService.getQuizByThemeAPI(theme).subscribe((response : any) =>{

        this.quizService.quiz = response;
        this.showThemes = false;       

      },(error) =>{
        console.log('Error is : ' , error);
    })
   
  }


  startTimer(){
	if(this.quizService.questionProgress != 5){
    this.quizService.timer = setInterval(()=>{this.quizService.seconds++;},1000);
    
    }
  }

/*getGoodResponseIndex (){

        let goodResponse = -1;

        //chercher l'indice de la bonne réponse
        
        this.quizService.quiz[this.quizService.questionProgress].propositions.forEach(proposition, i){
            if(proposition == this.quizService.quiz[this.quizService.questionProgress].réponse)
                goodResponse = i;

        });
        console.log(goodResponse);
        return goodResponse;
    }*/



      




  answer(questionId , choix){

   
       // si le joueur à choisi la bonne réponse
      if(this.quizService.quiz[this.quizService.questionProgress].réponse == 
        this.quizService.quiz[this.quizService.questionProgress].propositions[choix]){

           // stockage des id de questions correctement répendu
           this.quizService.correct[this.quizService.correctAnswerCount] = this.quizService.quiz[this.quizService.questionProgress].id;
           // incrémentation de nombre des réponses correctes
           this.quizService.correctAnswerCount++;
           
      }

      // stockage du choix dans un tableau 
      this.quizService.choix[this.quizService.questionProgress] = choix;
    
      // Pour passer à la question suivante 
      this.quizService.questionProgress++;
      
      // verifier si les questions ont términé (dans ce cas nous avons 5 questions au total)
      if(this.quizService.questionProgress == 5){
         clearInterval(this.quizService.timer);
         this.router.navigate(['result']);
      }
  }


}
