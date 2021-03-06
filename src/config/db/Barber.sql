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
DESCRIBE NHANLUONG
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
INSERT INTO LOAISANPHAM VALUES(MALSP_SEQ7.NEXTVAL,'Ch??m s??c t??c',1);			
INSERT INTO LOAISANPHAM VALUES(MALSP_SEQ7.NEXTVAL,'Ch??m s??c da',1);			
INSERT INTO LOAISANPHAM VALUES(MALSP_SEQ7.NEXTVAL,'D???ng c??? l??m t??c',1);			
INSERT INTO LOAISANPHAM VALUES(MALSP_SEQ7.NEXTVAL,'D???ng c??? skincare',1);	
-- San Pham
SET DEFINE OFF;
INSERT INTO SANPHAM VALUES(MASP_SEQ8.NEXTVAL,'G??M X???T T??C LADY KILLER',130000,'Kh??? n??ng gi??? n???p v?????t tr???i, t???o ????? c???ng v???a ph???i m?? v???n ?????m b???o m??i t??c c?? ????? b???ng nh???t ?????nh. Ngay c??? khi ?????i m?? b???o hi???m ra ???????ng, g??m x???t t??c Lady Killer v???n gi??? ???????c n???p t??c ?????p nh?? m???i.','Vi???t Nam','https://cf.shopee.vn/file/08e6cff4ed886c2e3629d8627d6c8717_tn',1,100,1);										
INSERT INTO SANPHAM VALUES(MASP_SEQ8.NEXTVAL,'S??p Kevin Murphy 30g',290000,'C??ng d???ng s??p vu???t t??c Kevin Murphy Rough Rider:M??i th??m k???o Toffee + caramel d???u nh???. ????? gi??? n???p cao 10/10. Kh??ng g??y b???t d??nh. C?? kh??? n??ng th???m h??t d???u. T???o cho t??c c???m gi??c kh??. Texture v?? volume ?????p v?? r?? n??t. S???n ph???m t???o ki???u t??? nhi??n, kh??ng b??ng t??c','??c','https://hanomart.com/public/media/images/kevin%205.jpg',1,50,1);
INSERT INTO SANPHAM VALUES(MASP_SEQ8.NEXTVAL,'SRM Skin&Dr Tr??m tr??',200000,'L??m s???ch s??u, lo???i b??? b???i b???n v?? b?? nh???n. T???y t??? b??o ch???t tr??n da, gi??p l??? ch??n l??ng th??ng tho??ng. C??n b???ng ????? PH, c???p ???m v?? duy tr?? ????? ???m cho l??n da m???n m??ng, t????i s??ng. Lo???i b??? d???u th???a v?? se kh??t l??? ch??n l??ng. Di???t khu???n, kh??ng vi??m, ng??n ng???a m???n tr???ng c??. L??m m??? v???t th??m m???n, gi??p da s??ng ?????u m??u v?? kh???e m???nh.','H??n Qu???c','https://file.hstatic.net/1000306701/file/p1977294_8f9691ae71a842ffb8abdb66eff9ebac_grande.jpg',1,30,2);
INSERT INTO SANPHAM VALUES(MASP_SEQ8.NEXTVAL,'M???t n??? SNP S??m d?????ng tr???ng',9000,'D?????ng tr???ng, ng??n ng???a l??o h??a: M???t n??? c?? ch???a niaciamin v?? axit adenosine l?? th??nh ph???n gi??p d?????ng da tr???ng s??ng, ?????ng th???i c???i thi???n n???p nh??n v?? gi??p ph??ng ng???a hi???n t?????ng l??o h??a. Cung c???p d?????ng ch???t cho l??n da s???m m??u, da nh??o hay thi???u ????? ????n h???i tr??? n??n s??n ch???c gi??u s???c s???ng.','H??n Qu???c','https://product.hstatic.net/1000126467/product/mat-na-duong-trang-tinh-chat-nhan-sam-snp-ginseng-essence-mask-25ml-1_2ee656e4727f49ec9188d4aa6a7ea654_grande.jpg',1,50,2);
INSERT INTO SANPHAM VALUES(MASP_SEQ8.NEXTVAL,'Glanzen Box T???o Ki???u Basic 1',653000,'Box ?????p trai di???n t???t','Vi???t Nam','https://file.hstatic.net/1000306701/file/1_1ab621cdf5504a25bc218354166ddcd5_grande.jpg',1,50,1);							
INSERT INTO SANPHAM VALUES(MASP_SEQ8.NEXTVAL,'Glanzen Box T???o Ki???u Basic 2',653000,'Box ?????p trai di???n t???t','Vi???t Nam','https://file.hstatic.net/1000306701/file/11_6ef495619b454d698103ab4b5e3a40c2_grande.jpg',1,50,1);
INSERT INTO SANPHAM VALUES(MASP_SEQ8.NEXTVAL,'Glanzen Box Ch??m S??c T??c U???n/Nhu???m 3',550000,'Kh??ng c??n lo l???ng t??c h?? t???n khi s??? d???ng m??y s???y v???i b??? ????i M??y s???y Furin v?? D???u G???i Gi??? M??u Farcom. M??y s???y Furin v???i c??ng ngh??? cao ?????n t??? Nh???t B???n, gi??p b???o v??? t??c t???i ??a trong qu?? tr??nh s??? d???ng. K???t h???p v???i D???u G???i Gi??? M??u Farcom gi??p t??c lu??n c?? l???p b???o v??? ho??n h???o, b???t ch???p t??c ?????ng c???a nhi???t c??ng nh?? ngo???i c???nh.','?????c','https://file.hstatic.net/1000306701/file/2_fe8d82ef1e70461b973251a36e7b657c_grande.jpg',1,30,1);											
INSERT INTO SANPHAM VALUES(MASP_SEQ8.NEXTVAL,'T??ng ???? C???t T??c Kh??ng D??y Chuy??n Nghi???p Kemei KM-809A',249000,'S???n ph???m c?? m??n h??nh LCD hi???n th??? dung l?????ng pin l?????i th??p kh??ng g???. ???????c trang b??? v???i 4 c??? d??i kh??c nhau (3mm, 6 mm, 10 mm, 13 mm). S??? d???ng ???????c c??? d??y v?? kh??ng d??y s??? d???ng k??p, kh??ng c??n lo l???ng v??? kh??ng c?? ??i???n, thu???n ti???n h??n.C?? b???n LED hi???n th??? dung l?????ng pin.T??ng ???? s??? d???ng pin s???c ( kh??ng d??y). Th???i gian s???c 4gi??? s??? d???ng 140 ph??t. L?????i b???ng th??p chuy??n d???ng m??i s??? d???ng nhi???u l???n. ??i???n ??p ?????u v??o: AC 110-240v 50/60 hz. C??ng su???t Ti??u Th???: 5w','HongKong','https://cf.shopee.vn/file/8cc3de7a9ff92698f1cee6c09e661994',1,20,3);
INSERT INTO SANPHAM VALUES(MASP_SEQ8.NEXTVAL,'M??y R???a M???t Foreo Luna Mini',2590000,'M???t chi???c m??y r???a m???t kute nh??? g???n, xinh x???n m?? theo nh?? m?? t??? tr??n trang ch??? c???a h??ng Foreo th?? n?? ???cho tr???i nhi???m nh?? ??? spa???.','Thu??? ??i???n','https://cf.shopee.vn/file/94b33f549301bb9e2b4ad963de40027f',1,10,4);						
INSERT INTO SANPHAM VALUES(MASP_SEQ8.NEXTVAL,'M??y C???o R??u Mini C???m Tay Si??u Nh??? C?? Th??? S???c L???i Runwe RS89',350000,'T???c ?????u c???t si??u t???c ????? thi???t k??? ki???u cong v??m c?? th??? ??m s??t m???i g??c c???nh, c???t s???ch m???i lo???i r??u c???ng ?????u nh???t, ?????u m??y c???o r??u c?? th??? th??o r???i v?? r???a v???i n?????c. Ch???c n??ng s???c l???i th??ng minh s???c 2h c?? th??? s??? d???ng ?????n 20 ng??y c???o, ?????m b???o an to??n, th??ch h???p mang theo khi ??i du l???ch, c??ng t??c. T???c ????? quay cao l??n t???i 4500 v??ng, gi??p l?????i dao c???o c?? th??? c???o s???ch r??u tr??n m???t m???t c??ch nhanh ch??ng, ?????ng th???i kh??ng l??m tr???y x?????c da m???t b???n.','Trung Qu???c','https://salt.tikicdn.com/cache/w444/ts/product/a2/6b/7f/0dd88ff7d371ea9312df1061a85979c8.jpg',1,10,3);
-- Loai Dich Vu
INSERT INTO LOAIDICHVU VALUES(MALDV_SEQ14.NEXTVAL,'Combo C???t G???i',1);
INSERT INTO LOAIDICHVU VALUES(MALDV_SEQ14.NEXTVAL,'D???ch V??? U???n',1);
INSERT INTO LOAIDICHVU VALUES(MALDV_SEQ14.NEXTVAL,'D???ch V??? Nhu???m',1);
INSERT INTO LOAIDICHVU VALUES(MALDV_SEQ14.NEXTVAL,'D?????ng V?? Ph???c H???i T??c',1);
INSERT INTO LOAIDICHVU VALUES(MALDV_SEQ14.NEXTVAL,'Ch??m S??c Da',1);
INSERT INTO LOAIDICHVU VALUES(MALDV_SEQ14.NEXTVAL,'D???ch V??? Kh??c',1);
-- Dich Vu
SET DEFINE OFF;
DESCRIBE DICHVU
INSERT INTO DICHVU VALUES(MADV_SEQ6.NEXTVAL,'Combo C???t',30000,'T?? v???n ki???u t??c h???p khu??n m???t  C???t t??c t???o ki???u b???i stylist h??ng ?????u. C???o m???t ??m ??i ??? x??? s???ch t??c con. Vu???t s??p ??? x???t g??m t???o ki???u cao c???p','https://s3-ap-southeast-1.amazonaws.com/we-xpats.com/articles/images/QvKRrjX7_gilU20RdXdQ1_ewaR_Ok3j4gnbIboc-Ww_ugF_1cmcuAuvjdHOUrzwGQIbRuXAzerPRooUEabykGw7Dk8unyWTyZjdCJSxu87gSpbavnOb4HsyLdAUxee2z2j8di0ew.jpeg',1,1);
INSERT INTO DICHVU VALUES(MADV_SEQ6.NEXTVAL,'Combo C???t G???i 10 b?????c (60 ph??t)',199000,'1. Massage khai huy???t ??i???u h??a. 2. R???a m???t ??? massage tinh ch???t nha ??am th???m th???u. 3. H??t m???n ??? phun n?????c hoa h???ng c??ng ngh??? cao. 4. G???i ?????u massage b???m huy???t. 5. Massage r???a tai b???t s???ng kho??i. 6. K??o kh??n gi??n c?? c??? - x???i n?????c th??c ?????. 7. T?? v???n ki???u t??c h???p khu??n m???t. 8. C???t t??c t???o ki???u b???i stylist h??ng ?????u. 9. C???o m???t ??m ??i ??? x??? s???ch t??c con. 10. Vu???t s??p ??? x???t g??m t???o ki???u cao c???p','https://britishm.vn/wp-content/uploads/2019/02/cham-soc-toc-ma-mac-phai-6-sai-lam-nay-bao-sao-toc-nam-gioi-luon-kho-cung-xo-roi.jpg',1,1);
INSERT INTO DICHVU VALUES(MADV_SEQ6.NEXTVAL,'C???t ??? X??? - T???o ki???u (30 ph??t)',70000,'1. G???i ?????u x??? t??c. 2. T?? v???n ki???u t??c h???p khu??n m???t. 3. C???t t??c t???o ki???u b???i stylist h??ng ?????u. 4. C???o m???t ??m ??i ??? x??? s???ch t??c con. 5. Vu???t s??p ??? x???t g??m t???o ki???u cao c???p.','https://cdn.sudospaces.com/website/topz.vn/home/topz/public_html/2019/12/3man-30shine-quang-ngai-320648.jpg',1,1);
INSERT INTO DICHVU VALUES(MADV_SEQ6.NEXTVAL,'Kid Combo (30 ph??t)',70000,'?????p trai kh??ng ph??n bi???t ????? tu???i. Ai b???o c??c b???n nh??? th?? kh??ng th??? "l??m ?????p" n??o? QUY TR??NH 5 B?????C. B?????c 1:??G???i ?????u l??m m???m t??c, s???ch b???i b???n. B?????c 2:??T?? v???n ki???u t??c g???n g??ng, ph?? h???p v???i l???a tu???i, th??? hi???n c?? t??nh, b???n s???c ri??ng. B?????c 3:??C???t t??c t???o ki???u. B?????c 4:??G???i x??? k??? c??ng s???ch t??c con, gi??p b?? kh??ng c???m th???y kh?? ch???u su???t c??? ng??y. B?????c 5:??Vu???t s??p ?????p trai.','https://st.quantrimang.com/photos/image/2020/04/08/cat-toc-cho-be-trai.jpg',1,1);
INSERT INTO DICHVU VALUES(MADV_SEQ6.NEXTVAL,'G???i Massage D?????ng Sinh Vu???t S??p T???o Ki???u 8 b?????c',40000,'1. Massage khai huy???t ??i???u h??a. 2. R???a m???t ??? massage tinh ch???t nha ??am th???m th???u. 3. H??t m???n c??ng ngh??? cao. 4. Phun n?????c hoa h???ng se kh??t l??? ch??n l??ng. 5. G???i ?????u massage, k???t h???p lo???i b??? g??u. 6. Massage r???a tai b???t s???ng kho??i. 7. K??o kh??n n??ng gi??n c?? c??? - X???i n?????c th??c ????? gi???i t???a c??ng th???ng. 8. Vu???t s??p ??? x???t g??m t???o ki???u cao c???p.','https://htluxury.vn/wp-content/uploads/2019/04/kieu-toc-nam-vuot-nguoc-1.jpg',1,1);
INSERT INTO DICHVU VALUES(MADV_SEQ6.NEXTVAL,'U???n Cao C???p',349000,'U???n ph???ng l?? b?? quy???t ????? m??i t??c lu??n b???ng b???nh v??o n???p, ?????p nh?? ???????c vu???t t???i salon. Ch??? c???n l??m m???t l???n, form t??c ?????p gi??? ???????c v??i th??ng. U???n ph???ng cao c???p ???????c t??ng c?????ng th??nh ph???n Collagen v?? Keratin ??em l???i ????? su??n m?????t v?? ????? b??ng ho??n h???o cho t??c, ph???c h???i t??c h?? t???n.','https://blog.hairbros.vn/wp-content/uploads/2019/01/kieu-toc-nam-uon-dep-nhat.jpg',1,2);
INSERT INTO DICHVU VALUES(MADV_SEQ6.NEXTVAL,'U???n Ti??u Chu???n',260000,'U???n t???o ki???u l?? b?? quy???t ????? m??i t??c lu??n b???ng b???nh v??o n???p, ?????p nh?? ???????c vu???t t???i salon. Ch??? c???n l??m m???t l???n, form t??c ?????p gi??? ???????c v??i th??ng. N???u anh s??? h???u m???t m??i t??c th??a, m???ng, u???n t??c s??? gi??p m??i t??c tr??? n??n b???ng b???nh, t???o hi???u ???ng tr??ng d??y h??n.','https://hervietnam.com.vn/wp-content/uploads/2019/05/Lay-mac-ao-den-toc-cat-layer-uon-xoan-nhe.jpg',1,2);
INSERT INTO DICHVU VALUES(MADV_SEQ6.NEXTVAL,'U???n Con S??u',499000,'L?? ki???u u???n ho??n to??n m???i ??ang t???o trend kh???p ch??u ??. U???n con s??u ??em l???i h??nh t?????ng th???i trang, hi???n ?????i, kh???e kho???n. Gi??p m??i t??c tr??? n??n b???ng b???nh, d??y d???n h??n. U???n con s??u gi??p t??c lu??n v??o n???p d?? kh??ng c???n vu???t s??p t???o ki???u.','https://hagona.com/upload/images/kieu-toc-con-sau-3.jpg',1,2);
INSERT INTO DICHVU VALUES(MADV_SEQ6.NEXTVAL,'U???n PREMLOCK',799000,'L?? ki???u u???n t??c l??m m??a l??m gi?? tr??n kh???p th??? gi???i. ????y l?? ki???u t??c ?????c ????o, kh??c l??? ??em l???i phong c??ch kh???e kho???n, nam t??nh v?? hi???n ?????i Ch??u ??u. Khi s??? h???u Premlock anh s??? kh??ng c???n vu???t t??c t???o ki???u m???i bu???i s??ng m?? t??c v???n lu??n v??o form chu???n ?????p.','https://s4m.edu.vn/uploaded/73289672_402996823968583_4143822384626925568_n.jpg',1,2);
INSERT INTO DICHVU VALUES(MADV_SEQ6.NEXTVAL,'Nhu???m ??en Ph??? B???c',180000,'Nhu???m ??en Ph??? B???c','http://file.hstatic.net/1000260990/file/kieu_mau_nhuom_toc_dep_cho_nam_1_grande.jpg',1,3);
INSERT INTO DICHVU VALUES(MADV_SEQ6.NEXTVAL,'Nhu???m N??u Cao C???p',249000,'Nhu???m N??u Cao C???p','https://vn-test-11.slatic.net/original/255874af35cf1dcbcae8adbb9812ec6e.jpg_720x720q80.jpg_.webp',1,3);
INSERT INTO DICHVU VALUES(MADV_SEQ6.NEXTVAL,'Nhu???m Th???i Trang Kh??ng T???y',289000,'Nhu???m Th???i Trang Kh??ng T???y','https://hvn.cdnxbvn.com/wp-content/uploads/2019/01/Lee-Min-Ho-toc-nhuom-mau-nau-lanh-600x606.jpg',1,3);
INSERT INTO DICHVU VALUES(MADV_SEQ6.NEXTVAL,'Nhu???m Th???i Trang C???n T???y',389000,'Nhu???m Th???i Trang C???n T???y','https://tocnamdep.com/wp-content/uploads/2020/06/mau-toc-nam-dep-2.jpg',1,3);
INSERT INTO DICHVU VALUES(MADV_SEQ6.NEXTVAL,'H???p D?????ng Oliu',199000,'L?? ph????ng ph??p d?????ng t??c b???ng b?? d???u oliu chi???t xu???t ho??n to??n t??? nhi??n, r???t t???t cho t??c. Gi??p ph???c h???i t??c h?? t???n, kh?? x??, ??em l???i m??i t??c b??ng m?????t, ch???c kh???e. Ph????ng ph??p s??? d???ng bi???n ph??p k??ch nhi???t ????? ????a d?????ng ch???t v??o s??u b??n trong s???i t??c v?? th???m th???u v??o da ?????u ??em l???i hi???u qu??? l??u d??i.','https://tinphongcach.vn/wp-content/uploads/2020/04/Kieu-nam-Han-Quoc-danh-cho-khuon-mat-tron.jpg',1,4);
INSERT INTO DICHVU VALUES(MADV_SEQ6.NEXTVAL,'Ph???c H???i Nano',159000,'L?? ph????ng ph??p d?????ng t??c hai l???p k???t h???p v???i b???n s??ng nano c??ng ngh??? cao, hi???u qu??? si??u v?????t tr???i. L???p d?????ng ?????u ti??n gi??p m??? l???p bi???u b?? t??c v?? l??m ch???c kh???e l???p t??c t??? b??n ngo??i. L???p d?????ng th??? hai gi??p nu??i d?????ng, ph???c h???i t??c t??? s??u b??n trong. Ph????ng ph??p b???n s??ng nano gi??p ????a d?????ng ch???t v??o s??u b??n trong t???y t??c, gi??p t??c kh???e t??? b??n trong, b??ng m?????t t??? b??n ngo??i, hi???u qu??? l??u d??i.','https://file.hstatic.net/1000096321/article/untitled-1.jpg',1,4);
INSERT INTO DICHVU VALUES(MADV_SEQ6.NEXTVAL,'T???y Da Ch???t',40000,'T???y Da Ch???t','https://leediors.com/wp-content/uploads/2020/04/cach-tay-te-bao-chet-cho-da-mat-tai-nha11.jpg',1,5);
INSERT INTO DICHVU VALUES(MADV_SEQ6.NEXTVAL,'?????p M???t N??? L???nh',40000,'?????p M???t N??? L???nh','https://www.boshop.vn/uploads/2019/11/26/5ddc9098e3ffd-tuyen-ba-nhon-hoat-dong-manh-o-tuoi-day-thi.jpg',1,5);
INSERT INTO DICHVU VALUES(MADV_SEQ6.NEXTVAL,'L???y M???n M??i Chuy??n S??u',40000,'L???y M???n M??i Chuy??n S??u','https://toixanh.com/wp-content/uploads/2019/03/cac-buoc-skincare-cho-nam-gioi-1280x720.jpg',1,5);
INSERT INTO DICHVU VALUES(MADV_SEQ6.NEXTVAL,'Detox Da ?????u',40000,'Detox Da ?????u','https://toixanh.com/wp-content/uploads/2019/03/cac-buoc-skincare-cho-nam-gioi-1280x720.jpg',1,4);
INSERT INTO DICHVU VALUES(MADV_SEQ6.NEXTVAL,'L???t M???n Than Tre',40000,'L???t M???n Than Tre','https://ae01.alicdn.com/kf/He2c5663f0c0f499483a713ee228c70220/ROREC-Than-Tre-en-M-t-N-B-n-L-t-M-n-u-en-T.jpg_Q90.jpg_.webp',1,5);
INSERT INTO DICHVU VALUES(MADV_SEQ6.NEXTVAL,'L???y R??y Tai',40000,'L???y R??y Tai','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLvTC1BEP6Ffqa8n5qYhdjJmVZR_cypvBzs8j7Qj4rMJ1WgtXLYJSh3pcU4Q8pXTdSOmo&usqp=CAU',1,6);
INSERT INTO DICHVU VALUES(MADV_SEQ6.NEXTVAL,'Gi?????ng Massage Nh???t B???n',30000,'Gi?????ng Massage Nh???t B???n','https://image-us.24h.com.vn/upload/4-2019/images/2019-11-07/hj-1573121560-842-width640height480.jpg',1,6);
INSERT INTO DICHVU VALUES(MADV_SEQ6.NEXTVAL,'T???y da ch???t ??? ?????p M???t N???',50000,'T???y da ch???t ??? ?????p M???t N???','https://toixanh.com/wp-content/uploads/2019/03/cac-buoc-skincare-cho-nam-gioi-1280x720.jpg',1,5);
INSERT INTO DICHVU VALUES(MADV_SEQ6.NEXTVAL,'Ch??m S??c M???n. L???t M???n Than Tre. T???y da ch???t. ?????p M???t N???.',65000,'Ch??m S??c M???n. L???t M???n Than Tre. T???y da ch???t. ?????p M???t N???.','https://toixanh.com/wp-content/uploads/2019/03/cac-buoc-skincare-cho-nam-gioi-1280x720.jpg',1,5);
INSERT INTO DICHVU VALUES(MADV_SEQ6.NEXTVAL,'Detox ???mu???i l???c???. T???y Da Ch???t. ?????p M???t N??? D?????ng ???m',68000,'Detox ???mu???i l???c???. T???y Da Ch???t. ?????p M???t N??? D?????ng ???m','https://toixanh.com/wp-content/uploads/2019/03/cac-buoc-skincare-cho-nam-gioi-1280x720.jpg',1,5);
--------------------------------------------TRIGGER--------------------------------------------------------------
-- TRIGGER 15
-- Ng??y ?????t l???ch l???n h??n ng??y sinh c???a kh??ch h??ng v?? nh??n vi??n.
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
-- Ng??y v??o l??m c???a m???t nh??n vi??n ph???i nh??? h??n ho???c b???ng ng??y ?????t l???ch.
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
-- Kh??ch h??ng VIP s??? ???????c gi???m 10% tr??n t???ng m???i ho?? ????n. 
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
        UPDATE HOADON SET HOADON.TongTien= HOADON.TongTien * 0.9 
        WHERE HOADON.MAHD=:NEW.MaHD;
    END IF;
