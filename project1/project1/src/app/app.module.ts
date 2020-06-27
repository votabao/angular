import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {MenuComponent} from './menu/menu.component';
import {HighlightDirective} from './highlight.directive';
import {HttpClientModule} from '@angular/common/http';
import {DynamicReactiveFormComponent} from './dynamic-reactive-form/dynamic-reactive-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {CustomAttributeDirectivesComponent} from './custom-attribute-directives/custom-attribute-directives.component';

import { ModalEditEventComponent } from './modal-edit-event/modal-edit-event.component';
import { ModalConfirmRemoveComponent } from './modal-confirm-remove/modal-confirm-remove.component';
import { TemplateDrivenFormsComponent } from './template-driven-forms/template-driven-forms.component';
import { ChildComponent } from './child/child.component';
import { StatusChangeComponent } from './status-change/status-change.component';
import { NameValidator } from './validator/nameValidate.validator';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HighlightDirective,
    DynamicReactiveFormComponent,
    CustomAttributeDirectivesComponent,
    ModalEditEventComponent,
    ModalConfirmRemoveComponent,
    TemplateDrivenFormsComponent,
    ChildComponent,
    StatusChangeComponent,
    NameValidator
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
