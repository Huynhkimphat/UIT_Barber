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

--------------------------------------------BANG DICH VU----------------------------------------------------------
CREATE TABLE DichVu
(
    MaDV        NUMBER          NOT NULL,
    TenDichVu   VARCHAR2(255)   NOT NULL,
    Gia         NUMBER          default 0,
    MotaDichVu  VARCHAR2(4000)  NOT NULL,
    HinhAnh     VARCHAR2(4000)  DEFAULT 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/1200px-Unknown_person.jpg',
    TinhTrang       NUMBER      DEFAULT 1,
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
SELECT * FROM NhanVien
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
-- ALTER TABLE KHACHHANG
-- ADD CHECK (LOAIKH IN('Than thiet','VIP','Super VIP'));

-- ALTER TABLE KHACHHANG
-- ADD CONSTRAINT check_constraint_name CHECK(expression);
--------------------------------------------TRIGGER--------------------------------------------------------------
-- TRIGGER 15
-- Ngày đặt lịch lớn hơn ngày sinh của khách hàng và nhân viên.
-- Khach Hang Sua
SET DEFINE OFF;
CREATE TRIGGER TRIGGER_15_KHACHHANG
AFTER UPDATE ON KHACHHANG
FOR EACH ROW
DECLARE
    t_ngaysinh KHACHHANG.ngaysinh%TYPE
    t_ngaydatlich DATLICH.Ngay%TYPE
BEGIN 
    t_ngaysinh := :NEW.ngaysinh

    SELECT dl.ngay into t_ngaydatlich
    FROM (
        SELECT dl.ngay from DATLICH dl 
        WHERE dl.MaKH=:NEW.MaKH
        ORDER BY dl.ngay ASC
    )
    WHERE ROWNUM=1

    IF(t_ngaysinh>t_ngaydatlich)
    THEN 
        DBMS_OUTPUT.PUT_LINE('ERORR!!!!');
        RAISE_APPLICATION_ERROR(-2000, 'LOI !!!');
END;
-- Nhan VIen Sua

SET DEFINE OFF;
CREATE TRIGGER TRIGGER_15_NHANVIEN
AFTER UPDATE ON NHANVIEN
FOR EACH ROW
DECLARE
    t_ngaysinh NHANVIEN.ngaysinh%TYPE
    t_ngaydatlich DATLICH.Ngay%TYPE
BEGIN 
    t_ngaysinh := :NEW.ngaysinh

    SELECT dl.ngay into t_ngaydatlich
    FROM (
        SELECT dl.ngay from DATLICH dl 
        WHERE dl.MaNV=:NEW.MaNV
        ORDER BY dl.ngay ASC
    )
    WHERE ROWNUM=1

    IF(t_ngaysinh>t_ngaydatlich)
    THEN 
        DBMS_OUTPUT.PUT_LINE('ERORR!!!!');
        RAISE_APPLICATION_ERROR(-2000, 'LOI !!!');
END;
-- Dat Lich Them Sua
SET DEFINE OFF;
CREATE TRIGGER TRIGGER_15_DATLICH
AFTER INSERT,UPDATE ON DATLICH
FOR EACH ROW
DECLARE
    t_ngaysinhKH KHACHHANG.ngaysinh%TYPE
    t_ngaysinhNV NHANVIEN.ngaysinh%TYPE
    t_ngaydatlich DATLICH.Ngay%TYPE
BEGIN 
    t_ngaydatlich := :NEW.ngay
    

    SELECT nv.ngaysinh into t_ngaysinhNV
    FROM NHANVIEN nv
    WHERE nv.MANV=:NEW.MANV;

    SELECT kh.ngaysinh into t_ngaysinhKH
    FROM KHACHHANG kh
    WHERE kh.MaKH=:NEW.MaKH;

    IF(t_ngaysinhNV>t_ngaydatlich or t_ngaysinhKH>t_ngaydatlich)
    THEN 
        DBMS_OUTPUT.PUT_LINE('ERORR!!!!');
        RAISE_APPLICATION_ERROR(-2000, 'LOI !!!');
END;
-- TRIGGER 19
-- Ngày vào làm của một nhân viên phải nhỏ hơn hoặc bằng ngày đặt lịch.
-- Nhan Vien Sua
SET DEFINE OFF;
CREATE TRIGGER TRIGGER_19_NHANVIEN
AFTER UPDATE ON NHANVIEN
FOR EACH ROW
DECLARE
    t_ngayvaolam NHANVIEN.NgayVaoLam%TYPE
    t_ngaydatlich DATLICH.Ngay%TYPE
BEGIN
    t_ngayvaolam := :NEW.NgayVaoLam

    SELECT dl.ngay into t_ngaydatlich
    FROM (
        SELECT dl.ngay from DATLICH dl 
        WHERE dl.MaNV=:NEW.MaNV
        ORDER BY dl.ngay ASC
    )
    WHERE ROWNUM=1

    IF(t_ngayvaolam>t_ngaydatlich)
    THEN 
        DBMS_OUTPUT.PUT_LINE('ERORR!!!!');
        RAISE_APPLICATION_ERROR(-2000, 'LOI !!!');
END;
-- Dat Lich Sua
SET DEFINE OFF;
CREATE TRIGGER TRIGGER_19_DATLICH
AFTER UPDATE ON DATLICH
FOR EACH ROW
DECLARE
    t_ngayvaolam NHANVIEN.NgayVaoLam%TYPE
    t_ngaydatlich DATLICH.Ngay%TYPE
BEGIN 
    t_ngaydatlich := :NEW.ngay

    SELECT nv.NgayVaoLam into t_ngayvaolam
    FROM NHANVIEN nv
    WHERE nv.MaNV=:NEW.MaNV;

    IF(t_ngayvaolam>t_ngaydatlich)
    THEN 
        DBMS_OUTPUT.PUT_LINE('ERORR!!!!');
        RAISE_APPLICATION_ERROR(-2000, 'LOI !!!');
END;
--------------------------------------------INSERT TABLE: SANPHAM---------------------------------------------------------
DESCRIBE SANPHAM;
INSERT INTO SANPHAM(MaSP,TenSanPham,Gia,MOTASANPHAM,XuatXu,MaLSP) VALUES (
    MASP_SEQ8.NEXTVAL, 'Seri', 220000, 'Dầu gội giữ màu tóc','VietNam',2);
INSERT INTO SANPHAM(MaSP,TenSanPham,Gia,MOTASANPHAM,XuatXu,MaLSP) VALUES (
    MASP_SEQ8.NEXTVAL, 'Glanzen Clay 60g', 329000, 'Sáp Chính Hãng Bán Chạy Số 1 Thị Trường','Đức',1);
INSERT INTO SANPHAM(MaSP,TenSanPham,Gia,MOTASANPHAM,XuatXu,MaLSP) VALUES (
    MASP_SEQ8.NEXTVAL, 'ACSYS', 289000, 'Sữa Rửa Mặt trị mụn - Phiên bản đặc biệt','Hàn Quốc',3);


--------------------------------------------INSERT TABLE: LOAISANPHAM---------------------------------------------------------
DESCRIBE LOAISANPHAM;
INSERT INTO LOAISANPHAM VALUES (MALSP_SEQ7.NEXTVAL,'Sáp');
INSERT INTO LOAISANPHAM VALUES (MALSP_SEQ7.NEXTVAL,'Dầu gội');
INSERT INTO LOAISANPHAM VALUES (MALSP_SEQ7.NEXTVAL,'Sữa rửa mặt');


INSERT INTO DichVu(MADV,TENDICHVU,GIA,MOTADICHVU) VALUES (
    MADV_SEQ6.NEXTVAL, 'Dich vu 1', 220000, 'Day la dich vu so 1');
    INSERT INTO DichVu(MADV,TENDICHVU,GIA,MOTADICHVU) VALUES (
    MADV_SEQ6.NEXTVAL, 'Dich vu 2', 220000, 'Day la dich vu so 2');
    INSERT INTO DichVu(MADV,TENDICHVU,GIA,MOTADICHVU) VALUES (
    MADV_SEQ6.NEXTVAL, 'Dich vu 3', 220000, 'Day la dich vu so 3');
INSERT INTO KhachHang(MaKH,Ho,Ten,NgaySinh,GioiTinh,SoDT,Email)
        VALUES    (MaKH_SEQ1.NEXTVAL,'Phan','Truong',To_Date('22-01-2001','dd-mm-yy'),'Nam','0123456789','Truong24082001@gmail.com')
SELECT * From KhachHang


INSERT INTO DATLICH(MADL,Ngay,MaGio,MaKH,MaNV,MaDV) VALUES (MANV_SEQ3.nextval , To_Date('07-04-2021','dd-mm-yyyy') , 1 , 2 , 1 , 1)
select * from dichvu
SELECT * from SANPHAM

INSERT INTO DICHVU VALUES(MADV_SEQ6.NEXTVAL,'Combo Cắt',30000,'Tư vấn kiểu tóc hợp khuôn mặt  Cắt tóc tạo kiểu bởi stylist hàng đầu. Cạo mặt êm ái – xả sạch tóc con. Vuốt sáp – xịt gôm tạo kiểu cao cấp','https://s3-ap-southeast-1.amazonaws.com/we-xpats.com/articles/images/QvKRrjX7_gilU20RdXdQ1_ewaR_Ok3j4gnbIboc-Ww_ugF_1cmcuAuvjdHOUrzwGQIbRuXAzerPRooUEabykGw7Dk8unyWTyZjdCJSxu87gSpbavnOb4HsyLdAUxee2z2j8di0ew.jpeg',1);
INSERT INTO DICHVU VALUES(MADV_SEQ6.NEXTVAL,'Combo Cắt Gội 10 bước (60 phút)',199000,'1. Massage khai huyệt điều hòa. 2. Rửa mặt – massage tinh chất nha đam thẩm thấu. 3. Hút mụn – phun nước hoa hồng công nghệ cao. 4. Gội đầu massage bấm huyệt. 5. Massage rửa tai bọt sảng khoái. 6. Kéo khăn giãn cơ cổ - xối nước thác đổ. 7. Tư vấn kiểu tóc hợp khuôn mặt. 8. Cắt tóc tạo kiểu bởi stylist hàng đầu. 9. Cạo mặt êm ái – xả sạch tóc con. 10. Vuốt sáp – xịt gôm tạo kiểu cao cấp','https://britishm.vn/wp-content/uploads/2019/02/cham-soc-toc-ma-mac-phai-6-sai-lam-nay-bao-sao-toc-nam-gioi-luon-kho-cung-xo-roi.jpg',1);
INSERT INTO DICHVU VALUES(MADV_SEQ6.NEXTVAL,'Cắt – Xả - Tạo kiểu (30 phút)',70000,'1. Gội đầu xả tóc. 2. Tư vấn kiểu tóc hợp khuôn mặt. 3. Cắt tóc tạo kiểu bởi stylist hàng đầu. 4. Cạo mặt êm ái – xả sạch tóc con. 5. Vuốt sáp – xịt gôm tạo kiểu cao cấp.','https://cdn.sudospaces.com/website/topz.vn/home/topz/public_html/2019/12/3man-30shine-quang-ngai-320648.jpg',1);
INSERT INTO DICHVU VALUES(MADV_SEQ6.NEXTVAL,'Kid Combo (30 phút)',70000,'Đẹp trai không phân biệt độ tuổi. Ai bảo các bạn nhỏ thì không thể "làm đẹp" nào? QUY TRÌNH 5 BƯỚC. Bước 1: Gội đầu làm mềm tóc, sạch bụi bẩn. Bước 2: Tư vấn kiểu tóc gọn gàng, phù hợp với lứa tuổi, thể hiện cá tính, bản sắc riêng. Bước 3: Cắt tóc tạo kiểu. Bước 4: Gội xả kỹ càng sạch tóc con, giúp bé không cảm thấy khó chịu suốt cả ngày. Bước 5: Vuốt sáp đẹp trai.','https://st.quantrimang.com/photos/image/2020/04/08/cat-toc-cho-be-trai.jpg',1);
INSERT INTO DICHVU VALUES(MADV_SEQ6.NEXTVAL,'Gội Massage Dưỡng Sinh Vuốt Sáp Tạo Kiểu 8 bước',40000,'1. Massage khai huyệt điều hòa. 2. Rửa mặt – massage tinh chất nha đam thẩm thấu. 3. Hút mụn công nghệ cao. 4. Phun nước hoa hồng se khít lỗ chân lông. 5. Gội đầu massage, kết hợp loại bỏ gàu. 6. Massage rửa tai bọt sảng khoái. 7. Kéo khăn nóng giãn cơ cổ - Xối nước thác đổ giải tỏa căng thẳng. 8. Vuốt sáp – xịt gôm tạo kiểu cao cấp.','https://htluxury.vn/wp-content/uploads/2019/04/kieu-toc-nam-vuot-nguoc-1.jpg',1);
INSERT INTO DICHVU VALUES(MADV_SEQ6.NEXTVAL,'Uốn Cao Cấp',349000,'Uốn phồng là bí quyết để mái tóc luôn bồng bềnh vào nếp, đẹp như được vuốt tại salon. Chỉ cần làm một lần, form tóc đẹp giữ được vài tháng. Uốn phồng cao cấp được tăng cường thành phần Collagen và Keratin đem lại độ suôn mượt và độ bóng hoàn hảo cho tóc, phục hồi tóc hư tổn.','https://blog.hairbros.vn/wp-content/uploads/2019/01/kieu-toc-nam-uon-dep-nhat.jpg',1);
INSERT INTO DICHVU VALUES(MADV_SEQ6.NEXTVAL,'Uốn Tiêu Chuẩn',260000,'Uốn tạo kiểu là bí quyết để mái tóc luôn bồng bềnh vào nếp, đẹp như được vuốt tại salon. Chỉ cần làm một lần, form tóc đẹp giữ được vài tháng. Nếu anh sở hữu một mái tóc thưa, mỏng, uốn tóc sẽ giúp mái tóc trở nên bồng bềnh, tạo hiệu ứng trông dày hơn.','https://hervietnam.com.vn/wp-content/uploads/2019/05/Lay-mac-ao-den-toc-cat-layer-uon-xoan-nhe.jpg',1);
INSERT INTO DICHVU VALUES(MADV_SEQ6.NEXTVAL,'Uốn Con Sâu',499000,'Là kiểu uốn hoàn toàn mới đang tạo trend khắp châu Á. Uốn con sâu đem lại hình tượng thời trang, hiện đại, khỏe khoắn. Giúp mái tóc trở nên bồng bềnh, dày dặn hơn. Uốn con sâu giúp tóc luôn vào nếp dù không cần vuốt sáp tạo kiểu.','https://hagona.com/upload/images/kieu-toc-con-sau-3.jpg',1);
INSERT INTO DICHVU VALUES(MADV_SEQ6.NEXTVAL,'Uốn PREMLOCK',799000,'Là kiểu uốn tóc làm mưa làm gió trên khắp thế giới. Đây là kiểu tóc độc đáo, khác lạ đem lại phong cách khỏe khoắn, nam tính và hiện đại Châu Âu. Khi sở hữu Premlock anh sẽ không cần vuốt tóc tạo kiểu mỗi buổi sáng mà tóc vẫn luôn vào form chuẩn đẹp.','https://s4m.edu.vn/uploaded/73289672_402996823968583_4143822384626925568_n.jpg',1);
INSERT INTO DICHVU VALUES(MADV_SEQ6.NEXTVAL,'Nhuộm Đen Phủ Bạc',180000,'Nhuộm Đen Phủ Bạc','http://file.hstatic.net/1000260990/file/kieu_mau_nhuom_toc_dep_cho_nam_1_grande.jpg',1);
INSERT INTO DICHVU VALUES(MADV_SEQ6.NEXTVAL,'Nhuộm Nâu Cao Cấp',249000,'Nhuộm Nâu Cao Cấp','https://vn-test-11.slatic.net/original/255874af35cf1dcbcae8adbb9812ec6e.jpg_720x720q80.jpg_.webp',1);
INSERT INTO DICHVU VALUES(MADV_SEQ6.NEXTVAL,'Nhuộm Thời Trang Không Tẩy',289000,'Nhuộm Thời Trang Không Tẩy','https://hvn.cdnxbvn.com/wp-content/uploads/2019/01/Lee-Min-Ho-toc-nhuom-mau-nau-lanh-600x606.jpg',1);
INSERT INTO DICHVU VALUES(MADV_SEQ6.NEXTVAL,'Nhuộm Thời Trang Cần Tẩy',389000,'Nhuộm Thời Trang Cần Tẩy','https://tocnamdep.com/wp-content/uploads/2020/06/mau-toc-nam-dep-2.jpg',1);
INSERT INTO DICHVU VALUES(MADV_SEQ6.NEXTVAL,'Hấp Dưỡng Oliu',199000,'Là phương pháp dưỡng tóc bằng bơ dầu oliu chiết xuất hoàn toàn tự nhiên, rất tốt cho tóc. Giúp phục hồi tóc hư tổn, khô xơ, đem lại mái tóc bóng mượt, chắc khỏe. Phương pháp sử dụng biện pháp kích nhiệt để đưa dưỡng chất vào sâu bên trong sợi tóc và thẩm thấu vào da đầu đem lại hiệu quả lâu dài.','https://tinphongcach.vn/wp-content/uploads/2020/04/Kieu-nam-Han-Quoc-danh-cho-khuon-mat-tron.jpg',1);
INSERT INTO DICHVU VALUES(MADV_SEQ6.NEXTVAL,'Phục Hồi Nano',159000,'Là phương pháp dưỡng tóc hai lớp kết hợp với bắn súng nano công nghệ cao, hiệu quả siêu vượt trội. Lớp dưỡng đầu tiên giúp mở lớp biểu bì tóc và làm chắc khỏe lớp tóc từ bên ngoài. Lớp dưỡng thứ hai giúp nuôi dưỡng, phục hồi tóc từ sâu bên trong. Phương pháp bắn súng nano giúp đưa dưỡng chất vào sâu bên trong tủy tóc, giúp tóc khỏe từ bên trong, bóng mượt từ bên ngoài, hiệu quả lâu dài.','https://file.hstatic.net/1000096321/article/untitled-1.jpg',1);
INSERT INTO DICHVU VALUES(MADV_SEQ6.NEXTVAL,'Tẩy Da Chết',40000,'Tẩy Da Chết','https://leediors.com/wp-content/uploads/2020/04/cach-tay-te-bao-chet-cho-da-mat-tai-nha11.jpg',1);
INSERT INTO DICHVU VALUES(MADV_SEQ6.NEXTVAL,'Đắp Mặt Nạ Lạnh',40000,'Đắp Mặt Nạ Lạnh','https://www.boshop.vn/uploads/2019/11/26/5ddc9098e3ffd-tuyen-ba-nhon-hoat-dong-manh-o-tuoi-day-thi.jpg',1);
INSERT INTO DICHVU VALUES(MADV_SEQ6.NEXTVAL,'Lấy Mụn Mũi Chuyên Sâu',40000,'Lấy Mụn Mũi Chuyên Sâu','https://toixanh.com/wp-content/uploads/2019/03/cac-buoc-skincare-cho-nam-gioi-1280x720.jpg',1);
INSERT INTO DICHVU VALUES(MADV_SEQ6.NEXTVAL,'Detox Da Đầu',40000,'Detox Da Đầu','https://toixanh.com/wp-content/uploads/2019/03/cac-buoc-skincare-cho-nam-gioi-1280x720.jpg',1);
INSERT INTO DICHVU VALUES(MADV_SEQ6.NEXTVAL,'Lột Mụn Than Tre',40000,'Lột Mụn Than Tre','https://ae01.alicdn.com/kf/He2c5663f0c0f499483a713ee228c70220/ROREC-Than-Tre-en-M-t-N-B-n-L-t-M-n-u-en-T.jpg_Q90.jpg_.webp',1);
INSERT INTO DICHVU VALUES(MADV_SEQ6.NEXTVAL,'Lấy Ráy Tai',40000,'Lấy Ráy Tai','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLvTC1BEP6Ffqa8n5qYhdjJmVZR_cypvBzs8j7Qj4rMJ1WgtXLYJSh3pcU4Q8pXTdSOmo&usqp=CAU',1);
INSERT INTO DICHVU VALUES(MADV_SEQ6.NEXTVAL,'Giường Massage Nhật Bản',30000,'Giường Massage Nhật Bản','https://image-us.24h.com.vn/upload/4-2019/images/2019-11-07/hj-1573121560-842-width640height480.jpg',1);
INSERT INTO DICHVU VALUES(MADV_SEQ6.NEXTVAL,'Tẩy da chết – Đắp Mặt Nạ',50000,'Tẩy da chết – Đắp Mặt Nạ','https://toixanh.com/wp-content/uploads/2019/03/cac-buoc-skincare-cho-nam-gioi-1280x720.jpg',1);
INSERT INTO DICHVU VALUES(MADV_SEQ6.NEXTVAL,'Chăm Sóc Mụn. Lột Mụn Than Tre. Tẩy da chết. Đắp Mặt Nạ.',65000,'Chăm Sóc Mụn. Lột Mụn Than Tre. Tẩy da chết. Đắp Mặt Nạ.','https://toixanh.com/wp-content/uploads/2019/03/cac-buoc-skincare-cho-nam-gioi-1280x720.jpg',1);
INSERT INTO DICHVU VALUES(MADV_SEQ6.NEXTVAL,'Detox “muối lộc”. Tẩy Da Chết. Đắp Mặt Nạ Dưỡng Ẩm',68000,'Detox “muối lộc”. Tẩy Da Chết. Đắp Mặt Nạ Dưỡng Ẩm','Chăm Sóc Mụn. Lột Mụn Than Tre. Tẩy da chết. Đắp Mặt Nạ.',1);
