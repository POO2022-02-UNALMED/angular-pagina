import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-title-h1',
  templateUrl: './title-h1.component.html',
  styleUrls: ['./title-h1.component.css']
})
export class TitleH1Component {
  @Input() text = '';
  @Input() type: 'primary' | 'secondary' | 'success' | 'danger' | 'dark' = 'primary';

}
