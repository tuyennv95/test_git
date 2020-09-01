import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-client-template-notification',
    templateUrl: 'notification.component.html'
})
export class NotificationComponent implements OnInit {

    constructor(private messageService: MessageService) {
    }

    ngOnInit(): void {
    }

    showSuccess() {
        this.messageService.add({key: 'success-warn', severity: 'success', summary: 'Thành công', detail: 'Thông báo kết quả thành công của các thao tác'});
    }

    showWarn() {
        this.messageService.add({
            key: 'success-warn', severity: 'warn', summary: 'Cảnh báo', detail: 'Cảnh báo thao tác thực hiện làm thay đổi, ' +
                ' cập nhật dữ liệu tuy nhiên không nguy hiểm tới hệ thống'
        });
    }

    showError() {
        this.messageService.add({
            key: 'error', severity: 'error', summary: 'Có lỗi xảy ra', detail: 'Hành độc thông báo lỗi thao tác thực hiện có vấn đề nghiêm trọng ' +
                '\n\n10:00 - 07/05/-2019'
        });
    }
}
