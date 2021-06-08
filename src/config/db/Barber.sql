-----------------------------------------------UIT 's BABER-------------------------------------------------------
-- Intro
-- ...
-- ...
-- END INTRO
-----------------------------------------------DELETE TABLE-------------------------------------------------------
DROP TABLE KhachHang;
DROP TABLE LoaiKhachHang;
DROP TABLE NhanVien;
DROP TABLE TaiKhoan;
DROP TABLE Luong;
DROP TABLE NhanLuong;-- Super_primary_key
DROP TABLE LoaiDichVu
DROP TABLE DichVu;
DROP TABLE LoaiSanPham;
DROP TABLE SanPham;
DROP TABLE GioDat;
DROP TABLE DatLich;
DROP TABLE HoaDon;
DROP TABLE CTHD;
DROP TABLE CTHDDV; -- Super_primary_key
DROP TABLE CTHDSP; -- Super_primary_key
DROP TABLE DANHGIANHANVIEN;
DROP TABLE DANHGIASANPHAM;
drop table DANHGIA;

----------------------------------------------DELETE SEQUENCE----------------------------------------------------
DROP SEQUENCE MAKH_SEQ1;
DROP SEQUENCE MALKH_SEQ2;
DROP SEQUENCE MANV_SEQ3;
DROP SEQUENCE MATK_SEQ4;
DROP SEQUENCE MALUONG_SEQ5;
DROP SEQUENCE MALDV_SEQ14;
DROP SEQUENCE MADV_SEQ6;
DROP SEQUENCE MALSP_SEQ7;
DROP SEQUENCE MASP_SEQ8;
DROP SEQUENCE MAGD_SEQ9;
DROP SEQUENCE MADL_SEQ10;
DROP SEQUENCE MAHD_SEQ11;
DROP SEQUENCE MADG_SEQ12;--mn nho chay dong nay de xoa di identity
DROP SEQUENCE MADGNV_SEQ12;
DROP SEQUENCE MADGSP_SEQ13;

DESCRIBE NHANVIEN
----------------------------------------------BANG KHACH HANG----------------------------------------------------
CREATE TABLE KhachHang
(
    MaKH            NUMBER              NOT NULL,
    Ho              VARCHAR2(10)        NOT NULL,
    Ten             VARCHAR2(40)        NOT NULL,
    NgaySinh        DATE                NOT NULL,
    GioiTinh        VARCHAR2(10)        DEFAULT 'Unknown',
    SoDT            VARCHAR2(15)        NOT NULL,
    DiaChi          VARCHAR2(255)       DEFAULT 'Unknown', 
    DiemTichLuy     NUMBER              DEFAULT 0,
    HinhAnh         VARCHAR2(4000)      DEFAULT 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/1200px-Unknown_person.jpg',
    Email           VARCHAR2(255)       NOT NULL UNIQUE,
    TinhTrang       NUMBER              DEFAULT 1,
    CONSTRAINT      PK_KHACHHANG        PRIMARY KEY(MaKH),
    CONSTRAINT      CHK_KHACHHANG1      CHECK   (GioiTinh in ('Nam','Nu','Unknown') )
);

CREATE SEQUENCE MAKH_SEQ1 START WITH 1;
----------------------------------------------BANG LOAI KHACH HANG -----------------------------------------------
CREATE TABLE LoaiKhachHang
(
    MaLKH           NUMBER              NOT NULL,
    MaKH            NUMBER              CONSTRAINT FK_LOAIKHACHHANG_KHACHHANG    REFERENCES KhachHang(MaKH)  NOT NULL,
    LoaiKH          VARCHAR2(10)        DEFAULT 'Member',
    NgayKichHoatVip DATE                ,
    NgayHetHanVip   DATE                ,
    CONSTRAINT      PK_LOAIKHACHHANG    PRIMARY KEY(MaLKH),
    CONSTRAINT      CHK_LOAIKHACHHANG1  CHECK   (LoaiKH in ('Member','Vip') ),
    CONSTRAINT      CHK_LOAIKHACHHANG2  CHECK   (NgayKichHoatVip <  NgayHetHanVip)
);
CREATE SEQUENCE MALKH_SEQ2 START WITH 1;

----------------------------------------------BANG NHAN VIEN------------------------------------------------------
CREATE TABLE NhanVien
(
    MaNV            NUMBER          NOT NULL,
    Ho              VARCHAR2(10)    NOT NULL,
    Ten             VARCHAR2(40)    NOT NULL,
    NgaySinh        DATE            NOT NULL,
    GioiTinh        VARCHAR2(10)    DEFAULT 'Unknown',
    SoDT            VARCHAR2(15)    NOT NULL,
    DiaChi          VARCHAR2(255)   DEFAULT 'Unknown',
    NgayVaoLam      DATE            NOT NULL,
    LoaiNhanVien    VARCHAR2(15)    DEFAULT 'Staff',
    HinhAnh         VARCHAR2(4000)  DEFAULT 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/1200px-Unknown_person.jpg',
    Email           VARCHAR2(255)   NOT NULL UNIQUE,
    TinhTrang       NUMBER              DEFAULT 1,
    CONSTRAINT      PK_NHANVIEN     PRIMARY KEY(MaNV),
    CONSTRAINT      CHK_NHANVIEN1   CHECK   (GioiTinh in ('Nam','Nu','Unknown') ),
    CONSTRAINT      CHK_NHANVIEN2   CHECK   (LoaiNhanVien in ('Staff','Admin') ),
    CONSTRAINT      CHK_NHANVIEN3   CHECK   (NgaySinh <  NgayVaoLam)
);
CREATE SEQUENCE MANV_SEQ3 START WITH 1;
---------------------------------------------BANG TAI KHOAN-------------------------------------------------------
CREATE TABLE TaiKhoan
(
    MaTK            NUMBER          NOT NULL,
    Password        VARCHAR2(255)   NOT NULL,
    MaKH            NUMBER          CONSTRAINT FK_TAIKHOAN_KHACHHANG    REFERENCES KhachHang(MaKH),
    MaNV            NUMBER          CONSTRAINT FK_TAIKHOAN_NHANVIEN     REFERENCES NhanVien(MaNV),
    CONSTRAINT      PK_TAIKHOAN     PRIMARY KEY(MATK)
);
CREATE SEQUENCE MATK_SEQ4 START WITH 1;

---------------------------------------------BANG LUONG-----------------------------------------------------------
CREATE TABLE Luong
(
    MaLuong     NUMBER      NOT NULL,
    MaNV        NUMBER      CONSTRAINT FK_LUONG_NHANVIEN    REFERENCES NhanVien(MaNV)   NOT NULL,
    LuongCoBan  NUMBER      NOT NULL,
    CONSTRAINT  PK_LUONG    PRIMARY KEY(MaLuong)
);
CREATE SEQUENCE MALUONG_SEQ5 START WITH 1;

