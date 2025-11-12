import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '@products/services/products.service';
import { map } from 'rxjs';
import { ProductCard } from "@products/components/product-card/product-card";
import { PaginationService } from '@shared/components/pagination/pagination.service';
import { Pagination } from "@shared/components/pagination/pagination";

@Component({
  selector: 'app-gender-page',
  imports: [ProductCard, Pagination],
  templateUrl: './gender-page.html',
})
export class GenderPage {

  activatedRoute = inject(ActivatedRoute);
  gender = toSignal(this.activatedRoute.params.pipe(map(({ gender }) => gender)));

  productsService = inject(ProductsService);
  paginationService = inject(PaginationService);

  productsResource = rxResource({
    params: () => ({ gender: this.gender(), page: this.paginationService.currentPage() - 1 }),
    stream: ({ params }) => {
      return this.productsService.getProducts({
        gender: params.gender,
        offset: params.page * 9,
      });
    }
  })

}
