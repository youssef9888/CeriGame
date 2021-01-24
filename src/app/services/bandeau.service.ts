import { Injectable } from '@angular/core';
import {BannerComponent} from '../bandeau/bandeau.component';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BandeauService {
//  declartion des objet  "BehaviorSubject "(des valeurs qui pouvent changer au fil du temps)
  public display: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public state : BehaviorSubject<String> = new BehaviorSubject<String>("");
  public message : BehaviorSubject<String> = new BehaviorSubject<String>("");
  public date : BehaviorSubject<String> = new BehaviorSubject<String>("");
  public heure : BehaviorSubject<String> = new BehaviorSubject<String>("");

  constructor() { }


}
