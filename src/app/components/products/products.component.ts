import {Component, OnInit, ViewChild} from '@angular/core';
import {Products} from "../model/products";
import {ProductsService} from "../services/products.service";
import {NgFor} from "@angular/common";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-products',
  template: `
        <div class="container">
        <div class="container-content">
            <div class="title">
                <h1>Manager Products</h1>
            </div>

            <div class="container-items">
                <!-- Add Products -->
                <div class="form-control">
                    <h1>Create Products</h1>
                    <form #productsFrom="ngForm" (ngSubmit)="onProductCreate(productsFrom.value)">
                        <div>
                            <label for="pName">Product Name</label>
                            <input type="text" name="pName" id="pName" placeholder="Product Name..." ngModel>
                        </div>

                        <div>
                            <label for="pDes">Product Description</label>
                            <input type="text" name="pDes" id="pDes" placeholder="Product Des..." ngModel>
                        </div>

                        <div>
                            <label for="pPrice">Product Price</label>
                            <input type="text" name="pPrice" id="pPrice" placeholder="Product Price..." ngModel>
                        </div>

                        <input type="submit" value="{{editMode ? 'Update Products':'Add Products'}}">
                    </form>
                </div>
                <!-- End -->
                <!-- Add Products -->
                <div class="tbl-control" >
                    <h1>All Products</h1>
                    <table class="table" >
                      <thead >
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Other</th>
                            </tr>
                      </thead>
                      <tbody >
                            <tr *ngIf="allProducts.length < 1 && !isFetchingData">
                              <td colspan="5">No Products Available!</td>
                            </tr>
                            <tr *ngFor="let pro of allProducts; index as i">
                                <td>{{i+1}}</td>
                                <td>{{pro.pName}}</td>
                                <td>{{pro.pDes}}</td>
                                <td><b>$</b> {{pro.pPrice}}</td>
                                <td>
                                  <input type="button" value="Delete" id="btnDelete" (click)="onDeleteProducts(pro.id)">
                                  <input type="button" value="Edit" id="btnUpdate" (click)="onUpdateProducts(pro.id)">
                                </td>
                            </tr>
                            <tr *ngIf="isFetchingData">
                              <td colspan="5">Loading...</td>
                            </tr>
                      </tbody>
                    </table>
                  <hr style="margin: 5px;">
                  <input type="button" id="btnDisplay" value="Display" (click)="onFetchProducts()">
                  <input type="button" id="btnClear" value="Clear Products" (click)="onDeleteAllProducts()" >
                </div>
                <!-- End -->
            </div>
        </div>
    </div>
  `,
  styles: [`

body{
    background-color: #e6f2ff;
}

.container{
    display: grid;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}
.container-content{
    background-color:#e6e6e6;
    padding:1rem 2rem;
    box-shadow: 0 4px 8px #e6e6e6;
}
.title{
    border-bottom: 1px solid #e6e6e6;
}
.title>h1{
    color:#2952a3;
    text-align: center;
    margin-bottom: 15px;
}
.container-items{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
}
.form-control{
    display: block;
    padding: 1rem 2rem;
    margin: 0 10px;
}
.tbl-control{
    padding: 0 2rem;
    margin: 0 10px;
}
.tbl-control>h1{
    color:#2952a3;
    font-size: 1.5rem;
}
.form-control>h1{
    color:#2952a3;
    font-size: 1.5rem;
}
input[type="text"]{
    border:none;
    outline:none;
    border-radius: 5px;
    width: 100%;
    padding: 10px 1rem;
    margin: 10px 0;
    transition: all 0.4s ease;
    overflow-x: hidden;
}
input[type="text"]:focus{
    border-bottom:2px solid #0066ff;
}
input[type="submit"]{
    outline:none;
    background-color: #8999ff;
    color:#eee;
    border:none;
    border-radius: 4px;
    padding:10px 1rem;
    cursor: pointer;
}

input[type="submit"]:hover{
    background-color: #8987ff;
}

.table{
    border-collapse: collapse;
    width: 100%;
    margin:15px 0;
}
.table th, .table td{
    border:0px solid rgb(255, 255, 255);
    padding:8px;
}
.table th{
    background-color: #001433;
    color:#eee;
    padding:10px 10px;
    text-align: left;
}
.table td{
    padding:2px 10px;
    text-align: left;
}
.table tr:hover{
    background-color:rgba(242, 242, 255,0.8);
}
.table tr:nth-child(even){background-color:#f2f2f2;
}
.table tr {
    background-color:#ffffff;
    transition: all 0.4s ease;
}
#btnDisplay {
  width: 130px;
  outline:none;
  background-color: #cc99ff;
  color:#eee;
  border:none;
  border-radius: 4px;
  padding:10px 1rem;
  cursor: pointer;
  margin:0 10px;
}

#btnDisplay:hover{
  background-color: rgba(204, 153, 255,0.7);
}
#btnUpdate {
  width: 65px;
  outline:none;
  background-color: #53c653;
  color:#eee;
  border:none;
  border-radius: 4px;
  padding:4px 0px;
  cursor: pointer;
  margin:5px;
}
#btnUpdate:hover{
  background-color: #5eba5e;
}
#btnDelete {
  width: 65px;
  outline:none;
  background-color: #ff4d4d;
  color:#eee;
  border:none;
  border-radius: 4px;
  padding:4px 0px;
  cursor: pointer;
  margin:0 5px;
  text-align: center;
}
#btnDelete:hover{
  background-color:#db7070;
}
#btnClear {
  width: 130px;
  outline:none;
  background-color: #e699ff;
  color:#eee;
  border:none;
  border-radius: 4px;
  padding:10px 1rem;
  cursor: pointer;
  margin:0 10px;
}
#btnClear:hover{
  background-color: rgba(230, 153, 255,0.7);
}
  `]
})
export class ProductsComponent implements OnInit{
  allProducts:Products[] =[];
  isFetchingData:boolean = false;
  @ViewChild('productsFrom') form :NgForm;
  editMode:boolean = false;
  currentProductsId:string;
constructor(private productServices: ProductsService) {
}
ngOnInit() {
  this.fetchProducts();
}

onFetchProducts(){
  this.fetchProducts();
}
  onProductCreate(products:{pName:string,pDes:string,pPrice:string}){
  if(!this.editMode)
    this.productServices.createProducts(products);
    else
    this.productServices.updateProduct(this.currentProductsId,products);
  }

  private fetchProducts(){
    this.isFetchingData = true;
    this.productServices.fetchProducts().subscribe((products)=>{
      this.allProducts = products;
      this.isFetchingData = false;
    });
  }

  onDeleteProducts(id:string)
  {
    this.productServices.deleteProducts(id);
  }
  onDeleteAllProducts()
  {
    this.productServices.deleteAllProducts();
  }
  onUpdateProducts(id:string){
    this.currentProductsId = id;
    //CurrentProduct get by id
    let currentProduct = this.allProducts.find((p)=>{return p.id === id});
    console.log(this.form);

  //  Populate the form with the products details
    this.form.setValue({
      pDes: currentProduct.pDes,
      pName: currentProduct.pName,
      pPrice: currentProduct.pPrice
    });
  //  Change the button value to update
    this.editMode = true;
  }
}
