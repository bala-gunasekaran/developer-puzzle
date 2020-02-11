import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StocksComponent } from './stocks.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedUiChartModule } from '@coding-challenge/shared/ui/chart';
import {
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatButtonModule
} from '@angular/material';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

describe('StocksComponent', () => {
  let component: StocksComponent;
  let fixture: ComponentFixture<StocksComponent>;
  let priceQueryFacadeMock;

  beforeEach(async(() => {
    priceQueryFacadeMock = {
      fetchQuote: jest.fn()
    };
    TestBed.configureTestingModule({
      declarations: [StocksComponent],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        SharedUiChartModule,
        BrowserAnimationsModule
      ],
      providers: [
        {
          provide: PriceQueryFacade,
          useValue: priceQueryFacadeMock
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    spyOn(component, 'ngOnDestroy').and.callFake(() => {});
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return false when the form is invalid', () => {
    expect(component.stockPickerForm.valid).toBeFalsy();
  });

  it('should return true when the form is valid', () => {
    expect(component.stockPickerForm.valid).toBeFalsy();
    component.stockPickerForm.controls['symbol'].setValue('infy');
    component.stockPickerForm.controls['period'].setValue('5d');
    expect(component.stockPickerForm.valid).toBeTruthy();
  });

  it('Observable should return empty on page load', () => {
    component.ngOnInit();
    expect(component.quotes$).toBeUndefined();
  });

  it('Observable should return value when fetch quote method is invoked', () => {
    component.stockPickerForm.controls['symbol'].setValue('infy');
    component.stockPickerForm.controls['period'].setValue('5d');
    expect(component.stockPickerForm.valid).toBeTruthy();
    component.fetchQuote();
    const data = [
      ['2019-01-16', 10.61],
      ['2019-01-17', 10.58],
      ['2019-01-18', 10.67],
      ['2019-01-22', 10.53],
      ['2019-01-23', 10.53]
    ];
    priceQueryFacadeMock.fetchQuote.mockReturnValueOnce(of(data));
    fixture.detectChanges();
    expect(priceQueryFacadeMock.fetchQuote).toHaveBeenCalled();
    expect(priceQueryFacadeMock.fetchQuote).toBeCalledWith('infy', '5d');
    expect(priceQueryFacadeMock.fetchQuote.mock.calls[0][0]).toEqual('infy');
    expect(priceQueryFacadeMock.fetchQuote.mock.calls[0][1]).toEqual('5d');
  });
});
