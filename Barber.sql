-----------------------------------------------UIT 's BABER-------------------------------------------------------
-- Intro
-- ...
-- ...
-- ...
-----------------------------------------------DELETE TABLE-------------------------------------------------------
DROP TABLE KhachHang;
DROP TABLE LoaiKhachHang;
DROP TABLE NhanVien;
DROP TABLE TaiKhoan;
DROP TABLE Luong;
DROP TABLE ;
DROP TABLE ;
DROP TABLE NhanLuong;-- Super_primary_key
DROP TABLE DichVu;
DROP TABLE LoaiSanPham;
DROP TABLE SanPham;
DROP TABLE GioDat;
DROP TABLE DatLich;
DROP TABLE HoaDon;
DROP TABLE CTHD; -- Super_primary_key
DROP TABLE DanhGia;

----------------------------------------------DELETE SEQUENCE----------------------------------------------------
DROP SEQUENCE MAKH_SEQ1;
DROP SEQUENCE MALKH_SEQ2;
DROP SEQUENCE MANV_SEQ3;
DROP SEQUENCE MATK_SEQ4;
DROP SEQUENCE MALUONG_SEQ5;
DROP SEQUENCE MA_SEQ6;
DROP SEQUENCE MA_SEQ7;
DROP SEQUENCE MADV_SEQ8;
DROP SEQUENCE MALSP_SEQ9;
DROP SEQUENCE MASP_SEQ10;
DROP SEQUENCE MAGD_SEQ11;
DROP SEQUENCE MADL_SEQ12;
DROP SEQUENCE MAHD_SEQ13;
DROP SEQUENCE MADG_SEQ14;
----------------------------------------------BANG KHACH HANG----------------------------------------------------
CREATE TABLE KhachHang
(
    MaKH            NUMBER              NOT NULL,
    Ho              VARCHAR2(10)        NOT NULL,
    Ten             VARCHAR2(40)        NOT NULL,
    NgaySinh        DATE                NOT NULL,
    GioiTinh        VARCHAR2(10)        DEFAULT 'Unknown',
    SoDT            VARCHAR2(15)        NOT NULL,
    DiaChi          VARCHAR2(255)        DEFAULT 'Unknown', 
    TaiKhoan        VARCHAR2(30)        NOT NULL UNIQUE,
    MatKhau         VARCHAR2(30)        NOT NULL,
    DiemTichLuy     NUMBER              DEFAULT 0,
    CONSTRAINT      PK_KHACHHANG        PRIMARY KEY(MaKH),
    CONSTRAINT      CHK_KHACHHANG1      CHECK   (GioiTinh in ('Nam','Nu','Unknown') )
);
CREATE SEQUENCE MAKH_SEQ1 START WITH 1;
----------------------------------------------BANG LOAI KHACH HANG -----------------------------------------------
CREATE TABLE LoaiKhachHang
(
    MaLKH           NUMBER              NOT NULL,
    MAKH            NUMBER              CONSTRAINT FK_LOAIKHACHHANG_KHACHHANG    REFERENCES KhachHang(MaKH)  NOT NULL,
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
    DiaChi          VARCHAR2(255)    DEFAULT 'Unknown',
    NgayVaoLam      DATE            NOT NULL,
    LoaiNhanVien    VARCHAR2(15)    DEFAULT 'Staff',
    TaiKhoan        VARCHAR2(30)    NOT NULL UNIQUE,
    MatKhau         VARCHAR2(30)    NOT NULL,
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
    TaiKhoan        VARCHAR2(30)    NOT NULL UNIQUE,
    MatKhau         VARCHAR2(30)    NOT NULL,
    MAKH            NUMBER          CONSTRAINT FK_TAIKHOAN_KHACHHANG    REFERENCES KhachHang(MaKH),
    MANV            NUMBER          CONSTRAINT FK_TAIKHOAN_NHANVIEN     REFERENCES NhanVien(MaNV),
    CONSTRAINT      PK_TAIKHOAN     PRIMARY KEY(MATK)
);
CREATE SEQUENCE MATK_SEQ4 START WITH 1;

---------------------------------------------BANG LUONG-----------------------------------------------------------
CREATE TABLE Luong
(
    MaLuong     NUMBER      NOT NULL,
    MANV        NUMBER      CONSTRAINT FK_LUONG_NHANVIEN    REFERENCES NhanVien(MaNV)   NOT NULL,
    LuongCoBan  NUMBER      NOT NULL,
    CONSTRAINT  PK_LUONG    PRIMARY KEY(MaLKH)
);
CREATE SEQUENCE MALUONG_SEQ5 START WITH 1;

--------------------------------------------BANG NHAN LUONG-------------------------------------------------------
CREATE TABLE NhanLuong
(
    MaLuong         NUMBER              CONSTRAINT FK_NHANLUONG_LUONG       REFERENCES Luong(MaLuong)   NOT NULL,
    MANV            NUMBER              CONSTRAINT FK_NHANLUONG_NHANVIEN    REFERENCES NhanVien(MaNV)   NOT NULL,
    NgayNhanLuong   DATE                NOT NULL
    LuongCoBan      NUMBER              NOT NULL,
    LuongThuong     NUMBER              NOT NULL,
    LuongDuocNhan   NUMBER              NOT NULL,
    CONSTRAINT      PK_NHANLUONG        PRIMARY KEY(MaLuong,MaNV,NgayNhanLuong)
);
--------------------------------------------BANG DICH VU----------------------------------------------------------

