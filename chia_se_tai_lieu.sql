/*
SQLyog Ultimate v11.11 (64 bit)
MySQL - 5.5.5-10.1.22-MariaDB : Database - chia_se_tai_lieu
*********************************************************************
*/


/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`chia_se_tai_lieu` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `chia_se_tai_lieu`;

/*Table structure for table `comment` */

DROP TABLE IF EXISTS `comment`;

CREATE TABLE `comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` text,
  `date_updated` datetime(6) DEFAULT NULL,
  `document_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

/*Data for the table `comment` */

insert  into `comment`(`id`,`content`,`date_updated`,`document_id`) values (8,'[{\"nguoi_dang\":\"admin\",\"username\":\"admin\",\"noi_dung\":\"123\",\"time_dang\":\"2019-12-12 15:57:56\"},{\"nguoi_dang\":\"ThS. Vũ Thị Lưu (Giảng viên)\",\"noi_dung\":\"a\",\"username\":\"vtluu\",\"time_dang\":\"2019-12-12 15:58:7\"},{\"nguoi_dang\":\"Khúc Thị Huệ (596548)\",\"noi_dung\":\"bbbbbb\",\"username\":\"596548\",\"time_dang\":\"2019-12-12 15:58:22\"},{\"nguoi_dang\":\"Khúc Thị Huệ (596548)\",\"noi_dung\":\"i\",\"username\":\"596548\",\"time_dang\":\"2019-12-12 15:59:51\"},{\"nguoi_dang\":\"admin\",\"username\":\"admin\",\"noi_dung\":\"67\",\"time_dang\":\"2019-12-12 16:9:12\"},{\"nguoi_dang\":\"ThS. Vũ Thị Lưu (Giảng viên)\",\"noi_dung\":\"444\",\"username\":\"vtluu\",\"time_dang\":\"2019-12-12 16:9:33\"}]',NULL,1),(9,'[{\"nguoi_dang\":\"admin\",\"username\":\"admin\",\"noi_dung\":\"yu\",\"time_dang\":\"2019-12-12 16:16:29\"},{\"nguoi_dang\":\"ThS. Vũ Thị Lưu (Giảng viên)\",\"noi_dung\":\"23\",\"username\":\"vtluu\",\"time_dang\":\"2019-12-12 16:16:58\"},{\"nguoi_dang\":\"admin\",\"username\":\"admin\",\"noi_dung\":\"34\",\"time_dang\":\"2019-12-12 16:17:39\"}]',NULL,20),(10,'[{\"nguoi_dang\":\"Khúc Thị Huệ (596548)\",\"noi_dung\":\"em cảm ơn thầy(cô)\",\"username\":\"596548\",\"time_dang\":\"2019-12-13 15:11:18\"},{\"nguoi_dang\":\"admin\",\"username\":\"admin\",\"noi_dung\":\"chúc em học tập tốt\",\"time_dang\":\"2019-12-13 15:12:38\"}]',NULL,27),(11,'[{\"nguoi_dang\":\"Khúc Thị Huệ (596548)\",\"noi_dung\":\"cảm ơn thầy(cô)\",\"username\":\"596548\",\"time_dang\":\"2019-12-13 15:15:20\"}]',NULL,28);

/*Table structure for table `department` */

DROP TABLE IF EXISTS `department`;

CREATE TABLE `department` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `department_code` varchar(255) DEFAULT NULL,
  `department_name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

/*Data for the table `department` */

insert  into `department`(`id`,`department_code`,`department_name`,`description`) values (1,'KHMT','Khoa học máy tính',NULL),(2,'CNPM','Công nghệ phần mềm',NULL),(3,'T','Toán',NULL),(4,'TTUD','Toán - Tin ứng dụng',NULL),(5,'VL','Vật lý',NULL);

/*Table structure for table `document` */

DROP TABLE IF EXISTS `document`;

