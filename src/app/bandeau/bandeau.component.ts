import { Component, OnInit } from '@angular/core';
import {BannerService} from '../services/banner.service';

@Component({
  selector: 'app-bandeau',
  templateUrl: './bandeau.component.html',
  styleUrls: ['./bandeau.component.scss']
})
export class BannerComponent implements OnInit {

  display: boolean;
  state: String; 
  message: String;
  date : String ;
  heure : String ;

  constructor(private bannerService : BannerService) {  
        this.bannerService.display.subscribe( value => {
            this.display = value;
        });
         this.bannerService.state.subscribe( value => {
            this.state = value;
        });  
         this.bannerService.message.subscribe( value => {
            this.message = value;
        });  
          this.bannerService.date.subscribe( value => {
            this.date = value;
        });  
           this.bannerService.heure.subscribe( value => {
            this.heure = value;
        });  
  }

  ngOnInit(): void {
     
  }

}
