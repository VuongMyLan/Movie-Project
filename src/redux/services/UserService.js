import { baseService } from './baseService';

class UserService extends baseService {
    constructor() {
        super();
    }

    LoginAction = (userInfo) => {
        return this.post('/api/QuanLyNguoiDung/DangNhap', userInfo);
    };

    RegisterAction = (regInfo) => {
        return this.post('/api/QuanLyNguoiDung/DangKy', regInfo);
    };

    userHistory = (userInfo) => {
        return this.post('/api/QuanLyNguoiDung/ThongTinTaiKhoan', userInfo);
    };
}

export const userService = new UserService();
