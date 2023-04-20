import { Component } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AngularFirestoreCollection} from '@angular/fire/compat/firestore';

import { DocumentReference } from '@angular/fire/compat/firestore';
import {map, take} from 'rxjs/operators';
import {Observable} from 'rxjs';

// interface

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  name: string = "hello";

  constructor() {}

}
