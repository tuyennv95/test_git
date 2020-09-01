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

import {DocumentRequest} from '../model/documentRequest';
import {DocumentRequestResult} from '../model/documentRequestResult';
import {SearchResultDocumentRequestResult} from '../model/searchResultDocumentRequestResult';

import {BASE_PATH, COLLECTION_FORMATS} from '../variables';
import {Configuration} from '../configuration';


@Injectable()
export class DocumentRequestControllerService {

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
     * createDocumentRequest
     *
     * @param documentRequest documentRequest
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createDocumentRequestUsingPOST(documentRequest: DocumentRequestResult, observe?: 'body', reportProgress?: boolean): Observable<DocumentRequest>;
    public createDocumentRequestUsingPOST(documentRequest: DocumentRequestResult, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<DocumentRequest>>;
    public createDocumentRequestUsingPOST(documentRequest: DocumentRequestResult, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<DocumentRequest>>;
    public createDocumentRequestUsingPOST(documentRequest: DocumentRequestResult, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

        if (documentRequest === null || documentRequest === undefined) {
            throw new Error('Required parameter documentRequest was null or undefined when calling createDocumentRequestUsingPOST.');
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

        return this.httpClient.post<DocumentRequest>(`${this.basePath}/api/document-request/create`,
            documentRequest,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * deleteDocumentRequest
     *
     * @param ids ids
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteDocumentRequestUsingPOST(ids: Array<number>, observe?: 'body', reportProgress?: boolean): Observable<boolean>;
    public deleteDocumentRequestUsingPOST(ids: Array<number>, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<boolean>>;
    public deleteDocumentRequestUsingPOST(ids: Array<number>, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<boolean>>;
    public deleteDocumentRequestUsingPOST(ids: Array<number>, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

        if (ids === null || ids === undefined) {
            throw new Error('Required parameter ids was null or undefined when calling deleteDocumentRequestUsingPOST.');
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

        return this.httpClient.post<boolean>(`${this.basePath}/api/document-request/delete`,
            ids,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * getDocumentRequest
     *
     * @param id id
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getDocumentRequestUsingGET(id: number, observe?: 'body', reportProgress?: boolean): Observable<DocumentRequest>;
    public getDocumentRequestUsingGET(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<DocumentRequest>>;
    public getDocumentRequestUsingGET(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<DocumentRequest>>;
    public getDocumentRequestUsingGET(id: number, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling getDocumentRequestUsingGET.');
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

        return this.httpClient.get<DocumentRequest>(`${this.basePath}/api/document-request/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * getDocumentRequestsList
     *
     * @param propertySearch propertySearch
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getDocumentRequestsListUsingPOST(propertySearch?: any, observe?: 'body', reportProgress?: boolean): Observable<SearchResultDocumentRequestResult>;
    public getDocumentRequestsListUsingPOST(propertySearch?: any, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<SearchResultDocumentRequestResult>>;
    public getDocumentRequestsListUsingPOST(propertySearch?: any, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<SearchResultDocumentRequestResult>>;
    public getDocumentRequestsListUsingPOST(propertySearch?: any, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

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

        return this.httpClient.post<SearchResultDocumentRequestResult>(`${this.basePath}/api/document-request`,
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
     * updateDocumentRequest
     *
     * @param documentRequest documentRequest
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateDocumentRequestUsingPUT(documentRequest: DocumentRequestResult, observe?: 'body', reportProgress?: boolean): Observable<boolean>;
    public updateDocumentRequestUsingPUT(documentRequest: DocumentRequestResult, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<boolean>>;
    public updateDocumentRequestUsingPUT(documentRequest: DocumentRequestResult, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<boolean>>;
    public updateDocumentRequestUsingPUT(documentRequest: DocumentRequestResult, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

        if (documentRequest === null || documentRequest === undefined) {
            throw new Error('Required parameter documentRequest was null or undefined when calling updateDocumentRequestUsingPUT.');
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

        return this.httpClient.put<boolean>(`${this.basePath}/api/document-request/update`,
            documentRequest,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
