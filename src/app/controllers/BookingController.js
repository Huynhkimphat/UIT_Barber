const { CLOB } = require("oracledb");
const { booking, time, employee, service, serviceType } = require("../../config/db");

class BookingController {
    //* [GET]/
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
                    // booking: temp,
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
                for (i =0;i<req.body.typeService.length;i++){
                    lstService.push(req.body[req.body.typeService[i]]);
                }
                await booking.add(
                    lstService,
                    req.body.date,
                    req.body.time,
                    req.body.employee,
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
                let lstService = await service.showDetail(req.params.id);
                let bookingDetail = await booking.showDetail(req.params.id);
                res.render("booking/updateBooking", {
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
    destroy(req, res, next) {
        (async() => {
            let result = await booking.destroy( req.params.id);
        })();
        res.redirect("/booking");
    }
    addTimePeriod(req,res){
        (async() => {
            if (process.env.status != 0) {
                let timePeriod = await employee.addTimePeriod(req.body.id,req.body.day);
                res.send(timePeriod);
            }
        })();
    }
    addService(req,res){
        (async() => {
            if (process.env.status != 0) {
                let serviceName = await service.addNameService(req.body.id);
                res.send(serviceName);
            }
        })();
    }
    showDetail(req,res){
        (async() => {
            if (process.env.status != 0) {
                let lstService = await service.showDetail(req.params.id);
                let bookingDetail = await booking.showDetail(req.params.id);
                res.render("booking/showDetail", {
                    // booking: temp,
                    lstService: lstService,
                    bookingDetail: bookingDetail,
                    status: process.env.status,
                    username: process.env.username,
                    img: process.env.img,
                });
            }
        })();
    }
}
module.exports = new BookingController();