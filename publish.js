var ghpages = require('gh-pages')
var path = require('path')

ghpages.publish(path.join(__dirname, 'build'),  {
    message: 'Auto-generated commit',
    branch: 'master',
    repo: 'https://github.com/juniorhomebrew/juniorhomebrew.github.io.git'
});
