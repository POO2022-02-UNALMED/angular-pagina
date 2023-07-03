import { Component, OnInit } from '@angular/core';
import { INTERNAL_PATHS, INTERNAL_ROUTES } from '@data/constants/routes';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent{


public home= INTERNAL_ROUTES.PANEL_USER_TASK
public contact= INTERNAL_ROUTES.ABOUT_CONTACT
public news= INTERNAL_ROUTES.ABOUT_NEWS
public info= INTERNAL_ROUTES.ABOUT_INFO

}