--------------------------------------------BANG NHAN LUONG-------------------------------------------------------
CREATE TABLE NhanLuong
(
    MaLuong         NUMBER              CONSTRAINT FK_NHANLUONG_LUONG       REFERENCES Luong(MaLuong)   NOT NULL,
    MaNV            NUMBER              CONSTRAINT FK_NHANLUONG_NHANVIEN    REFERENCES NhanVien(MaNV)   NOT NULL,
    NgayNhanLuong   DATE                ,
    LuongCoBan      NUMBER              NOT NULL,
    LuongThuong     NUMBER              NOT NULL,
    LuongDuocNhan   NUMBER              NOT NULL,
    CONSTRAINT      PK_NHANLUONG        PRIMARY KEY(MaLuong,MaNV,NgayNhanLuong)
);
--------------------------------------------BANG LOAI DICH VU-----------------------------------------------------
CREATE  TABLE LOAIDICHVU
(
    MaLDV           NUMBER              NOT NULL,
    TenLoaiDichVu  VARCHAR2(255)       NOT NULL,
    TinhTrang       NUMBER              DEFAULT 1,
    CONSTRAINT      PK_LOAIDICHVU      PRIMARY KEY (MaLDV)
);
CREATE SEQUENCE MALDV_SEQ14 START WITH 1;
--------------------------------------------BANG DICH VU----------------------------------------------------------
CREATE TABLE DichVu
(
    MaDV        NUMBER          NOT NULL,
    TenDichVu   VARCHAR2(255)   NOT NULL,
    Gia         NUMBER          default 0,
    MotaDichVu  VARCHAR2(4000)  NOT NULL,
    HinhAnh     VARCHAR2(4000)  DEFAULT 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/1200px-Unknown_person.jpg',
    TinhTrang   NUMBER          DEFAULT 1,
    MALDV       NUMBER          CONSTRAINT FK_DICHVU_LOAIDICHVU    REFERENCES LOAIDICHVU(MaLDV)   NOT NULL,
    CONSTRAINT  PK_DICHVU       PRIMARY KEY(MaDV)
);
CREATE SEQUENCE MADV_SEQ6 START WITH 1;
--------------------------------------------BANG LOAI SAN PHAM----------------------------------------------------
CREATE  TABLE LOAISANPHAM
(
    MaLSP           NUMBER              NOT NULL,
    TenLoaiSanPham  VARCHAR2(255)       NOT NULL,
    TinhTrang       NUMBER              DEFAULT 1,
    CONSTRAINT      PK_LOAISANPHAM      PRIMARY KEY (MaLSP)
);
CREATE SEQUENCE MALSP_SEQ7 START WITH 1;
---------------------------------------------BANG SAN PHAM--------------------------------------------------------
CREATE  TABLE SanPham
(
    MaSP            NUMBER          NOT NULL,
    TenSanPham      VARCHAR2(255)   NOT NULL,
    Gia             NUMBER          NOT NULL,
    MOTASANPHAM     VARCHAR2(4000)  NOT NULL,
    XuatXu          VARCHAR2(100)   NOT NULL,
    HinhAnh         VARCHAR2(4000)  DEFAULT 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/1200px-Unknown_person.jpg',
    TinhTrang       NUMBER          DEFAULT 1,
    SoLuong         NUMBER          DEFAULT 1,
    MaLSP           NUMBER          CONSTRAINT FK_SANPHAM_LOAISANPHAM    REFERENCES LOAISANPHAM(MaLSP)   NOT NULL,
    CONSTRAINT      PK_SANPHAM      PRIMARY KEY (MaSP)
);
CREATE SEQUENCE MASP_SEQ8 START WITH 1;
---------------------------------------------BANG GIO DAT---------------------------------------------------------
CREATE TABLE GioDat
(
    MaGio       NUMBER              NOT NULL,
    KhungGio    VARCHAR2(20)        NOT NULL,
    CONSTRAINT  PK_GIODAT           PRIMARY KEY(MaGio)
);
CREATE SEQUENCE MAGD_SEQ9 START WITH 1;
---------------------------------------------BANG DAT LICH--------------------------------------------------------
CREATE TABLE DatLich
(
    MaDL        NUMBER          NOT NULL,
    Ngay        DATE            NOT NULL,
    MaGio       NUMBER          CONSTRAINT FK_DATLICH_GIODAT    REFERENCES GioDat(MaGio)    NOT NULL,
    MaKH        NUMBER          CONSTRAINT FK_DATLICH_KHACHHANG REFERENCES KhachHang(MaKH)  NOT NULL,
    MaNV        NUMBER          CONSTRAINT FK_DATLICH_NHANVIEN  REFERENCES NhanVien(MaNV)   NOT NULL,
    MaDV        NUMBER          CONSTRAINT FK_DATLICH_DICHVU    REFERENCES DichVu(MaDV)     NOT NULL,
    CONSTRAINT  PK_DatLich      PRIMARY KEY (MaDL)
);
CREATE SEQUENCE MADL_SEQ10 START WITH 1;
---------------------------------------------BANG HOA DON---------------------------------------------------------
CREATE TABLE HoaDon
(
    MaHD        NUMBER      NOT NULL,
    MaKH        NUMBER      CONSTRAINT FK_HOADON_KHACHHANG REFERENCES KhachHang(MaKH)  NOT NULL,
    Ngay        DATE        NOT NULL,
    KhuyenMai   NUMBER      DEFAULT 0,
    TongTien    NUMBER      NOT NULL,
    TinhTrang       NUMBER              DEFAULT 1,
    CONSTRAINT  PK_HD       PRIMARY KEY(MaHD)
);
CREATE SEQUENCE MAHD_SEQ11 START WITH 1;
--------------------------------------------BANG CTHDDV-----------------------------------------------------------
CREATE TABLE CTHDDV
( 
    MaHD        NUMBER      CONSTRAINT FK_CTHDDV_HOADON     REFERENCES HOADON(MaHD)    NOT NULL,
    MaDV        NUMBER      CONSTRAINT FK_CTHDDV_DICHVU     REFERENCES DICHVU(MaDV)    NOT NULL,
    CONSTRAINT  PK_CTHDDV   PRIMARY KEY(MaHD,MaDV)
);
--------------------------------------------BANG CTHDSP-----------------------------------------------------------
CREATE TABLE CTHDSP
( 
    MaHD        NUMBER      CONSTRAINT FK_CTHDSP_HOADON      REFERENCES HOADON(MaHD)    NOT NULL,
    MaSP        NUMBER      CONSTRAINT FK_CTHDSP_SANPHAM     REFERENCES SANPHAM(MaSP)   ,
    SoLuong     NUMBER,
    CONSTRAINT  PK_CTHDSP   PRIMARY KEY(MaHD,MaSP)
);
--------------------------------------------BANG DANH GIA NHAN VIEN-----------------------------------------------
CREATE TABLE DANHGIANHANVIEN
( 
    MaDGNV            NUMBER        NOT NULL,
    MaKH            NUMBER          CONSTRAINT FK_DANHGIANV_KHACHHANG     REFERENCES KHACHHANG(MaKH)      NOT NULL,
    MaNV            NUMBER          CONSTRAINT FK_DANHGIA_NHANVIEN      REFERENCES NHANVIEN(MaNV)       NOT NULL,
    NgayDanhGia     DATE            NOT NULL,
    DANHGIA         NUMBER          NOT NULL,
    CHITIETDANHGIA  VARCHAR2(255)   ,
    TinhTrang       NUMBER              DEFAULT 1,
    CONSTRAINT      PK_DGNV         PRIMARY KEY(MaDGNV)
);
CREATE SEQUENCE MADGNV_SEQ12 START WITH 1;
--------------------------------------------BANG DANH GIA SAN PHAM------------------------------------------------
CREATE TABLE DANHGIASANPHAM
( 
    MaDGSP          NUMBER          NOT NULL,
    MaKH            NUMBER          CONSTRAINT FK_DANHGIASP_KHACHHANG     REFERENCES KHACHHANG(MaKH)      NOT NULL,
    MaSP            NUMBER          CONSTRAINT FK_DANHGIA_SANPHAM       REFERENCES SANPHAM(MaSP)       NOT NULL,
    NgayDanhGia     DATE            NOT NULL,
    DANHGIA         NUMBER          NOT NULL,
    CHITIETDANHGIA  VARCHAR2(255)   ,
    TinhTrang       NUMBER              DEFAULT 1,
    CONSTRAINT      PK_DGSP         PRIMARY KEY(MaDGSP)
);
CREATE SEQUENCE MADGSP_SEQ13 START WITH 1;

--------------------------------------------SELECT RECORDS-------------------------------------------------------
-- Khach Hang
SELECT * FROM KhachHang
-- Loai Khach Hang
SELECT * FROM LoaiKhachHang
-- Nhan Vien
SELECT * FROM NhanVien;
-- Tai Khoan
SELECT * FROM TaiKhoan

