import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public isLoged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public date: BehaviorSubject<String> = new BehaviorSubject<String>("");
  public heure: BehaviorSubject<String> = new BehaviorSubject<String>("");

  constructor(private http : HttpClient) { }

  
// loginAPI(nom : any , password : any){
    //  return this.http.get(
    //      'http://pedago.univ-avignon.fr:3231/login?nom='+escape(nom)+'&password='+escape(password)+'',
    //    /*{responseType: 'text'}*/
    //  );

//  }


  loginAPI(nom: String, password: String) {
    return this.http.post(`http://pedago.univ-avignon.fr:3004/login`, { nom, password });
  }

  signOutAPI(id: String){
    return this.http.post(`http://pedago.univ-avignon.fr:3004/logout`, {id});
  }
   


}
