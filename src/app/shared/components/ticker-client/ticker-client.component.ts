import { NgTemplateOutlet } from '@angular/common';
import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-ticker-client',
  standalone: true,
  imports: [NgTemplateOutlet],
  templateUrl: './ticker-client.component.html',
  styleUrl: './ticker-client.component.scss'
})
export class TickerClientComponent {
  @Input({ required: false }) tickerItems: Array<any> = [
    "./assets/img/AWS-partner-advanced-tier_300x300.png",
    "./assets/img/SPD-Logo.png",
    "./assets/img/Automation-anywhere_300x300-e1788535214396.png",
    "./assets/img/UiPath_300x300.png",
    "./assets/img/databricks_300x300-e1788534998404.png",
    "./assets/img/snowflake_300x300-e1788535115882.png",
    "./assets/img/Unqork_300x300.png",
    "./assets/img/Duck-creek_300x300-e1788535034176.png",
    "./assets/img/servicenow_300x300-e1788535063368.png"
  ];
}