--------------------------------------------BANG DICH VU----------------------------------------------------------
CREATE TABLE DichVu
(
    MaDV        NUMBER          NOT NULL,
    TenDichVu   VARCHAR2(255)   NOT NULL,
    Gia         NUMBER          default 0,
    Mota        VARCHAR2(255)   NOT NULL,
    TietKiem    NUMBER          NOT NULL,
    CONSTRAINT  PK_DICHVU       PRIMARY KEY(MaDV)
);
CREATE SEQUENCE MADV_SEQ8 START WITH 1;
--------------------------------------------BANG LOAI SAN PHAM----------------------------------------------------
CREATE  TABLE LOAISANPHAM
(
    MaLSP           NUMBER              NOT NULL,
    TenLoaiSanPham  VARCHAR2(255)       NOT NULL,
    CONSTRAINT      PK_LOAISANPHAM      PRIMARY KEY (MaLSP)
);
CREATE SEQUENCE MALSP_SEQ9 START WITH 1;

---------------------------------------------BANG SAN PHAM--------------------------------------------------------
CREATE  TABLE SanPham
(
    MaSP            NUMBER          NOT NULL,
    TenSanPham      VARCHAR2(255)   NOT NULL,
    NgayChieu       DATE            NOT NULL,
    MaLSP           NUMBER          CONSTRAINT FK_SANPHAM_LOAISANPHAM    REFERENCES LOAISANPHAM(MaLSP)   NOT NULL,
    CONSTRAINT      PK_SANPHAM      PRIMARY KEY (MaSP)
);
CREATE SEQUENCE MASP_SEQ10 START WITH 1;
---------------------------------------------BANG GIO DAT---------------------------------------------------------
CREATE TABLE GioDat
(
    MaGio       NUMBER              NOT NULL,
    KhungGio    VARCHAR2(20)        NOT NULL,
    CONSTRAINT  PK_GIODAT           PRIMARY KEY(MaGio)
);
CREATE SEQUENCE MAGD_SEQ11 START WITH 1;
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
CREATE SEQUENCE MADL_SEQ12 START WITH 1;
---------------------------------------------BANG HOA DON---------------------------------------------------------
CREATE TABLE HoaDon
(
    MaHD        NUMBER      NOT NULL,
    MaDV        NUMBER      CONSTRAINT FK_HOADON_DICHVU    REFERENCES DichVu(MaDV)     NOT NULL,
    TongTien    NUMBER      NOT NULL,
    CONSTRAINT  PK_HD       PRIMARY KEY(MaHD)
);
CREATE SEQUENCE MAHD_SEQ13 START WITH 1;
--------------------------------------------BANG CTHD-------------------------------------------------------------
CREATE TABLE CTHD
( 
    MaHD        NUMBER      CONSTRAINT FK_CTHD_HOADON      REFERENCES HOADON(MaHD)    NOT NULL,
    MaSP        NUMBER      CONSTRAINT FK_CTHD_SANPHAM     REFERENCES SANPHAM(MASP)   NOT NULL,
    SoLuong     NUMBER      NOT NULL,
    CONSTRAINT  PK_CTHD     PRIMARY KEY(MaHD,MaSP)
);
--------------------------------------------BANG DANH GIA---------------------------------------------------------
CREATE TABLE DANHGIA
( 
    MaDG            NUMBER          NOT NULL,
    MaKH            NUMBER          CONSTRAINT FK_DANHGIA_KHACHHANG     REFERENCES KHACHHANG(MaKH)      NOT NULL,
    MaNV            NUMBER          CONSTRAINT FK_DANHGIA_NHANVIEN      REFERENCES NHANVIEN(MaNV)       NOT NULL,
    DANHGIA         NUMBER          NOT NULL,
    CHITIETDANHGIA  VARCHAR2(255)   NOT NULL
    CONSTRAINT      PK_DG           PRIMARY KEY(MaDG)
);
CREATE SEQUENCE MADG_SEQ14 START WITH 1;
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
ALTER SESSION SET NLS_DATE_FORMAT ='DD/MM/YYYY HH24:MI:SS';
-- Nhan Vien
INSERT INTO NhanVien VALUES (
    MANV_SEQ3.nextval,'Nguyen','Nhut',to_date('02-09-1999','dd-mm-yyyy'),'Nam','0374349383','324/8 Xo Viet Nghe Tinh, quan Binh Thanh, TP Ho Chi Minh',To_Date('12-03-2021','dd-mm-yyyy'),'Admin','admin','1');
-- TaiKhoan
INSERT INTO TaiKhoan VALUES (
    MATK_SEQ4.nextval,'admin','1',null,'1');

--------------------------------------------ALTER CHECKS---------------------------------------------------------
-- ALTER TABLE KHACHHANG
-- ADD CHECK (LOAIKH IN('Than thiet','VIP','Super VIP'));

-- ALTER TABLE KHACHHANG
-- ADD CONSTRAINT check_constraint_name CHECK(expression);
