import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DesignUtilityServiceService } from 'src/app/design-utility-service.service';

@Component({
  selector: 'app-comp3',
  templateUrl: './comp3.component.html',
  styleUrls: ['./comp3.component.css']
})
export class Comp3Component implements OnInit {
  userName :string;

  @ViewChild('userNameTempRef', { static: true }) inputUserName: ElementRef;

  constructor(private _utilityService: DesignUtilityServiceService) { }


  ngOnInit(): void {
    this._utilityService.subject2.subscribe((eachSubjectData) => {
      this.userName = eachSubjectData;
    })
  }


  ngAfterViewInit(): void {
    this.passedCommonData();
  }

  passedCommonData() {
    this._utilityService.subject2.next(this.inputUserName.nativeElement.value);
  }

}
