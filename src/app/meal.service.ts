import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';

import{DocumentReference} from "@angular/fire/compat/firestore";
import {map, take} from'rxjs/operators';
import {Observable} from 'rxjs';

export interface MealInterface {
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

  getMealsByDietType(dietType: string) {
    return this.afs.collection('meals', ref => ref.where('dietType', '==', dietType)).valueChanges();
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
