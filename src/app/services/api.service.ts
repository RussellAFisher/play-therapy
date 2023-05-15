import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService
{
  // Disable 'no any' rule when sources could be any
  /* eslint-disable @typescript-eslint/no-explicit-any */
  /**
   * Api service constructor
   * @param _httpClient
   */
  constructor(private _httpClient: HttpClient)
  {
  }

  /**
   * Post request
   *
   * @param {string} route
   * @param {any} body
   * @param {any} options
   * @return {Observable<any>}
   */
  post(route: string, body: any, options: any): Observable<any>
  {
    options.headers = new HttpHeaders({'Content-Type': 'application/json'});

    return this._httpClient.post(route, body, options)
      .pipe(catchError((error: any) => this._handleError(error)));
  }

  /**
   * Pull error message out if simple format, can be adapted for know error response formats
   *
   * @private
   * @param {any} error
   * @return {Observable<any>}
   */
  private _handleError(error: any): Observable<any>
  {
    if (typeof error === 'string')
    {
      return throwError({error: error});
    }
    else
    {
      console.log(error);
      return throwError({error: 'An unknown error occurred, please try again'});
    }
  }

  /* eslint-enable @typescript-eslint/no-explicit-any */
}
