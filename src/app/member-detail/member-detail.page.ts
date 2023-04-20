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
}
