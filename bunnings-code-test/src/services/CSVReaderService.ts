import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';

@Injectable()
export class CSVReaderService {
    constructor(private httpClient: HttpClient) { }

    public async  fetchData(url: string): Promise<string> {
        try {
            const data = await this.httpClient.get(url, { responseType: 'text' });
            return data.toPromise();
        }
        catch (err) {
            throwError(err);
            return of("").toPromise();
        }
    }
}