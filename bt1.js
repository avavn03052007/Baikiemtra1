class HocSinh {
  constructor(maHS, hoTen, lopHoc, diemTB, hanhKiem) {
    this.maHS = maHS;
    this.hoTen = hoTen;
    this.lopHoc = lopHoc;
    this.diemTB = diemTB;
    this.hanhKiem = hanhKiem;
  }
}
class SchoolSystem {
  constructor(data = []) {
    this.danhSach = [...data];
    this.soLuongHocSinh = data.length;
  }

  _taoMaHocSinh() {
    const nam = new Date().getFullYear();
    const soThuTu = String(this.soLuongHocSinh).padStart(3, '0');
    return `ma${nam}${soThuTu}`;
  }

  themHocSinh(hocSinh) {
    const maHS = this._taoMaHocSinh();
    const hocSinhMoi = new HocSinh(maHS, hocSinh.hoTen, hocSinh.lopHoc, hocSinh.diemTB, hocSinh.hanhKiem);
    this.danhSach.push(hocSinhMoi);
    this.soLuongHocSinh++;
    return maHS;
  }

  timHocSinh(maHS) {
    if (!/^ma\d{4}\d{3}$/.test(maHS)) return null;
    return this.danhSach.find(hs => hs.maHS === maHS) || null;
  }

  capNhatThongTin(maHS, duLieuMoi) {
    const index = this.danhSach.findIndex(hs => hs.maHS === maHS);
    if (index === -1) return false;
    const { maHS: _, ...duLieuCapNhat } = duLieuMoi;
    this.danhSach[index] = { ...this.danhSach[index], ...duLieuCapNhat };
    return true;
  }

  xoaHocSinh(maHS) {
    const index = this.danhSach.findIndex(hs => hs.maHS === maHS);
    if (index === -1) return false;
    this.danhSach.splice(index, 1);
    return true;
  }

  layDanhSachTheoLop(tenLop) {
    return this.danhSach.filter(hs => hs.lopHoc === tenLop);
  }

  thongKeHocLuc() {
    const thongKe = {
      'Xuất Sắc': 0,
      'Giỏi': 0,
      'Khá': 0,
      'Trung Bình': 0,
      'Kém': 0
    };

    this.danhSach.forEach(hs => {
      const dtb = hs.diemTB;
      if (dtb >= 9.0) thongKe['Xuất Sắc']++;
      else if (dtb >= 8.0) thongKe['Giỏi']++;
      else if (dtb >= 6.5) thongKe['Khá']++;
      else if (dtb >= 5.0) thongKe['Trung Bình']++;
      else thongKe['Kém']++;
    });

    return thongKe;
  }

  sapXepTheoDiem(kieuSapXep = 'tang') {
    const danhSachCopy = [...this.danhSach];
    return danhSachCopy.sort((a, b) => {
      return kieuSapXep === 'tang' ? a.diemTB - b.diemTB : b.diemTB - a.diemTB;
    });
  }
}
