#!/usr/bin/env node

var fs = require("fs"),
    gm = require("gm"),
    glob = require("glob"),
    caption = "",
    dir = "/**/+(appicon|DefaultIcon)*.png";

//console.log("start");

if (process.argv[2]) {
    caption = process.argv[2];
}
if (process.argv[3]) {
    dir = process.argv[3] + "/**/+(appicon|DefaultIcon)*.png";
}

glob(dir, {}, function(er, files) {
    for (var i = 0; i < files.length; i++) {
        processImage(files[i], files[i]);
    };
});

function processImage(input, output) {
    gm(input)
        .size(function(err, size) {
            if (!err) {
                var w = size.width,
                    h = size.height;

                gm(input)
                    .stroke("#c20000")
                    .fill('#c20000')
                    .drawRectangle(0, h - h / 5 - 5, w, h, 7, 7)
                    .font("Arial.ttf")
                    .fontSize(Math.round(w / 6))
                    .stroke("#ffffff", 1)
                    .fill('#ffffff')
                    .drawText(0, 10, caption, "South")
                    .write(output, function(err) {
                        if (!err) {
                            console.log('Done: ' + input);
                        } else {
                            console.log(err);
                        }
                    });
            }
        });
}