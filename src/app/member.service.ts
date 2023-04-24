import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AngularFirestoreCollection} from '@angular/fire/compat/firestore';

import { DocumentReference } from '@angular/fire/compat/firestore';
import {map, take} from 'rxjs/operators';
import {Observable} from 'rxjs';

interface MemberInterface {
  name: string;
  age: number;
  gender: string;
  phoneNumber: string;
  dietType: string;
  subscriptionPlan: string;
  totalFees: number;

}

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  membersCollectionRef: AngularFirestoreCollection<MemberInterface>;
  members: Observable<any[]>;

  constructor(public afs: AngularFirestore) {
    this.membersCollectionRef = this.afs.collection('members');
    this.members = this.membersCollectionRef.snapshotChanges();
  }


  register(name: string, age: number, gender: string, phoneNum: string, dietType: string, subscriptionPlan: string, totalFees: number ){
    this.membersCollectionRef.add({
      name: name,
      age: age,
      gender: gender,
      phoneNumber: phoneNum,
      dietType: dietType,
      subscriptionPlan: subscriptionPlan,
      totalFees: totalFees
    })
  }

  getMemberById(id: string): Observable<any> {
    return this.membersCollectionRef.doc(id).get().pipe(
      map((doc) => {
        if(doc.exists){
          return {id: doc.id, ...doc.data()}
        }else {
          return null
        }
      })
    )
  }
update(memberDetails:any,total:number){
this.membersCollectionRef.doc(memberDetails.id).update({
  name:memberDetails.name,
  age:memberDetails.age,
  gender:memberDetails.gender,
  phoneNumber:memberDetails.phoneNumber,
  dietType:memberDetails.dietType,
  subscriptionPlan:memberDetails.subscriptionPlan,
  totalFees:total,

});
}



}
