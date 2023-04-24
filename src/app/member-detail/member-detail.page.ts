import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MemberService } from '../member.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.page.html',
  styleUrls: ['./member-detail.page.scss'],
})
export class MemberDetailPage implements OnInit {
  public memberID:string | null = "";
  subs:any;
  memberDetails: any;
  constructor(public navCtrl:NavController,public ActRoute:ActivatedRoute, public memberSrv:MemberService) {
    this.memberID = this.ActRoute.snapshot.paramMap.get('id');
    if(this.memberID){
      this.memberSrv.getMemberById(this.memberID).subscribe(member=> {
        this.memberDetails = member
      });
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
