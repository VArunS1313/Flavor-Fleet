import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { LatLng, LatLngExpression, LatLngTuple, LeafletMouseEvent, Map, Marker, icon, map, marker, tileLayer } from 'leaflet';
import { LocationService } from 'src/app/services/location.service';
import { Order } from '../../shared/models/Order';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnChanges{
  @Input()
  order!:Order
  @Input()
  readonly=false
  @ViewChild('map',{static:true})
  mapref!:ElementRef
  map!:Map
  private readonly MARKER_ZOOM_LEVEL = 16;
  private readonly MARKER_ICON = icon({
    iconUrl:
      'https://res.cloudinary.com/foodmine/image/upload/v1638842791/map/marker_kbua9q.png',
    iconSize: [42, 42],
    iconAnchor: [21, 42],
  });
  currentMarker!:Marker;
  private defaultLATLANG:LatLngTuple=[ 28.984644,77.705956]
  ngOnChanges(): void {
 // throw new Error('Method not implemented.');
 if(!this.order)
 return ;
 this.intilizemap();
console.log(this.readonly+" " + this.addressLatLng)
 if(this.readonly&&this.addressLatLng)
 { console.log("oppui")
  this.showlocationreadonly()
 }

}
  showlocationreadonly() {
    ///throw new Error('Method not implemented.');
    const m=this.map;
    this.setMarker(this.addressLatLng);
    m.dragging.disable()
    m.touchZoom.disable();
    m.doubleClickZoom.disable();
    m.scrollWheelZoom.disable();
    m.boxZoom.disable();
    m.keyboard.disable();
    m.off('click');
    m.tap?.disable();
    this.currentMarker.dragging?.disable();
    
    m.setView(this.addressLatLng,this.MARKER_ZOOM_LEVEL)
  }

constructor(private locationservice:LocationService){

}
  // ngOnChanges(changes: SimpleChanges): void {
  //   throw new Error('Method not implemented.');
  // }
intilizemap(){
  if(this.map)
  return
this.map=map(this.mapref.nativeElement,{
  attributionControl:false,
}).setView(this.defaultLATLANG,15);
tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.map);
this.map.on('click', (e:LeafletMouseEvent) => {
  this.setMarker(e.latlng);
})

}
findMyLocation(){
this.locationservice.getcurrentlocation().subscribe({
  next:(latlng)=>{
    this.map.setView(latlng,this.MARKER_ZOOM_LEVEL)
    this.setMarker(latlng)
  }
})
}

setMarker(latlng:LatLngExpression){
  this.addressLatLng=latlng as LatLng;
  if(this.currentMarker)
  {
    this.currentMarker.setLatLng(latlng);
    return;
  }
  this.currentMarker=marker(latlng,{
    draggable:true,
    icon:this.MARKER_ICON
  }).addTo(this.map);
  this.currentMarker.on('dragend', () => {
    this.addressLatLng = this.currentMarker.getLatLng();
  })
}
set addressLatLng(latlng: LatLng){
  if(!latlng.lat.toFixed) return;

  latlng.lat = parseFloat(latlng.lat.toFixed(8));
  latlng.lng = parseFloat(latlng.lng.toFixed(8));
 this.order.addresslatlan = latlng;
 // console.log(this.order.addressLatLng);
}
get addressLatLng(){
  return this.order.addresslatlan !;
}


}
