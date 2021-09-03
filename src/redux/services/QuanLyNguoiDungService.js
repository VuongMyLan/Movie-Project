import { baseService } from './baseService';

class QuanLyNguoiDungService extends baseService {
    constructor() {
        super();
    }

    getListUser = (taiKhoan = '') => {
        if (taiKhoan != '') {
            return this.get(
                `/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01&tuKhoa=${taiKhoan}`
            );
        }
        {
            return this.get(
                `/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01`
            );
        }
    };

    AddUser = (formData) => {
        return this.post(`/api/QuanLyNguoiDung/ThemNguoiDung`, formData);
    };

    UpdateUser = (formData) => {
        return this.put(
            `/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
            formData
        );
    };
    DeleteUser = (taiKhoan) => {
        return this.delete(
            `/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`
        );
    };
}

export const quanLyNguoiDungService = new QuanLyNguoiDungService();