END;
DROP TRIGGER TRIGGER_23_HOADON;
-- Trigger 27
-- L????ng th?????ng th??ng s??? ???????c t??nh theo c??ng th???c: L????ng c?? b???n * Trung b??nh s??? sao c???a th??ng ???? * 0,01.
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

    UPDATE NhanLuong SET NhanLuong.LuongThuong= :NEW.LuongCoBan*v_danhgia*0.01 
    WHERE NhanLuong.MANV=:NEW.MaNV;
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

    UPDATE NhanLuong SET NhanLuong.LuongThuong= :NEW.LuongCoBan*v_danhgia*0.01 
    WHERE NhanLuong.MANV=:NEW.MaNV;
END;

-- TRIGGER 16
-- Ng??y sinh c???a nh??n vi??n nh??? h??n ng??y hi???n t???i.
-- Nhan vien them sua
SET DEFINE OFF;
CREATE OR REPLACE TRIGGER TRIGGER_16_NHANVIEN 
AFTER INSERT OR UPDATE ON NHANVIEN
FOR EACH ROW
DECLARE
    var_ngaysinh NHANVIEN.NgaySinh%TYPE;
    var_date NHANVIEN.NgaySinh%TYPE;
BEGIN
    SELECT NgaySinh INTO var_NgaySinh
    FROM NHANVIEN nv
    WHERE nv.MaNV=:NEW.MaNV;

    SELECT SYSDATE INTO var_date
    FROM dual;

    IF (var_NgaySinh > var_date)
    THEN
    DBMS_OUTPUT.PUT_LINE('ERORR!!!!');
        RAISE_APPLICATION_ERROR(-2000, 'LOI !!!');
    END IF;
