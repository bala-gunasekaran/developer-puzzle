import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import { TIMEPERIODS } from './stock.constants';

export enum FormStatus {
  Initial,
  Error
}

@Component({
  selector: 'coding-challenge-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {
  stockPickerForm: FormGroup;
  symbol: string;
  period: string;
  readonly FormStatus = FormStatus;
  formStatus = FormStatus.Initial;

  quotes$ = this.priceQuery.priceQueries$;

  timePeriods = TIMEPERIODS;

  constructor(private fb: FormBuilder, private priceQuery: PriceQueryFacade) {
    this.stockPickerForm = fb.group({
      symbol: [null, Validators.required],
      period: [null, Validators.required]
    });
  }

  get symbolIsInvalid() {
    return (this.stockPickerForm as FormGroup).controls.symbol.invalid;
  }
  get symbolIsInvalidAndTouched() {
    return (
      this.symbolIsInvalid &&
      (this.stockPickerForm as FormGroup).controls.symbol.touched
    );
  }

  get periodIsInvalid() {
    return (this.stockPickerForm as FormGroup).controls.period.invalid;
  }
  get periodIsInvalidAndTouched() {
    return (
      this.periodIsInvalid &&
      (this.stockPickerForm as FormGroup).controls.period.touched
    );
  }

  ngOnInit() {}

  fetchQuote() {
    if (this.stockPickerForm.valid) {
      const { symbol, period } = this.stockPickerForm.value;
      this.priceQuery.fetchQuote(symbol, period);
    } else {
      this.formStatus = FormStatus.Error;
    }
  }
}
