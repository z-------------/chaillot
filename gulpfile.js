var gulp = require("gulp");
var path = require("path");

// consts

var SASS_PATH = "./source/sass/common.scss";
var PUBLIC_PATH = "./public/";

// css

gulp.task("sass", function() {
    var postcss = require("gulp-postcss");
    var autoprefixer = require("autoprefixer-core");
    var concat = require("gulp-concat");
    var sass = require("gulp-sass");

    return gulp.src(SASS_PATH)
        .pipe(sass({ outputStyle: "expanded" }).on("error", sass.logError))
        .pipe(postcss([ autoprefixer({ browsers: ["last 2 versions"] }) ]))
        .pipe(gulp.dest(path.join(PUBLIC_PATH, "css")));
});

// watch

gulp.task("watch", function() {
    gulp.watch("./source/sass/*", ["sass"]);
});

// default task

gulp.task("default", ["sass","watch"]);
