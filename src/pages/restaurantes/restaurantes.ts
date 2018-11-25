import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { AlertController } from 'ionic-angular';
import { RestaurantesEditPage } from '../restaurantes-edit/restaurantes-edit';

/**
 * Generated class for the RestaurantesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-restaurantes',
  templateUrl: 'restaurantes.html',
})
export class RestaurantesPage {

  public show = true
  public tipos; tipos2
  public restaurantes;
  public restaurantesArray;
  showA = false
  public atalhos

  restaurante = {
    'dia':'',
    'mes':'',
    'ano':'',
    'total':'',
    'parcial':'',
    'title':'',
    'tipo':'',
    'preco':'',
    'cia':'',
    'casa':false,
    'comentario':'',

  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public dbService: FirebaseServiceProvider,public alertCtrl: AlertController ) {
    this.restaurantes = this.dbService.getAll('restaurantes','total').map(a=>a.reverse())
    this.tipos = this.Tipos();
    this.atalhos = this.Atalhos();
    this.restaurantesArray = this.ArrayTotal();
    console.log("aqui", this.restaurantesArray)
    console.log(this.atalhos)

    
  
  }

  doRefresh(refresher) {
    this.showA = !this.showA

    setTimeout(() => {
      refresher.complete();
    }, 50);
  }

  ArrayTotal(){
    var linha = [];
    var coluna = []
    this.restaurantes.forEach(itens => { itens.forEach( item => {linha = []; linha.push(item.title); linha.push(item.tipo); coluna.push(linha)})})
    console.log(coluna)
    return coluna

  }

  Tipos(){
    var array = []
    var B = false
    var array2 
    this.restaurantes.forEach(element => {element.forEach( elem => {B = false; array.forEach(a => {if (a == elem.tipo) { B = true}}); if (B == false) {array.push(elem.tipo)}})
  })
  
  return (array)
  }

  Atalhos(){
    var array = []
    var B = false
    var array2 
    this.restaurantes.forEach(element => {element.forEach( elem => {B = false; array.forEach(a => {if (a == elem.title) { B = true}}); if (B == false) {array.push(elem.title)}})
  })
  
  return (array)
  }


  ArrayUnico(a){
    var b = {};
    for (var i = 0; i < a.length; i++) {
        b[a[i]] = a[i];
    }
    var arr = [];
    for (var key in b) {
        arr.push(key);
    }
    return (arr)
  }
  

  Data(){
    var data = new Date();
    var dia = data.getDate();
    var mes = data.getMonth() + 1;
    var ano = data.getFullYear();
    var array = [dia,mes,ano];
    return array
    
  }

  Criacao(restaurante){
    var array = this.Data();
    this.restaurante.dia = String(array[0]);
    this.restaurante.mes = String(array[1]);
    this.restaurante.ano = String(array[2]);
    this.restaurante.total = String(this.Total());
    this.restaurante.parcial =  String(this.Parcial());
    this.dbService.save('restaurantes',restaurante)


  }

  Total(){
    var total;
    var data = new Date();
    var dia = data.getDate();
    var mes = data.getMonth();
    var ano = data.getFullYear();
    var hora = data.getHours();
    var min = data.getMinutes();
    total = Number(ano*10000 + (mes+1)*100 + dia);
    return total
  
  }
  
  Total2(){
    var total;
    var data = new Date();
    var dia = data.getDate();
    var mes = data.getMonth();
    var ano = data.getFullYear();
    var hora = data.getHours();
    var min = data.getMinutes();
    total = Number(ano*10000 + (mes+1)*100 + dia-1);
    return total
  
  }

  Parcial(){
    var total;
    var data = new Date();
    var mes = data.getMonth();
    var ano = data.getFullYear();
    total = Number(ano*100 + (mes+1));
    return total

  }

  

  goToEdit(itens){
    this.navCtrl.push(RestaurantesEditPage, 
    {'restaurante' : itens,})}

  AtualizarP(){
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }


  Show(){
    this.show = !this.show;
    return (this.show)
  }

  Informacoes(filme) {
    const alert = this.alertCtrl.create({
      title: filme.title,
      subTitle: ("Data: " + filme.dia+"/"+filme.mes+"/"+filme.ano+ "<br>Tipo: " + filme.genero + "<br>Nota: " + filme.nota + "<br>Diretor: " +filme.diretor + "<br>Comentario: " + filme.comentario) ,
      buttons: ['OK']
    });
    alert.present();
  }

  Conta(atalho){
    var a = 0
    console.log(this.restaurantesArray)
    this.restaurantesArray.forEach(itens => {console.log(itens); if(itens[0] == atalho) {a+=1} })
    console.log(atalho)
    return (a)
  }

  CriaNovo(){
    
  }


  
}