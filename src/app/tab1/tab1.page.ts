import { Component } from '@angular/core';
import { MemberService } from '../member.service';
import { AlertController } from '@ionic/angular';
import {NavController} from '@ionic/angular';
import { Router } from '@angular/router';




@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {


  name: string = "";
  age: number = 0;
  gender: string = "";
  phoneNum: string = "";
  dietType: string = "";
  subscriptionPlan: string = "";


  constructor(public memberSrv: MemberService, public alertCtrl: AlertController, public router:Router) {

  }

  calcTotal(){
    let totalFees = 0;
    let dietFees = 0;
    let subscriptionPlanFees = 0;

    if(this.dietType === "normal"){
      dietFees = 0;
    }else if (this.dietType === "lowcarb"){
      dietFees = 50;
    }else if (this.dietType === "lowfat"){
      dietFees = 30;
    }

    if(this.subscriptionPlan === "1"){
      subscriptionPlanFees = 100;
    }else if (this.subscriptionPlan === "3"){
      subscriptionPlanFees = 280;
    }else if(this.subscriptionPlan === "6"){
      subscriptionPlanFees = 500;
    }

    totalFees = dietFees + subscriptionPlanFees;
    return totalFees;
  }

  showAlert = async (title: string, msg: string) => {
    let alert = await this.alertCtrl.create({
      header: title,
      message: msg,
      buttons: [{
        text: 'Ok',
        role: 'okay',
        cssClass: 'primary',
        handler: () => {
          this.router.navigateByUrl('/tabs/tab2');
        }
      }]
    })

    alert.present();
  }

  subscribe(){
    let totalFees = this.calcTotal();
    this.memberSrv.register(this.name, this.age, this.gender, this.phoneNum, this.dietType, this.subscriptionPlan, totalFees);
    this.showAlert("Total Fees", "Added successfully to firebase Database, and the total fees is " + totalFees );
  }



}
