export class Globals {
    LOAI_MON_HOC = {
        1: 'Đại cương',
        2: 'Cơ sở ngành',
        3: 'Chuyên ngành'
    };

    LOAI_TAI_LIEU = {
        1: 'Giáo trình',
        2: 'Sách',
        3: 'Tài liệu tham khảo',
        4: 'Bài giảng',
        5: 'Đề thi tham khảo',
    };

    LOAI_DE_TAI = {
        1: 'Thực tập chuyên ngành',
        2: 'Khóa luận tốt nghiệp',
    };

    IS_BAN_QUYEN = {
        true: "SV Chú ý bản quyền",
        false: "Tài liệu mở"
    };

    FAVOURITE = {
        true: "Tôi Yêu thích"
    };

    STATUS = {
        1: "Hủy",
        2: "Chờ duyệt",
        3: "Được công bố"
    };

    getDateNow() {
        let newDate = new Date();

        let aaaa = newDate.getFullYear();
        let gg = newDate.getDate();
        let mm = (newDate.getMonth() + 1);

        if (gg < 10)
            gg = Number("0" + gg);

        if (mm < 10)
            mm = Number("0" + mm);

        let cur_day = aaaa + "-" + mm + "-" + gg;

        let hours = newDate.getHours();
        let minutes = newDate.getMinutes();
        let seconds = newDate.getSeconds();

        if (hours < 10)
            hours = Number("0" + hours);

        if (minutes < 10)
            minutes = Number("0" + minutes);

        if (seconds < 10)
            seconds = Number("0" + seconds);

        return cur_day + " " + hours + ":" + minutes + ":" + seconds;
    }
}
