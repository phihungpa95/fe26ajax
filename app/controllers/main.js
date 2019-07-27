/*
Lấy ds nguoi dungtu back end
*/
var mangNguoiDung = [];
$(document).ready(function () {

    var nguoiDungService = new NguoiDungService();
    var ajaxNguoiDung = nguoiDungService.LayDanhSachNguoiDung();

    ajaxNguoiDung
        .done(function (result) {
            mangNguoiDung = result;
            hienthi(mangNguoiDung);

        })
        .fail(function (err) {
            console.log(err);

        })
    console.log(mangNguoiDung);
    // cách 1: for
    // function hienthi(mangHienThi)
    // {
    //     var content = "";
    //     var tbodyNV = document.getElementById("tblDanhSachNguoiDung");
    //     for (var i = 0; i < mangNguoiDung.length; i++)
    //     {
    //         var nguoiDung = mangNguoiDung[i];
    //         content += `
    //             <tr>
    //                 <td>${i++}</td>
    //                 <td>${nguoiDung.TaiKhoan}</td>
    //                 <td>${nguoiDung.MatKhau}</td>
    //                 <td>${nguoiDung.HoTen}</td>
    //                 <td>${nguoiDung.Email}</td>
    //                 <td>${nguoiDung.SoDT}</td>

    //             </tr>
    //         `;
    //     }
    //     tbodyNV.innerHTML = content;
    // }


    // cách 2: map
    function hienthi(mangHienThi) {
        var content = "";
        var tableDanhSach = $("#tblDanhSachNguoiDung");
        mangHienThi.map(function (nguoiDung, index) {

            content += `
            <tr>
                <td>${index + 1}</td>
                <td>${nguoiDung.TaiKhoan}</td>
                <td>${nguoiDung.MatKhau}</td>
                <td>${nguoiDung.HoTen}</td>
                <td>${nguoiDung.Email}</td>
                <td>${nguoiDung.SoDT}</td>
                <td>
                <button class= "btn btn-danger btnXoa"  data-id ="${nguoiDung.TaiKhoan}">Xóa</button>
                </td>
            </tr>
        `;
        })
        tableDanhSach.html(content);
    }

    $("#btnThemNguoiDung").click(function () {
        $("#modal-title").html("Thêm người dùng");
        var btn = `
    <button class = "btn btn-success" id= "btnThem">Thêm Người Dùng</button>
    `;
        $("#modal-footer").html(btn);
    });
    $("body").delegate("#btnThem", "click", function()
    {
        // lấy thông tin
        var taiKhoan = $("#TaiKhoan").val();
        var matKhau = $("#MatKhau").val();
        var hoTen = $("#HoTen").val();
        var email = $("#Email").val();
        var soDT = $("#SoDT").val();
        var maLoai = $("#maLoaiNguoiDung").val();
        


        //Tạo đối tượng
        var nguoiDung = new NguoiDung(taiKhoan, matKhau, hoTen, email, soDT, maLoai)
        //them vào database(api)
        nguoiDungService.ThemNguoiDung(nguoiDung)
        .done(function(result){
            location.reload(result);
            
        })
        .fail(function(err){
            console.log(err);
            
        });
    })

    $("body").delegate("#btnXoa", "click", function()
    {
        var taiKhoan = $(this).data("id");
        nguoiDungService.XoaNguoiDung(taiKhoan)
        .done (function()
        {
            location.reload();
        })
        .fail(function(err)
        {
            console.log(err);
            
        })
    }
    )
})
