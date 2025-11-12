import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductsService } from '@products/services/products.service';
import { ProductCard } from '@products/components/product-card/product-card';
import { Pagination } from "@shared/components/pagination/pagination";
import { PaginationService } from '@shared/components/pagination/pagination.service';

@Component({
  selector: 'app-home-page',
  imports: [ProductCard, Pagination],
  templateUrl: './home-page.html',
})
export class HomePage {

  productsService = inject(ProductsService);
  paginationService = inject(PaginationService);

  // activatedRoute = inject(ActivatedRoute);

  // currentPage = toSignal(
  //   this.activatedRoute.queryParamMap.pipe(
  //     map((params) => (params.get('page') ? +params.get('page')! : 1)),
  //     map(page => (isNaN(page) ? 1 : page))
  //   ),
  //   {
  //     initialValue: 1,
  //   }
  // );


  productsResource = rxResource({
    params: () => ({page: this.paginationService.currentPage() - 1 }),
    stream: ({ params }) => {
      return this.productsService.getProducts({
        offset: params.page * 9
      });
    }
  })

}