CREATE TABLE `document` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date_created` datetime(6) DEFAULT NULL,
  `date_updated` datetime(6) DEFAULT NULL,
  `department_id` int(11) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `keyword` text,
  `document_name` varchar(255) DEFAULT NULL,
  `topic_type` int(11) DEFAULT NULL,
  `document_type` int(11) DEFAULT NULL,
  `downloads_count` int(11) DEFAULT NULL,
  `is_copyright_warning` bit(1) DEFAULT NULL,
  `lecturer_code` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `subject_id` int(11) DEFAULT NULL,
  `user_created` varchar(255) DEFAULT NULL,
  `user_updated` varchar(255) DEFAULT NULL,
  `views_count` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8;

/*Data for the table `document` */

insert  into `document`(`id`,`date_created`,`date_updated`,`department_id`,`description`,`keyword`,`document_name`,`topic_type`,`document_type`,`downloads_count`,`is_copyright_warning`,`lecturer_code`,`status`,`subject_id`,`user_created`,`user_updated`,`views_count`) values (27,'2019-12-13 07:33:32.000000','2019-12-14 02:11:16.000000',1,'Tài liệu dành cho những sinh viên học tập hoặc tìm hiểu về môn học tin cơ sở. Tài liệu được soạn và sắp xếp theo các chương giúp sinh viên có thể nắm được kiến thức về môn học một cách dễ dàng và có trình tự','bộ nhớ trong, bộ nhớ ngoài','Bài giảng môn học tin cơ sở',1,1,1,'\0','KHMT10',3,23,'KHMT10',NULL,15),(28,'2019-12-13 07:37:33.000000','2019-12-13 07:43:28.000000',1,'Sách dành cho những sinh viên học tập hoặc tìm hiểu về môn học tin cơ sở. ','Sách tham khảo tin cơ sở','Sách tham khảo môn tin học cơ sở',1,2,0,'','KHMT10',3,23,'KHMT10',NULL,5),(29,'2019-12-13 07:42:27.000000','2019-12-13 08:08:32.000000',1,'Tài liệu dành cho những sinh viên học tập hoặc tìm hiểu về môn thiết kế giao diện web. Tài liệu được soạn và sắp xếp theo các chương giúp sinh viên có thể nắm được kiến thức về môn học một cách dễ dàng và có trình tự','thiết kế giao diện web','Bài giảng thiết kế giao diện web',1,4,0,'\0','KHMT10',3,44,'KHMT10',NULL,3),(30,'2019-12-13 07:57:51.000000','2019-12-14 02:04:43.000000',1,'Tài liệu dành cho những sinh viên học tập hoặc tìm hiểu về môn Mạng máy tính. Tài liệu được soạn và sắp xếp theo các chương giúp sinh viên có thể nắm được kiến thức về môn học một cách dễ dàng và có trình tự','mạng máy tính','Giáo trình môn học mạng máy tính',1,1,0,'\0','KHMT03',3,38,'KHMT03',NULL,0),(31,'2019-12-13 08:00:19.000000','2019-12-13 08:07:49.000000',1,'Tài liệu giúp sinh thực hành trong môn học Mạng máy tính, sinh viên đọc và làm theo các bước trong tài liệu','mạng máy tính','Tài liệu hỗ trợ thực hành môn Mạng máy tính',1,3,0,'\0','KHMT03',3,38,'KHMT03',NULL,0),(32,'2019-12-13 08:01:47.000000',NULL,1,'Tài liệu dành cho những sinh viên học tập hoặc tìm hiểu về môn học Mạng máy tính. Tài liệu được soạn và sắp xếp theo các chương giúp sinh viên có thể nắm được kiến thức về môn học một cách dễ dàng và có trình tự','sách mạng máy tính','Sách tham khảo môn Mạng máy tính',1,2,0,'\0','KHMT03',2,38,'KHMT03',NULL,0),(33,'2019-12-13 08:02:41.000000','2019-12-13 08:07:54.000000',1,'Tài liệu dành cho những sinh viên học tập hoặc tìm hiểu về môn học phân tích thiết kế hệ thống. Tài liệu được soạn và sắp xếp theo các chương giúp sinh viên có thể nắm được kiến thức về môn học một cách dễ dàng và có trình tự','hân tích thiết kế hệ thống','Giáo trình môn học Phân tích thiết kế hệ thống',1,1,1,'\0','KHMT05',3,35,'KHMT05',NULL,1),(34,'2019-12-13 08:05:50.000000','2019-12-13 08:08:06.000000',2,'Tài liệu dành cho những sinh viên học tập hoặc tìm hiểu về môn học Kỹ thuật lập trình. Tài liệu được soạn và sắp xếp theo các chương giúp sinh viên có thể nắm được kiến thức về môn học một cách dễ dàng và có trình tự','lập trình','Bài giảng kỹ thuật lập trình',1,4,0,'\0','CNPM01',3,25,'CNPM01',NULL,0),(35,'2019-12-13 08:07:37.000000',NULL,2,'Sinh viên đọc và tìm hiểu để có cái nhìn rõ hơn về môn học quản lý dự án ','Quản lý dự án ','Sách thảm khảo môn học Quản lý dự án ',1,2,0,'','CNPM01',2,33,'CNPM01',NULL,0),(36,'2019-12-13 08:21:10.000000','2019-12-13 09:17:22.000000',1,'Sinh viên thực hiện:\n596645 - Nguyễn Văn Tuyên - K59THB\n596653 - Nguyễn Văn Nam - K59QLTT\n*****\nđề tài tìm hiểu về lập trình mobile với IOS','ios','Tìm hiểu về lập trình IOS',2,1,0,'','KHMT10',3,0,'KHMT10',NULL,4),(37,'2019-12-13 08:23:06.000000','2019-12-13 08:25:19.000000',1,'Sinh viên thực hiện: \n596645 - Nguyễn Văn Tuyên \n***** \nxây dựng website bán hàng với HTML/CSS/JS PHP và MySql , hỗ trợ 2 nhóm người khác mua và người quản trị','web bán hàng với PHP','xây dựng website bán hàng với PHP',2,2,0,'\0','KHMT10',3,0,'KHMT10',NULL,1),(38,'2019-12-13 09:11:48.000000','2019-12-13 09:17:40.000000',1,'Sinh viên thực hiện: 596653 - Nguyễn Văn Nam - K59QLTT ***** đề tài nhận diện biển số xe với các thuật toán trong xử lý ảnh','Nhận diện biển số xe với xử lý ảnh','Nhận diện biển số xe với xử lý ảnh',2,2,0,'\0','KHMT09',3,0,'KHMT09',NULL,1),(39,'2019-12-13 09:19:19.000000','2019-12-13 09:21:52.000000',2,'Sinh viên thực hiện: 596645 - Nguyễn Văn Tuyên - K59THB  ***** đề tài tìm hiểu về framework Spring MVC và làm website bán hàng để demo','spring mvc','Tìm hiểu về Spring MVC',2,2,0,'\0','CNPM06',3,0,'CNPM06',NULL,0),(40,'2019-12-13 09:20:21.000000','2019-12-13 09:21:59.000000',2,'Sinh viên thực hiện: 596645 - Nguyễn Văn Tiến - K59THB 596653 - Tạ Thị Loan - K59QLTT ***** đề tài tìm hiểu về test tự động','test tự động','Tìm hiểu Test tự động',2,1,0,'\0','CNPM06',3,0,'CNPM06',NULL,0),(41,'2019-12-13 09:21:39.000000',NULL,2,'Sinh viên thực hiện: 596645 - Nguyễn Tiến Đại - K59THB 596653 - Vũ Thị Liên - K59QLTT ***** đề tài tìm hiểu về csdl noSQl','nosql','Tìm hiểu về NoSql',2,1,0,'\0','CNPM04',2,0,'CNPM04',NULL,0);

/*Table structure for table `document_request` */

DROP TABLE IF EXISTS `document_request`;

CREATE TABLE `document_request` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `comment` varchar(255) DEFAULT NULL,
  `request` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `student_code` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

/*Data for the table `document_request` */

insert  into `document_request`(`id`,`comment`,`request`,`status`,`student_code`,`title`) values (13,NULL,'Kính thưa thầy(cô), em có tim trên hệ thống nhưng không thấy có bài giảng môn lập trình java, mong thầy(cô) sớm bổ sung thêm ạ',3,'596548','Bài giảng môn lập trình Java'),(14,NULL,'Kính thưa thầy(cô), em có tim trên hệ thống nhưng không thấy có đề thi thử môn toán cao cấp, mong thầy(cô) sớm bổ sung thêm ạ',2,'596548','Đề thi thử môn toán cao cấo');

/*Table structure for table `document_review` */

DROP TABLE IF EXISTS `document_review`;

CREATE TABLE `document_review` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `document_id` int(11) DEFAULT NULL,
  `is_favourite` bit(1) DEFAULT NULL,
  `is_like` bit(1) DEFAULT NULL,
  `star_vote` float DEFAULT NULL,
  `student_code` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

/*Data for the table `document_review` */

insert  into `document_review`(`id`,`document_id`,`is_favourite`,`is_like`,`star_vote`,`student_code`) values (16,27,'','',4.5,'596548'),(17,29,'','',0,'596548');

/*Table structure for table `file_manager` */

DROP TABLE IF EXISTS `file_manager`;

CREATE TABLE `file_manager` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `document_id` int(11) DEFAULT NULL,
  `file` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8;

/*Data for the table `file_manager` */

insert  into `file_manager`(`id`,`document_id`,`file`) values (37,27,'/services_api/src/main/public/KHMT10/27/chuong_1.ppt'),(38,27,'/services_api/src/main/public/KHMT10/27/chuong_2.ppt'),(39,27,'/services_api/src/main/public/KHMT10/27/chuong_3.ppt'),(40,27,'/services_api/src/main/public/KHMT10/27/chuong_4.ppt'),(41,27,'/services_api/src/main/public/KHMT10/27/chuong_5.ppt'),(42,27,'/services_api/src/main/public/KHMT10/27/chuong_6.ppt'),(43,28,'/services_api/src/main/public/KHMT10/28/tin_hoc_co_so.pdf'),(44,29,'/services_api/src/main/public/KHMT10/29/chuong_1.ppt'),(45,29,'/services_api/src/main/public/KHMT10/29/chuong_2.ppt'),(46,29,'/services_api/src/main/public/KHMT10/29/chuong_3.ppt'),(47,29,'/services_api/src/main/public/KHMT10/29/chuong_4.ppt'),(48,30,'/services_api/src/main/public/KHMT03/30/chuong_1.ppt'),(49,30,'/services_api/src/main/public/KHMT03/30/chuong_2.ppt'),(50,30,'/services_api/src/main/public/KHMT03/30/chuong_3.ppt'),(51,30,'/services_api/src/main/public/KHMT03/30/chuong_4.ppt'),(52,30,'/services_api/src/main/public/KHMT03/30/chuong_5.ppt'),(53,31,'/services_api/src/main/public/KHMT03/31/tai_lieu_thuc_hanh.pdf'),(54,32,'/services_api/src/main/public/KHMT03/32/sach_mang_may_tinh.pdf'),(55,33,'/services_api/src/main/public/KHMT05/33/chuong_1.ppt'),(56,33,'/services_api/src/main/public/KHMT05/33/chuong_2.ppt'),(57,33,'/services_api/src/main/public/KHMT05/33/chuong_3.ppt'),(58,33,'/services_api/src/main/public/KHMT05/33/chuong_4.ppt'),(59,34,'/services_api/src/main/public/CNPM01/34/chuong_1.ppt'),(60,34,'/services_api/src/main/public/CNPM01/34/chuong_2.ppt'),(61,34,'/services_api/src/main/public/CNPM01/34/chuong_3.ppt'),(62,34,'/services_api/src/main/public/CNPM01/34/chuong_4.ppt'),(63,34,'/services_api/src/main/public/CNPM01/34/chuong_5.ppt'),(64,35,'/services_api/src/main/public/CNPM01/35/sach_tham_khao.pdf'),(65,36,'/services_api/src/main/public/KHMT10/36/de_cuong.docx'),(66,37,'/services_api/src/main/public/KHMT10/37/sach_tham_khao.pdf'),(67,37,'/services_api/src/main/public/KHMT10/37/de_cuong.docx'),(68,38,'/services_api/src/main/public/KHMT09/38/de_cuong.docx'),(69,38,'/services_api/src/main/public/KHMT09/38/project.rar'),(70,39,'/services_api/src/main/public/CNPM06/39/bao-cao.docx'),(71,39,'/services_api/src/main/public/CNPM06/39/de_cuong.docx'),(72,39,'/services_api/src/main/public/CNPM06/39/file_example_PPT_250kB.ppt'),(73,39,'/services_api/src/main/public/CNPM06/39/login_logout.asta'),(74,39,'/services_api/src/main/public/CNPM06/39/maxresdefault.jpg'),(75,39,'/services_api/src/main/public/CNPM06/39/project.rar'),(76,41,'/services_api/src/main/public/CNPM04/41/file_example_PPT_250kB.ppt');

/*Table structure for table `hibernate_sequence` */

DROP TABLE IF EXISTS `hibernate_sequence`;

CREATE TABLE `hibernate_sequence` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `hibernate_sequence` */

insert  into `hibernate_sequence`(`next_val`) values (1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1);

/*Table structure for table `lecturer` */

DROP TABLE IF EXISTS `lecturer`;

CREATE TABLE `lecturer` (
  `lecturer_code` varchar(255) NOT NULL,
  `department_id` int(11) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `position` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`lecturer_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `lecturer` */

