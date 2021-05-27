const { getStatus } = require("../../utils/statusBooking");
const { convertCurrentTime } = require("../../utils/convertTime");
const {
    booking,
    employee,
    service,
    serviceType,
} = require("../../config/db");
const { compare } = require("bcrypt");


class BookingController {
    show(req, res, next) {
        (async() => {
            if (process.env.status == 3) {
                let result = await booking.show();
                let i = 1;
                while (i<result.length){
                    if(result[i].DAY == result[i-1].DAY && result[i].MONTH == result[i-1].MONTH && result[i].YEAR == result[i-1].YEAR && result[i].KHUNGGIO == result[i-1].KHUNGGIO && result[i].HO_1 == result[i-1].HO_1 && result[i].TEN_1 == result[i-1].TEN_1){
                        result.splice(i,1);
                    }
                    else{
                        i+=1;
                    }
                }
                result = getStatus(result);
                res.render("admin/booking/showBooking", {  
                    booking: result,
                    status: process.env.status,
                    username: process.env.username,
                    img: process.env.mg,
                });
            } else if (process.env.status == 0) {
                res.redirect("/authenticate/login");
            } else {
                let result = await booking.show(process.env.id);
                let i = 1;
                while (i<result.length){
                    if(result[i].DAY == result[i-1].DAY && result[i].MONTH == result[i-1].MONTH && result[i].YEAR == result[i-1].YEAR && result[i].KHUNGGIO == result[i-1].KHUNGGIO && result[i].HO_1 == result[i-1].HO_1 && result[i].TEN_1 == result[i-1].TEN_1){
                        result.splice(i,1);
                    }
                    else{
                        i+=1;
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
        })();
    }
    adding(req, res, next) {
        (async() => {
            if (process.env.status != 0) {
                let lstService = [];
                let i;
                for (i = 0; i < req.body.serviceType.length; i++) {
                    lstService.push(req.body[req.body.serviceType[i]]);
                };
                await booking.add(
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
    edit(req, res, next) {
        (async() => {
            if (process.env.status != 0) {
                let d = new Date();
                let dayString = d.toLocaleDateString("en-GB");
                let day = [
                    {day: dayString},
                ];
                d.setDate(d.getDate() + 1);
                dayString = d.toLocaleDateString("en-GB");
                day.push({day: dayString});
                d.setDate(d.getDate() + 1);
                dayString = d.toLocaleDateString("en-GB");
                day.push({day: dayString});
                let lstService = await service.getDetail(req.params.id);
                let bookingDetail = await booking.getDetail(req.params.id);
                let employeeBooking = await employee.showToAdd();
                let i;
                for (i = 0; i < employeeBooking.length; i++){
                    if (employeeBooking[i].MANV == bookingDetail[0].MANV){ 
                        employeeBooking[i] = Object.assign(employeeBooking[i],{check: 1});
                        employeeBooking[i] = Object.assign(employeeBooking[i],{day:bookingDetail[0].NGAY});
                    } else{
                        employeeBooking[i] = Object.assign(employeeBooking[i],{check: 0});
                        employeeBooking[i] = Object.assign(employeeBooking[i],{day:bookingDetail[0].NGAY});
                    }
                }
                for (i = 0; i<3;i++){
                    if (day[i].day == bookingDetail[0].NGAY){ 
                        day[i] = Object.assign(day[i],{check: 1});
                    } else{
                        day[i] = Object.assign(day[i],{check: 0});
                    }
                }

                res.render("booking/updateBooking", {
                    employeeBooking : employeeBooking,
                    day: day,
                    status: process.env.status,
                    username: process.env.username,
                    img: process.env.img,
                });
            } else {
                res.redirect("/");
            }
        })();
    }
    destroy(req, res, next) {
        (async() => {
            let result = await booking.destroy( req.params.id);
        })();
        res.redirect("/booking");
    }
    addTimePeriod(req, res) {
        (async() => {
            if (process.env.status != 0) {
                let currentDay = new Date()
                let date = currentDay.toLocaleDateString("en-GB");
                let timePeriod = await employee.addTimePeriod(req.body.id,req.body.day);
                if (date == req.body.day){
                    let i = 0;
                    let time = convertCurrentTime(currentDay.getHours() + currentDay.getMinutes()/60);
                    while (i < timePeriod.length){
                        if( timePeriod[i].MAGIO <= time){
                            timePeriod.splice(i,1);
                        } else{
                            i+=1;
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
}
module.exports = new BookingController();