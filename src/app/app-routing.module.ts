import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PromiseComponent } from './promise/promise.component';
import { ObservableComponent } from './observable/observable.component';
import { ListComponent } from './observable/list/list.component';
import { FromEventComponent } from './observable/from-event/from-event.component';
import { HeaderComponent } from './includes/header/header/header.component';
import { SubjectComponent } from './subject/subject.component';


const routes: Routes = [

  { path: 'promise', component: PromiseComponent },
  /* { path: 'menuBar', component: HeaderComponent }, */

  {
    path: 'observable',
    component: ObservableComponent,
    children: [
      { path: '', component: ListComponent },
      { path: 'fromEvent', component: FromEventComponent }
    ]
  },
  { path: 'subject', component: SubjectComponent },


  { path: '**', redirectTo: '/promise', pathMatch: 'full' },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