END;    
SELECT SYSDATE FROM DUAL;
SHOW ERRORS
DROP TRIGGER TRIGGER_16_NHANVIEN;

-- TRIGGER 17
-- Ng??y sinh c???a kh??ch h??ng nh??? h??n ng??y hi???n t???i.
--Khach hang them sua
SET DEFINE OFF;
CREATE OR REPLACE TRIGGER TRIGGER_17_KHACHHANG 
BEFORE INSERT OR UPDATE ON KHACHHANG
FOR EACH ROW
DECLARE
    var_ngaysinh KHACHHANG.NgaySinh%TYPE;
    var_date KHACHHANG.NgaySinh%TYPE;
BEGIN
    SELECT NgaySinh INTO var_NgaySinh
    FROM KHACHHANG kh
    WHERE kh.MaKH=:NEW.MaKH;

    SELECT SYSDATE INTO var_date
    FROM dual;
    
    IF (var_NgaySinh > var_date)
    THEN
    DBMS_OUTPUT.PUT_LINE('ERORR!!!!');
        RAISE_APPLICATION_ERROR(-2000, 'LOI !!!');
    END IF;
END;    

-- TRIGGER 20
--T???ng ti???n c???a m???t ho?? ????n b???ng t???ng ti???n c???a t???t c??? d???ch v??? v?? s???n ph???m.

