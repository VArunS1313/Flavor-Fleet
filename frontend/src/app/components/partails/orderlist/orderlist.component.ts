import { Component, Input, OnInit } from '@angular/core';
import { Order } from '../../shared/models/Order';

@Component({
  selector: 'orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.css']
})
export class OrderlistComponent implements OnInit {
  @Input()
  order!:Order;
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }

}
