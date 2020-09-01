import {Observable} from 'rxjs/Rx';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import * as moment from 'moment';
import {environment} from '../../environments/environment';

@Injectable()
export class UploadService {
    progress = new Subject();
    private processValue = 0;

    constructor() {
    }

    uploads(files: File[], documentId, lecturerCode): Observable<string> {
        let url = 'http://localhost:9999/api/file-manager/upload';

        return Observable.create(observer => {
            const formData: FormData = new FormData(),
                xhr: XMLHttpRequest = new XMLHttpRequest();

            for (let i = 0; i < files.length; i++) {
                formData.append('files', files[i]);
            }

            formData.append('document_id', documentId);
            formData.append('lecturer_code', lecturerCode);

            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        observer.next(xhr.response);
                        observer.complete();
                    } else {
                        observer.error(xhr.response);
                    }
                }
            };

            xhr.upload.onprogress = (event) => {
                this.processValue = Math.round(event.loaded / event.total * 100);
                this.progress.next(this.processValue);
            };

            xhr.open('POST', url, true);

            // const token = localStorage.getItem('cms_access_token');
            // xhr.setRequestHeader('Authorization', 'Bearer ' + token);

            // Time timeZone
            const offsetZone = environment.production ? moment().utcOffset() : 0;
            xhr.setRequestHeader('TimeZone', (offsetZone / 60).toString());

            xhr.send(formData);
        });
    }

    // upload danh sách sinh viên
    uploadStudent(file: File): Observable<string> {
        let url = 'http://localhost:9999/api/student/upload';
        return Observable.create(observer => {
            const formData: FormData = new FormData(),
                xhr: XMLHttpRequest = new XMLHttpRequest();

            formData.append('file', file);

            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        observer.next(xhr.response);
                        observer.complete();
                    } else {
                        observer.error(xhr.response);
                    }
                }
            };

            xhr.upload.onprogress = (event) => {
                this.processValue = Math.round(event.loaded / event.total * 100);
                this.progress.next(this.processValue);
            };

            xhr.open('POST', url, true);

            // const token = localStorage.getItem('cms_access_token');
            // xhr.setRequestHeader('Authorization', 'Bearer ' + token);

            // Time timeZone
            const offsetZone = environment.production ? moment().utcOffset() : 0;
            xhr.setRequestHeader('TimeZone', (offsetZone / 60).toString());

            xhr.send(formData);
        });
    }
}
