const mix = require('laravel-mix');

mix.sass('resources/scss/app.sass', 'public/css/app.css')
   .js('resources/js/app.js', 'public/js/app.js');