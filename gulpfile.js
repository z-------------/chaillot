var gulp = require("gulp");
var path = require("path");

// consts

var JADE_PATH = "./source/jade/index.jade";
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

// jade

gulp.task("jade", function() {
    var jade = require("gulp-jade");

    return gulp.src(JADE_PATH)
        .pipe(jade({ pretty: true }))
        .pipe(gulp.dest(PUBLIC_PATH));
});

// watch

gulp.task("watch", function() {
    gulp.watch(JADE_PATH, ["jade"]);
    gulp.watch("./source/sass/*", ["sass"]);
});

// default task

gulp.task("default", ["jade", "sass", "watch"]);
