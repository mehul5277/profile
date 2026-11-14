import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { BalanceItem, InventoryState, StockInItem, StockOutItem } from './../metadata/inventory.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private readonly initialState: InventoryState = {
    stockInList: [
      { srNo: 1, date: '2026-02-15', product: 'iPhone 16', code: 'M001', qty: 60 },
      { srNo: 2, date: '2026-02-19', product: 'iPhone 17 Pro Max', code: 'M002', qty: 90 }
    ],
    stockOutList: [
      { srNo: 1, date: '2026-02-16', product: 'iPhone 16', code: 'M001', qty: 1 }
    ]
  };

  private stateSubject = new BehaviorSubject<InventoryState>(this.initialState);
  public state$: Observable<InventoryState> = this.stateSubject.asObservable();

  constructor() { }

  // Computed Balance Observable
  public getBalanceStock$(): Observable<BalanceItem[]> {
    return this.state$.pipe(
      map(state => {
        const productMap = new Map<string, { product: string; code: string; purchases: number; sales: number }>();

        state.stockInList.forEach(item => {
          if (!productMap.has(item.code)) {
            productMap.set(item.code, { product: item.product, code: item.code, purchases: 0, sales: 0 });
          }
          productMap.get(item.code)!.purchases += item.qty;
        });

        state.stockOutList.forEach(item => {
          if (!productMap.has(item.code)) {
            productMap.set(item.code, { product: item.product, code: item.code, purchases: 0, sales: 0 });
          }
          productMap.get(item.code)!.sales += item.qty;
        });

        let index = 1;
        const balanceList: BalanceItem[] = [];
        productMap.forEach(val => {
          balanceList.push({
            srNo: index++,
            product: val.product,
            code: val.code,
            purchases: val.purchases,
            sales: val.sales,
            stock: val.purchases - val.sales
          });
        });

        return balanceList;
      })
    );
  }

  // Stock-In Actions (Add, Update, Delete)
  public addStockIn(item: Omit<StockInItem, 'srNo'>): void {
    const currentState = this.stateSubject.value;
    const newItem: StockInItem = { ...item, srNo: currentState.stockInList.length + 1 };
    this.stateSubject.next({ ...currentState, stockInList: [...currentState.stockInList, newItem] });
  }

  public updateStockIn(srNo: number, updatedItem: Omit<StockInItem, 'srNo'>): void {
    const currentState = this.stateSubject.value;
    const stockInList = currentState.stockInList.map(item => item.srNo === srNo ? { ...updatedItem, srNo } : item);
    this.stateSubject.next({ ...currentState, stockInList });
  }

  public deleteStockIn(srNo: number): void {
    const currentState = this.stateSubject.value;
    const stockInList = currentState.stockInList
      .filter(item => item.srNo !== srNo)
      .map((item, index) => ({ ...item, srNo: index + 1 }));
    this.stateSubject.next({ ...currentState, stockInList });
  }

  // Stock-Out Actions (Add, Update, Delete)
  public addStockOut(item: Omit<StockOutItem, 'srNo'>): void {
    const currentState = this.stateSubject.value;
    const newItem: StockOutItem = { ...item, srNo: currentState.stockOutList.length + 1 };
    this.stateSubject.next({ ...currentState, stockOutList: [...currentState.stockOutList, newItem] });
  }

  public updateStockOut(srNo: number, updatedItem: Omit<StockOutItem, 'srNo'>): void {
    const currentState = this.stateSubject.value;
    const stockOutList = currentState.stockOutList.map(item => item.srNo === srNo ? { ...updatedItem, srNo } : item);
    this.stateSubject.next({ ...currentState, stockOutList });
  }

  public deleteStockOut(srNo: number): void {
    const currentState = this.stateSubject.value;
    const stockOutList = currentState.stockOutList
      .filter(item => item.srNo !== srNo)
      .map((item, index) => ({ ...item, srNo: index + 1 }));
    this.stateSubject.next({ ...currentState, stockOutList });
  }
}