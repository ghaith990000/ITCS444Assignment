import { Component } from '@angular/core';
import { MemberService } from '../member.service';





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


  constructor(public memberSrv: MemberService) {

  }

  subscribe(){
    this.memberSrv.register(this.name, this.age, this.gender, this.phoneNum, this.dietType, this.subscriptionPlan);
  }



}
