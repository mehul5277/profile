import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Jumbotron1Component, JumbotronConfig1 } from '../../../shared/components/jumbotron1/jumbotron1.component';
import { TickerClientComponent } from '../../../shared/components/ticker-client/ticker-client.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Jumbotron1Component, TickerClientComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  typewriterList: Array<string> = ['Digital Engineering', 'Data and AI', 'Cloud'];
  private route = inject(ActivatedRoute);
  cv!: any;

  jumboConfig: any = {
    "profiles": [
      {
        "network": "LinkedIn",
        "url": "https://linkedin.com/in/mehul4ca"
      }
    ]
  }

  config: JumbotronConfig1 = {
    buttons: [
      {
        "text": "Get Started",
        "url": "https://example.com",
        "icon": "ArrowRightIcon"
      }
    ]
  }

  ngOnInit() {
    this.cv = this.route.snapshot.data['cvData'];
  }
}
