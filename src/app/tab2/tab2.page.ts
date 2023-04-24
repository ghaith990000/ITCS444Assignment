import { Component } from '@angular/core';
import { MemberService } from '../member.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(public memberSrv: MemberService) {
    console.log(memberSrv.members)
  }

  delete(id: string){
    this.memberSrv.removeMember(id);
  }



}