-- Luong
SELECT * FROM Luong
-- Luong Thuong
SELECT * FROM LuongThuong
-- Tang Luong
SELECT * FROM TangLuong
-- Nhan Luong
SELECT * FROM NhanLuong
-- Dich Vu
SELECT * FROM DichVu
-- Loai San Pham
SELECT * FROM LoaiSanPham
-- San Pham
SELECT * FROM SanPham
-- Gio Dat
SELECT * FROM GioDat
-- Dat Lich
SELECT * FROM DatLich
-- Hoa Don
SELECT * FROM HoaDon
-- CTHD
SELECT * FROM CTHD
-- Danh Gia
SELECT * FROM DanhGia
--------------------------------------------INSERT RECORDS-------------------------------------------------------
ALTER SESSION SET NLS_DATE_FORMAT ='DD-MM-YYYY HH24:MI:SS';
-- GioDat
INSERT INTO GioDat(MaGio,KhungGio) VALUES(MAGD_SEQ9.NEXTVAL,'8h30-10h00');
INSERT INTO GioDat(MaGio,KhungGio) VALUES(MAGD_SEQ9.NEXTVAL,'10h00-11h30');
INSERT INTO GioDat(MaGio,KhungGio) VALUES(MAGD_SEQ9.NEXTVAL,'13h00-14h30');
INSERT INTO GioDat(MaGio,KhungGio) VALUES(MAGD_SEQ9.NEXTVAL,'14h30-16h00');
INSERT INTO GioDat(MaGio,KhungGio) VALUES(MAGD_SEQ9.NEXTVAL,'16h00-17h30');
INSERT INTO GioDat(MaGio,KhungGio) VALUES(MAGD_SEQ9.NEXTVAL,'17h30-19h00');
INSERT INTO GioDat(MaGio,KhungGio) VALUES(MAGD_SEQ9.NEXTVAL,'19h30-20h30');
INSERT INTO GioDat(MaGio,KhungGio) VALUES(MAGD_SEQ9.NEXTVAL,'20h30-22h00');