insert  into `lecturer`(`lecturer_code`,`department_id`,`description`,`position`,`title`) values ('admin',0,NULL,'admin','admin'),('CNPM01',2,NULL,'Giảng viên/Trưởng Bộ môn','ThS'),('CNPM02',2,NULL,'Giảng viên/Phó Bộ môn','ThS'),('CNPM03',2,NULL,'Giảng viên','ThS'),('CNPM04',2,NULL,'Giảng viên','ThS'),('CNPM05',2,NULL,'Giảng viên','ThS'),('CNPM06',2,NULL,'Giảng Viên','ThS'),('CNPM07',2,NULL,'Giảng viên','ThS'),('CNPM08',2,NULL,'Giảng viên','ThS'),('KHMT01',1,NULL,'Phó giám đốc TT Ngoại ngữ và đào tạo quốc tế','TS'),('KHMT02',1,NULL,'Giảng viên','ThS'),('KHMT03',1,NULL,'Phó trưởng khoa/PBT Chi bộ','TS'),('KHMT04',1,NULL,'Giảng viên','TS'),('KHMT05',1,NULL,'Giảng viên','TS'),('KHMT06',1,NULL,'Giảng viên','ThS'),('KHMT07',1,NULL,'Giảng viên','ThS'),('KHMT08',1,NULL,'Giảng viên','ThS'),('KHMT09',1,NULL,'Phó trưởng bộ môn','ThS'),('KHMT10',1,NULL,'Giảng viên','ThS'),('KHMT11',1,NULL,'Giảng viên','ThS'),('KHMT12',1,NULL,'Trưởng bộ môn','PGS TS, GVC'),('KHMT13',1,NULL,'Giảng viên','Cử nhân'),('TOAN01',3,NULL,'Trưởng bộ môn/Giảng viên','TS'),('TOAN02',3,NULL,'Phó bộ môn/Giảng viên','TS'),('TOAN03',3,NULL,'Giảng viên','ThS'),('TOAN04',3,NULL,'Giảng viên','ThS'),('TOAN05',3,NULL,'Giảng viên','TS'),('TOAN06',3,NULL,'Giảng viên','ThS'),('TOAN07',3,NULL,'Giảng viên','ThS'),('TOAN08',3,NULL,'Giảng viên','ThS'),('TOAN09',3,NULL,'Giảng viên','TS'),('TOAN10',3,NULL,'Giảng viên','TS'),('TOAN11',3,NULL,'Giảng viên','ThS'),('TOAN12',3,NULL,'Giảng viên','ThS'),('TOAN13',3,NULL,'Giảng viên','ThS'),('TOAN14',3,NULL,'Giảng viên','ThS'),('TOTI01',4,NULL,'Giảng Viên','PGS.TS'),('TOTI02',4,NULL,'Giảng Viên','TS'),('TOTI03',4,NULL,'Phó bộ môn/Giảng viên','TS'),('TOTI04',4,NULL,'Trưởng bộ môn/Giảng viên','TS'),('TOTI05',4,NULL,'Giảng viên','ThS'),('TOTI06',4,NULL,'Giảng viên','ThS'),('TOTI07',4,NULL,'Giảng viên','ThS'),('TOTI08',4,NULL,'Giảng viên','ThS'),('TOTI09',4,NULL,'Giảng viên','ThS'),('TOTI10',4,NULL,'Giảng viên','ThS'),('VALY01',5,NULL,'Giảng Viên','ThS'),('VALY02',5,NULL,'Giảng Viên/Phó trưởng BM','ThS'),('VALY03',5,NULL,'Giảng Viên/Trưởng BM','TS'),('VALY04',5,NULL,'Giảng viên','ThS'),('VALY05',5,NULL,'Giảng viên','ThS'),('VALY06',5,NULL,'Giảng viên','ThS'),('VALY07',5,NULL,'Giảng viên','ThS'),('VALY08',5,NULL,'Giảng viên','ThS'),('VALY09',5,NULL,'Kỹ thuật viên','KS');

