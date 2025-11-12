import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '@products/services/products.service';
import { ProductCarousel } from "@products/components/product-carousel/product-carousel";

@Component({
  selector: 'app-product-page',
  imports: [ProductCarousel],
  templateUrl: './product-page.html',
})
export class ProductPage {

  activatedRoute = inject(ActivatedRoute);
  productsService = inject(ProductsService);

  productIdSlug = this.activatedRoute.snapshot.params['idSlug'];

  productResource = rxResource({
    params: () => ({ idSlug: this.productIdSlug }),
    stream: ({ params }) => this.productsService.getProductByIdSlug(params.idSlug)
  })
}
