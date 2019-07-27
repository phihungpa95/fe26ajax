function NguoiDungService() {
    // lấy danh sách người dùng
    this.LayDanhSachNguoiDung = function () {
        //request server
      return  $.ajax
            ({
                url: "http://svcy.myclass.vn/api/QuanLyTrungTam/DanhSachNguoiDung",
                type: "GET"

            })
           
    }
    // them nguoi dung
    this.ThemNguoiDung = function(nguoidungmoi)
    {
        return $.ajax
        ({
            url:  "http://svcy.myclass.vn/api/QuanLyTrungTam/ThemNguoiDung",
            type: "POST",
            data: nguoidungmoi,
        })
    }
    //xoa nguoi dung
    this.XoaNguoiDung = function(id)
    {
        return $.ajax
        ({
            url:  `http://svcy.myclass.vn/api/QuanLyTrungTam/XoaNguoiDung/${id}`,
            type: "DELETE",
           
        })
    }
}