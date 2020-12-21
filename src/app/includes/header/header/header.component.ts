import { Component, OnInit } from '@angular/core';
import { DesignUtilityServiceService } from 'src/app/design-utility-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
 
  exclusive: boolean = false ;

  constructor(private _utilityService: DesignUtilityServiceService) {

  }

  ngOnInit(): void {
    this._utilityService.subject.subscribe((subjectCommonValue) => {
      this.exclusive = subjectCommonValue;
    })
  }

}
