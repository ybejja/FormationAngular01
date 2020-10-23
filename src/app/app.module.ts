import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {FormsModule} from '@angular/forms'
import {FlashMessagesModule} from 'angular2-flash-messages';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClientsComponent } from './components/clients/clients.component';
import { AddClientComponent } from './components/add-client/add-client.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { DetailsClientComponent } from './components/details-client/details-client.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SettingsComponent } from './components/settings/settings.component';
import { LoginComponent } from './components/login/login.component';
import { RegistreComponent } from './components/registre/registre.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ClientService } from './services/client.service';
import { AuthService } from './services/auth.service';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestore, AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ClientsComponent,
    AddClientComponent,
    EditClientComponent,
    DetailsClientComponent,
    NavbarComponent,
    SidebarComponent,
    SettingsComponent,
    LoginComponent,
    RegistreComponent,
    NotFoundComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    FlashMessagesModule.forRoot(),
    MDBBootstrapModule.forRoot()
  ],
  providers: [AngularFirestore, ClientService, AuthService],
  bootstrap: [AppComponent],
  schemas:[NO_ERRORS_SCHEMA]
})
export class AppModule { }