/*Table structure for table `lecturer_subject` */

DROP TABLE IF EXISTS `lecturer_subject`;

CREATE TABLE `lecturer_subject` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `lecturer_code` varchar(255) DEFAULT NULL,
  `subject_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=261 DEFAULT CHARSET=utf8;

/*Data for the table `lecturer_subject` */

insert  into `lecturer_subject`(`id`,`lecturer_code`,`subject_id`) values (6,'ltnhung',4),(7,'ncthang',4),(8,'ncdinh',12),(9,'ntkhuong',12),(94,'TOTI01',16),(95,'TOTI02',16),(96,'TOTI03',16),(97,'TOTI04',16),(102,'TOTI08',7),(103,'TOTI09',7),(104,'TOTI10',7),(108,'TOTI06',9),(109,'TOTI07',9),(110,'TOTI08',9),(111,'TOTI03',13),(112,'TOTI04',13),(113,'TOTI05',13),(114,'TOTI02',3),(115,'TOTI03',3),(116,'TOTI05',3),(117,'TOTI01',8),(118,'TOTI02',8),(119,'TOTI03',8),(120,'TOTI02',17),(121,'TOTI03',17),(122,'TOTI04',17),(123,'TOTI04',21),(124,'TOTI05',21),(125,'TOTI09',21),(126,'TOTI01',22),(127,'TOTI02',22),(128,'TOTI03',22),(129,'TOTI06',22),(130,'CNPM01',23),(131,'CNPM02',23),(132,'CNPM03',23),(133,'KHMT08',23),(134,'KHMT10',23),(135,'CNPM01',24),(136,'CNPM02',24),(137,'CNPM03',24),(138,'CNPM01',25),(139,'CNPM02',25),(140,'CNPM03',25),(141,'CNPM04',25),(142,'CNPM01',26),(143,'CNPM02',27),(144,'CNPM04',27),(145,'CNPM05',27),(146,'CNPM06',27),(147,'CNPM02',28),(148,'CNPM04',28),(149,'CNPM05',28),(150,'CNPM06',28),(151,'CNPM03',29),(152,'CNPM04',29),(153,'CNPM05',29),(154,'CNPM06',29),(155,'CNPM06',30),(156,'CNPM03',31),(157,'CNPM04',31),(158,'CNPM05',31),(159,'CNPM02',32),(160,'CNPM03',32),(161,'CNPM04',32),(162,'CNPM05',32),(163,'CNPM06',32),(164,'CNPM01',33),(165,'CNPM04',33),(166,'CNPM06',33),(167,'KHMT02',34),(168,'KHMT03',34),(169,'KHMT04',34),(170,'KHMT03',35),(171,'KHMT04',35),(172,'KHMT05',35),(173,'KHMT06',35),(174,'CNPM04',36),(175,'KHMT02',36),(176,'KHMT04',36),(177,'KHMT07',36),(178,'KHMT08',36),(179,'KHMT03',37),(180,'KHMT08',37),(181,'KHMT09',37),(182,'KHMT03',38),(183,'KHMT06',39),(184,'KHMT08',39),(185,'KHMT08',40),(186,'KHMT09',40),(187,'KHMT03',41),(188,'KHMT08',42),(189,'KHMT09',42),(190,'KHMT12',42),(196,'KHMT01',43),(197,'KHMT06',43),(198,'KHMT07',43),(199,'KHMT08',43),(200,'KHMT09',43),(206,'VALY01',45),(207,'VALY02',45),(208,'VALY03',45),(209,'VALY04',45),(210,'VALY05',45),(211,'VALY06',45),(212,'VALY07',45),(213,'VALY03',46),(214,'VALY04',46),(215,'VALY05',46),(216,'VALY06',46),(217,'VALY07',46),(218,'VALY08',46),(219,'TOAN02',47),(220,'TOAN03',47),(221,'TOAN04',47),(222,'TOAN07',47),(223,'TOAN08',47),(224,'TOAN09',47),(225,'TOAN05',48),(226,'TOAN08',48),(227,'TOAN11',48),(228,'TOAN12',48),(229,'TOAN01',49),(230,'TOAN02',49),(231,'TOAN07',49),(232,'TOAN08',49),(233,'TOAN09',49),(241,'TOAN01',50),(242,'TOAN02',50),(243,'TOAN05',50),(244,'TOAN06',50),(245,'TOAN07',50),(246,'TOAN10',50),(247,'TOAN11',50),(248,'TOAN01',51),(249,'TOAN02',51),(250,'TOAN04',51),(251,'TOAN05',51),(252,'TOAN07',51),(253,'TOAN08',51),(254,'TOAN10',51),(255,'CNPM04',44),(256,'CNPM06',44),(257,'KHMT02',44),(258,'KHMT07',44),(259,'KHMT08',44),(260,'KHMT10',44);

/*Table structure for table `notification` */

DROP TABLE IF EXISTS `notification`;

CREATE TABLE `notification` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` text,
  `date_created` varchar(255) DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;