--------------------------------------------ALTER CHECKS---------------------------------------------------------
-- Loai San Pham
INSERT INTO LOAISANPHAM VALUES(MALSP_SEQ7.NEXTVAL,'Chăm sóc tóc',1);			
INSERT INTO LOAISANPHAM VALUES(MALSP_SEQ7.NEXTVAL,'Chăm sóc da',1);			
INSERT INTO LOAISANPHAM VALUES(MALSP_SEQ7.NEXTVAL,'Dụng cụ làm tóc',1);			
INSERT INTO LOAISANPHAM VALUES(MALSP_SEQ7.NEXTVAL,'Dụng cụ skincare',1);	
-- San Pham
SET DEFINE OFF;
INSERT INTO SANPHAM VALUES(MASP_SEQ8.NEXTVAL,'GÔM XỊT TÓC LADY KILLER',130000,'Khả năng giữ nếp vượt trội, tạo độ cứng vừa phải mà vẫn đảm bảo mái tóc có độ bồng nhất định. Ngay cả khi đội mũ bảo hiểm ra đường, gôm xịt tóc Lady Killer vẫn giữ được nếp tóc đẹp như mới.','Việt Nam','https://cf.shopee.vn/file/08e6cff4ed886c2e3629d8627d6c8717_tn',1,100,1);										
INSERT INTO SANPHAM VALUES(MASP_SEQ8.NEXTVAL,'Sáp Kevin Murphy 30g',290000,'Công dụng sáp vuốt tóc Kevin Murphy Rough Rider:Mùi thơm kẹo Toffee + caramel dịu nhẹ. Độ giữ nếp cao 10/10. Không gây bết dính. Có khả năng thấm hút dầu. Tạo cho tóc cảm giác khô. Texture và volume đẹp và rõ nét. Sản phẩm tạo kiểu tự nhiên, không bóng tóc','Úc','https://hanomart.com/public/media/images/kevin%205.jpg',1,50,1);
INSERT INTO SANPHAM VALUES(MASP_SEQ8.NEXTVAL,'SRM Skin&Dr Tràm trà',200000,'Làm sạch sâu, loại bỏ bụi bẩn và bã nhờn. Tẩy tế bào chết trên da, giúp lỗ chân lông thông thoáng. Cân bằng độ PH, cấp ẩm và duy trì độ ẩm cho làn da mịn màng, tươi sáng. Loại bỏ dầu thừa và se khít lỗ chân lông. Diệt khuẩn, kháng viêm, ngăn ngừa mụn trứng cá. Làm mờ vết thâm mụn, giúp da sáng đều màu và khỏe mạnh.','Hàn Quốc','https://file.hstatic.net/1000306701/file/p1977294_8f9691ae71a842ffb8abdb66eff9ebac_grande.jpg',1,30,2);
INSERT INTO SANPHAM VALUES(MASP_SEQ8.NEXTVAL,'Mặt nạ SNP Sâm dưỡng trắng',9000,'Dưỡng trắng, ngăn ngừa lão hóa: Mặt nạ có chứa niaciamin và axit adenosine là thành phần giúp dưỡng da trắng sáng, đồng thời cải thiện nếp nhăn và giúp phòng ngừa hiện tượng lão hóa. Cung cấp dưỡng chất cho làn da sạm màu, da nhão hay thiếu độ đàn hồi trở nên săn chắc giàu sức sống.','Hàn Quốc','https://product.hstatic.net/1000126467/product/mat-na-duong-trang-tinh-chat-nhan-sam-snp-ginseng-essence-mask-25ml-1_2ee656e4727f49ec9188d4aa6a7ea654_grande.jpg',1,50,2);
INSERT INTO SANPHAM VALUES(MASP_SEQ8.NEXTVAL,'Glanzen Box Tạo Kiểu Basic 1',653000,'Box đẹp trai diện tết','Việt Nam','https://file.hstatic.net/1000306701/file/1_1ab621cdf5504a25bc218354166ddcd5_grande.jpg',1,50,1);							
INSERT INTO SANPHAM VALUES(MASP_SEQ8.NEXTVAL,'Glanzen Box Tạo Kiểu Basic 2',653000,'Box đẹp trai diện tết','Việt Nam','https://file.hstatic.net/1000306701/file/11_6ef495619b454d698103ab4b5e3a40c2_grande.jpg',1,50,1);
INSERT INTO SANPHAM VALUES(MASP_SEQ8.NEXTVAL,'Glanzen Box Chăm Sóc Tóc Uốn/Nhuộm 3',550000,'Không còn lo lắng tóc hư tổn khi sử dụng máy sấy với bộ đôi Máy sấy Furin và Dầu Gội Giữ Màu Farcom. Máy sấy Furin với công nghệ cao đến từ Nhật Bản, giúp bảo vệ tóc tối đa trong quá trình sử dụng. Kết hợp với Dầu Gội Giữ Màu Farcom giúp tóc luôn có lớp bảo vệ hoàn hảo, bất chấp tác động của nhiệt cũng như ngoại cảnh.','Đức','https://file.hstatic.net/1000306701/file/2_fe8d82ef1e70461b973251a36e7b657c_grande.jpg',1,30,1);											
INSERT INTO SANPHAM VALUES(MASP_SEQ8.NEXTVAL,'Tông Đơ Cắt Tóc Không Dây Chuyên Nghiệp Kemei KM-809A',249000,'Sản phẩm có màn hình LCD hiển thị dung lượng pin lưỡi thép không gỉ. Được trang bị với 4 cữ dài khác nhau (3mm, 6 mm, 10 mm, 13 mm). Sử dụng được cả dây và không dây sử dụng kép, không còn lo lắng về không có điện, thuận tiện hơn.Có bản LED hiển thị dung lượng pin.Tông đơ sử dụng pin sạc ( không dây). Thời gian sạc 4giờ sử dụng 140 phút. Lưỡi bằng thép chuyên dụng mài sử dụng nhiều lần. Điện Áp đầu vào: AC 110-240v 50/60 hz. Công suất Tiêu Thụ: 5w','HongKong','https://cf.shopee.vn/file/8cc3de7a9ff92698f1cee6c09e661994',1,20,3);
INSERT INTO SANPHAM VALUES(MASP_SEQ8.NEXTVAL,'Máy Rửa Mặt Foreo Luna Mini',2590000,'Một chiếc máy rửa mặt kute nhỏ gọn, xinh xắn mà theo như mô tả trên trang chủ của hãng Foreo thì nó “cho trải nhiệm như ở spa”.','Thuỵ Điển','https://cf.shopee.vn/file/94b33f549301bb9e2b4ad963de40027f',1,10,4);						
INSERT INTO SANPHAM VALUES(MASP_SEQ8.NEXTVAL,'Máy Cạo Râu Mini Cầm Tay Siêu Nhỏ Có Thể Sạc Lại Runwe RS89',350000,'Tốc đầu cắt siêu tốc độ thiết kế kiểu cong vòm có thể ôm sát mọi góc cạnh, cắt sạch mọi loại râu cứng đầu nhất, đầu máy cạo râu có thể tháo rời và rửa với nước. Chức năng sạc lại thông minh sạc 2h có thể sử dụng đến 20 ngày cạo, đảm bảo an toàn, thích hợp mang theo khi đi du lịch, công tác. Tốc độ quay cao lên tới 4500 vòng, giúp lưỡi dao cạo có thể cạo sạch râu trên mặt một cách nhanh chóng, đồng thời không làm trầy xước da mặt bạn.','Trung Quốc','https://salt.tikicdn.com/cache/w444/ts/product/a2/6b/7f/0dd88ff7d371ea9312df1061a85979c8.jpg',1,10,3);
-- Loai Dich Vu
INSERT INTO LOAIDICHVU VALUES(MALDV_SEQ14.NEXTVAL,'Combo Cắt Gội',1);
INSERT INTO LOAIDICHVU VALUES(MALDV_SEQ14.NEXTVAL,'Dịch Vụ Uốn',1);
INSERT INTO LOAIDICHVU VALUES(MALDV_SEQ14.NEXTVAL,'Dịch Vụ Nhuộm',1);
INSERT INTO LOAIDICHVU VALUES(MALDV_SEQ14.NEXTVAL,'Dưỡng Và Phục Hồi Tóc',1);
INSERT INTO LOAIDICHVU VALUES(MALDV_SEQ14.NEXTVAL,'Chăm Sóc Da',1);
INSERT INTO LOAIDICHVU VALUES(MALDV_SEQ14.NEXTVAL,'Dịch Vụ Khác',1);
-- Dich Vu
SET DEFINE OFF;
DESCRIBE DICHVU
INSERT INTO DICHVU VALUES(MADV_SEQ6.NEXTVAL,'Combo Cắt',30000,'Tư vấn kiểu tóc hợp khuôn mặt  Cắt tóc tạo kiểu bởi stylist hàng đầu. Cạo mặt êm ái – xả sạch tóc con. Vuốt sáp – xịt gôm tạo kiểu cao cấp','https://s3-ap-southeast-1.amazonaws.com/we-xpats.com/articles/images/QvKRrjX7_gilU20RdXdQ1_ewaR_Ok3j4gnbIboc-Ww_ugF_1cmcuAuvjdHOUrzwGQIbRuXAzerPRooUEabykGw7Dk8unyWTyZjdCJSxu87gSpbavnOb4HsyLdAUxee2z2j8di0ew.jpeg',1,1);
INSERT INTO DICHVU VALUES(MADV_SEQ6.NEXTVAL,'Combo Cắt Gội 10 bước (60 phút)',199000,'1. Massage khai huyệt điều hòa. 2. Rửa mặt – massage tinh chất nha đam thẩm thấu. 3. Hút mụn – phun nước hoa hồng công nghệ cao. 4. Gội đầu massage bấm huyệt. 5. Massage rửa tai bọt sảng khoái. 6. Kéo khăn giãn cơ cổ - xối nước thác đổ. 7. Tư vấn kiểu tóc hợp khuôn mặt. 8. Cắt tóc tạo kiểu bởi stylist hàng đầu. 9. Cạo mặt êm ái – xả sạch tóc con. 10. Vuốt sáp – xịt gôm tạo kiểu cao cấp','https://britishm.vn/wp-content/uploads/2019/02/cham-soc-toc-ma-mac-phai-6-sai-lam-nay-bao-sao-toc-nam-gioi-luon-kho-cung-xo-roi.jpg',1,1);
INSERT INTO DICHVU VALUES(MADV_SEQ6.NEXTVAL,'Cắt – Xả - Tạo kiểu (30 phút)',70000,'1. Gội đầu xả tóc. 2. Tư vấn kiểu tóc hợp khuôn mặt. 3. Cắt tóc tạo kiểu bởi stylist hàng đầu. 4. Cạo mặt êm ái – xả sạch tóc con. 5. Vuốt sáp – xịt gôm tạo kiểu cao cấp.','https://cdn.sudospaces.com/website/topz.vn/home/topz/public_html/2019/12/3man-30shine-quang-ngai-320648.jpg',1,1);
INSERT INTO DICHVU VALUES(MADV_SEQ6.NEXTVAL,'Kid Combo (30 phút)',70000,'Đẹp trai không phân biệt độ tuổi. Ai bảo các bạn nhỏ thì không thể "làm đẹp" nào? QUY TRÌNH 5 BƯỚC. Bước 1: Gội đầu làm mềm tóc, sạch bụi bẩn. Bước 2: Tư vấn kiểu tóc gọn gàng, phù hợp với lứa tuổi, thể hiện cá tính, bản sắc riêng. Bước 3: Cắt tóc tạo kiểu. Bước 4: Gội xả kỹ càng sạch tóc con, giúp bé không cảm thấy khó chịu suốt cả ngày. Bước 5: Vuốt sáp đẹp trai.','https://st.quantrimang.com/photos/image/2020/04/08/cat-toc-cho-be-trai.jpg',1,1);
INSERT INTO DICHVU VALUES(MADV_SEQ6.NEXTVAL,'Gội Massage Dưỡng Sinh Vuốt Sáp Tạo Kiểu 8 bước',40000,'1. Massage khai huyệt điều hòa. 2. Rửa mặt – massage tinh chất nha đam thẩm thấu. 3. Hút mụn công nghệ cao. 4. Phun nước hoa hồng se khít lỗ chân lông. 5. Gội đầu massage, kết hợp loại bỏ gàu. 6. Massage rửa tai bọt sảng khoái. 7. Kéo khăn nóng giãn cơ cổ - Xối nước thác đổ giải tỏa căng thẳng. 8. Vuốt sáp – xịt gôm tạo kiểu cao cấp.','https://htluxury.vn/wp-content/uploads/2019/04/kieu-toc-nam-vuot-nguoc-1.jpg',1,1);
INSERT INTO DICHVU VALUES(MADV_SEQ6.NEXTVAL,'Uốn Cao Cấp',349000,'Uốn phồng là bí quyết để mái tóc luôn bồng bềnh vào nếp, đẹp như được vuốt tại salon. Chỉ cần làm một lần, form tóc đẹp giữ được vài tháng. Uốn phồng cao cấp được tăng cường thành phần Collagen và Keratin đem lại độ suôn mượt và độ bóng hoàn hảo cho tóc, phục hồi tóc hư tổn.','https://blog.hairbros.vn/wp-content/uploads/2019/01/kieu-toc-nam-uon-dep-nhat.jpg',1,2);
INSERT INTO DICHVU VALUES(MADV_SEQ6.NEXTVAL,'Uốn Tiêu Chuẩn',260000,'Uốn tạo kiểu là bí quyết để mái tóc luôn bồng bềnh vào nếp, đẹp như được vuốt tại salon. Chỉ cần làm một lần, form tóc đẹp giữ được vài tháng. Nếu anh sở hữu một mái tóc thưa, mỏng, uốn tóc sẽ giúp mái tóc trở nên bồng bềnh, tạo hiệu ứng trông dày hơn.','https://hervietnam.com.vn/wp-content/uploads/2019/05/Lay-mac-ao-den-toc-cat-layer-uon-xoan-nhe.jpg',1,2);
INSERT INTO DICHVU VALUES(MADV_SEQ6.NEXTVAL,'Uốn Con Sâu',499000,'Là kiểu uốn hoàn toàn mới đang tạo trend khắp châu Á. Uốn con sâu đem lại hình tượng thời trang, hiện đại, khỏe khoắn. Giúp mái tóc trở nên bồng bềnh, dày dặn hơn. Uốn con sâu giúp tóc luôn vào nếp dù không cần vuốt sáp tạo kiểu.','https://hagona.com/upload/images/kieu-toc-con-sau-3.jpg',1,2);
INSERT INTO DICHVU VALUES(MADV_SEQ6.NEXTVAL,'Uốn PREMLOCK',799000,'Là kiểu uốn tóc làm mưa làm gió trên khắp thế giới. Đây là kiểu tóc độc đáo, khác lạ đem lại phong cách khỏe khoắn, nam tính và hiện đại Châu Âu. Khi sở hữu Premlock anh sẽ không cần vuốt tóc tạo kiểu mỗi buổi sáng mà tóc vẫn luôn vào form chuẩn đẹp.','https://s4m.edu.vn/uploaded/73289672_402996823968583_4143822384626925568_n.jpg',1,2);
INSERT INTO DICHVU VALUES(MADV_SEQ6.NEXTVAL,'Nhuộm Đen Phủ Bạc',180000,'Nhuộm Đen Phủ Bạc','http://file.hstatic.net/1000260990/file/kieu_mau_nhuom_toc_dep_cho_nam_1_grande.jpg',1,3);
INSERT INTO DICHVU VALUES(MADV_SEQ6.NEXTVAL,'Nhuộm Nâu Cao Cấp',249000,'Nhuộm Nâu Cao Cấp','https://vn-test-11.slatic.net/original/255874af35cf1dcbcae8adbb9812ec6e.jpg_720x720q80.jpg_.webp',1,3);
INSERT INTO DICHVU VALUES(MADV_SEQ6.NEXTVAL,'Nhuộm Thời Trang Không Tẩy',289000,'Nhuộm Thời Trang Không Tẩy','https://hvn.cdnxbvn.com/wp-content/uploads/2019/01/Lee-Min-Ho-toc-nhuom-mau-nau-lanh-600x606.jpg',1,3);
INSERT INTO DICHVU VALUES(MADV_SEQ6.NEXTVAL,'Nhuộm Thời Trang Cần Tẩy',389000,'Nhuộm Thời Trang Cần Tẩy','https://tocnamdep.com/wp-content/uploads/2020/06/mau-toc-nam-dep-2.jpg',1,3);
INSERT INTO DICHVU VALUES(MADV_SEQ6.NEXTVAL,'Hấp Dưỡng Oliu',199000,'Là phương pháp dưỡng tóc bằng bơ dầu oliu chiết xuất hoàn toàn tự nhiên, rất tốt cho tóc. Giúp phục hồi tóc hư tổn, khô xơ, đem lại mái tóc bóng mượt, chắc khỏe. Phương pháp sử dụng biện pháp kích nhiệt để đưa dưỡng chất vào sâu bên trong sợi tóc và thẩm thấu vào da đầu đem lại hiệu quả lâu dài.','https://tinphongcach.vn/wp-content/uploads/2020/04/Kieu-nam-Han-Quoc-danh-cho-khuon-mat-tron.jpg',1,4);
INSERT INTO DICHVU VALUES(MADV_SEQ6.NEXTVAL,'Phục Hồi Nano',159000,'Là phương pháp dưỡng tóc hai lớp kết hợp với bắn súng nano công nghệ cao, hiệu quả siêu vượt trội. Lớp dưỡng đầu tiên giúp mở lớp biểu bì tóc và làm chắc khỏe lớp tóc từ bên ngoài. Lớp dưỡng thứ hai giúp nuôi dưỡng, phục hồi tóc từ sâu bên trong. Phương pháp bắn súng nano giúp đưa dưỡng chất vào sâu bên trong tủy tóc, giúp tóc khỏe từ bên trong, bóng mượt từ bên ngoài, hiệu quả lâu dài.','https://file.hstatic.net/1000096321/article/untitled-1.jpg',1,4);
INSERT INTO DICHVU VALUES(MADV_SEQ6.NEXTVAL,'Tẩy Da Chết',40000,'Tẩy Da Chết','https://leediors.com/wp-content/uploads/2020/04/cach-tay-te-bao-chet-cho-da-mat-tai-nha11.jpg',1,5);
INSERT INTO DICHVU VALUES(MADV_SEQ6.NEXTVAL,'Đắp Mặt Nạ Lạnh',40000,'Đắp Mặt Nạ Lạnh','https://www.boshop.vn/uploads/2019/11/26/5ddc9098e3ffd-tuyen-ba-nhon-hoat-dong-manh-o-tuoi-day-thi.jpg',1,5);
INSERT INTO DICHVU VALUES(MADV_SEQ6.NEXTVAL,'Lấy Mụn Mũi Chuyên Sâu',40000,'Lấy Mụn Mũi Chuyên Sâu','https://toixanh.com/wp-content/uploads/2019/03/cac-buoc-skincare-cho-nam-gioi-1280x720.jpg',1,5);
INSERT INTO DICHVU VALUES(MADV_SEQ6.NEXTVAL,'Detox Da Đầu',40000,'Detox Da Đầu','https://toixanh.com/wp-content/uploads/2019/03/cac-buoc-skincare-cho-nam-gioi-1280x720.jpg',1,4);
INSERT INTO DICHVU VALUES(MADV_SEQ6.NEXTVAL,'Lột Mụn Than Tre',40000,'Lột Mụn Than Tre','https://ae01.alicdn.com/kf/He2c5663f0c0f499483a713ee228c70220/ROREC-Than-Tre-en-M-t-N-B-n-L-t-M-n-u-en-T.jpg_Q90.jpg_.webp',1,5);
INSERT INTO DICHVU VALUES(MADV_SEQ6.NEXTVAL,'Lấy Ráy Tai',40000,'Lấy Ráy Tai','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLvTC1BEP6Ffqa8n5qYhdjJmVZR_cypvBzs8j7Qj4rMJ1WgtXLYJSh3pcU4Q8pXTdSOmo&usqp=CAU',1,6);
INSERT INTO DICHVU VALUES(MADV_SEQ6.NEXTVAL,'Giường Massage Nhật Bản',30000,'Giường Massage Nhật Bản','https://image-us.24h.com.vn/upload/4-2019/images/2019-11-07/hj-1573121560-842-width640height480.jpg',1,6);
INSERT INTO DICHVU VALUES(MADV_SEQ6.NEXTVAL,'Tẩy da chết – Đắp Mặt Nạ',50000,'Tẩy da chết – Đắp Mặt Nạ','https://toixanh.com/wp-content/uploads/2019/03/cac-buoc-skincare-cho-nam-gioi-1280x720.jpg',1,5);
INSERT INTO DICHVU VALUES(MADV_SEQ6.NEXTVAL,'Chăm Sóc Mụn. Lột Mụn Than Tre. Tẩy da chết. Đắp Mặt Nạ.',65000,'Chăm Sóc Mụn. Lột Mụn Than Tre. Tẩy da chết. Đắp Mặt Nạ.','https://toixanh.com/wp-content/uploads/2019/03/cac-buoc-skincare-cho-nam-gioi-1280x720.jpg',1,5);
INSERT INTO DICHVU VALUES(MADV_SEQ6.NEXTVAL,'Detox “muối lộc”. Tẩy Da Chết. Đắp Mặt Nạ Dưỡng Ẩm',68000,'Detox “muối lộc”. Tẩy Da Chết. Đắp Mặt Nạ Dưỡng Ẩm','https://toixanh.com/wp-content/uploads/2019/03/cac-buoc-skincare-cho-nam-gioi-1280x720.jpg',1,5);
--------------------------------------------TRIGGER--------------------------------------------------------------
-- TRIGGER 15
-- Ngày đặt lịch lớn hơn ngày sinh của khách hàng và nhân viên.
-- Khach Hang Sua
SET DEFINE OFF;
CREATE TRIGGER TRIGGER_15_KHACHHANG
AFTER UPDATE OF NGAYSINH ON KHACHHANG
FOR EACH ROW
DECLARE
    t_ngaydatlich DATLICH.Ngay%TYPE;
