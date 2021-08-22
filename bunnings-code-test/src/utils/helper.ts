import { Catalog } from 'src/models/Catalog';
import { Barcode } from 'src/models/Barcode';

export const getCatalogsArrayFromCSVFile = (catalogArray: string[]): Catalog[] => {
    let arr = [];

    for (let i = 1; i < catalogArray.length; i++) {
        let curruntRecord = (<string>catalogArray[i]).split(',');
        let catalog: Catalog = new Catalog();
        catalog.SKU = curruntRecord[0].trim();
        catalog.Description = curruntRecord[1].trim();
        arr.push(catalog);
    }
    return arr;
}

export const getBarcodeArrayFromCSVFile = (barcodeArray: string[]): Barcode[] => {
    let arr = [];

    for (let i = 1; i < barcodeArray.length; i++) {
        let curruntRecord = (<string>barcodeArray[i]).split(',');
        let barcode: Barcode = new Barcode();
        barcode.SupplierID = parseInt(curruntRecord[0].trim(), 10);
        barcode.SKU = curruntRecord[1].trim();
        barcode.Barcode = curruntRecord[2].trim();
        arr.push(barcode);
    }
    return arr;
}


export const isPropValuesEqual = (subject: any, target: any, propNames: any) =>
    propNames.every((propName: any) => subject[propName] === target[propName]);

export const getUniqueItemsByProperties = (items: any, propNames: any) => {
    const propNamesArray = Array.from(propNames);

    return items.filter((item: any, index: any, array: any) =>
        index === array.findIndex((foundItem: any) => isPropValuesEqual(foundItem, item, propNamesArray))
    );
};