/*Data for the table `notification` */

insert  into `notification`(`id`,`content`,`date_created`,`link`,`status`,`type`,`username`) values (7,'Có tài liệu cần duyệt','2019-12-13 15:7:37','/tai-lieu',0,4,'admin'),(8,'Có đề tài cần duyệt','2019-12-13 16:21:39','/de-tai-ttcn-kltn',1,4,'admin'),(9,'Admin đã duyệt một số tài liệu của bạn','2019-12-12 13:54:48','/tai-lieu',1,2,'tthieu'),(10,'Admin đã duyệt một số yêu cầu tài liệu của bạn','2019-12-13 11:17:27','/danh-sach-yeu-cau',1,3,'596548'),(11,'Admin đã duyệt một số đề tài của bạn','2019-12-12 13:55:55','/de-tai-ttcn-kltn',1,2,'vtluu'),(12,'Có sinh viên yêu cầu tài liệu','2019-12-13 11:16:13','/danh-sach-yeu-cau',0,5,'admin'),(18,'Admin đã duyệt một số tài liệu của bạn','2019-12-13 15:8:32','/tai-lieu',0,2,'KHMT10'),(19,'Admin đã duyệt một số tài liệu của bạn','2019-12-14 9:4:43','/tai-lieu',1,2,'KHMT03'),(20,'Admin đã duyệt một số tài liệu của bạn','2019-12-13 15:7:54','/tai-lieu',1,2,'KHMT05'),(21,'Admin đã duyệt một số tài liệu của bạn','2019-12-13 15:8:6','/tai-lieu',1,2,'CNPM01'),(22,'Có bình luận mới từ tài liệu, đề tài: Bài giảng môn học tin cơ sở','2019-12-14 9:8:3','/tai-lieu/detail/27',1,1,'596548'),(23,'Có bình luận mới từ tài liệu, đề tài: Sách tham khảo môn tin học cơ sở','2019-12-13 15:15:20','/tai-lieu/detail/28',0,1,'admin'),(24,'Có bình luận mới từ tài liệu, đề tài: Sách tham khảo môn tin học cơ sở','2019-12-13 15:15:20','/tai-lieu/detail/28',1,1,'KHMT10'),(25,'Admin đã duyệt một số đề tài của bạn','2019-12-13 15:25:19','/de-tai-ttcn-kltn',1,2,'KHMT10'),(26,'Admin đã duyệt một số đề tài của bạn','2019-12-13 16:17:40','/de-tai-ttcn-kltn',1,2,'KHMT09'),(27,'Admin đã duyệt một số đề tài của bạn','2019-12-13 16:21:59','/de-tai-ttcn-kltn',1,2,'CNPM06'),(28,'Có bình luận mới từ tài liệu, đề tài: Bài giảng môn học tin cơ sở','2019-12-14 9:8:3','/tai-lieu/detail/27',0,1,'admin'),(29,'Có bình luận mới từ tài liệu, đề tài: Bài giảng môn học tin cơ sở','2019-12-14 9:8:3','/tai-lieu/detail/27',0,1,'KHMT10');

