/**
 * Api Documentation
 * Api Documentation
 *
 * OpenAPI spec version: 1.0
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import {Inject, Injectable, Optional} from '@angular/core';
import {
    HttpClient, HttpHeaders, HttpParams,
    HttpResponse, HttpEvent
} from '@angular/common/http';
import {CustomHttpUrlEncodingCodec} from '../encoder';

import {Observable} from 'rxjs/Observable';

import {LecturerResult} from '../model/lecturerResult';

import {BASE_PATH, COLLECTION_FORMATS} from '../variables';
import {Configuration} from '../configuration';
import {SearchResultLecturerResult} from "../model/searchResultLecturerResult";


@Injectable()
export class LecturerControllerService {

    protected basePath = 'http://localhost:9999';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional() @Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * createLecturer
     *
     * @param lecturerResult lecturerResult
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createLecturerUsingPOST(lecturerResult: LecturerResult, observe?: 'body', reportProgress?: boolean): Observable<boolean>;
    public createLecturerUsingPOST(lecturerResult: LecturerResult, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<boolean>>;
    public createLecturerUsingPOST(lecturerResult: LecturerResult, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<boolean>>;
    public createLecturerUsingPOST(lecturerResult: LecturerResult, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

        if (lecturerResult === null || lecturerResult === undefined) {
            throw new Error('Required parameter lecturerResult was null or undefined when calling createLecturerUsingPOST.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.post<boolean>(`${this.basePath}/api/lecturer/create`,
            lecturerResult,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * deleteLecturer
     *
     * @param codes codes
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteLecturerUsingPOST(codes: Array<string>, observe?: 'body', reportProgress?: boolean): Observable<boolean>;
    public deleteLecturerUsingPOST(codes: Array<string>, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<boolean>>;
    public deleteLecturerUsingPOST(codes: Array<string>, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<boolean>>;
    public deleteLecturerUsingPOST(codes: Array<string>, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

        if (codes === null || codes === undefined) {
            throw new Error('Required parameter codes was null or undefined when calling deleteLecturerUsingPOST.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.post<boolean>(`${this.basePath}/api/lecturer/delete`,
            codes,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * getLecturerResultList
     *
     * @param propertySearch propertySearch
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getLecturerResultListUsingPOST(propertySearch?: any, observe?: 'body', reportProgress?: boolean): Observable<SearchResultLecturerResult>;
    public getLecturerResultListUsingPOST(propertySearch?: any, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<SearchResultLecturerResult>>;
    public getLecturerResultListUsingPOST(propertySearch?: any, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<SearchResultLecturerResult>>;
    public getLecturerResultListUsingPOST(propertySearch?: any, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

        if (propertySearch === null || propertySearch === undefined) {
            propertySearch = {};
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.post<SearchResultLecturerResult>(`${this.basePath}/api/lecturer`,
            propertySearch,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * getLecturerResult
     *
     * @param code code
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getLecturerResultUsingGET(code: string, observe?: 'body', reportProgress?: boolean): Observable<LecturerResult>;
    public getLecturerResultUsingGET(code: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<LecturerResult>>;
    public getLecturerResultUsingGET(code: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<LecturerResult>>;
    public getLecturerResultUsingGET(code: string, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

        if (code === null || code === undefined) {
            throw new Error('Required parameter code was null or undefined when calling getLecturerResultUsingGET.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [];

        return this.httpClient.get<LecturerResult>(`${this.basePath}/api/lecturer/${encodeURIComponent(String(code))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * updateLecturer
     *
     * @param lecturerResult lecturerResult
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateLecturerUsingPUT(lecturerResult: LecturerResult, observe?: 'body', reportProgress?: boolean): Observable<boolean>;
    public updateLecturerUsingPUT(lecturerResult: LecturerResult, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<boolean>>;
    public updateLecturerUsingPUT(lecturerResult: LecturerResult, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<boolean>>;
    public updateLecturerUsingPUT(lecturerResult: LecturerResult, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

        if (lecturerResult === null || lecturerResult === undefined) {
            throw new Error('Required parameter lecturerResult was null or undefined when calling updateLecturerUsingPUT.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.put<boolean>(`${this.basePath}/api/lecturer/update`,
            lecturerResult,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
