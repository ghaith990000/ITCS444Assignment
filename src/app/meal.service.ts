import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';

import{DocumentReference} from "@angular/fire/compat/firestore";
import {map, take} from'rxjs/operators';
import {Observable} from 'rxjs';

interface MealInterface {
  id: number;
  title: string;
  image: string;
  listOfIngredients: string[];
  dietType: string;
  calories: number;
}

@Injectable({
  providedIn: 'root'
})
export class MealService {
  mealCollectionRef: AngularFirestoreCollection<MealInterface>;
  meals: Observable<any[]>;
  constructor(public afs: AngularFirestore) {
    this.mealCollectionRef = this.afs.collection('meals');
    this.meals = this.mealCollectionRef.snapshotChanges();
  }

  addMeal(meal: MealInterface){
    this.mealCollectionRef.add({
      id: meal.id,
      title: meal.title,
      image: meal.image,
      listOfIngredients: meal.listOfIngredients,
      dietType: meal.dietType,
      calories: meal.calories
    })
  }
}
