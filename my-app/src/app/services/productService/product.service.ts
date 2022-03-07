import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/models/productModel';
import { environment } from 'src/environments/environment';
import { RouterModule } from '@angular/router'; 
import jwt_Decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  //selectedProduct: Product
  products: any
  url_api = `${environment.API_URL}/products`
  selectedProduct: Product;
  router: any;

  constructor(public http: HttpClient) {
    this.selectedProduct = this.products()
  }
/* 
  public newMethod(): Product {
    return newLocal;
  } */

  getProducts(){
    return this.http.get(`${this.url_api}/get-products`)
  }
  // conexion para login
  /*
  credentials = {
    name: "",
    price: "",
  }
  */
  login(credentials: any){
    return this.http.post(`${this.url_api}/login`, credentials)
  }


  /*
  form-products = {
    name: "",
    id: "",
    price: ""
    
  }
  */
  register(formProducts: any){
    return this.http.post(`${this.url_api}/create-product`, formProducts)
  }

  loggedIn(){
    return localStorage.getItem('token') ? true : false 
  }
  isAdmin(){
    const { permissions } = this.getDataFromToken()

    if(permissions.admin){
      return true
    }
    return false

  }

  logOut(){
    localStorage.removeItem('token');
    this.router.navigate(['/login'])
  }

  getToken(){
    return localStorage.getItem('token')
  }

  getDataFromToken() :any {
    const token = this.getToken()
    const decoded = jwt_Decode(token ? token : "Error in token")
    return decoded
  }













}