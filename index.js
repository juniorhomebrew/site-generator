var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var layouts = require('metalsmith-layouts');
var permalinks = require('metalsmith-permalinks');
var browserSync = require('metalsmith-browser-sync');
var collections = require('metalsmith-collections');

const fs = require('fs')
const path = require('path')

var lesson_dir = 'learn'
var lessons = {}

var module_list = fs.readdirSync('src/' + lesson_dir)
    .filter(file => fs.statSync(
        path.join('src/' + lesson_dir, file)).isDirectory())

for (var i in module_list) {
    module = module_list[i]
    
    // Make sure that the index file is not matched (since it is the current one)
    file_patt = [lesson_dir + '/'+ module + '/*.md', '!**/index.md']
    
    lessons[module] = {
        pattern: file_patt
    }
}

lessons["modules"] = {
    pattern: 'learn/*/index.md'
}

Metalsmith(__dirname)
    .use(collections(lessons))
    .metadata({
        title: "hbrew.club()",
        description: "",
        stylesheeturl: "/assets/css/main.css",
        logourl: "/assets/images/icon-white.png"
    })
    .source('./src')
    .destination('./build')
    .clean(true)
    .use(markdown())
    .use(permalinks())
    .use(layouts({
        engine: 'handlebars',
        partials: 'layouts/partials',
        // default: 'lesson.html'
    }))
    .use(browserSync({
        server: "build",
        files: ["index.js", "src/**/*", "layouts/**/*"]
    }))
    .build(function(err, files) {
        if (err) {
            throw err;
        }
    });
