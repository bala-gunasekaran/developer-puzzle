import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'coding-challenge-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css'],
  providers: [DatePipe]
})
export class StocksComponent implements OnInit {
  stockPickerForm: FormGroup;
  symbol: string;
  today = new Date();
  fromDate: string;
  toDate: string;

  quotes$ = this.priceQuery.priceQueries$;

  constructor(
    private fb: FormBuilder,
    private priceQuery: PriceQueryFacade,
    private datePipe: DatePipe
  ) {
    this.stockPickerForm = fb.group({
      symbol: [null, Validators.required],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required]
    });
  }

  ngOnInit() {}

  fetchQuote() {
    if (this.stockPickerForm.valid) {
      const selectedInput = {
        fromDate: this.datePipe.transform(
          this.stockPickerForm.value.fromDate,
          'yyyy-MM-dd'
        ),
        toDate: this.datePipe.transform(
          this.stockPickerForm.value.toDate,
          'yyyy-MM-dd'
        ),
        symbol: this.stockPickerForm.value.symbol
      };
      this.priceQuery.fetchQuote(selectedInput);
    }
  }
}
