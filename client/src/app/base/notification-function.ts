import {NotificationControllerService} from "../swagger/api/notificationController.service";
import {Globals} from "./globals";
import {Notification} from "../swagger/model/notification";
import {Injectable} from "@angular/core";

@Injectable()
export class NotificationFunction {
    constructor(
        private notificationControllerService: NotificationControllerService,
        public globals: Globals) {
    }

    sendNotification(link, username, content, type) {
        let dateCreated = this.globals.getDateNow();

        this.notificationControllerService.getNotificationsListUsingPOST({
            'username': username,
            'link': link
        }).subscribe(result => {
            if (result[0]) {
                let item = result[0];
                item.dateCreated = dateCreated;
                item.status = 1;

                this.notificationControllerService.updateNotificationUsingPUT([item]).subscribe(result2 => {
                });
            } else {
                let notification: Notification = {
                    'link': link,
                    'username': username,
                    'dateCreated': dateCreated,
                    'content': content,
                    'status': 1,
                    'type': type
                };

                this.notificationControllerService.createNotificationUsingPOST([notification]).subscribe(result2 => {
                });
            }
        });
    }

    sendNotificationComment(link, usernames: any[], documentName) {
        let dateCreated = this.globals.getDateNow();

        this.notificationControllerService.getNotificationsListUsingPOST({
            'link': link
        }).subscribe(result => {
            result.forEach(item => {
                item.status = 1;
                item.dateCreated = dateCreated;
            });
            this.notificationControllerService.updateNotificationUsingPUT(result).subscribe(result2 => {
            });

            let arr = [];
            usernames.forEach(item => {
                let temp = result.find(i => i.username === item);
                if (!temp) {
                    arr.push({
                        'link': link,
                        'username': item,
                        'dateCreated': dateCreated,
                        'content': "Có bình luận mới từ tài liệu, đề tài: " + documentName,
                        'status': 1,
                        'type': 1
                    })
                }
            });
            this.notificationControllerService.createNotificationUsingPOST(arr).subscribe(result => {
            });
        });
    }
}