BEGIN 
    SELECT NGAY INTO t_ngaydatlich
    FROM (
        SELECT dl.ngay 
        from DATLICH dl 
        WHERE dl.MaKH=:NEW.MaKH
        ORDER BY dl.ngay ASC
    )
    WHERE ROWNUM=1;

    IF(:NEW.ngaysinh>=t_ngaydatlich)
    THEN 
        DBMS_OUTPUT.PUT_LINE('ERORR!!!!');
        RAISE_APPLICATION_ERROR(-2000, 'LOI !!!');
    END IF;
END;
DROP TRIGGER TRIGGER_15_KHACHHANG;
-- Test
UPDATE KHACHHANG SET KHACHHANG.ngaysinh=TO_DATE('21-10-2001','dd-mm-yyyy') WHERE KHACHHANG.MAKH=21;

-- Nhan Vien Sua

SET DEFINE OFF;
CREATE TRIGGER TRIGGER_15_NHANVIEN
AFTER UPDATE OF NGAYSINH ON NHANVIEN
FOR EACH ROW
DECLARE
    t_ngaydatlich DATLICH.Ngay%TYPE;
BEGIN
    SELECT NGAY INTO t_ngaydatlich
    FROM (
        SELECT dl.ngay 
        from DATLICH dl 
        WHERE dl.MaNV=:NEW.MaNV
        ORDER BY dl.ngay ASC
    )
    WHERE ROWNUM=1;

    IF(:NEW.ngaysinh>=t_ngaydatlich)
    THEN 
        DBMS_OUTPUT.PUT_LINE('ERORR!!!!');
        RAISE_APPLICATION_ERROR(-2000, 'LOI !!!');
    END IF;
