$("#chart-container").insertFusionCharts({
    type: "doughnut2d",
    width: "100%",
    height: "100%",
    dataFormat: "json",
    dataSource: {
        chart: {
            caption: "Service Distribution at UIT BARBER",
            enableSmartLabels: false,
            subcaption: "For all users in 2021",
            showpercentvalues: "1",
            defaultcenterlabel: "Service Distribution",
            aligncaptionwithcanvas: "0",
            captionpadding: "0",
            decimals: "0",
            plottooltext:
                "<b>$percentValue</b> of our users are on <b>$label</b>",

            theme: "fusion",
        },
        data: [
            {
                color: "#29577b",
                label: "Cắt gội massage",
                value: "18900",
            },
            {
                color: "#35c09c",
                label: "Uốn",
                value: "5300",
            },
            {
                color: "#f6ce49",
                label: "Nhuộm",
                value: "10500",
            },
            {
                color: "#f7a35c",
                label: "Dịch vụ khác",
                value: "1900",
            },
        ],
    },
});

let chartConfig = {
    type: "hbar",
    fontFamily: "Arial",
    title: {
        text: "Customer Booking",
        backgroundColor: "none",
        fontColor: "#A4A4A4",
        fontFamily: "Arial",
        fontSize: "18px",
    },
    plot: {
        animation: {
            delay: 300,
            effect: "ANIMATION_EXPAND_TOP",
            method: "ANIMATION_LINEAR",
            sequence: "ANIMATION_BY_PLOT_AND_NODE",
            speed: "500",
        },
        barsOverlap: "100%",
        borderRadius: "8px",
        hoverState: {
            visible: false,
        },
    },
    plotarea: {
        margin: "60px 20px 20px 140px",
    },
    scaleX: {
        values: ["Feb", "March", "April", "May", "June"],
        guide: {
            visible: false,
        },
        item: {
            paddingRight: "20px",
            autoAlign: true,
            fontSize: "14px",
            rules: [
                {
                    fontColor: "#FA8452",
                    rule: "%i==0",
                },
                {
                    fontColor: "#FCAE48",
                    rule: "%i==1",
                },
                {
                    fontColor: "#FCCC65",
                    rule: "%i==2",
                },
                {
                    fontColor: "#A0BE4A",
                    rule: "%i==3",
                },
                {
                    fontColor: "#6FA6DF",
                    rule: "%i==4",
                },
            ],
        },
        lineColor: "none",
        tick: {
            visible: false,
        },
    },
    scaleY: {
        guide: {
            visible: false,
        },
        visible: false,
    },
    arrows: [
        {
            backgroundColor: "#CCCCCC",
            borderWidth: "0px",
            direction: "bottom",
            to: {
                x: "6%",
                y: "27%",
            },
            from: {
                x: "6%",
                y: "79%",
            },
        },
    ],
    labels: [
        {
            text: "DAYS",
            fontColor: "#9d9d9d",
            fontSize: "12px",
            x: "11.5%",
            y: "10%",
        },
        {
            text: "CUSTOMERS",
            fontColor: "#9d9d9d",
            fontSize: "12px",
            x: "20%",
            y: "10%",
        },
        {
            text: "GOAL",
            fontColor: "#9d9d9d",
            fontSize: "12px",
            x: "4%",
            y: "10%",
        },
    ],
    shapes: [
        {
            type: "circle",
            backgroundColor: "white",
            borderColor: "#6FA6DF",
            borderWidth: "3px",
            size: "14px",
            x: "45px",
            y: "99px",
        },
        {
            type: "circle",
            backgroundColor: "#6FA6DF",
            size: "2px",
            x: "40px",
            y: "95px",
        },
        {
            type: "circle",
            backgroundColor: "#6FA6DF",
            size: "2px",
            x: "50px",
            y: "95px",
        },
        {
            type: "pie",
            angleStart: 0,
            angleEnd: 180,
            backgroundColor: "#5297b6",
            size: "8px",
            x: "45px",
            y: "100px",
        },
        {
            type: "pie",
            angleStart: 0,
            angleEnd: 180,
            backgroundColor: "#fff",
            size: "6px",
            x: "45px",
            y: "100px",
        },
        {
            type: "circle",
            backgroundColor: "white",
            borderColor: "#FA8452",
            borderWidth: "3px",
            size: "14px",
            x: "45px",
            y: "433px",
        },
        {
            type: "circle",
            backgroundColor: "#FA8452",
            size: "2px",
            x: "40px",
            y: "429px",
        },
        {
            type: "circle",
            backgroundColor: "#FA8452",
            size: "2px",
            x: "50px",
            y: "429px",
        },
        {
            type: "pie",
            angleStart: 170,
            angleEnd: 10,
            backgroundColor: "#FA8452",
            size: "8px",
            x: "45px",
            y: "439px",
        },
        {
            type: "pie",
            angleStart: 170,
            angleEnd: 10,
            backgroundColor: "#fff",
            size: "5px",
            x: "45px",
            y: "440px",
        },
    ],

    series: [
        {
            values: [100, 100, 100, 100, 100],
            tooltip: {
                visible: false,
            },
            backgroundColor: "#f2f2f2",
            barWidth: "40px",
            borderColor: "#e8e3e3",
            borderWidth: "2px",
            fillAngle: 90,
        },
        {
            values: [5, 12, 23, 47, 81],
            valueBox: {
                text: "%v",
                alpha: 0.6,
                decimals: 0,
                fontColor: "#A4A4A4",
                fontSize: "14px",
                placement: "top-out",
            },
            barWidth: "32px",
            maxTrackers: 0,
            rules: [
                {
                    backgroundColor: "#FA8452",
                    rule: "%i==0",
                },
                {
                    backgroundColor: "#FCAE48",
                    rule: "%i==1",
                },
                {
                    backgroundColor: "#FCCC65",
                    rule: "%i==2",
                },
                {
                    backgroundColor: "#A0BE4A",
                    rule: "%i==3",
                },
                {
                    backgroundColor: "#6FA6DF",
                    rule: "%i==4",
                },
            ],
        },
    ],
};

zingchart.render({
    id: "myChart",
    data: chartConfig,
    height: "500px",
    width: "725px",
});
