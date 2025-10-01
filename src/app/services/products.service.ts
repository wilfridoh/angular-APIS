import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  CreateProductDTO,
  Product,
  UpdateProductDTO,
} from './../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private apiUrl = 'https://young-sands-07814.herokuapp.com/api/products';

  constructor(private http: HttpClient) {}

  getAllProducts() {
    return this.http.get<Product[]>(this.apiUrl);
    //return this.http.get<Product[]>('https://fakestoreapi.com/products');
  }

  getProduct(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  create(dto: CreateProductDTO) {
    return this.http.post<Product>(this.apiUrl, dto);
  }

  update(id: string, dto: UpdateProductDTO) {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, dto);
  }
}
