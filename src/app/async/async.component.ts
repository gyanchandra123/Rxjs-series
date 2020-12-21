import { Component, OnInit } from '@angular/core';
import { DesignUtilityServiceService } from '../design-utility-service.service';

@Component({
  selector: 'app-async',
  templateUrl: './async.component.html',
  styleUrls: ['./async.component.css']
})
export class AsyncComponent implements OnInit {
  
  lastAsyncdata ;

  constructor(private _utilityService: DesignUtilityServiceService) { }

  ngOnInit(): void {
    this._utilityService.subject4.subscribe(eachAsyncValue => {
      this.lastAsyncdata = eachAsyncValue
    })
  }


  addVideo(inputElementRef: any) {
    this._utilityService.subject4.next(inputElementRef.value);
    console.log(inputElementRef.value);
  }

  subscribeVideo2() {
    this._utilityService.subject4.complete();
  }

}
