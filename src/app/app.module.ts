import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { BandeauComponent } from './bandeau/bandeau.component';

import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {RouterModule, Routes} from '@angular/router'

import { BandeauService } from './services/bandeau.service';
import { HeaderComponent } from './barMenu/barMenu.component';
import { ProfilComponent } from './profil/profil.component';
import { QuizComponent } from './quiz/quiz.component';
import { ResultComponent } from './quizOver/quizOver.component';
import { HistoriqueComponent } from './historique/historique.component';



const appRoutes : Routes = [
   {path: 'home' , component: HomeComponent},
   {path: 'login' , component: LoginComponent},
   {path: 'bandeau' , component: BannerComponent},
   {path: '' , component: LoginComponent},
  {path: 'historique' , component: HistoriqueComponent}, 
   {path: 'profil' , component: ProfilComponent},
   {path: 'quiz' , component: QuizComponent},
   {path: 'quizOver' , component: ResultComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    BandeauComponent,
    HeaderComponent,
    ProfilComponent,
    QuizComponent,
    BarMenuComponent,
    HistoriqueComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [BannerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
