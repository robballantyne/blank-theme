
// Get mix
let mix = require('laravel-mix');

let glob = require('glob-all');

let ImageminPlugin = require( 'imagemin-webpack-plugin' ).default;
let CopyWebpackPlugin  = require('copy-webpack-plugin');
let imageminMozjpeg    = require('imagemin-mozjpeg');



var htmlFiles = glob.sync([
        'layouts/**/*.htm*',
        'pages/**/*.htm*',
        'content/**/*.htm*',
        'partials/**/*.htm*',
        '../plugins/**/*.htm*'
]);


mix
    // Configure Webpack
    .webpackConfig({
        devtool: 'source-map',
        plugins: [
            //Compress images
            new CopyWebpackPlugin([{
                from: 'assets/src/images', // FROM
                to: 'assets/dist/images/', // TO
            }]),
            new ImageminPlugin({
                test: /\.(jpe?g|png|gif|svg)$/i,
                pngquant: {
                    quality: '65-80'
                },
                plugins: [
                    imageminMozjpeg({
                        quality: 65,
                        //Set the maximum memory to use in kbytes
                        maxmemory: 1000 * 512
                    })
                ]
            })
        ],
    })

    // Configure Mix
    .options({
        processCssUrls: false,
    //    purifyCss: {
    //        paths: htmlFiles,
    //        verbose: true
    //    }
     })

    .js('assets/src/js/app.js', 'assets/dist/js/')
    .sass('assets/src/sass/vendor.scss', 'assets/dist/css/')
    .sass('assets/src/sass/app.scss', 'assets/dist/css/')
    .extract([
        'slideout',
        'izimodal',
        'select2'
    ])
    .sourceMaps();



// Full API
// mix.js(src, output);
// mix.react(src, output); <-- Identical to mix.js(), but registers React Babel compilation.
// mix.preact(src, output); <-- Identical to mix.js(), but registers Preact compilation.
// mix.coffee(src, output); <-- Identical to mix.js(), but registers CoffeeScript compilation.
// mix.ts(src, output); <-- TypeScript support. Requires tsconfig.json to exist in the same folder as webpack.mix.js
// mix.extract(vendorLibs);
// mix.sass(src, output);
// mix.standaloneSass('src', output); <-- Faster, but isolated from Webpack.
// mix.fastSass('src', output); <-- Alias for mix.standaloneSass().
// mix.less(src, output);
// mix.stylus(src, output);
// mix.postCss(src, output, [require('postcss-some-plugin')()]);
// mix.browserSync('my-site.test');
// mix.combine(files, destination);
// mix.babel(files, destination); <-- Identical to mix.combine(), but also includes Babel compilation.
// mix.copy(from, to);
// mix.copyDirectory(fromDir, toDir);
// mix.minify(file);
// mix.sourceMaps(); // Enable sourcemaps
// mix.version(); // Enable versioning.
// mix.disableNotifications();
// mix.setPublicPath('path/to/public');
// mix.setResourceRoot('prefix/for/resource/locators');
// mix.autoload({}); <-- Will be passed to Webpack's ProvidePlugin.
// mix.webpackConfig({}); <-- Override webpack.config.js, without editing the file directly.
// mix.babelConfig({}); <-- Merge extra Babel configuration (plugins, etc.) with Mix's default.
// mix.then(function () {}) <-- Will be triggered each time Webpack finishes building.
// mix.extend(name, handler) <-- Extend Mix's API with your own components.
// mix.options({
//   extractVueStyles: false, // Extract .vue component styling to file, rather than inline.
//   globalVueStyles: file, // Variables file to be imported in every component.
//   processCssUrls: true, // Process/optimize relative stylesheet url()'s. Set to false, if you don't want them touched.
//   purifyCss: false, // Remove unused CSS selectors.
//   uglify: {}, // Uglify-specific options. https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
//   postCss: [] // Post-CSS options: https://github.com/postcss/postcss/blob/master/docs/plugins.md
// });