-- Chi tiet hoa don san pham xoa

-- Hoa don sua

-- CHECK 24 
--Lo???i kh??ch h??ng VIP s??? h???t h???n sau 1 n??m k??? t??? ng??y k??ch ho???t VIP.
ALTER TABLE LOAIKHACHHANG ADD CONSTRAINT CHK_LOAIKHACHHANG3 CHECK (
    (EXTRACT(DAY FROM NgayKichHoatVip) = EXTRACT(DAY FROM NgayHetHanVip)) 
    AND (EXTRACT(MONTH FROM NgayKichHoatVip) = EXTRACT(MONTH FROM NgayHetHanVip)) 
    AND (EXTRACT(YEAR FROM NgayHetHanVip) - EXTRACT(YEAR FROM NgayKichHoatVip) = 1));

--TRIGGER 28 
--L????ng th?????ng th??ng 12 s??? ???????c t??nh theo c??ng th???c: L????ng c?? b???n * Trung b??nh s??? sao c???a th??ng ???? * 0,1.
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

    UPDATE NhanLuong SET NhanLuong.LuongThuong= :NEW.LuongCoBan*var_danhgia*0.1 
    WHERE NhanLuong.MANV=:NEW.MaNV;
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

    UPDATE NhanLuong SET NhanLuong.LuongThuong=LuongCoBan*var_danhgia*0.1 
    WHERE NhanLuong.MANV=:NEW.MaNV;
