export interface StockItem {
    id?: string;
    srNo: number;
    date: string;
    product: string;
    code: string;
    qty: number;
}

export interface StockInItem extends StockItem { }

export interface StockOutItem extends StockItem { }

export interface BalanceItem {
    srNo: number;
    product: string;
    code: string;
    purchases: number; // Total stock-in qty
    sales: number;     // Total stock-out qty
    stock: number;     // Purchases - Sales
}

export interface InventoryState {
    stockInList: StockInItem[];
    stockOutList: StockOutItem[];
}