/*Table structure for table `rangee` */

DROP TABLE IF EXISTS `rangee`;

CREATE TABLE `rangee` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `department_id` int(11) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `range_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

/*Data for the table `rangee` */

insert  into `rangee`(`id`,`department_id`,`description`,`range_name`) values (1,2,'','Công nghệ phần mềm'),(2,4,'','Hệ thống thông tin'),(3,4,NULL,'An toàn thông tin'),(4,1,NULL,'Mạng máy tính và Web');

/*Table structure for table `student` */

DROP TABLE IF EXISTS `student`;

CREATE TABLE `student` (
  `student_code` varchar(255) NOT NULL,
  `class_code` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`student_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `student` */

insert  into `student`(`student_code`,`class_code`) values ('596548','K59THB'),('596549','K59THB'),('596550','K59THB'),('596551','K59THB'),('596552','K59THB'),('596553','K59THB'),('596558','K59THB'),('596561','K59THB'),('596563','K59THB'),('596569','K59THB'),('596570','K59THB'),('596571','K59THB'),('596572','K59THB'),('596573','K59THB'),('596575','K59THB'),('596578','K59THB'),('596652','K59THB'),('596752','K59THB'),('599054','K59THB'),('599056','K59THB');

/*Table structure for table `subject` */

DROP TABLE IF EXISTS `subject`;

CREATE TABLE `subject` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `department_id` int(11) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `range_ids` varchar(255) DEFAULT NULL,
  `subject_code` varchar(255) DEFAULT NULL,
  `subject_name` varchar(255) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8;

/*Data for the table `subject` */

