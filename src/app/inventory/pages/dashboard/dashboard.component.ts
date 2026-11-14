import { Component, OnInit } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { InventoryService } from './../../services/inventory.service';
import { BalanceItem, StockInItem, StockOutItem } from './../../metadata/inventory.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  stockInForm!: FormGroup;
  stockOutForm!: FormGroup;

  state$ = this.inventoryService.state$;
  balanceStock$: Observable<BalanceItem[]> = this.inventoryService.getBalanceStock$();

  constructor(private fb: FormBuilder, private inventoryService: InventoryService) {}

  ngOnInit(): void {
    const today = new Date().toISOString().split('T')[0];

    this.stockInForm = this.fb.group({
      date: [today, Validators.required],
      product: ['', Validators.required],
      code: ['', Validators.required],
      qty: [1, [Validators.required, Validators.min(1)]]
    });

    this.stockOutForm = this.fb.group({
      date: [today, Validators.required],
      product: ['', Validators.required],
      code: ['', Validators.required],
      qty: [1, [Validators.required, Validators.min(1)]]
    });
  }

  onStockInSubmit(): void {
    if (this.stockInForm.valid) {
      this.inventoryService.addStockIn(this.stockInForm.value);
      this.stockInForm.patchValue({ product: '', code: '', qty: 1 });
    }
  }

  onStockOutSubmit(): void {
    if (this.stockOutForm.valid) {
      this.inventoryService.addStockOut(this.stockOutForm.value);
      this.stockOutForm.patchValue({ product: '', code: '', qty: 1 });
    }
  }
}