END;
DROP TRIGGER TRIGGER_15_NHANVIEN;

-- Dat Lich Them Sua
SET DEFINE OFF;
CREATE TRIGGER TRIGGER_15_DATLICH
AFTER INSERT OR UPDATE ON DATLICH
FOR EACH ROW
DECLARE
    t_ngaysinhKH KHACHHANG.ngaysinh%TYPE;
    t_ngaysinhNV NHANVIEN.ngaysinh%TYPE;
BEGIN 
    SELECT nv.ngaysinh into t_ngaysinhNV
    FROM NHANVIEN nv
    WHERE nv.MANV=:NEW.MANV;

    SELECT kh.ngaysinh into t_ngaysinhKH
    FROM KHACHHANG kh
    WHERE kh.MaKH=:NEW.MaKH;

    IF(t_ngaysinhNV>=:NEW.ngay or t_ngaysinhKH>=:NEW.ngay)
    THEN 
        DBMS_OUTPUT.PUT_LINE('ERORR!!!!');
        RAISE_APPLICATION_ERROR(-2000, 'LOI !!!');
    END IF;
END;
DROP TRIGGER TRIGGER_15_DATLICH;

-- TRIGGER 19
-- Ngày vào làm của một nhân viên phải nhỏ hơn hoặc bằng ngày đặt lịch.
-- Nhan Vien Sua
SET DEFINE OFF;
CREATE TRIGGER TRIGGER_19_NHANVIEN
AFTER UPDATE OF NGAYVAOLAM ON NHANVIEN
FOR EACH ROW
DECLARE
    t_ngaydatlich DATLICH.Ngay%TYPE;
BEGIN
    SELECT NGAY into t_ngaydatlich
    FROM (
        SELECT dl.ngay 
        FROM DATLICH dl 
        WHERE dl.MaNV=:NEW.MaNV
        ORDER BY dl.ngay ASC
    )
    WHERE ROWNUM=1;

    IF(:NEW.NgayVaoLam>=t_ngaydatlich)
    THEN 
        DBMS_OUTPUT.PUT_LINE('ERORR!!!!');
        RAISE_APPLICATION_ERROR(-2000, 'LOI !!!');
    END IF;
END;
DROP TRIGGER TRIGGER_19_NHANVIEN;

-- Dat Lich Sua
SET DEFINE OFF;
CREATE TRIGGER TRIGGER_19_DATLICH
AFTER UPDATE OF NGAY ON DATLICH
FOR EACH ROW
DECLARE
    t_ngayvaolam NHANVIEN.NgayVaoLam%TYPE;
BEGIN 
    SELECT nv.NgayVaoLam into t_ngayvaolam
    FROM NHANVIEN nv
    WHERE nv.MaNV=:NEW.MaNV;

    IF(t_ngayvaolam>=:NEW.ngay)
    THEN 
        DBMS_OUTPUT.PUT_LINE('ERORR!!!!');
        RAISE_APPLICATION_ERROR(-2000, 'LOI !!!');
    END IF;
END;
DROP TRIGGER TRIGGER_19_DATLICH;
-- Trigger 23
-- Khách hàng VIP sẽ được giảm 10% trên tổng mỗi hoá đơn. 
-- Khach Hang Sua
SET DEFINE OFF;
CREATE TRIGGER TRIGGER_23_KHACHHANG
AFTER UPDATE OF LOAIKH ON KHACHHANG
FOR EACH ROW
DECLARE
BEGIN 
END;
DROP TRIGGER TRIGGER_23_KHACHHANG;
-- Hoa Don Them Sua
SET DEFINE OFF;
CREATE TRIGGER TRIGGER_23_HOADON
AFTER INSERT OR UPDATE ON HOADON
FOR EACH ROW
DECLARE
    v_loaiKH LOAIKHACHHANG.LOAIKH%TYPE;
BEGIN 
    SELECT lkh.LoaiKH into v_loaiKH
    FROM LOAIKHACHHANG lkh
    WHERE lkh.MaKH=:NEW.MaKH;

    IF(v_loaiKH!='Member')
    THEN 
        UPDATE HOADON SET HOADON.TongTien= HOADON.TongTien * 0.9 WHERE HOADON.MAHD=:NEW.MaHD;
    END IF;
END;
DROP TRIGGER TRIGGER_23_HOADON;
-- Trigger 27
-- Lương thưởng tháng sẽ được tính theo công thức: Lương cơ bản * Trung bình số sao của tháng đó * 0,01.
-- Nhan Luong Them Sua
SET DEFINE OFF;
CREATE TRIGGER TRIGGER_27_NHANLUONG
AFTER INSERT OR UPDATE OF LUONGCOBAN ON NHANLUONG
FOR EACH ROW
DECLARE
    v_danhgia float(2);
BEGIN 
    SELECT ROUND(AVG(DANHGIA),2) into v_danhgia
    FROM DANHGIANHANVIEN dgnv
    WHERE dgnv.MaNV=:NEW.MaNV
    GROUP BY dgnv.MaNV;

    UPDATE NhanLuong SET NhanLuong.LuongThuong= :NEW.LuongCoBan*v_danhgia*0.01 WHERE NhanLuong.MANV=:NEW.MaNV;
END;
-- DanhGiaNhanVien Them Sua
SET DEFINE OFF;
CREATE TRIGGER TRIGGER_27_DanhGiaNhanVien
AFTER INSERT OR UPDATE OF DanhGia ON DanhGiaNhanVien
FOR EACH ROW
DECLARE
    v_danhgia float(2);
