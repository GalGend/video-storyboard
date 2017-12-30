var Jimp = require('jimp');
var m, framePaths;
var Promise = require('bluebird');

module.exports.generateSBM= function(SBMSize, filePaths, outputPath){

    validateParams();

    F_HEIGHT = SBMSize.fHeight,
    F_WIDTH = SBMSize.fWidth,
    F_COUNT = SBMSize.fCount, 
    F_PER_ROW = F_PER_COL = Math.sqrt(F_COUNT), 
    M_HEIGHT = F_HEIGHT * F_PER_COL,
    M_WIDTH = F_WIDTH * F_PER_ROW;

    framePaths = filePaths;
    new Jimp(M_WIDTH, M_HEIGHT, function(err, mImage){
        if(err){
            throw new Error('Could not initiate a new image');
        }
        
        m = mImage;

        drawFramesRecursivly(0)
        .then(function(matrix){
            //console.log('b');
            matrix.write('M/M0.jpg');
        })
        .catch(function(){
            console.log('c');
        });
    });
}

function validateParams(SBMSize, filePaths){
    // validting that the array size is smaller or equal to 
   // if(filePaths.length > SBMSize.frameCount){
       // throw new Error('More frames than needed, will ignore ');
   // }
}

function drawFramesRecursivly(i){
    return new Promise(function(resolve, reject){

        if(i>= framePaths.length || i >= F_COUNT){
            resolve(m);
        }

        if (i<F_COUNT){
            var xIndex = i % F_PER_ROW;
            var yIndex = Math.floor(i / F_PER_COL);
            Jimp.read(framePaths[i]).then(function(f){
                f.resize(F_WIDTH, F_HEIGHT);
                m.composite(f, xIndex * F_WIDTH, yIndex * F_HEIGHT);
                resolve(drawFramesRecursivly(i+1))
            })
        }
    });
}