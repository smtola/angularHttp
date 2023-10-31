import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Products} from "../model/products";
import {map} from "rxjs/operators";

@Injectable({providedIn: "root"})

export class ProductsService{
  constructor(private http:HttpClient) { }
//Create Product in database
  createProducts(products:{pName:string,pDes:string,pPrice:string}){
    console.log(products);
    const header = new HttpHeaders({'myHeader': 'smtola'});
    this.http.post<{name:string}>('https://angularbytlcoding-default-rtdb.firebaseio.com/products.json',products,
      {headers:header})
      .subscribe((res)=>{
        console.log(res);
      })
  }
//fetch Product in database

  fetchProducts(){
    return this.http.get<{[key:string]:Products}>('https://angularbytlcoding-default-rtdb.firebaseio.com/products.json')
      .pipe(map((res)=>{
        const products = [];
        for (const key in res){
          if(res.hasOwnProperty(key)){
            products.push({...res[key], id: key})
          }
        }
        return products;
      }))
  }
  //delete Product in database

  deleteProducts(id:string){
    this.http.delete('https://angularbytlcoding-default-rtdb.firebaseio.com/products/'+id+'.json')
      .subscribe();
  }
  //delete all Product in database

  deleteAllProducts(){
    this.http.delete('https://angularbytlcoding-default-rtdb.firebaseio.com/products.json')
      .subscribe();
  }

  updateProduct(id: string, value: Products){
    this.http.put('https://angularbytlcoding-default-rtdb.firebaseio.com/products/'+id+'.json',value)
      .subscribe();
  }
}
