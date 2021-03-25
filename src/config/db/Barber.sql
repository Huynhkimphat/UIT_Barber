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
DROP TABLE CTHDDV; -- Super_primary_key
DROP TABLE CTHDSP; -- Super_primary_key
DROP TABLE DANHGIANHANVIEN;
DROP TABLE DANHGIASANPHAM;

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
    NgayKichHoatVip DATE                NOT NULL,
    NgayHetHanVip   DATE                NOT NULL,
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
    Email           VARCHAR2(255)   NOT NULL UNIQUE,
    Password        VARCHAR2(255)    NOT NULL,
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
    NgayNhanLuong   DATE                NOT NULL,
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
    MotaDichVu  VARCHAR2(4000)   NOT NULL,
    CONSTRAINT  PK_DICHVU       PRIMARY KEY(MaDV)
);
CREATE SEQUENCE MADV_SEQ6 START WITH 1;
--------------------------------------------BANG LOAI SAN PHAM----------------------------------------------------
CREATE  TABLE LOAISANPHAM
(
    MaLSP           NUMBER              NOT NULL,
    TenLoaiSanPham  VARCHAR2(255)       NOT NULL,
    CONSTRAINT      PK_LOAISANPHAM      PRIMARY KEY (MaLSP)
);
CREATE SEQUENCE MALSP_SEQ7 START WITH 1;

---------------------------------------------BANG SAN PHAM--------------------------------------------------------
CREATE  TABLE SanPham
(
    MaSP            NUMBER          NOT NULL,
    TenSanPham      VARCHAR2(255)   NOT NULL,
    Gia             NUMBER           NOT NULL,
    MOTASANPHAM     VARCHAR2(4000) NOT NULL,
    XuatXu          VARCHAR2(100) NOT NULL,
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
    MaDGNV            NUMBER          NOT NULL,
    MaKH            NUMBER          CONSTRAINT FK_DANHGIA_KHACHHANG     REFERENCES KHACHHANG(MaKH)      NOT NULL,
    MaNV            NUMBER          CONSTRAINT FK_DANHGIA_NHANVIEN      REFERENCES NHANVIEN(MaNV)       NOT NULL,
    NgayDanhGia     DATE            NOT NULL,
    DANHGIA         NUMBER          NOT NULL,
    CHITIETDANHGIA  VARCHAR2(255)   NOT NULL,
    CONSTRAINT      PK_DGNV           PRIMARY KEY(MaDGNV)
);
CREATE SEQUENCE MADGNV_SEQ12 START WITH 1;
--------------------------------------------BANG DANH GIA SAN PHAM------------------------------------------------
CREATE TABLE DANHGIASANPHAM
( 
    MaDGSP          NUMBER          NOT NULL,
    MaKH            NUMBER          CONSTRAINT FK_DANHGIA_KHACHHANG     REFERENCES KHACHHANG(MaKH)      NOT NULL,
    MaSP            NUMBER          CONSTRAINT FK_DANHGIA_SANPHAM       REFERENCES SANPHAM(MaSP)       NOT NULL,
    NgayDanhGia     DATE            NOT NULL,
    DANHGIA         NUMBER          NOT NULL,
    CHITIETDANHGIA  VARCHAR2(255)   NOT NULL,
    CONSTRAINT      PK_DGSP           PRIMARY KEY(MaDGSP)
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
-- Nhan Vien
INSERT INTO NhanVien(MaNV,Ho,Ten,NgaySinh,GioiTinh,SoDT,NgayVaoLam,LoaiNhanVien) VALUES (
    MANV_SEQ3.nextval,'Nguyen','Nhut',To_Date('02-09-1999','dd-mm-yyyy'),'Nam','0374349383',To_Date('12-03-2021','dd-mm-yyyy'),'Admin');
INSERT INTO NhanVien(MaNV,Ho,Ten,NgaySinh,GioiTinh,SoDT,NgayVaoLam) VALUES (   
            MANV_SEQ3.nextval,'Quy','Tường',to_date('09-06-2020','dd-mm-yyyy'),'Nu','0935589947',To_Date('20-3-2021','dd-mm-yyyy'));
-- TaiKhoan
INSERT INTO TaiKhoan VALUES (
    MATK_SEQ4.nextval,'1@gmail.com','1',null,MANV_SEQ3.CURRVAL);
--------------------------------------------ALTER CHECKS---------------------------------------------------------
-- ALTER TABLE KHACHHANG
-- ADD CHECK (LOAIKH IN('Than thiet','VIP','Super VIP'));

-- ALTER TABLE KHACHHANG
-- ADD CONSTRAINT check_constraint_name CHECK(expression);
--------------------------------------------TRIGGER--------------------------------------------------------------
-- TRIGGER 15

