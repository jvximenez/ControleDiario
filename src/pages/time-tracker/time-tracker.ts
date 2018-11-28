import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { TimeTrackerEditPage } from '../time-tracker-edit/time-tracker-edit';
import { TodosTrackersPage } from '../todos-trackers/todos-trackers';

/**
 * Generated class for the TimeTrackerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-time-tracker',
  templateUrl: 'time-tracker.html',
})
export class TimeTrackerPage {
  tracker = {
    'dia':'',
    'mes':'',
    'ano':'',
    'total':'',
    'parcial':'',
    'title':'',
    'Hinicio':'',
    'Minicio':'',
    'Hfim':'',
    'Mfim':'',
    'nivel': 0,
    'duracao':'',

  }

  public trackers

  public select;dias;hoje;ontem;amanha

  constructor(public navCtrl: NavController, public navParams: NavParams, public dbService: FirebaseServiceProvider) {

    this.trackers =  this.dbService.getAll('trackers','total')

    this.dias = [{title: "hoje"},
      {title:"ontem"},
      {title: "amanha"}
    ]


    this.select =  [{title: "Ação"},
    {title: "Comédia"},
    {title: "Drama"},
    {title: "Romance"},
    {title: "Super-heroi"}]

    
   

    this.hoje =  this.Total();
    this.amanha = this.Total3();
    this.ontem = this.Total2();

    console.log(this.hoje, this.amanha, this.ontem, "afaf")

  }

    

  Cor(n){
    if (n == -2){
      return 'dangerM'
    }
    if (n == -1){
      return 'danger'
    }
    if (n == 0){
      return 'dark'
    }
    if (n == 1){
      return 'primary'
    }
    if (n == 2){
      return 'primaryM'
    }
  }


  Data(){
    var data = new Date();
    var dia = data.getDate();
    var mes = data.getMonth() + 1;
    var ano = data.getFullYear();
    var array = [dia,mes,ano];
    return array
    
  }

  Criacao(tarefa){
    var array = this.Data();
    this.tracker.dia = String(array[0]);
    this.tracker.mes = String(array[1]);
    this.tracker.ano = String(array[2]);
    this.tracker.total = String(this.Total());
    this.tracker.parcial =  String(this.Parcial());
    this.dbService.save('trackers',tarefa)
    this.tracker.title = " "


  }

  Total(){
    var total;
    var data = new Date();
    var dia = data.getDate();
    var mes = data.getMonth();
    var ano = data.getFullYear();
    var hora = data.getHours();

    total = Number(ano*10000 + (mes+1)*100 + dia);
    return total
  
  }

  Total2(){
    var total;
    var data = new Date();
    var dia = data.getDate();
    var mes = data.getMonth();
    var ano = data.getFullYear();
    total = Number(ano*10000 + (mes+1)*100 + dia-1);
    return total
  
  }

  Total3(){
    var total;
    var data = new Date();
    var dia = data.getDate();
    var mes = data.getMonth();
    var ano = data.getFullYear();
    total = Number(ano*10000 + (mes+1)*100 + dia+1);
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

  Ontem(tarefa){
    var array = this.Data();
    this.tracker.dia = String(array[0]-1);
    this.tracker.mes = String(array[1]);
    this.tracker.ano = String(array[2]);
    this.tracker.total = String(this.Total2());
    this.tracker.parcial =  String(this.Parcial());
    this.dbService.save('trackers',tarefa)

    
  }

  Amanha(tarefa){
    var array = this.Data();
    this.tracker.dia = String(array[0]+1);
    this.tracker.mes = String(array[1]);
    this.tracker.ano = String(array[2]);
    this.tracker.total = String(this.Total3());
    this.tracker.parcial =  String(this.Parcial());
    this.dbService.save('trackers',tarefa)

    
  }

  goToEdit(itens){
    this.navCtrl.push(TimeTrackerEditPage, 
    {'tarefa' : itens})
  }

  goToTotal(){
    this.navCtrl.push(TodosTrackersPage, 
    {'tarefas' : this.trackers})
  }




  

  Atualizar(tarefas){
    this.dbService.update('tarefas',tarefas)
    }

  Deletar(tarefas){
    this.dbService.revome('tarefas',tarefas)
    }

  

  atualiza(){
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
    }

  RetornaDia(dia){
    if(dia=="hoje"){
    return (this.hoje)}
    if(dia=="amanha"){
    return (this.amanha)}
    if(dia=="ontem"){
    return (this.ontem)}
    
    
  }

  Comecar(track){
    
    if (track.Hinicio != '' && track.Hfim == ''){
      track.Hfim = this.RetornaHora()
      track.Mfim = this.RetornaMin()
      track.duracao = ((Number(track.Hfim) - Number(track.Hinicio)) +":"+ Math.round((Number(track.Mfim) - Number(track.Minicio))*10)/10)
      if (track.duracao < 0){track.duracao = 24 - Number(track.inicio)}
    }
    if (track.Hinicio == ''){
      track.Hinicio = this.RetornaHora()
      track.Minicio = this.RetornaMin()}
    this.dbService.update('trackers',track)
  }

  RetornaHora(){
    var data = new Date();
    var hora = data.getHours();
    return (hora)
   
  }
  RetornaMin(){
    var data = new Date();
    var min = data.getMinutes();
    var segundo = data.getSeconds();
    return (min + segundo/60)
   
  }

  Icone(track){
    if(track.Hinicio != '' && track.Hfim !=''){
      return('checkmark-circle-outline')
    }
   if(track.Hinicio == ''){
        return('play'); 
      }
    if(track.Hinicio != '' && track.Hfim ==''){
      return('pause')
    }
  }

  

}
