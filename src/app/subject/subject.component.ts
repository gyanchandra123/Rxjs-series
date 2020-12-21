import { Component, OnDestroy, OnInit } from '@angular/core';
import { DesignUtilityServiceService } from '../design-utility-service.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit, OnDestroy {

  userName = '';

  constructor(private _utilityService: DesignUtilityServiceService) { }


  ngOnInit(): void {
    this._utilityService.subject2.subscribe((newSubjectData) => {
      this.userName = newSubjectData;
    });

    this._utilityService.subject.next(true);   
  }


  ngOnDestroy(): void {
    this._utilityService.subject.next(false);
  }
}
