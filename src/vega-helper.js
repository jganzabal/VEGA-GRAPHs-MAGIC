import * as vega from 'vega'
import * as vgSpecLinear from "./jsons/linear.vg.json"
import * as vegaTooltip from "vega-tooltip"

export default {
    addVgLinearPlot(id, vgSpecOrig, graphs, onClickListener, parentDim, options) {
        if (vgSpecOrig == null) {
            vgSpecOrig = vgSpecLinear
        }
        // Adjust to parent dimensions
        let vgSpec = JSON.parse(JSON.stringify(vgSpecOrig));

        if (graphs == null) {
            return
        }
        if (graphs[0]['topicPlot']['dates'] == null) {
            return
        }
        let dataValues = []
        for (let j = 0; j < graphs.length; j++) {
            let graph = graphs[j]
            let dates = graph['topicPlot']['dates']
            let pages = graph['topicPlot']['pages']

            for (let i = 0; i < dates.length; i++) {
                if (dates[i]['$date'] != null)
                    var a = new Date(dates[i]['$date']);
                else
                    var a = new Date(dates[i]);
                let strDate = a.toDateString()
                let dict = { "x": i, "date": strDate, "y": pages[i], "c": graph['title'] }
                dataValues.push(dict)
            }
        }
        if (graphs.length == 1) {
            if (graphs[0].name == null) {
                vgSpec.legends = null
            }
        }

        vgSpec.data.unshift({ "name": "table", "values": dataValues })

        if (parentDim) {
            var margW = $(id).outerWidth(true) - $(id).outerWidth();
            var margH = $(id).outerHeight(true) - $(id).outerHeight();
            outerWidth = $(id).outerWidth()
            outerHeight = $(id).outerHeight()
            var width = $(id).width()
            var height = $(id).height()
            vgSpec.width = width - (outerWidth - width)
            vgSpec.height = height - (outerHeight - height)
            vgSpec.autosize = "fit"
            console.log('outerWidth' + outerWidth)
            console.log('w:' + width)
            console.log('M' + margW)

        }
        if ((width == 0) || (width == null)) {
            console.log("Width problem. width = 0")
            return "Width problem. width = 0"
        }
        console.log("width = ", width)
        window.vgSpec = vgSpec
        console.log(id)
        console.log(vgSpec)
        var runtime = vega.parse(vgSpec);

        var view = new vega.View(runtime)
            .initialize(document.querySelector(id))
            .hover()
            .run()
            .renderer("svg");

        view.addEventListener('click', onClickListener);
        var options = {
            showAllFields: false,
            fields: [{
                    field: "c",
                    title: "Topic",
                    //formatType: "time" | "number" | "string",
                    format: "string",
                    //aggregate: operation,
                }, {
                    field: "date",
                    title: "Day",
                    //formatType: "time" | "number" | "string",
                    format: "string",
                    //aggregate: operation,
                },
                {
                    field: "y",
                    title: "Pages",
                    //formatType: "time" | "number" | "string",
                    format: "string",
                    //aggregate: operation,
                }
            ],
            delay: 250,
            onAppear: function(event, item) { console.log(item) },
            onMove: function(event, item) {},
            onDisappear: function(event, item) {},
            colorTheme: "light" // | "dark"
        };
    },
    addVgExample(id, vgSpec, parentDim, options) {
        // Adjust to parent dimensions
        if (parentDim) {
            var margW = $(id).outerWidth(true) - $(id).outerWidth();
            var margH = $(id).outerHeight(true) - $(id).outerHeight();
            outerWidth = $(id).outerWidth()
            outerHeight = $(id).outerHeight()
            var width = $(id).width()
            var height = $(id).height()
            vgSpec.width = width - (outerWidth - width)
            vgSpec.height = height - (outerHeight - height)

            console.log('outerWidth' + outerWidth)
            console.log('w:' + width)
            console.log('M' + margW)

            //vgSpec.autosize = "fit"
        }

        var runtime = vega.parse(vgSpec);

        var view = new vega.View(runtime)
            .initialize(document.querySelector(id))
            .hover()
            .run();
        //.renderer("svg");

        view.addEventListener('click', function(event, item) {
            console.log(event, item);
        });


        console.log(vgSpec)


        var options = {
            showAllFields: true,
            fields: [{
                    field: "c",
                    title: "Topic",
                    //formatType: "time" | "number" | "string",
                    format: "string",
                    //aggregate: operation,
                }, {
                    field: "date",
                    title: "Day",
                    //formatType: "time" | "number" | "string",
                    format: "string",
                    //aggregate: operation,
                },
                {
                    field: "y",
                    title: "Pages",
                    //formatType: "time" | "number" | "string",
                    format: "string",
                    //aggregate: operation,
                }
            ],
            delay: 250,
            onAppear: function(event, item) { console.log(item) },
            onMove: function(event, item) {},
            onDisappear: function(event, item) {},
            colorTheme: "dark"
        };

        var options = {
            showAllFields: true
        }
        vegaTooltip.vega(view, options);
        window.VEGA_DEBUG = view
    }
}