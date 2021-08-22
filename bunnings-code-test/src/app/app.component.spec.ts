import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { CSVReaderService } from 'src/services/CSVReaderService';
import { CSVWriteService } from 'src/services/CSVWriteService';
import { HttpClientModule } from '@angular/common/http';

describe('AppComponent', () => {
  const catalogArray = [{ SKU: "647-vyk-317", Description: "Walkers Special Old Whiskey" },
  { SKU: "280-oad-768", Description: "Bread - Raisin" },
  { SKU: "165-rcy-650", Description: "Tea - Decaf 1 Cup" },
  { SKU: "167-eol-949", Description: "Cheese - Grana Padano" }];
  const barcodeArrray = [{ SupplierID: 1, SKU: "647-vyk-317", Barcode: "m1161615509466" },
  { SupplierID: 2, SKU: "280-oad-768", Barcode: "p2359014924610" }]
  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      providers: [CSVReaderService, CSVWriteService],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should get correct products barcode if SKU are the same in catalog and barcode table', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const products = app.getProductsInfoFromCatalogAndBarcode(catalogArray, barcodeArrray, "A");

    expect(products.filter(x => x.SKU === "647-vyk-317")[0].Barcode).toBe("m1161615509466");
  });

  it('should get correct products source', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const products = app.getProductsInfoFromCatalogAndBarcode(catalogArray, barcodeArrray, "A");

    products.forEach(x => expect(x.Source).toBe("A"))
  });
});
