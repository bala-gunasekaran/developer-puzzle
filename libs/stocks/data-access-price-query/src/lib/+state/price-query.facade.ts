import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { FetchPriceQuery } from './price-query.actions';
import { PriceQueryPartialState } from './price-query.reducer';
import { getSelectedSymbol, getAllPriceQueries } from './price-query.selectors';
import { map, skip } from 'rxjs/operators';

@Injectable()
export class PriceQueryFacade {
  selectedDateRange: any;
  selectedSymbol$ = this.store.pipe(select(getSelectedSymbol));
  priceQueries$ = this.store.pipe(
    select(getAllPriceQueries),
    skip(1),
    map(priceQueries =>
      priceQueries
        .map(priceQuery => [priceQuery.date, priceQuery.close])
        .filter(priceQueryReqRange => {
          return (
            priceQueryReqRange[0] >= this.selectedDateRange.fromDate &&
            priceQueryReqRange[0] <= this.selectedDateRange.toDate
          );
        })
    )
  );

  constructor(private store: Store<PriceQueryPartialState>) {}

  fetchQuote(selectedInput: any) {
    this.selectedDateRange = selectedInput;
    this.store.dispatch(new FetchPriceQuery(selectedInput.symbol, 'max'));
  }
}
