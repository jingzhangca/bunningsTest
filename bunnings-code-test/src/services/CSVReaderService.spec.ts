import { CSVReaderService } from './CSVReaderService';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';

describe('CSVReaderService', () => {
    let httpClientSpy: { get: jasmine.Spy };
    let service: CSVReaderService;
    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        service = new CSVReaderService(httpClientSpy as any);
    });
    it('fetchData should return expected value', async () => {
        httpClientSpy.get.and.returnValue(of("testData"));
        const data = await service.fetchData("testURL");
        expect(data).toBe("testData");
    });

    it('fetchData should return empty string if httpClient throws error', async () => {
        const errorResponse = new HttpErrorResponse({
            error: '404 error',
            status: 404, statusText: 'Not Found'
        });

        httpClientSpy.get.and.throwError(errorResponse);
        const data = await service.fetchData("testURL");
        expect(data).toBe("");
    });
});