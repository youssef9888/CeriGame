import { Component, OnInit } from '@angular/core';

import {LoginService} from '../services/login.service';
import {BannerService} from '../services/banner.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-barMenu',
  templateUrl: './barMenu.component.html',
  styleUrls: ['./barMenu.component.scss']
})
export class BarMenuComponent implements OnInit {
  
  
   // Status de connexion (connecté ou pas) 
   isLoged: boolean;

   // Date de dernière connexion
   date : String;

   // Heure de dernière connexion
   heure : String;

  constructor(private loginService : LoginService , private router : Router ,  private bannerService : BannerService) { 

      this.loginService.isLoged.subscribe( value => {
            this.isLoged = value;
        });

      this.loginService.date.subscribe( value => {
            this.date = value;
        });

      this.loginService.heure.subscribe( value => {
            this.heure = value;
        });
  }

  ngOnInit(): void {
 
  	if(JSON.parse(localStorage.getItem('user')) != null){
       this.isLoged = JSON.parse(localStorage.getItem('user')).status_de_connexion;

       if(JSON.parse(localStorage.getItem(JSON.parse(localStorage.getItem('user')).id))){

          this.date = JSON.parse(localStorage.getItem(JSON.parse(localStorage.getItem('user')).id)).date;
          this.heure = JSON.parse(localStorage.getItem(JSON.parse(localStorage.getItem('user')).id)).heure;

  	   }
    }
	
  }

  signOut(){

       	this.loginService.signOutAPI(JSON.parse(localStorage.getItem('user')).id).subscribe((response : any) =>{
  		
  		console.log('Response from API is : ', response);

  		if(response === true){

        // Enlever la localStorage avec la clée user
        localStorage.removeItem('user');

        // Modifier l'attribut isLoged du service à false
  			this.loginService.isLoged.next(false);

        // Enlever le bandeau de notification
        this.bannerService.display.next(false);
        this.bannerService.message.next("");

        // Redériger l'utilisateur vers la page de connexion
  			this.router.navigate(['login']);
  		}

  	},(error) =>{
        console.log('Error is : ' , error);
  	})
  
  }

}
