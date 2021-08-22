import { Catalog } from 'src/models/Catalog';
import { getCatalogsArrayFromCSVFile, getBarcodeArrayFromCSVFile } from './helper';

describe('helper', () => {
    it('getCatalogsArrayFromCSVFile', () => {
        const catalogStringArrayFromCSVFile = ["SKU,Description", "647-vyk-317,Walkers Special Old Whiskey"]

        const data = getCatalogsArrayFromCSVFile(catalogStringArrayFromCSVFile);
        expect(data[0].SKU).toEqual("647-vyk-317");
    });

    it('getBarcodeArrayFromCSVFile', () => {
        const catalogStringArrayFromCSVFile = ["SupplierID,SKU,Barcode", "00001,647-vyk-317,z2783613083817"]
        const data = getBarcodeArrayFromCSVFile(catalogStringArrayFromCSVFile);
        expect(data[0].Barcode).toBe("z2783613083817");
    });
});