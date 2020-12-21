import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DesignUtilityServiceService } from 'src/app/design-utility-service.service';

@Component({
  selector: 'app-comp1',
  templateUrl: './comp1.component.html',
  styleUrls: ['./comp1.component.css']
})
export class Comp1Component implements OnInit, AfterViewInit {

  userName: string;

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
