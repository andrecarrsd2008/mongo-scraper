var request = require('request');
var cheerio = require('cheerio');
var base = "https://www.indeed.com";
var app = express();

var port = 8080;

var routes = {
    "/"(req, res, next) {
        res.view('index');
    },
    "/projects/search/:term"(req,res,next,term) {
        request({
            method: "GET",
            url: `${base}/projects/search.json?term=${term}`,
            json: true
        },  function(err,response,body) {
            console.log(err);
            res.json(body);
        });

    },

    "/categories"(req, res,next) {

        request.get(`${base}/discover`, function(err, response, body) {
            var $ = cheerio.load(body);

            var classes = $("div.category-container a").map(function() {
                return $(this).attr("class");
            }).get();
            
            classes=classes.reduce(function(all, item) {
                
                var id = +item.match(/category-(\d+)/)[1];
                var name = item.match(/hover-bg-color-(\w+)/)[1];

                all[name] = id;

                return all;
            }
        })
module.exports = routes;

app.listen(port, function() {
    console.log('server running on: http://localhost:' + port);
});