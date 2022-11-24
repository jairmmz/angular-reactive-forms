import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { FormExtensionsComponent } from './form-extensions/form-extensions.component';

// import { AuthService } from './auth.service';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    ReactiveFormComponent,
    FormExtensionsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    // AuthService
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