insert  into `subject`(`id`,`department_id`,`description`,`range_ids`,`subject_code`,`subject_name`,`type`) values (3,4,'','1,2','TH04001','Giải tích 1',1),(7,4,NULL,'','TH04002','Đại số tuyến tính',1),(8,4,NULL,'','TH04003',' Giải tích 2',1),(9,4,NULL,'','TH04004','Xác suất thống kê',1),(13,4,NULL,'2,3','TH04005','Toán rời rạc',2),(16,4,NULL,'3','TH05006','Tối ưu hóa',3),(17,4,NULL,'','TH04007',' Vận trù học',3),(21,4,NULL,'','TH04008','Quản lý chuỗi cung ứng',2),(22,4,NULL,'3','TH04009','Quản lý chuỗi cung ứng',3),(23,2,NULL,'1,2,3,4','TH02001','Tin học cơ sở',1),(24,2,NULL,'1,2','TH02002','Độ phức tạp thuật toán',2),(25,2,NULL,'','TH02003','Kỹ thuật lập trình',2),(26,2,NULL,'','TH02004','Cấu trúc dữ liệu và giải thuật',3),(27,2,NULL,'','TH02005','Cơ sở dữ liệu',3),(28,2,NULL,'1,2','TH02006','Nhập môn Công nghệ phần mềm',2),(29,2,NULL,'1,4','TH02007','Phát triển ứng dụng web',3),(30,2,NULL,'','TH02008','Lập trình JAVA',3),(31,2,NULL,'1','TH02009','Thương mại điện tử',3),(32,2,NULL,'1,4','TH02009','Lập trình hướng đối tượng',3),(33,2,NULL,'1,4','TH02010','Quản lý dự án phần mềm',3),(34,1,NULL,'2','TH01001','Kiến trúc máy tính và Vi xử lý',2),(35,1,NULL,'2','TH01002','Phân tích và thiết kế hệ thống',3),(36,1,NULL,'','TH01003','Nguyên lý hệ điều hành',2),(37,1,NULL,'2,3','TH01004','Chương trình dịch',3),(38,1,NULL,'2,4','TH01005','Mạng máy tính',3),(39,1,NULL,'2,3','TH01006','An toàn thông tin',3),(40,1,NULL,'2,4','TH01007','Trí tuệ nhân tạo',3),(41,1,NULL,'4','TH01008','Quản trị mạng',3),(42,1,NULL,'','TH01009','Khai phá dữ liệu',3),(43,1,NULL,'2','TH01010','Xử lý ảnh',3),(44,1,NULL,'4','TH01011','Thiết kế giao diện web',3),(45,5,NULL,'','TH05001','Vật lý đại cương A1',1),(46,5,NULL,'','TH05002','Vật lý đại cương A2',1),(47,3,NULL,'','TH03001','Toán cao cấp',1),(48,3,NULL,'','TH03002','Toán cao cấp 1',1),(49,3,NULL,'','TH03003','Toán cao cấp 2',1),(50,3,NULL,'1,2','TH03004','Thống kê ứng dụng trong KHNN',3),(51,3,NULL,'1,2','TH03005','XSTK ứng dụng trong KHNN',3);

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `username` varchar(255) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `birthday` datetime(6) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `gender` int(11) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `role` int(11) DEFAULT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `user` */

