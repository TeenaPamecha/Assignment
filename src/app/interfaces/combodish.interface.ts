import { MatTableDataSource } from '@angular/material/table';
export interface ComboDish {
    name: string;
    details:string;
    price:number;
    preparation_time:string;
    available: boolean;
    // email: string;
    // phone: string;
    dishes?: DishData[] | MatTableDataSource<DishData>;
  }
  export interface DishData {
    image_url: string;
    name: string;
    ingredients: string;
    diettypes: number;
    price: number;
    available: boolean
  }