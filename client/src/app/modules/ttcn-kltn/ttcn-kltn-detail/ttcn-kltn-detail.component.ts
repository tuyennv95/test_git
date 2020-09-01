import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DocumentControllerService} from "../../../swagger/api/documentController.service";
import {FileManagerControllerService} from "../../../swagger/api/fileManagerController.service";
import {Observable} from "rxjs";
import {CommentControllerService} from "../../../swagger/api/commentController.service";
import {DocumentReviewControllerService} from "../../../swagger/api/documentReviewController.service";
import {XemTruocFileComponent} from "../xem-truoc-file/xem-truoc-file.component";
import {Globals} from "../../../base/globals";
import {NotificationFunction} from "../../../base/notification-function";

@Component({
    selector: 'ttcn-kltn-detail',
    templateUrl: './ttcn-kltn-detail.component.html',
    styleUrls: ['./ttcn-kltn-detail.component.scss']
})
export class TtcnKltnDetailComponent implements OnInit {
    documentId = null;
    documentDetail = null;
    files;
    comments;
    commentArr: any[];

    reviews;

    textComment;

    studentReview;

    @ViewChild(XemTruocFileComponent) xemTruocFileComponent: XemTruocFileComponent;

    @ViewChild('startVote') startVoteElf;

    userLogin = JSON.parse(localStorage.getItem('userLogin'));

    constructor(
        private route: ActivatedRoute,
        private documentControllerService: DocumentControllerService,
        private fileManagerControllerService: FileManagerControllerService,
        private commentControllerService: CommentControllerService,
        private documentReviewControllerService: DocumentReviewControllerService,
        private globals: Globals,
        private notificationFunction: NotificationFunction
    ) {
        this.documentId = this.route.snapshot.paramMap.get("id");
    }

    ngOnInit(): void {
        if (+this.userLogin.role === 3) {
            this.studentReview = {
                id: null,
                documentId: this.documentId,
                studentCode: this.userLogin.studentCode,
                like: false,
                favourite: false,
                starVote: 0
            }
        }

        let getDocumentDetail = this.documentControllerService.getDocumentUsingGET(this.documentId);
        let getFiles = this.fileManagerControllerService.getFileManagersListUsingPOST({
            'documentId': this.documentId
        });
        let comments = this.commentControllerService.getCommentByDocumentIdUsingGET(this.documentId);
        let reviews = this.documentReviewControllerService.getDocumentReviewsListUsingPOST({
            'documentId': this.documentId
        });

        Observable.forkJoin([getDocumentDetail, getFiles, comments, reviews]).subscribe(rs => {
            this.documentDetail = rs[0];
            this.files = rs[1];
            this.comments = rs[2];
            this.reviews = rs[3];

            if (this.comments) {
                this.commentArr = JSON.parse(this.comments.content);
            } else {
                this.commentArr = [];
                this.comments = {};
            }

            if (+this.userLogin.role === 3) {
                let tg = this.reviews.find(item => item.studentCode === this.userLogin.studentCode);
                if (tg) {
                    this.studentReview = tg;
                }
            }
        });
    }

    convertStringToArrayOfObject(content) {
        this.commentArr = [];

        if (content) {
            content.split(";").forEach(item => {
                this.commentArr.push(JSON.parse(item));
            });
        }

        return this.commentArr;
    }

    getTotalStar() {
        let totalStar = 0;
        let count = 0;
        this.reviews.forEach(item => {
            if (item.starVote > 0) {
                totalStar += item.starVote;
                count++;
            }
        });

        if (count === 0) return 0;

        return totalStar / count;
    }

    getLikes() {
        let totalLike = 0;
        this.reviews.forEach(item => {
            if (item.like) {
                totalLike += 1;
            }
        });

        return totalLike;
    }

    getFileName(path) {
        for (let i = path.length - 1; i >= 0; i--) {
            if (path[i] === '/') {
                return path.slice(i + 1, path.length);
            }
        }
    }

    onLike() {
        this.studentReview.like = !this.studentReview.like;

        if (this.studentReview.id) {
            this.documentReviewControllerService.updateDocumentReviewUsingPUT(this.studentReview).subscribe(result => {
            });
        } else {
            this.callCreateDocumentReview();
        }
    }

    onFavourite() {
        this.studentReview.favourite = !this.studentReview.favourite;

        if (this.studentReview.id) {
            this.documentReviewControllerService.updateDocumentReviewUsingPUT(this.studentReview).subscribe(result => {
            });
        } else {
            this.callCreateDocumentReview();
        }
    }

    onVoteStar(star) {
        this.startVoteElf.hide();
        this.studentReview.starVote = star;

        if (this.studentReview.id) {
            this.documentReviewControllerService.updateDocumentReviewUsingPUT(this.studentReview).subscribe(result => {
            });
        } else {
            this.callCreateDocumentReview();
        }
    }

    callCreateDocumentReview() {
        this.documentReviewControllerService.createDocumentReviewUsingPOST(this.studentReview).subscribe(result => {
            if (result) {
                this.documentReviewControllerService.getDocumentReviewsListUsingPOST({
                    'documentId': this.documentId
                }).subscribe(result2 => {
                    this.reviews = result2;
                    this.studentReview = this.reviews.find(item => item.studentCode === this.userLogin.studentCode);
                });
            }
        });
    }

    onDownload() {
        this.documentDetail.downloadsCount++;
    }

    onComment() {
        let item = {};
        if (+this.userLogin.role === 3) {
            item = {
                nguoi_dang: this.userLogin.firstName + " " + this.userLogin.lastName + " (" + this.userLogin.studentCode + ")",
                noi_dung: this.textComment,
                username: this.userLogin.studentCode,
                time_dang: this.globals.getDateNow()
            };
        } else if (+this.userLogin.role === 2) {
            item = {
                nguoi_dang: this.userLogin.title + ". " + this.userLogin.firstName + " " + this.userLogin.lastName +
                    " (" + this.userLogin.position + ")",
                noi_dung: this.textComment,
                username: this.userLogin.lecturerCode,
                time_dang: this.globals.getDateNow()
            };
        } else {
            item = {
                nguoi_dang: 'admin',
                noi_dung: this.textComment,
                username: this.userLogin.lecturerCode,
                time_dang: this.globals.getDateNow()
            };
        }

        this.commentArr.push(item);
        this.comments.content = JSON.stringify(this.commentArr);

        if (this.comments.id) {
            this.commentControllerService.updateCommentUsingPUT(this.comments).subscribe(result => {
                this.addNotification();
            });
        } else {
            this.comments.documentId = this.documentId;
            this.commentControllerService.createCommentUsingPOST(this.comments).subscribe(result => {
                this.addNotification();
            });
        }

        this.textComment = '';
    }

    addNotification() {
        let arrUsername = ['admin', this.documentDetail.lecturerCode];

        this.commentArr.forEach(item => {
            let a = arrUsername.find(i => i === item.username);

            if (item.username !== this.userLogin.studentCode && item.username !== this.userLogin.lecturerCode && !a) {
                arrUsername.push(item.username);
            }
        });

        this.notificationFunction.sendNotificationComment('/tai-lieu/detail/' + this.documentId, arrUsername, this.documentDetail.documentName);
    }

    removeComment(item) {
        let index = this.commentArr.findIndex(tg => tg === item);

        if (index) {
            this.commentArr.splice(index, 1);

            this.comments.content = JSON.stringify(this.commentArr);
            this.commentControllerService.updateCommentUsingPUT(this.comments).subscribe(result => {
            });
        }
    }
}
