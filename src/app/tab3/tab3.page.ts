import { Component } from '@angular/core';
import { MealInterface, MealService } from '../meal.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  id: number = 0;
  title: string = '';
  imageFile: string = '';
  inger = "";
  type:string="";
  calo:number = 0;
  showFlag:boolean = false;
  count = 0;
  newMeal: MealInterface = {
    id: 0,
    title: "",
    image: "",
    listOfIngredients : [""],
    dietType: "",
    calories: 0
  };

  try: string[] = [];
  public checklist_id = 0;
  public checklist_name:any;
  public checklistitems = [];
  public newItem = '';

  croppedImagepath = "";
  isLoading = false;

  imagePickerOptions = {
    maximumImageCount: 1,
    quality: 50
  };

  constructor(public mealSrv:MealService, public alertCtrl: AlertController) {}

  add(){
    this.newMeal.id = this.id;
    this.newMeal.title = this.title;
    this.newMeal.image = this.imageFile;
    this.newMeal.listOfIngredients = this.try;
    this.newMeal.dietType = this.type;
    this.newMeal.calories = this.calo;
    this.mealSrv.addMeal(this.newMeal);


  }

  async showAlert(){
    let confirm = await this.alertCtrl.create({
      header: "Adding Meal Successfully",
      subHeader: "Meal Information:",
      message: "ID: " + this.id + "<br> Title: " + this.title + "<br>Image Src: " + this.imageFile + "<br> Ingredients: " + this.try + "<br> Diet Type: " + this.type + "<br> Calories: " + this.calo, buttons: ['ok']
    });
    confirm.present();
  }

  more(){
    if(this.newItem !== ""){
      this.try.push(this.newItem);
      this.newItem = '';
    }else {
      alert("Can not add empty item");
    }
  }
}
