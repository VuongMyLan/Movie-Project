import { baseService } from './baseService';

class QuanLyGheService extends baseService {
    constructor() {
        super();
    }

    getBookingInfo = (maLichChieu) => {
        return this.get(
            `/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`
        );
    };

    bookingTicket = (bookingInfo) => {
        return this.post(`/api/QuanLyDatVe/DatVe`, bookingInfo);
    };
}

export const quanLyGheService = new QuanLyGheService();
