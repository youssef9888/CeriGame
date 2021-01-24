import { Component, OnInit } from '@angular/core';

import {HttpClientModule} from '@angular/common/http';
import {LoginService} from '../services/login.service';
import {BannerService} from '../services/bandeau.service';


import {FormBuilder, FormGroup} from '@angular/forms';

import {Router} from '@angular/router';

//declare  var jQuery:  any;

import * as $ from 'jquery';
export default $;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // Formulaire de connexion
  loginForm : FormGroup;
  
  // l'utilisateur connecté
  user : JSON;
  

  constructor(private loginService : LoginService, 
  	          private fb : FormBuilder, 
  	          private router : Router,
  	          private bannerService : BannerService
   ) {}

  ngOnInit(): void {

      this.loginForm = this.fb.group({
    	username: [],
    	password: []
    });

  }

 
  login(){ 
   
  	this.loginService.loginAPI(this.loginForm.value.username , this.loginForm.value.password).subscribe((response : any) =>{

  		if(response['id'] == 0){

            this.bannerService.display.next(true);
            this.bannerService.message.next("Login ou passe Incorrèctes");
            this.bannerService.state.next("danger");
      
  		}else{

            this.user = response;
            this.loginService.isLoged.next(true);
            localStorage.setItem('user', JSON.stringify(this.user));
            
            if(JSON.parse(localStorage.getItem(response.id))){
               this.loginService.date.next(JSON.parse(localStorage.getItem(response.id)).date);
               this.loginService.heure.next(JSON.parse(localStorage.getItem(response.id)).heure);

               this.bannerService.date.next(JSON.parse(localStorage.getItem(response.id)).date);
               this.bannerService.heure.next(JSON.parse(localStorage.getItem(response.id)).heure);  
            }
            
            const last_connection = {
              'date' : response.date,
              'heure' : response.heure
            };
            
            localStorage.setItem(response.id , JSON.stringify(last_connection));
			
            this.router.navigate(['home']);
  		}
  	},(error) =>{
        console.log('Error is : ' , error);
  	})
    

  }

}
