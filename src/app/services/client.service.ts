import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  clientCollection :AngularFirestoreCollection<Client>;
  clientDoc :AngularFirestoreDocument<Client>;

  constructor(private afs:AngularFirestore) { 

    this.clientCollection = this.afs.collection('clients');
  }

  getClient(userId:string) : Observable<Client[]> {

      return this.afs.collection('clients', ref => ref.where('useId', '==', userId)).snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Client;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
  }

  NewClient(client : Client){
    console.log(client);
    this.clientCollection.add(client);
  }

  GetClient(id :string) : Observable<Client>{

      return this.clientCollection.doc(id).valueChanges();

  }

  UpdateClient(client :Client){
      this.clientDoc =  this.clientCollection.doc(client.id);
      this.clientDoc.update(client);
  }

  DeleteClient(id :string){

    this.clientDoc =  this.clientCollection.doc(id);
    this.clientDoc.delete();
}
}
