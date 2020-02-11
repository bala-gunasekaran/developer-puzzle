import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartComponent } from './chart.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { CHARTCONSTANTS } from './chart.constants';
import { of } from 'rxjs';

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChartComponent],
      imports: [GoogleChartsModule.forRoot()]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should assign values to the chart config', () => {
    component.ngOnInit();
    expect(component.chart).toBeDefined();
    expect(component.chart.type).toEqual(CHARTCONSTANTS.CHART_TYPE);
    expect(component.chart.columnNames[0]).toEqual(
      CHARTCONSTANTS.COLUMN_NAMES_PERIOD
    );
    expect(component.chart.columnNames[1]).toEqual(
      CHARTCONSTANTS.COLUMN_NAMES_CLOSE
    );
    expect(component.chart.options.width).toEqual(CHARTCONSTANTS.CHART_WIDTH);
    expect(component.chart.options.height).toEqual(CHARTCONSTANTS.CHART_HEIGHT);
  });

  it('should assign the values to the chart data', () => {
    component.ngOnInit();
    const data = [
      ['2019-01-16', 10.61],
      ['2019-01-17', 10.58],
      ['2019-01-18', 10.67],
      ['2019-01-22', 10.53],
      ['2019-01-23', 10.53]
    ];
    component.data$ = of(data);
    expect(component.data$).toBeDefined();
  });
});
