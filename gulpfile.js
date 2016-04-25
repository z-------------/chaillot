var gulp = require("gulp");

// consts

var JADE_PATH = "./source/jade/index.jade";
var SASS_PATH = "./source/sass/style.scss";
var PUBLIC_PATH = "./public/";

// css

gulp.task("css", function() {
    var postcss = require("gulp-postcss");
    var autoprefixer = require("autoprefixer-core");
    var concat = require("gulp-concat");
    var sass = require("gulp-sass");

    return gulp.src(SASS_PATH)
        .pipe(sass().on("error", sass.logError))
        .pipe(postcss([ autoprefixer({ browsers: ["last 2 versions"] }) ]))
        .pipe(gulp.dest(PUBLIC_PATH));
});

// jade

gulp.task("jade", function() {
    var jade = require("gulp-jade");

    return gulp.src(JADE_PATH)
        .pipe(jade())
        .pipe(gulp.dest(PUBLIC_PATH));
});

// watch

gulp.task("watch", function() {
    gulp.watch(JADE_PATH, ["jade"]);
    gulp.watch(SASS_PATH, ["css"]);
});

// default task

gulp.task("default", ["jade", "css", "watch"]);
