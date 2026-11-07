import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TickerClientComponent } from '../../../shared/components/ticker-client/ticker-client.component';
import { PollComponent } from '../../../shared/components/poll/poll.component';
import { JiexoJumboComponent } from '../../../shared/components/jiexo-jumbo/jiexo-jumbo.component';
import { JumbotronConfig1 } from '../../../shared/components/jumbotron1/jumbotron1.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [JiexoJumboComponent, TickerClientComponent, PollComponent],
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
    buttons:
    {
      "text": "Get Started",
      "url": "https://example.com",
      "icon": "ArrowRightIcon"
    }

  }

  ngOnInit() {
    this.cv = this.route.snapshot.data['cvData'];
  }
}