insert  into `user`(`username`,`address`,`birthday`,`email`,`first_name`,`gender`,`last_name`,`password`,`phone_number`,`role`) values ('596548','',NULL,'','Khúc Thị',2,'Huệ','123','',3),('596549','',NULL,'','Lê Thành',2,'Huy','123','',3),('596550','',NULL,'','Nguyễn Quang',1,'Huy','123','',3),('596551','',NULL,'','Nguyễn Xuân',1,'Huy','123','',3),('596552','',NULL,'','Nguyễn Thị',2,'Huyền','123','',3),('596553','',NULL,'','Nguyễn Thị Thanh',2,'Huyền','123','',3),('596558','',NULL,'','Nguyễn Bảo',1,'Khánh','123','',3),('596561','',NULL,'','Trần Hải',1,'Khôi','123','',3),('596563','',NULL,'','Nguyễn Văn',1,'Khuyến','123','',3),('596569','',NULL,'','Lê Văn',1,'Linh','123','',3),('596570','',NULL,'','Trần Thùy',2,'Linh','123','',3),('596571','',NULL,'','Lê Văn',1,'Long','123','',3),('596572','',NULL,'','Nguyễn Thành',1,'Long','123','',3),('596573','',NULL,'','Nguyễn Văn',1,'Long','123','',3),('596575','',NULL,'','Đoàn Thị',2,'Lý','123','',3),('596578','',NULL,'','Nguyễn Văn',1,'Mạnh','123','',3),('596652','',NULL,'','Trần Quốc',2,'Khánh','123','',3),('596752','',NULL,'','Đỗ Thị',2,'Huế','123','',3),('599054','',NULL,'','Lương Đức',2,'Hưng','123','',3),('599056','',NULL,'','Hoàng Đức',1,'Mạnh','123','',3),('admin',NULL,NULL,'admin@gmail.com','admin',1,NULL,'123',NULL,1),('CNPM01',NULL,NULL,'ncthang@gmail.com','Ngô Công',1,'Thắng','123',NULL,2),('CNPM02',NULL,NULL,'htha@gmail.com','Hoàng Thị',2,'Hà','123',NULL,2),('CNPM03',NULL,NULL,'ltmthuy@gmail.com','Lê Thị Minh',2,'Thùy','123',NULL,2),('CNPM04',NULL,NULL,'ltnhung@gmail.com','Lê Thị',2,'Nhung','123',NULL,2),('CNPM05',NULL,NULL,'pttien@gmail.com','Phan Trọng',1,'Tiến','123',NULL,2),('CNPM06',NULL,NULL,'tthieu@gmail.com','Trần Trung',1,'Hiếu','123',NULL,2),('CNPM07',NULL,NULL,'nddong@gmail.com','Nguyễn Doãn',1,'Đông','123',NULL,2),('CNPM08',NULL,NULL,'dtnham@gmail.com','Đỗ Thị',2,'Nhâm','123',NULL,2),('KHMT01',NULL,NULL,'ntanh@gmail.com','Ngô Tuấn',1,'Anh','123',NULL,2),('KHMT02',NULL,NULL,'ptlanh@gmail.com','Phạm Thị Lan',2,'Anh','123',NULL,2),('KHMT03',NULL,NULL,'pqdung@gmail.com','Phạm Quang',1,'Dũng','123',NULL,2),('KHMT04',NULL,NULL,'dttha@gmail.com','Đoàn Thị Thu',2,'Hà','123',NULL,2),('KHMT05',NULL,NULL,'tvha@gmail.com','Trần Vũ',2,'Hà','123',NULL,2),('KHMT06',NULL,NULL,'nvhoang@gmail.com','Nguyễn Văn',1,'Hoàng','123',NULL,2),('KHMT07',NULL,NULL,'ptthong@gmail.com','Phan Thị Thu',2,'Hồng','123',NULL,2),('KHMT08',NULL,NULL,'nthuyen@gmail.com','Nguyễn Thị',2,'Huyền','123',NULL,2),('KHMT09',NULL,NULL,'ttthuyen@gmail.com','Trần Thị Thu',2,'Huyền','123',NULL,2),('KHMT10',NULL,NULL,'vtluu@gmail.com','Vũ Thị',2,'Lưu','123',NULL,2),('KHMT11',NULL,NULL,'ntthao@gmail.com','Nguyễn Thị',2,'Thảo','123',NULL,2),('KHMT12',NULL,NULL,'ntthuy@gmail.com','Nguyễn Thị',2,'Thủy','123',NULL,2),('KHMT13',NULL,NULL,'ndthinh@gmail.com','Nguyễn Đức',1,'Thịnh','123',NULL,2),('TOAN01',NULL,NULL,'pqsang@gmail.com','Phan Quang',1,'Sáng','123',NULL,2),('TOAN02',NULL,NULL,'vtgiang@gmail.com','Vũ Thu',2,'Giang','123',NULL,2),('TOAN03',NULL,NULL,'nhhai@gmail.com','Nguyễn Hữu',1,'Hải','123',NULL,2),('TOAN04',NULL,NULL,'lthanh@gmail.com','Lê Thị',2,'Hạnh','123',NULL,2),('TOAN05',NULL,NULL,'nvhanh@gmail.com','Nguyễn Văn',1,'Hạnh','123',NULL,2),('TOAN06',NULL,NULL,'nthang@gmail.com','Nguyễn Thủy',2,'Hằng','123',NULL,2),('TOAN07',NULL,NULL,'dthue@gmail.com','Đỗ Thị',2,'Huệ','123',NULL,2),('TOAN08',NULL,NULL,'nthuyenb@gmail.com','Nguyễn Thị',2,'Huyền B','123',NULL,2),('TOAN09',NULL,NULL,'pvnga@gmail.com','Phạm Việt',2,'Nga','123',NULL,2),('TOAN10',NULL,NULL,'ntmtam@gmail.com','Nguyễn Thị Minh',2,'Tâm','123',NULL,2),('TOAN11',NULL,NULL,'nhthanh@gmail.com','Nguyễn Hà',2,'Thanh','123',NULL,2),('TOAN12',NULL,NULL,'tnthanh@gmail.com','Thân Ngọc',1,'Thành','123',NULL,2),('TOAN13',NULL,NULL,'ltdthuy@gmail.com','Lê Thị Diệu',2,'Thùy','123',NULL,2),('TOAN14',NULL,NULL,'ntbthuy@gmail.com','Nguyễn Thị Bích',2,'Thủy','123',NULL,2),('TOTI01',NULL,NULL,'ncdinh@gmail.com','Nguyễn Văn',1,'Định','123',NULL,2),('TOTI02',NULL,NULL,'phthuy@gmail.com','Phạm Hạ',1,'Thủy','123',NULL,2),('TOTI03',NULL,NULL,'nhhuy@gmail.com','Nguyễn Hoàng',1,'Huy','123',NULL,2),('TOTI04',NULL,NULL,'tdquynh@gmail.com','Trần Đức',1,'Quỳnh','123',NULL,2),('TOTI05',NULL,NULL,'ntkhuong@gmail.com','Nguyễn Trọng',1,'Kương','123',NULL,2),('TOTI06',NULL,NULL,'httgiang@gmail.com','Hoàng Thị Thanh',2,'Giang','123',NULL,2),('TOTI07',NULL,NULL,'nxthao@gmail.com','Nguyễn Xuân',1,'Thảo','123',NULL,2),('TOTI08',NULL,NULL,'nmchau@gmail.com','Ngọc Minh',2,'Châu','123',NULL,2),('TOTI09',NULL,NULL,'ntthanh@gmail.com','Nguyễn Thị Thúy',2,'Hạnh','123',NULL,2),('TOTI10',NULL,NULL,'ntlan@gmail.com','Nguyễn Thị',2,'Lan','123',NULL,2),('VALY01',NULL,NULL,'btthu@gmail.com','Bùi Thị',2,'Thu','123',NULL,2),('VALY02',NULL,NULL,'ntphuong','Nguyễn Thị',2,'Phương','123',NULL,2),('VALY03',NULL,NULL,'nthien@gmail.com','Nguyễn Tiến',1,'Hiển','123',NULL,2),('VALY04',NULL,NULL,'lmquan@gmail.com','Lương Minh',1,'Quân','123',NULL,2),('VALY05',NULL,NULL,'lvdung@gmail.com','Lê Văn',1,'Dũng','123',NULL,2),('VALY06',NULL,NULL,'dhyen@gmail.com','Đào Hải',1,'Yến','123',NULL,2),('VALY07',NULL,NULL,'ntthanh@gmail.com','Nguyễn Thị',2,'Thanh','123',NULL,2),('VALY08',NULL,NULL,'lpthao@gmail.com','Lê Phương',2,'Thảo','123',NULL,2),('VALY09',NULL,NULL,'thanh@gmail.com','Trần',1,'Hanh','123',NULL,2);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
