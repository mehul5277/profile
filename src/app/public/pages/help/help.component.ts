import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-help',
  standalone: true,
  imports: [],
  templateUrl: './help.component.html',
  styleUrl: './help.component.scss'
})
export class HelpComponent implements OnInit {
  helpTopics = Array<{ stack: string; description: string, urls: string[] }>();

  constructor(private dataService: DataService) {

  }
  ngOnInit(): void {
    this.dataService.fetchHelpTopics().subscribe((topics) => {
      this.helpTopics = topics;
    });
  }
}