END;
--------------------------------
SELECT * FROM SANPHAM WHERE SANPHAM.MASP =2;

---- Trigger 18 ----
---- tu???i c???a nh??n vi??n ph???i t??? 15 tu???i tr??? l??n
ALTER TABLE NhanVien
ADD CONSTRAINT CHK_NHANVIEN_AGE
        CHECK(EXTRACT(YEAR FROM NGAYVAOLAM) - EXTRACT(YEAR FROM NgaySinh) >= 15);
ALTER TABLE NhanVien DROP CONSTRAINT CHK_NHANVIEN_AGE;
---- Trigger 22 ----
--- c??? m???i 100000 trong h??a ????n s??? +10 ??i???m v??o ??i???m t??ch l??y
-- th??m tr??n b???ng HOADON
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
-- c???p nh???t tr??n b???ng h??a ????n
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
SELECT * FROM LUONG
SELECT * FROM NHANVIEN
SELECT * FROM TAIKHOAN
INSERT INTO TAIKHOAN VALUES(MATK_SEQ4.NEXTVAL,1,null,102)
SELECT * FROM CTHDSP
ALTER TABLE HOADON
ADD THANHTOAN NUMBER
UPDATE HOADON 
SET THANHTOAN = 0
INSERT INTO HOADON(MAHD, MAKH, NGAY, TONGTIEN, THANHTOAN) VALUES(MAHD_SEQ11.NEXTVAL,4,To_Date('27-06-2021','dd-mm-yyyy'),100000,0)
SELECT * FROM HOADON;
SELECT * FROM CTHDDV
SELECT SUM(GIA) FROM DICHVU
WHERE MADV in (1,3,4)
SELECT * FROM DICHVU
DELETE FROM DATLICH;
DELETE FROM CTHDDV;
DELETE FROM HOADON;
SELECT * FROM CTHDDV;
SELECT * FROM HOADON;
SELECT * FROM DATLICH
INSERT INTO HOADON(MAHD, MAKH, NGAY, TONGTIEN, THANHTOAN) VALUES(MAHD_SEQ11.NEXTVAL,1,To_Date('1/1/2021','dd-mm-yyyy'),111111,0);
INSERT INTO DATLICH(MADL,Ngay,MaGio,MaKH,MaNV,MaDV) VALUES (MADL_SEQ10.nextval , To_Date('1/1/2021','dd-mm-yyyy') , 1 , 1 , 1 ,1);
INSERT INTO CTHDDV(MAHD,MADV,MADL) VALUES(MAHD_SEQ11.CURRVAL,1,MADL_SEQ10.CURRVAL);

