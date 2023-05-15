import {ApiService} from './api.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {throwError} from 'rxjs';

describe('ApiService', () =>
{
  let service: ApiService;
  let http: HttpClient;

  beforeEach(() =>
  {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(ApiService);
    http = TestBed.inject(HttpClient);
  });

  it('should be created', () =>
  {
    expect(service)
      .toBeTruthy();
  });

  it('should make a POST request', () =>
  {
    const route: string = 'test';
    const body: { [key: string]: string } = {test: 'test'};
    const params: HttpParams = new HttpParams().set('test', 'test');

    spyOn(http, 'post')
      .and
      .callThrough();

    service.post(route, body, {params: params})
      .subscribe(() =>
      {
        expect(http.post)
          .toHaveBeenCalled();
      });
  });

  it('should make a POST request and return an unknown error string', () =>
  {
    const route: string = 'test';
    const body: { [key: string]: string } = {test: 'test'};
    const params: HttpParams = new HttpParams().set('test', 'test');

    spyOn(http, 'post')
      .and
      .returnValue(throwError('some error'));

    service.post(route, body, {params: params})
      .subscribe(() =>
      {
      }, (error: { [key: string]: string }) =>
      {
        expect(error)
          .toEqual({error: 'some error'});
      });
  });

  it('should make a POST request and return an unknown error object', () =>
  {
    const route: string = 'test';
    const body: { [key: string]: string } = {test: 'test'};
    const params: HttpParams = new HttpParams().set('test', 'test');

    spyOn(http, 'post')
      .and
      .returnValue(throwError({error: 'some error'}));

    service.post(route, body, {params: params})
      .subscribe(() =>
      {
      }, (error: { [key: string]: string }) =>
      {
        expect(error)
          .toEqual({error: 'An unknown error occurred, please try again'});
      });
  });
});
