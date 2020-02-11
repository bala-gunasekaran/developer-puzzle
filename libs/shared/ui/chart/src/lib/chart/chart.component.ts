import { Component, Input, OnInit } from '@angular/core';
import { CHARTCONSTANTS } from './chart.constants';
import { Observable } from 'rxjs';

@Component({
  selector: 'coding-challenge-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  @Input() data$: Observable<(string | number)[][]>;
  chartData: [];

  chart: {
    title: string;
    type: string;
    data: [];
    columnNames: string[];
    options: any;
  };
  constructor() {}

  ngOnInit() {
    this.chart = {
      title: '',
      type: CHARTCONSTANTS.CHART_TYPE,
      data: [],
      columnNames: [
        CHARTCONSTANTS.COLUMN_NAMES_PERIOD,
        CHARTCONSTANTS.COLUMN_NAMES_CLOSE
      ],
      options: {
        title: `${CHARTCONSTANTS.TITLE}`,
        width: CHARTCONSTANTS.CHART_WIDTH,
        height: CHARTCONSTANTS.CHART_HEIGHT
      }
    };
  }
}