UPDATE HOADON SET TINHTRANG = 0,TONGTIEN = 0 WHERE MAHD = 41
UPDATE  CTHDDV
SET MADV = 3
WHERE MADL = 69




DELETE FROM CTHDDV
WHERE MADL in ( 
SELECT MADL FROM DATLICH    
    WHERE   MAKH = (SELECT MAKH FROM DATLICH WHERE MADL = 76) 
        AND     NGAY = (SELECT NGAY FROM DATLICH WHERE MADL = 76)
        AND     MANV = (SELECT MANV FROM DATLICH WHERE MADL = 76) 
        AND     MAGIO = (SELECT MAGIO FROM DATLICH WHERE MADL = 76)
)

UPDATE HOADON SET TINHTRANG = 0
WHERE MAHD = (
    SELECT DISTINCT MAHD FROM CTHDDV
    WHERE MADL in ( 
            SELECT MADL FROM DATLICH    
                WHERE   MAKH = (SELECT MAKH FROM DATLICH WHERE MADL = 84) 
                    AND     NGAY = (SELECT NGAY FROM DATLICH WHERE MADL = 84)
                    AND     MANV = (SELECT MANV FROM DATLICH WHERE MADL = 84) 
                    AND     MAGIO = (SELECT MAGIO FROM DATLICH WHERE MADL = 84)
                )
)