BEGIN 
    SELECT ROUND(AVG(DANHGIA),2) into v_danhgia
    FROM DANHGIANHANVIEN dgnv
    WHERE dgnv.MaNV=:NEW.MaNV
    GROUP BY dgnv.MaNV;

    UPDATE NhanLuong SET NhanLuong.LuongThuong= :NEW.LuongCoBan*v_danhgia*0.01 WHERE NhanLuong.MANV=:NEW.MaNV;
END;
-- TRIGGER 16
-- Ngày sinh của nhân viên nhỏ hơn ngày hiện tại.
-- Nhan vien them sua
SET SERVEROUTPUT ON;
SET DEFINE OFF;
CREATE OR REPLACE TRIGGER TRIGGER_16_NHANVIEN 
AFTER INSERT OR UPDATE ON NHANVIEN
FOR EACH ROW
DECLARE
    var_ngaysinh NHANVIEN.NgaySinh%TYPE;
BEGIN
    SELECT NHANVIEN.NgaySinh into var_ngaysinh
    FROM NHANVIEN
    WHERE NHANVIEN.MaNV=:NEW.MaNV;
    IF (:NEW.NgaySinh > CURRENT_DATE)
    THEN 
    RAISE_APPLICATION_ERROR(-20002, 'Ngay sinh cua nhan vien phai be hon ngay hien tai');
    ELSE 
        DBMS_OUTPUT.PUT_LINE('Them thanh cong');
    END IF;
END;
select * from user_errors;
DROP TRIGGER TRIGGER_16_NHANVIEN;

--TRIGGER 17
-- Ngày sinh của khách hàng nhỏ hơn ngày hiện tại.
-- ALTER TABLE KHACHHANG ADD CONSTRAINT CHK_KHACHHANG2 CHECK (KhachHang.NgaySinh < CURRENT_DATE);
SET SERVEROUTPUT ON;
SET DEFINE OFF;
CREATE OR REPLACE TRIGGER TRIGGER_17_KHACHHANG 
AFTER INSERT OR UPDATE ON KHACHHANG
FOR EACH ROW
DECLARE
    var_ngaysinh KHACHHANG.NgaySinh%TYPE;
BEGIN
    SELECT KHACHHANG.NgaySinh into var_ngaysinh
    FROM KHACHHANG
    WHERE KHACHHANG.MaKH=:NEW.MaKH;
    IF (:NEW.NgaySinh > CURRENT_DATE)
    THEN 
    RAISE_APPLICATION_ERROR(-20002, 'Ngay sinh cua khach hang phai be hon ngay hien tai');
    ELSE 
        DBMS_OUTPUT.PUT_LINE('Them thanh cong');
    END IF;
END;

-- TRIGGER 20
--Tổng tiền của một hoá đơn bằng tổng tiền của tất cả dịch vụ và sản phẩm.
-- San pham sua
SET DEFINE OFF;
CREATE OR REPLACE TRIGGER TRIGGER_20_SANPHAM
AFTER UPDATE ON SANPHAM
FOR EACH ROW
DECLARE
BEGIN

END;

-- Dich vu Sua
SET DEFINE OFF;
CREATE OR REPLACE TRIGGER TRIGGER_20_DICHVU
AFTER UPDATE ON DICHVU
FOR EACH ROW
DECLARE
BEGIN

END;

-- Chi tiet hoa don dich vu them sua

-- Chi tiet hoa don dich vu xoa

-- Chi tiet hoa don san pham them sua

-- Chi tiet hoa don san pham xoa

-- Hoa don sua

-- CHECK 24 
--Loại khách hàng VIP sẽ hết hạn sau 1 năm kể từ ngày kích hoạt VIP.
ALTER TABLE LOAIKHACHHANG ADD CONSTRAINT CHK_LOAIKHACHHANG3 CHECK (
    (EXTRACT(DAY FROM NgayKichHoatVip) = EXTRACT(DAY FROM NgayHetHanVip)) 
    AND (EXTRACT(MONTH FROM NgayKichHoatVip) = EXTRACT(MONTH FROM NgayHetHanVip)) 
    AND (EXTRACT(YEAR FROM NgayHetHanVip) - EXTRACT(YEAR FROM NgayKichHoatVip) = 1));

--TRIGGER 28 
--Lương thưởng tháng 12 sẽ được tính theo công thức: Lương cơ bản * Trung bình số sao của tháng đó * 0,1.
-- Nhan luong  Them Sua
SET DEFINE OFF;
CREATE TRIGGER TRIGGER_28_NHANLUONG
AFTER INSERT OR UPDATE OF LUONGCOBAN ON NHANLUONG
FOR EACH ROW
DECLARE
    var_danhgia float(2);
BEGIN 
    SELECT ROUND(AVG(DANHGIA),2) into var_danhgia
    FROM DANHGIANHANVIEN dgnv
    WHERE dgnv.MaNV=:NEW.MaNV
    AND EXTRACT (MONTH FROM NgayDanhGia)=12
    GROUP BY dgnv.MaNV;

    UPDATE NhanLuong SET NhanLuong.LuongThuong= :NEW.LuongCoBan*var_danhgia*0.1 WHERE NhanLuong.MANV=:NEW.MaNV;
END;
-- DanhGiaNhanVien Them Sua
SET DEFINE OFF;
CREATE TRIGGER TRIGGER_28_DanhGiaNhanVien
AFTER INSERT OR UPDATE OF DanhGia ON DanhGiaNhanVien
FOR EACH ROW
DECLARE
    var_danhgia float(2);
BEGIN 
    SELECT ROUND(AVG(DANHGIA),2) into var_danhgia
    FROM DANHGIANHANVIEN dgnv
    WHERE dgnv.MaNV=:NEW.MaNV
    AND EXTRACT (MONTH FROM NgayDanhGia)=12
    GROUP BY dgnv.MaNV;

    UPDATE NhanLuong SET NhanLuong.LuongThuong=LuongCoBan*var_danhgia*0.1 WHERE NhanLuong.MANV=:NEW.MaNV;
END;
--------------------------------
SELECT * FROM SANPHAM WHERE SANPHAM.MASP =2;

---- Trigger 18 ----
---- tuổi của nhân viên phải từ 15 tuổi trở lên
ALTER TABLE NhanVien
ADD CONSTRAINT CHK_NHANVIEN_AGE
        CHECK(EXTRACT(YEAR FROM NGAYVAOLAM) - EXTRACT(YEAR FROM NgaySinh) >= 15);
ALTER TABLE NhanVien DROP CONSTRAINT CHK_NHANVIEN_AGE;
---- Trigger 22 ----
--- cứ mỗi 100000 trong hóa đơn sẽ +10 điểm vào điểm tích lũy
-- thêm trên bảng HOADON
SET DEFINE OFF;
CREATE TRIGGER TRIGGER_22_INSERTHOADON
AFTER INSERT ON HOADON
FOR EACH ROW 
DECLARE
       
BEGIN
        UPDATE KHACHHANG SET KHACHHANG.DIEMTICHLUY = KHACHHANG.DIEMTICHLUY 
                                                + TRUNC(:NEW.TONGTIEN/10000)
        WHERE KHACHHANG.MAKH = :NEW.MAKH;       
END;    

DROP TRIGGER TRIGGER_22_INSERTHOADON;
-- cập nhật trên bảng hóa đơn
SET DEFINE OFF;
CREATE TRIGGER TRIGGER_22_UPDATEHOADON
AFTER UPDATE OF TONGTIEN ON HOADON
FOR EACH ROW 
DECLARE
BEGIN

        UPDATE KHACHHANG SET KHACHHANG.DIEMTICHLUY = KHACHHANG.DIEMTICHLUY 
                                                 - TRUNC(:OLD.TONGTIEN/10000)
        WHERE KHACHHANG.MAKH = :NEW.MAKH;
    
        UPDATE KHACHHANG SET KHACHHANG.DIEMTICHLUY = KHACHHANG.DIEMTICHLUY 
                                                + TRUNC(:NEW.TONGTIEN/10000)
        WHERE KHACHHANG.MAKH = :NEW.MAKH;  
