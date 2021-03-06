
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import "rxjs/add/operator/map";

/*
  Generated class for the FirebaseServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseServiceProvider {
  
  
  

  constructor(public db: AngularFireDatabase) {
    
  }


  getAll(dado,parametro){
    return this.db.list(dado, ref => ref.orderByChild(parametro)).snapshotChanges().pipe(map(data => {
      return data.map(d => ({key: d.key, ...d.payload.val()}));
    }));
  }

  getAllEspecifico(dado,parametro,especifico){
    return this.db.list(dado, ref => ref.orderByChild(parametro).equalTo(especifico)).snapshotChanges().pipe(map(data => {
      return data.map(d => ({key: d.key, ...d.payload.val()}));
    }));
  
    
  }

  getAll2(dado){
    return this.db.list(dado, ref => ref.orderByChild('total')).snapshotChanges().pipe(map(data => {
      return data.map(d => ({key: d.key, ...d.payload.val()}));
    }));
  }

  getAllEspecificoMsm(dado,parametro, quantidade){
    return this.db.list(dado, ref => ref.orderByChild(parametro).limitToLast(quantidade)).snapshotChanges().pipe(map(data => {
    return data.map(d => ({key: d.key, ...d.payload.val()}));
    }));
    }
    

  
  save(dado,compras: any ){
    return this.db.list(dado)
      .push(compras)
      .then(r=> console.log(r));

  }


  update(dado,compras) {
    return this.db.list(dado)
      .update(compras.key, compras)
      .then(r => console.log(r));

  }

  revome(dado,compras){
    return this.db.list(dado)
      .remove(compras.key)
      .then(r => console.log(r))
  }


  getArray(dado){
    var teste =  this.getAll2(dado)
    var array = []
    teste.forEach(dado => dado.forEach(dado2 => array.push(dado2)));
    return (array)
    
  }

}