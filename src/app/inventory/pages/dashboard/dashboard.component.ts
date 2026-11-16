import { Component, OnInit } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { combineLatest, map, Observable, startWith } from 'rxjs';
import { InventoryService } from './../../services/inventory.service';
import { BalanceItem, StockInItem, StockOutItem } from './../../metadata/inventory.model';
import { DownloadService } from '../../services/download.service';
import { ProductPipe } from '../../pipes/product.pipe';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ProductPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  stockInForm!: FormGroup;
  stockOutForm!: FormGroup;

  searchControl = this.fb.control('');
  startDateControl = this.fb.control('');
  endDateControl = this.fb.control('');

  state$ = this.inventoryService.state$;
  balanceStock$: Observable<BalanceItem[]> = this.inventoryService.getBalanceStock$();

  // Editing trackers
  editingStockInSrNo: number | null = null;
  editingStockOutSrNo: number | null = null;

  // Export caches
  private currentStockInList: StockInItem[] = [];
  private currentStockOutList: StockOutItem[] = [];

  pageSize = 5;
  stockInPage = 1;
  stockOutPage = 1;
  stockInTotalPages = 1;
  stockOutTotalPages = 1;

  paginatedStockIn: StockInItem[] = [];
  paginatedStockOut: StockOutItem[] = [];

  constructor(
    private fb: FormBuilder,
    private inventoryService: InventoryService,
    private downloadService: DownloadService
  ) { }

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

    const query$ = this.searchControl.valueChanges.pipe(startWith(''), map(v => (v || '').toLowerCase().trim()));
    const startDate$ = this.startDateControl.valueChanges.pipe(startWith(''));
    const endDate$ = this.endDateControl.valueChanges.pipe(startWith(''));

    // Stock-In History Subscription & Pagination
    combineLatest([this.state$.pipe(map(s => s.stockInList)), query$, startDate$, endDate$]).pipe(
      map(([items, query, startDate, endDate]) => {
        return items.filter(item => {
          const matchesQuery = !query || item.product.toLowerCase().includes(query) || item.code.toLowerCase().includes(query);
          const matchesStart = !startDate || item.date >= startDate;
          const matchesEnd = !endDate || item.date <= endDate;
          return matchesQuery && matchesStart && matchesEnd;
        });
      })
    ).subscribe(filtered => {
      this.currentStockInList = filtered;
      this.stockInTotalPages = Math.ceil(filtered.length / this.pageSize) || 1;
      if (this.stockInPage > this.stockInTotalPages) this.stockInPage = 1;
      const startIndex = (this.stockInPage - 1) * this.pageSize;
      this.paginatedStockIn = filtered.slice(startIndex, startIndex + this.pageSize);
    });

    // Stock-Out History Subscription & Pagination
    combineLatest([this.state$.pipe(map(s => s.stockOutList)), query$, startDate$, endDate$]).pipe(
      map(([items, query, startDate, endDate]) => {
        return items.filter(item => {
          const matchesQuery = !query || item.product.toLowerCase().includes(query) || item.code.toLowerCase().includes(query);
          const matchesStart = !startDate || item.date >= startDate;
          const matchesEnd = !endDate || item.date <= endDate;
          return matchesQuery && matchesStart && matchesEnd;
        });
      })
    ).subscribe(filtered => {
      this.currentStockOutList = filtered;
      this.stockOutTotalPages = Math.ceil(filtered.length / this.pageSize) || 1;
      if (this.stockOutPage > this.stockOutTotalPages) this.stockOutPage = 1;
      const startIndex = (this.stockOutPage - 1) * this.pageSize;
      this.paginatedStockOut = filtered.slice(startIndex, startIndex + this.pageSize);
    });
  }

  // Edit actions
  editStockIn(item: StockInItem): void {
    this.editingStockInSrNo = item.srNo;
    this.stockInForm.patchValue({ date: item.date, product: item.product, code: item.code, qty: item.qty });
  }

  cancelEditStockIn(): void {
    this.editingStockInSrNo = null;
    const today = new Date().toISOString().split('T')[0];
    this.stockInForm.patchValue({ date: today, product: '', code: '', qty: 1 });
  }

  editStockOut(item: StockOutItem): void {
    this.editingStockOutSrNo = item.srNo;
    this.stockOutForm.patchValue({ date: item.date, product: item.product, code: item.code, qty: item.qty });
  }

  cancelEditStockOut(): void {
    this.editingStockOutSrNo = null;
    const today = new Date().toISOString().split('T')[0];
    this.stockOutForm.patchValue({ date: today, product: '', code: '', qty: 1 });
  }

  onStockInSubmit(): void {
    if (this.stockInForm.valid) {
      if (this.editingStockInSrNo !== null) {
        this.inventoryService.updateStockIn(this.editingStockInSrNo, this.stockInForm.value);
        this.editingStockInSrNo = null;
      } else {
        this.inventoryService.addStockIn(this.stockInForm.value);
      }
      const today = new Date().toISOString().split('T')[0];
      this.stockInForm.patchValue({ date: today, product: '', code: '', qty: 1 });
    }
  }

  onStockOutSubmit(): void {
    if (this.stockOutForm.valid) {
      if (this.editingStockOutSrNo !== null) {
        this.inventoryService.updateStockOut(this.editingStockOutSrNo, this.stockOutForm.value);
        this.editingStockOutSrNo = null;
      } else {
        this.inventoryService.addStockOut(this.stockOutForm.value);
      }
      const today = new Date().toISOString().split('T')[0];
      this.stockOutForm.patchValue({ date: today, product: '', code: '', qty: 1 });
    }
  }

  deleteStockIn(srNo: number): void {
    if (confirm('Delete this stock-in record?')) {
      this.inventoryService.deleteStockIn(srNo);
      if (this.editingStockInSrNo === srNo) this.cancelEditStockIn();
    }
  }

  deleteStockOut(srNo: number): void {
    if (confirm('Delete this stock-out record?')) {
      this.inventoryService.deleteStockOut(srNo);
      if (this.editingStockOutSrNo === srNo) this.cancelEditStockOut();
    }
  }

  // Export handlers
  exportBalance(): void {
    this.balanceStock$.subscribe(items => {
      const query = (this.searchControl.value || '').toLowerCase().trim();
      const filtered = !query ? items : items.filter(i => i.product.toLowerCase().includes(query) || i.code.toLowerCase().includes(query));
      const headers = ['Sr.No', 'Product', 'Code', 'Purchases', 'Sales', 'Stock'];
      const rows = filtered.map(item => [item.srNo, `"${item.product}"`, `"${item.code}"`, item.purchases, item.sales, item.stock]);
      this.downloadService.exportToCSV('inventory-balance.csv', headers, rows);
    }).unsubscribe();
  }

  exportStockIn(): void {
    const headers = ['Sr.No', 'Date', 'Product', 'Code', 'Quantity'];
    const rows = this.currentStockInList.map(item => [item.srNo, item.date, `"${item.product}"`, `"${item.code}"`, item.qty]);
    this.downloadService.exportToCSV('stock-in-history.csv', headers, rows);
  }

  exportStockOut(): void {
    const headers = ['Sr.No', 'Date', 'Product', 'Code', 'Quantity'];
    const rows = this.currentStockOutList.map(item => [item.srNo, item.date, `"${item.product}"`, `"${item.code}"`, item.qty]);
    this.downloadService.exportToCSV('stock-out-history.csv', headers, rows);
  }

  resetFilters(): void {
    this.searchControl.setValue('');
    this.startDateControl.setValue('');
    this.endDateControl.setValue('');
    this.stockInPage = 1;
    this.stockOutPage = 1;
  }
}