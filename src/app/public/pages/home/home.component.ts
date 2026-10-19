import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Jumbotron1Component } from '../../../shared/components/jumbotron1/jumbotron1.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Jumbotron1Component],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private route = inject(ActivatedRoute);
  cv!: any;

  ngOnInit() {
    this.cv = this.route.snapshot.data['cvData'];
  }
}
