import { baseService } from './baseService';

class QuanLyCumRapService extends baseService {
    constructor() {
        super();
    }

    getCinema = () => {
        return this.get(
            `/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP01`
        );
    };

    //lay thong tin he thong rap
    getListCinema = () => {
        return this.get(`/api/QuanLyRap/LayThongTinHeThongRap`);
    };
    //lay thong tin cum rap theo he thong
    getListMovieTheater = (maHeThongRap) => {
        return this.get(
            `/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`
        );
    };
}

export const quanLyCumRapService = new QuanLyCumRapService();
