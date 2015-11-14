# BoilSth
Boilerplate
for quick building websites.

Based with **less and gulp**

## Usage

    bower install
    sudo npm install
    sudo npm install -g gulp

set the project name inside your gulpfile.js

    var projectName = "sampleapp";
where sampleapp is your project name. It results in names of dist files which will be:

     **sampleapp.min.css, sampleapp.min.js, sampleapp-lib.min.js**

**_src**
is the folder where you put your source data
**_dist**
is the folder where gulp puts output and you should link there

## Gulp

    gulp watch
watches for changes in whole _src folder

    gulp less
builds only less files

    gulp js
build only js files

    gulp compress-img
runs images compressor for the files inside _src/img/ and puts output to _dist/img.

    gulp lib
builds your JavaScript library based on array in gulpfile.js

    gulp.task('lib', function () {
        return gulp.src([
            'YOUR ARRAY HERE',
            'SECOND ELEMENT'
        ])
files loads one by one (as the array goes, so if library A is based on lib B and needs B to be preloaded before loading A. Simply put Library A as first in array.
**Each lib element should be pre minified if you want them to be minified in your lib file** This script just concatenates lib files.


## More data about less mixins
https://github.com/sth-group/sth-camouflage
