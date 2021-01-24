import { Component, OnInit } from '@angular/core';
import {LoginService} from '../services/login.service';
@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  nom: String
  prenom: String;
  identifiant :String;
  date_de_naissance :String;


  constructor(private loginService : LoginService) {}

  ngOnInit(): void {
   	this.nom = JSON.parse(localStorage.getItem('user')).nom;
    this.prenom = JSON.parse(localStorage.getItem('user')).prenom;
    this.identifiant = JSON.parse(localStorage.getItem('user')).identifiant;
    this.date_de_naissance=JSON.parse(localStorage.getItem('user')).date_de_naissance;
   
  }

  
    

  }

		
		
	  


