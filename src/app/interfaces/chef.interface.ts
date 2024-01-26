import { MatTableDataSource } from '@angular/material/table';
export interface Chef {
    firstname: string;
    lastname: string;
    phone:number;
    email:string;
    address:string;
    serviceAccess:string;
    duty:number;
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