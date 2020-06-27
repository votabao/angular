import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DynamicReactiveFormComponent} from './dynamic-reactive-form/dynamic-reactive-form.component';
import {MenuComponent} from './menu/menu.component';
import {CustomAttributeDirectivesComponent} from './custom-attribute-directives/custom-attribute-directives.component';
import { TemplateDrivenFormsComponent } from './template-driven-forms/template-driven-forms.component';
import { StatusChangeComponent } from './status-change/status-change.component';

const routes: Routes = [
  {path: '', redirectTo: 'DOMAngular', pathMatch: 'full'},
  {path: 'dynamic-reactive-form', component: DynamicReactiveFormComponent},
  {path: 'DOMAngular', component: MenuComponent},
  {path: 'custom-attribute-directive', component: CustomAttributeDirectivesComponent},
  {path: 'TemplateDrivenFormsComponent', component: TemplateDrivenFormsComponent},
  {path: 'status-change', component: StatusChangeComponent},
  ]
;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
