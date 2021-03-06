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

import {SearchResultStudentResult} from '../model/searchResultStudentResult';
import {StudentResult} from '../model/studentResult';

import {BASE_PATH, COLLECTION_FORMATS} from '../variables';
import {Configuration} from '../configuration';


@Injectable()
export class StudentControllerService {

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
     * createStudent
     *
     * @param studentResult studentResult
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createStudentUsingPOST(studentResult: StudentResult, observe?: 'body', reportProgress?: boolean): Observable<boolean>;
    public createStudentUsingPOST(studentResult: StudentResult, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<boolean>>;
    public createStudentUsingPOST(studentResult: StudentResult, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<boolean>>;
    public createStudentUsingPOST(studentResult: StudentResult, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

        if (studentResult === null || studentResult === undefined) {
            throw new Error('Required parameter studentResult was null or undefined when calling createStudentUsingPOST.');
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

        return this.httpClient.post<boolean>(`${this.basePath}/api/student/create`,
            studentResult,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * deleteStudent
     *
     * @param codes codes
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteStudentUsingPOST(codes: Array<string>, observe?: 'body', reportProgress?: boolean): Observable<boolean>;
    public deleteStudentUsingPOST(codes: Array<string>, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<boolean>>;
    public deleteStudentUsingPOST(codes: Array<string>, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<boolean>>;
    public deleteStudentUsingPOST(codes: Array<string>, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

        if (codes === null || codes === undefined) {
            throw new Error('Required parameter codes was null or undefined when calling deleteStudentUsingPOST.');
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

        return this.httpClient.post<boolean>(`${this.basePath}/api/student/delete`,
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
     * getStudentResultList
     *
     * @param propertySearch propertySearch
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getStudentResultListUsingPOST(propertySearch?: any, observe?: 'body', reportProgress?: boolean): Observable<SearchResultStudentResult>;
    public getStudentResultListUsingPOST(propertySearch?: any, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<SearchResultStudentResult>>;
    public getStudentResultListUsingPOST(propertySearch?: any, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<SearchResultStudentResult>>;
    public getStudentResultListUsingPOST(propertySearch?: any, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

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

        return this.httpClient.post<SearchResultStudentResult>(`${this.basePath}/api/student`,
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
     * getStudentResult
     *
     * @param code code
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getStudentResultUsingGET(code: string, observe?: 'body', reportProgress?: boolean): Observable<StudentResult>;
    public getStudentResultUsingGET(code: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<StudentResult>>;
    public getStudentResultUsingGET(code: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<StudentResult>>;
    public getStudentResultUsingGET(code: string, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

        if (code === null || code === undefined) {
            throw new Error('Required parameter code was null or undefined when calling getStudentResultUsingGET.');
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

        return this.httpClient.get<StudentResult>(`${this.basePath}/api/student/${encodeURIComponent(String(code))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * updateStudent
     *
     * @param studentResult studentResult
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateStudentUsingPUT(studentResult: StudentResult, observe?: 'body', reportProgress?: boolean): Observable<boolean>;
    public updateStudentUsingPUT(studentResult: StudentResult, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<boolean>>;
    public updateStudentUsingPUT(studentResult: StudentResult, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<boolean>>;
    public updateStudentUsingPUT(studentResult: StudentResult, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

        if (studentResult === null || studentResult === undefined) {
            throw new Error('Required parameter studentResult was null or undefined when calling updateStudentUsingPUT.');
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

        return this.httpClient.put<boolean>(`${this.basePath}/api/student/update`,
            studentResult,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
