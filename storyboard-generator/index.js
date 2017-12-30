var MGen = require('./storyboard-M-generator');
var SBMSizes = require('./enums/SBM-size');
var file = '/Users/GalGendler/Desktop/image.jpg';

var paths = [];
for (var i=0;i<100;i++){
    paths.push(file);
}

MGen.generateSBM(SBMSizes.MX, paths);