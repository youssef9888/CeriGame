import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  themes : JSON;
  quiz : JSON;

  // Temps total du quiz pris par l'utlisateur
  seconds : number;

  // temps pris pour chaque question
  timer;

 // nombre de questions passé 
  questionProgress : number;

  // Nombre de questions sur les quelles le joueur à répondu conrrectement.
  correctAnswerCount : number = 0;


  // tableau des id de questions sur les quelles le joueur à répondu conrrectement.
  correct = [];

  // les choix du joueur lors du quiz
  choix = [];


  constructor(private http : HttpClient) { }


  // ------ Des méthodes aideurs métiers --------  
     // affiche le temps écoulé sous le format heure : minutes : seconds
    displayTimeElapsed(){
      return Math.floor(this.seconds/3600) + ':' + Math.floor(this.seconds / 60) + ':' + Math.floor(this.seconds % 60 );
    }



  //------- Méthodes pour les requêtes http -------

  getThemesAPI() {
    return this.http.get(`http://pedago.univ-avignon.fr:3004/getThemes`);
  }

  getQuizByThemeAPI(theme : String) {
    return this.http.post(`http://pedago.univ-avignon.fr:3004/getQuizthemeQues`, {theme});
  }
  

}
