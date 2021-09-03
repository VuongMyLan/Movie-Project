import { baseService } from './baseService';

class QuanLyPhimService extends baseService {
    constructor() {
        super();
    }
    getFilmList = (tenPhim = '') => {
        if (tenPhim.trim() != '') {
            return this.get(
                `/api/quanlyphim/laydanhsachphim?maNhom=GP01&tenPhim=${tenPhim}`
            );
        }
        return this.get(`/api/quanlyphim/laydanhsachphim?maNhom=GP01`);
    };

    getFilmDetail = (maPhim) => {
        return this.get(`/api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`);
    };

    getTimeschedule = (maPhim) => {
        return this.get(
            `/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`
        );
    };
    addFilmUploadHinh = (formData) => {
        return this.post(`/api/QuanLyPhim/ThemPhimUploadHinh`, formData);
    };
    editFilmUploadHinh = (formData) => {
        return this.post(`/api/QuanLyPhim/CapNhatPhimUpload`, formData);
    };
    deleteFilm = (maPhim) => {
        return this.delete(`/api/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`);
    };

    createShowTimes = (showTimes) => {
        return this.postalter(`/api/QuanLyDatVe/TaoLichChieu`, showTimes);
    };
}

export const quanLyPhimService = new QuanLyPhimService();
