import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductsService } from '@products/services/products.service';
import { ProductCard } from '@store-front/components/product-card/product-card';

@Component({
  selector: 'app-home-page',
  imports: [ProductCard],
  templateUrl: './home-page.html',
})
export class HomePage {

  productsService = inject(ProductsService);

  productsResource = rxResource({
    params: () => ({}),
    stream: ({ params }) => {
      return this.productsService.getProducts({ limit: 1 });
    }
  })

}