UPDATE HOADON SET TINHTRANG = 0
SELECT DISTINCT MAHD FROM CTHDDV
    WHERE MADL in (
        SELECT MADL FROM DATLICH 
            WHERE   MAKH = (SELECT MAKH FROM DATLICH WHERE MADL = 89) 
                AND     NGAY = (SELECT NGAY FROM DATLICH WHERE MADL =89)
                AND     MANV = (SELECT MANV FROM DATLICH WHERE MADL = 89) 
                AND     MAGIO = (SELECT MAGIO FROM DATLICH WHERE MADL = 89)
            )
    )

SELECT * FROM HOADON
ALTER TABLE CTHDDV 
    ADD MADL NUMBER
SELECT * FROM CTHDDV

SELECT * FROM NHANVIEN
SELECT CTHDDV.MADV, DICHVU.TENDICHVU, DICHVU.GIA FROM DICHVU, CTHDDV 
WHERE CTHDDV.MAHD =60 AND DICHVU.MADV = CTHDDV.MADV
SELECT * FROM DICHVU WHERE MADV = 81
UPDATE DICHVU SET TINHTRANG = 0 WHERE MADV = 81
SELECT * FROM NHANVIEN
INSERT INTO NHANVIEN VALUES(MANV_SEQ3.NEXTVAL,'sdsda','??eq',TO_DATE('2001-02-02','yyyy-mm-dd'),'Nu','213354','KT',TO_DATE('2020-02-02','yyyy-mm-dd'),'Staff','employee.jpg','lh@gmail.com',1)
DESCRIBE NHANVIEN
MANV_SEQ3
MALUONG_SEQ5
MATK_SEQ4