END;    
DROP TRIGGER TRIGGER_22_UPDATEHOADON;

----trigger 26
SELECT KhungGio 
FROM GioDat
WHERE MaGio not in (
    SELECT MaGio 
    FROM DatLich
    WHERE MaNV = 1
);
SELECT MaGio 
    FROM DatLich
    WHERE MaNV = 1
SELECT KHUNGGIO FROM GIODAT WHERE MAGIO NOT IN (SELECT MAGIO FROM DATLICH WHERE MANV = 43)
select * from giodat
--------------------------------
DESCRIBE DANHGIANHANVIEN
SELECT * FROM DANHGIANHANVIEN
INSERT INTO DANHGIANHANVIEN VALUES (MADGNV_SEQ12.NEXTVAL,1,1,To_Date('04-04-2021','dd-mm-yyyy'),5,'Good skill',1)
INSERT INTO DANHGIANHANVIEN VALUES (MADGNV_SEQ12.NEXTVAL,2,1,To_Date('04-04-2021','dd-mm-yyyy'),4,'Good skill',1)
INSERT INTO DANHGIANHANVIEN VALUES (MADGNV_SEQ12.NEXTVAL,3,2,To_Date('04-04-2021','dd-mm-yyyy'),5,'Good skill',1)
DESCRIBE HOADON
INSERT INtO HOADON VALUES (MAHD_SEQ11.NEXTVAL,1,0,50000,1);
INSERT INtO HOADON VALUES(MAHD_SEQ11.NEXTVAL,2,0,50000,1);
INSERT INtO HOADON VALUES(MAHD_SEQ11.NEXTVAL,3,0,50000,0);
SELECT * FROM CTHDSP
DESCRIBE CTHDDV
DESCRIBE CTHDSP
INSERT INTO CTHDDV VALUES (1, 1);
INSERT INTO CTHDDV VALUES (3, 1);
INSERT INTO CTHDSP VALUES (2 ,3,1);

SELECT * FROM LOAIDICHVU
ALTER TABLE DICHVU
    ADD MALDV       NUMBER  NOT NULL;
SELECT TENDICHVU,MADV,GIA FROM DICHVU
WHERE MALDV =3
DELETE FROM DatLich
SELECT MADV,TENDICHVU,GIA FROM DICHVU
WHERE MADV in(
    SELECT MADV From DatLich
    WHERE   MAKH =  (
                        SELECT MAKH FROM DATLICH
                        WHERE MADL = 5
                    ) 
        and MAGIO = (
                        SELECT MAGIO FROM DATLICH
                        WHERE MADL = 5
                    )
        and MANV =  (
                        SELECT MANV FROM DATLICH
                        WHERE MADL = 5
                    )    
)        
SELECT KHACHHANG.TEN,KHACHHANG.HO, GIODAT.KHUNGGIO, DATLICH.MADL, NHANVIEN.TEN
FROM KHACHHANG,GIODAT,DATLICH,NHANVIEN
WHERE   KHACHHANG.MAKH =    (
                                SELECT MAKH FROM DATLICH
                                WHERE MADL = 4
                            )
    and GIODAT.MAGIO =      (
                                SELECT MAGIO FROM DATLICH
                                WHERE MADL = 4
                            )
    and NHANVIEN.MANV =    (
                                SELECT MANV FROM DATLICH
                                WHERE MADL = 4
                            )
    and DATLICH.MADL = 4;
SELECT * FROM DATLICH
SELECT KHACHHANG.TEN,KHACHHANG.HO, GIODAT.KHUNGGIO, DATLICH.MADL, TO_DATE(DATLICH.NGAY,'dd-mm-yyyy'), NHANVIEN.TEN, NHANVIEN.HO FROM KHACHHANG,GIODAT,DATLICH,NHANVIEN WHERE   KHACHHANG.MAKH =    ( SELECT MAKH FROM DATLICH WHERE MADL = 5 ) and GIODAT.MAGIO = ( SELECT MAGIO FROM DATLICH WHERE MADL = 5)and NHANVIEN.MANV =(SELECT MANV FROM DATLICH WHERE MADL = 5 ) and DATLICH.MADL = 5

SELECT EXTRACT(YEAR FROM DATLICH.NGAY) AS YEAR,EXTRACT(MONTH FROM DATLICH.NGAY) AS MONTH,EXTRACT(DAY FROM DATLICH.NGAY) AS DAY FROM DATLICH
WHERE MADL = 5;
DELETE FROM NHANVIEN 
WHERE MANV =8
SELECT LOAINHANVIEN FROM NHANVIEN WHERE MANV = 9
SELECT  DISTINCT dl.ngay,gd.khunggio, ROW_NUMBER() FROM DATLICH dl,KHACHHANG kh,NHANVIEN nv,GIODAT gd,DICHVU dv 
                    WHERE dl.MANV=nv.MANV 
                    AND dl.MAKH=kh.MAKH 
                    AND dl.MAGIO=gd.MAGIO
                    AND dl.MADV=dv.MADV
ORDER BY dl.NGAY;
SELECT dl.madl, dl.ngay,gd.khunggio, kh.ho, kh.ten, nv.ho, nv.ten FROM DATLICH dl,KHACHHANG kh,NHANVIEN nv,GIODAT gd,DICHVU dv 
                    WHERE dl.MANV=nv.MANV 
                    AND dl.MAKH=kh.MAKH 
                    AND dl.MAGIO=gd.MAGIO
                    AND dl.MADV=dv.MADV
ORDER BY dl.NGAY;
SELECT DISTINCT NGAY,MAGIO,MAKH FROM DATLICH
ORDER BY NGAY,MAGIO;

SELECT NGAY, MAGIO, MAKH FROM DATLICH
ORDER BY NGAY,MAGIO;
-- SELECT column_name(s)
-- FROM table_name
-- ORDER BY column_name(s)
-- FETCH FIRST number ROWS ONLY;

SELECT DISTINCT dl.ngay,gd.khunggio, kh.ho, kh.ten, nv.ho, nv.ten FROM DATLICH dl,KHACHHANG kh,NHANVIEN nv,GIODAT gd,DICHVU dv 
                    WHERE dl.MANV=nv.MANV 
                    AND dl.MAKH=kh.MAKH 
                    AND dl.MAGIO=gd.MAGIO 
                    AND dl.MADV=dv.MADV
ORDER BY dl.Ngay;
SELECT  dl.madl, dl.ngay,gd.khunggio, kh.ho, kh.ten, nv.ho, nv.ten FROM DATLICH dl,KHACHHANG kh,NHANVIEN nv,GIODAT gd,DICHVU dv 
                    WHERE dl.MANV=nv.MANV 
                    AND dl.MAKH=kh.MAKH 
                    AND dl.MAGIO=gd.MAGIO 
                    AND dl.MADV=dv.MADV
GROUP BY dl.ngay,gd.khunggio, kh.ho, kh.ten, nv.ho, nv.ten
ORDER BY dl.Ngay;
SELECT * FROM DATLICH;
ALTER TABLE DATLICH
ADD TINHTRANG number DEFAULT 1;
SELECT TO_CHAR(NGAY,'dd/mm/yyyy') FROM DatLich

SELECT MAGIO,KHUNGGIO FROM GIODAT 
WHERE MAGIO NOT IN (
    SELECT MAGIO FROM DATLICH 
    WHERE MANV = :id 
        AND DATLICH.NGAY = TO_DATE(:day,'dd-mm-yyyy')) 
ORDER BY MAGIO

SELECT MADV,TENDICHVU,GIA FROM DICHVU 
WHERE MADV in (
    SELECT MADV From DatLich 
    WHERE   MAKH = (SELECT MAKH FROM DATLICH WHERE MADL = 66 ) 
        and MAGIO = ( SELECT MAGIO FROM DATLICH WHERE MADL = 66 ) 
        and MANV =  ( SELECT MANV FROM DATLICH WHERE MADL = 66 )
        and NGAY = (SELECT NGAY FROM DATLICH WHERE MADL =66))