import { Component } from '@angular/core';
import { Catalog } from 'src/models/Catalog';
import { Barcode } from 'src/models/Barcode';
import { Product } from 'src/models/Product';
import { CSVReaderService } from 'src/services/CSVReaderService';
import { getCatalogsArrayFromCSVFile, getBarcodeArrayFromCSVFile, getUniqueItemsByProperties } from 'src/utils/helper';
import { CSVWriteService } from 'src/services/CSVWriteService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public outputProducts: Product[] = [];
  public catalogADataPath: string = "/assets/input/catalogA.csv";
  public catalogBDataPath: string = "/assets/input/catalogB.csv";
  public barcodeADataPath: string = "/assets/input/barcodesA.csv";
  public barcodeBDataPath: string = "/assets/input/barcodesB.csv";
  public sessionStorageKey: string = "outputString";

  constructor(private readerService: CSVReaderService, private writeService: CSVWriteService) { }

  async ngOnInit() {
    let catalogArrayA: Catalog[] = [], barcodeArrayA: Barcode[] = [], catalogArrayB: Catalog[] = [], barcodeArrayB: Barcode[] = [];
    const catalogDataA: string = await this.readerService.fetchData(this.catalogADataPath);
    catalogArrayA = getCatalogsArrayFromCSVFile(catalogDataA.split("\r\n"));

    const barcodeDataA = await this.readerService.fetchData(this.barcodeADataPath);
    barcodeArrayA = getBarcodeArrayFromCSVFile(barcodeDataA.split("\r\n"));

    const catalogDataB = await this.readerService.fetchData(this.catalogBDataPath);
    catalogArrayB = getCatalogsArrayFromCSVFile(catalogDataB.split("\r\n"));

    const barcodeDataB = await this.readerService.fetchData(this.barcodeBDataPath);
    barcodeArrayB = getBarcodeArrayFromCSVFile(barcodeDataB.split("\r\n"));

    const productsFromA: Product[] = this.getProductsInfoFromCatalogAndBarcode(catalogArrayA, barcodeArrayA, "A");

    const productsFromB: Product[] = this.getProductsInfoFromCatalogAndBarcode(catalogArrayB, barcodeArrayB, "B");

    const allProducts: Product[] = [...productsFromA, ...productsFromB];

    const uniqueSKUProducts = getUniqueItemsByProperties(allProducts, ['SKU']);

    const uniqueProducts = getUniqueItemsByProperties(uniqueSKUProducts, ['Barcode']);

    this.outputProducts = uniqueProducts.map((x: Product) => { return { SKU: x.SKU, Description: x.Description, Source: x.Source } as Product });

    sessionStorage.setItem(this.sessionStorageKey, JSON.stringify(this.outputProducts));
  }

  public handleButtonclick = () => {
    this.writeService.downloadFile(this.writeService.ConvertToCSV(sessionStorage.getItem(this.sessionStorageKey), ["SKU", "Description", "Source"]));
  }

  public getProductsInfoFromCatalogAndBarcode(catalogArray: Catalog[], barcodeArray: Barcode[], source: string): Product[] {
    let products: Product[] = [];
    catalogArray.forEach(catalog => {
      barcodeArray.forEach(barcode => {
        if (catalog.SKU === barcode.SKU) {
          products = [...products, {
            SKU: barcode.SKU,
            Barcode: barcode.Barcode,
            Description: catalog.Description,
            Source: source
          } as Product]
        }
      })
    });
    return products;
  }
}


