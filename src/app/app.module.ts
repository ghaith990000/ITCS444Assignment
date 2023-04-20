import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyCceLdI6kYPhlHcbvYcijeJm73FW1Wz2So",
  authDomain: "mobileassignment-568e4.firebaseapp.com",
  projectId: "mobileassignment-568e4",
  storageBucket: "mobileassignment-568e4.appspot.com",
  messagingSenderId: "658419925311",
  appId: "1:658419925311:web:f91de8a704f32305c1d38a",
  measurementId: "G-6THQNME9B0"
};


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, IonicModule.forRoot(), AppRoutingModule, AngularFireModule.initializeApp(firebaseConfig), AngularFirestoreModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
