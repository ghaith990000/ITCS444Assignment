import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MemberService } from '../member.service';
import { NavController } from '@ionic/angular';
import { MealService } from '../meal.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {Observable} from "rxjs";

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.page.html',
  styleUrls: ['./member-detail.page.scss'],
})
export class MemberDetailPage implements OnInit {
  public memberID:string | null = "";
  subs:any;
  meals: any[] = [];
  selectedMeals: any[] = [];
  selMeals: Observable<any>;
  memberDetails: any;
  constructor(public navCtrl:NavController, public afs: AngularFirestore,public ActRoute:ActivatedRoute, public memberSrv:MemberService, public mealSrv:MealService) {
    this.memberID = this.ActRoute.snapshot.paramMap.get('id');
    if(this.memberID){
      this.memberSrv.getMemberById(this.memberID).subscribe(member=> {
        const dietType = member.dietType;
        this.memberDetails = member

        // Step 2: Query the meals collection
        this.afs.collection('meals', (ref) => ref.where('dietType', '==', dietType)).get().subscribe((querySnapshot) => {
          const meals: any[] = [];
          querySnapshot.forEach((doc) => {
            meals.push(doc.data());
            console.log(doc.data());
          });

          // Step 3: Store the resulting list of meals
          this.meals = meals;

        })
      });
    }

    this.selMeals = this.memberSrv.getSelectedMeals(this.memberID);
  }



  onMealSelect(meal: any){
    if(meal.selected){
      if(this.selectedMeals.length >= 5){
        alert('You have already selected five meals.');
        meal.selected = false;
        return;
      }

      this.selectedMeals.push(meal);
    }else {
      this.selectedMeals = this.selectedMeals.filter((m) => m.id !== meal.id)
    }
    this.memberSrv.addSelectedMeals(this.memberID as string, this.selectedMeals);
  }

  // Step 5: Allow the member to select up to five meals
  selectMeal(){
    if(this.selectedMeals.length >= 5){
      alert('You have already selected five meals');
    }
  }


  ngOnInit() {

  }


  goBack(){
    this.navCtrl.navigateBack('/tabs/tab2');
  }
  upd(){
   let total=0;
   this.memberDetails.subscriptionPlan=this.subs;
    if(this.memberDetails.dietType=='lowcarb')
    total+=50;
    else if(this.memberDetails.dietType=='lowfat')
   total+=30;
    if(this.subs=='1'){
    total+=100;
    }
    else if(this.subs=='3')
    total+=280;
    else if(this.subs=='6')
    total+=500;
    this.memberSrv.update(this.memberDetails,total);
  }

}
