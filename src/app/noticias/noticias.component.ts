import { ActivatedRoute } from '@angular/router';
import { NewsRss } from './noticias.models';
import { HttpClient } from '@angular/common/http';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as xml2js from 'xml2js';
@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})

export class NoticiasComponent implements OnInit, OnChanges {
  RssData: Array<any>;
  item: any;
  
  constructor(private http: HttpClient,private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params: any) => {
      var symbol = params.params.q ?? 'AAPL';
    this.GetRssFeedData();
   });
  }

  ngOnChanges(changes: SimpleChanges): void {
      
  }

  GetRssFeedData() { //TODO: probar con el proxy
    const requestOptions: Object = {
      observe: 'body',
      responseType: 'text'
    }; 
    const _url = "http://api.mediastack.com/v1/news?access_key=165dd565fc65c6f3c46e5f38bbf11294&countries=us";
    this.http 
      .get<any>(
        _url,
        requestOptions
      )
      .subscribe((data) => {
        data = JSON.parse(data)
        console.log(data)
        this.RssData = data?.data?.length > 0 ? data.data : '';//TODO: control de errores.    
      });
      // this.item  = this.RssData?.rss?.channel[0]?.item;
  }

   getDataDate(endDate:any) { // TODO: comprobar el formato de la fecha  
    // const dayTime = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
  }

  selectedNew(url: any){
    url ? window.open(url)
  }

}
