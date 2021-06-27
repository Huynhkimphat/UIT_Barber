const { getStatus } = require("../../utils/statusBooking");
const { convertCurrentTime } = require("../../utils/convertTime");
const { sortObject } = require("../../utils/sort");
const {
    booking,
    employee,
    service,
    serviceType,
    time,
} = require("../../config/db");
const { compare } = require("bcrypt");


class BookingController {
    show(req, res, next) {
        (async() => {
            if (process.env.status == 3) {
                let result = await booking.show();
                let i = 1;
                while (i < result.length) {
                    if (result[i].DAY == result[i - 1].DAY && result[i].MONTH == result[i - 1].MONTH && result[i].YEAR == result[i - 1].YEAR && result[i].KHUNGGIO == result[i - 1].KHUNGGIO && result[i].HO_1 == result[i - 1].HO_1 && result[i].TEN_1 == result[i - 1].TEN_1) {
                        result.splice(i, 1);
                    } else {
                        i += 1;
                    }
                }
                result = getStatus(result);
                res.render("admin/booking/showBooking", {
                    booking: result,
                    status: process.env.status,
                    username: process.env.username,
                    img: process.env.mg,
                    header: 2,
                });
            } else if (process.env.status == 0) {
                res.redirect("/authenticate/login");
            } else {
                let result = await booking.show(process.env.id);
                let i = 1;
                while (i < result.length) {
                    if (result[i].DAY == result[i - 1].DAY && result[i].MONTH == result[i - 1].MONTH && result[i].YEAR == result[i - 1].YEAR && result[i].KHUNGGIO == result[i - 1].KHUNGGIO && result[i].HO_1 == result[i - 1].HO_1 && result[i].TEN_1 == result[i - 1].TEN_1) {
                        result.splice(i, 1);
                    } else {
                        i += 1;
                    }
                }
                result = getStatus(result);
                res.render("booking/showBooking", {
                    booking: result,
                    status: process.env.status,
                    username: process.env.username,
                    img: process.env.img,
                });
            }
        })();
    }
    add(req, res, next) {
        (async() => {
            if (process.env.status != 0) {
                if (process.env.id) {
                    // let result = await booking.show(req.params.id);
                    let employeeName = await employee.showToAdd();
                    let d = new Date();
                    let dayString = d.toLocaleDateString("en-GB");
                    let typeService = await serviceType.showToAdd();
                    let day = [
                        [dayString]
                    ];
                    d.setDate(d.getDate() + 1);
                    dayString = d.toLocaleDateString("en-GB");
                    day.push([dayString]);
                    d.setDate(d.getDate() + 1);
                    dayString = d.toLocaleDateString("en-GB");
                    day.push([dayString]);
                    res.render("booking/addBooking", {
                        typeService: typeService,
                        day: day,
                        employeeName: employeeName,
                        status: process.env.status,
                        username: process.env.username,
                        img: process.env.img,
                    });
                } else {
                    res.redirect("/");
                }
            } else {
                res.redirect("/");
            }
        })();
    }
    adding(req, res, next) {
        (async() => {
            if (process.env.status != 0) {
                let customer = process.env.id;
                if (customer) {
                    let lstService = [];
                    let i;
                    for (i = 0; i < req.body.serviceType.length; i++) {
                        lstService.push(req.body[req.body.serviceType[i]]);
                    };
                    await booking.add(
                        customer,
                        lstService,
                        req.body.date,
                        req.body.time,
                        req.body.employee
                    );
                }
                res.redirect("/booking");
            } else {
                res.redirect("/");
            }
        })();
    }
    edit(req, res, next) {
        (async() => {
            if (process.env.status != 0) {
                let bookingDetail = await booking.getDetail(req.params.id);
                let i;
                // get date
                let d = new Date();
                let dayString = d.toLocaleDateString("en-GB");
                let day = [{ day: dayString }, ];
                d.setDate(d.getDate() + 1);
                dayString = d.toLocaleDateString("en-GB");
                day.push({ day: dayString });
                d.setDate(d.getDate() + 1);
                dayString = d.toLocaleDateString("en-GB");
                day.push({ day: dayString });
                for (i = 0; i < 3; i++) {
                    if (day[i].day == bookingDetail[0].NGAY) {
                        day[i] = Object.assign(day[i], { check: 1 });
                    } else {
                        day[i] = Object.assign(day[i], { check: 0 });
                    }
                }
                // get employee
                let employeeBooking = await employee.showToAdd();
                for (i = 0; i < employeeBooking.length; i++) {
                    if (employeeBooking[i].MANV == bookingDetail[0].MANV) {
                        employeeBooking[i] = Object.assign(employeeBooking[i], { check: 1 });
                        employeeBooking[i] = Object.assign(employeeBooking[i], { day: bookingDetail[0].NGAY });
                    } else {
                        employeeBooking[i] = Object.assign(employeeBooking[i], { check: 0 });
                        employeeBooking[i] = Object.assign(employeeBooking[i], { day: bookingDetail[0].NGAY });
                    }
                }
                //get time
                let time = await employee.addTimePeriod(bookingDetail[0].MANV, bookingDetail[0].NGAY);
                let currentDay = new Date()
                let date = currentDay.toLocaleDateString("en-GB");
                if (bookingDetail[0].NGAY == date) {
                    i = 0;
                    while (i < time.length) {
                        if (time[i].MAGIO <= convertCurrentTime(currentDay.getHours() + currentDay.getMinutes() / 60)) {
                            time.splice(i, 1);
                        } else {
                            i += 1;
                        }
                    }
                }
                for (i = 0; i < time.length; i++) {
                    time[i] = Object.assign(time[i], { check: 0 });
                }
                time.push({ MAGIO: bookingDetail[0].MAGIO, KHUNGGIO: bookingDetail[0].KHUNGGIO, check: 1 });
                time = sortObject(time, 'MAGIO');
                // get typeService
                let lstService = await service.getDetail(req.params.id);
                let typeService = await serviceType.showToAdd();
                for (i = 0; i < typeService.length; i++) {
                    typeService[i] = Object.assign(typeService[i], { check: 0 });
                    let j;
                    for (j = 0; j < lstService.length; j++) {
                        if (typeService[i].MALDV == lstService[j].MALDV) {
                            typeService[i].check = 1;
                        }
                    }
                }
                res.render("booking/updateBooking", {
                    lstService: lstService,
                    id: req.params.id,
                    employeeBooking: employeeBooking,
                    day: day,
                    time: time,
                    typeService: typeService,
                    status: process.env.status,
                    username: process.env.username,
                    img: process.env.img,
                });
            } else {
                res.redirect("/");
            }
        })();
    }
    update(req, res, next) {
        (async() => {
            if (process.env.status != 0) {
                let bookingDetail = await booking.getDetail(req.params.id);
                let result = await booking.destroy(req.params.id);
                let lstService = [];
                let i;
                for (i = 0; i < req.body.serviceType.length; i++) {
                    lstService.push(req.body[req.body.serviceType[i]]);
                };
                await booking.add(
                    bookingDetail[0].MAKH,
                    lstService,
                    req.body.date,
                    req.body.time,
                    req.body.employee
                );
                res.redirect("/booking");
            } else {
                res.redirect("/");
            }
        })();
    }
    destroy(req, res, next) {
        (async() => {
            if (process.env.status != 0) {
                let result = await booking.destroy(req.params.id);
                res.redirect("/booking");
            } else {
                res.redirect("/");
            }
        })();
    }
    updateTimePeriod(req, res) {
        (async() => {
            if (process.env.status != 0) {
                let currentDay = new Date()
                let date = currentDay.toLocaleDateString("en-GB");
                let timePeriod = await employee.addTimePeriod(req.body.idEmployee, req.body.day);
                let bookingDetail = await booking.getDetail(req.body.idBookingUpdate);
                if (req.body.idEmployee == bookingDetail[0].MANV && req.body.day == bookingDetail[0].NGAY) {
                    timePeriod.push({ MAGIO: bookingDetail[0].MAGIO, KHUNGGIO: bookingDetail[0].KHUNGGIO });
                }
                if (date == req.body.day) {
                    let i = 0;
                    let time = convertCurrentTime(currentDay.getHours() + currentDay.getMinutes() / 60);
                    while (i < timePeriod.length) {
                        if (timePeriod[i].MAGIO <= time) {
                            timePeriod.splice(i, 1);
                        } else {
                            i += 1;
                        }
                    }
                }
                timePeriod = sortObject(timePeriod, 'MAGIO');
                res.send(timePeriod);
            }
        })();
    }
    addTimePeriod(req, res) {
        (async() => {
            if (process.env.status != 0) {
                let currentDay = new Date()
                let date = currentDay.toLocaleDateString("en-GB");
                let timePeriod = await employee.addTimePeriod(req.body.id, req.body.day);
                if (date == req.body.day) {
                    let i = 0;
                    let time = convertCurrentTime(currentDay.getHours() + currentDay.getMinutes() / 60);
                    while (i < timePeriod.length) {
                        if (timePeriod[i].MAGIO <= time) {
                            timePeriod.splice(i, 1);
                        } else {
                            i += 1;
                        }
                    }
                }
                res.send(timePeriod);
            }
        })();
    }
    addService(req, res) {
        (async() => {
            if (process.env.status != 0) {
                let serviceName = await service.addNameService(req.body.id);
                res.send(serviceName);
            }
        })();
    }
    showDetail(req, res) {
        (async() => {
            if (process.env.status != 0) {
                let lstService = await service.getDetail(req.params.id);
                let bookingDetail = await booking.getDetail(req.params.id);
                res.render("booking/showDetail", {
                    MAKH: process.env.id,
                    lstService: lstService,
                    bookingDetail: bookingDetail,
                    status: process.env.status,
                    username: process.env.username,
                    img: process.env.img,
                });
            } else {
                res.redirect("/");
            }
        })();
    }
    getOldService(req, res) {
        (async() => {
            if (process.env.status != 0) {
                let serviceName = await service.addNameService(req.body.id);
                let lstServiceOld = await service.getDetail(req.body.idBookingUpdate);
                let i;
                for (i = 0; i < serviceName.length; i++) {
                    serviceName[i] = Object.assign(serviceName[i], { check: 0 });
                    let j;
                    for (j = 0; j < lstServiceOld.length; j++) {
                        if (serviceName[i].MADV == lstServiceOld[j].MADV) {
                            serviceName[i].check = 1;
                        }
                    }
                }
                res.send(serviceName);
            }
        })();
    }
}
module.exports = new BookingController();