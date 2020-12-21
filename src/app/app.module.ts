import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PromiseComponent } from './promise/promise.component';
import { HeaderComponent } from './includes/header/header/header.component';
import { ObservableComponent } from './observable/observable.component';
import { ListComponent } from './observable/list/list.component';
import { FromEventComponent } from './observable/from-event/from-event.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DebounceTimeComponent } from './debounce-time/debounce-time.component';
import { FormsModule } from '@angular/forms';
// for HttpClient import:
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';

// for Router import:
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';

// for Core import:
import { LoadingBarModule, LOADING_BAR_CONFIG } from '@ngx-loading-bar/core';
import { SubjectComponent } from './subject/subject.component';
import { Comp1Component } from './componentsForSubjectTest/comp1/comp1.component';
import { Comp2Component } from './componentsForSubjectTest/comp2/comp2.component';
import { Comp3Component } from './componentsForSubjectTest/comp3/comp3.component';
import { ReplaySubjectComponent } from './replay-subject/replay-subject.component';
import { AsyncComponent } from './async/async.component';
import { ConcatComponent } from './concat/concat.component';
import { MergeComponent } from './merge/merge.component';
import { MergeMapComponent } from './merge-map/merge-map.component';
import { ConcatMapComponent } from './concat-map/concat-map.component';
import { ConcatMapMobileNotificationComponent } from './concat-map-mobile-notification/concat-map-mobile-notification.component';
import { SwitchMapComponent } from './switch-map/switch-map.component';
import { SwitchMapSearchFunctionalityComponent } from './switch-map-search-functionality/switch-map-search-functionality.component';
import { ExhaustMapComponent } from './exhaust-map/exhaust-map.component';
import { ShareReplayComponent } from './share-replay/share-replay.component';
import { CombineLatestComponent } from './combine-latest/combine-latest.component';
import { WithLatestComponent } from './with-latest/with-latest.component';

@NgModule({
  declarations: [
    AppComponent,
    PromiseComponent,
    HeaderComponent,
    ObservableComponent,
    ListComponent,
    FromEventComponent,
    DebounceTimeComponent,
    SubjectComponent,
    Comp1Component,
    Comp2Component,
    Comp3Component,
    ReplaySubjectComponent,
    AsyncComponent,
    ConcatComponent,
    MergeComponent,
    MergeMapComponent,
    ConcatMapComponent,
    ConcatMapMobileNotificationComponent,
    SwitchMapComponent,
    SwitchMapSearchFunctionalityComponent,
    ExhaustMapComponent,
    ShareReplayComponent,
    CombineLatestComponent,
    WithLatestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    // for HttpClient use:
    LoadingBarHttpClientModule,

    // for Router use:
    LoadingBarRouterModule,

    // for Core use:
    LoadingBarModule,

    
  ],
  providers: [{
    provide: LOADING_BAR_CONFIG,
    useValue: {
      latencyThreshold: 100,

    },

  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
