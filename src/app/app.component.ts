import { Component, ViewChild } from '@angular/core';
import { Platform, Nav} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { FilmesPage } from '../pages/filmes/filmes';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any = TabsPage;
  testemesmo: any
  
  

  
  constructor( public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {


    

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  abrirFilmes(){
    this.nav.setRoot(FilmesPage)
  }
  


}
