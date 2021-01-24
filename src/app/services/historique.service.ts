import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoriqueService {
  historique : JSON;
  constructor(private http : HttpClient) { }
   
   getHistoryByUserAPI(id :any) {
   
    return this.http.get('http://pedago.univ-avignon.fr:3004/getHistoryByUser/'+escape(id)+'');

  }
  
  setHistoryByUserAPI(id: String, nbreponse:any ,temps:any,score :any,niveau :String) {
    return this.http.post('http://pedago.univ-avignon.fr:3004/setHistory',{id,nbreponse,temps,score,niveau},{responseType: 'text'});
  }
  
}
