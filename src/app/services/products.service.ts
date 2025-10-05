import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import {
  CreateProductDTO,
  Product,
  UpdateProductDTO,
} from './../models/product.model';
import { retry } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  //private apiUrl = 'https://young-sands-07814.herokuapp.com/api/products';
  private apiUrl = '/api/products';

  constructor(private http: HttpClient) {}

  getAllProducts(limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit && offset) {
      params = params.set('limit', limit);
      params = params.set('offset', limit);
    }
    return this.http.get<Product[]>(this.apiUrl)
    .pipe(
      retry(3)
    );

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

  delete(id: string) {
    return this.http.get<boolean>(`${this.apiUrl}/${id}`);
  }
}
