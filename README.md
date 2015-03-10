# Material Résumé

---

## Introduction
Professional Résumés and Curriculum Vitae formalities follow conventions from as [early as the 1500's](http://mashable.com/2011/09/04/history-of-the-resume/ ""History of the Resume). Material Resume is a fresh take on how this old formality can be improved to meet the current recipient's expectations using [Google's Material Design](http://www.google.com/design/spec/material-design/introduction.html) visual language. 

Built using modern web development workflow tools, such as:

* Bower for package management, 
* Gulp and plugins for web development task management, 
* Jade as HTML template language 
* Materialize SASS as CSS scaffolding
* And JSON for content layer

With these simple instruction, you'll be able to impress any hiring manager and learn some neat tricks about the latest design and front-end development tools.

#### Preview the result of this workflow at [http://paiva.cc]()

.

---

## Designed in Sketch App
The sketch template containing the design for this resume, along with Material Design visual elements, symbols, icons - and much more, can be found in the [design folder](https://github.com/mpaiva/material-resume/tree/master/_src/design).  

![_showcase](https://cloud.githubusercontent.com/assets/781670/6544935/fdec0634-c534-11e4-9aef-a0a1e298038f.png)

---

# Collaborate and Learn
## 1. Fork this repo
Help improving this template further. The experience of using - and learning - the latest design/development workflow with collaborators alike can only __help you become a better designer/developer__.

Click on the Fork button on the top of this page.

![](https://deltacloud.apache.org/assets/img/git-Fork.png)

### Get Going with Git
if you are hanging around GitHub, you're already familiar with Git. If you are not, there are simple and quick ways to learn:

* [GitHub Client for Mac](https://mac.github.com/)
* [GitHub Client for Windows](https://windows.github.com/)
* [Try Git - Free Course at Code School](https://www.codeschool.com/courses/try-git)

## 2. Clone your fork
Assuming you already have Git installed in your machine, go into your project folder and __clone your fork repository locally__ by adding the following command:

```
$ git clone https://github.com/[YOUR_USERNAME]/material-resume.git
```
Go into your new Git folder:

```
$ cd material-resume
```

## 3. Requirements
In order to take the most of the Gulp automation included in this template, you will need to have the following installed before moving forward.
 
* [Node.js and NPM](https://nodejs.org/) - manages the development dependencies, like Gulp, Bower and plugins
* [Bower](http://bower.io/) - takes care of production components and libraries used to display the web page, such as Materialize, jQuery, Bootstrap, etc.
* [LiveReload](http://livereload.com/) - monitors changes in the file system. As soon as you save a file, it is preprocessed as needed, and the browser is refreshed.

---

# Getting Started
Let's shift gears and install the NPM/Bower modules. __This will be surprisingly easy!__
   
## As Easy As 1,2,3 



With only 3 commands you will be editing the code like a wizard:

### 1. Install NPM modules:
	$ npm install
This could take a few seconds, hang tight. It will install all the dependencies included in the [package.json](https://github.com/mpaiva/material-resume/blob/master/package.json), mostly Gulp plugins and they will be added to the "__node_modules__" folder
### 2. Install Bower Components
	$ bower install
This step takes care of the components dependencies included in the [bower.json](https://github.com/mpaiva/material-resume/blob/master/bower.json), in our case just Materialize (jQuery comes with it) and it will be added to your "__bower_components__" folder.
### 3. Start gulp and behold!
	$ gulp
This simple command you will run the default task in the [gulpfile.js](https://github.com/mpaiva/material-resume/blob/master/gulpfile.js), which includes the following:

* It will create the __builds/development__ folder, where your index.html resides
* Copy Bower components into the __lib/__ folder
* Converts SASS into CSS
* Converts Jade templates into index.html
* Copy and Optimize images from assets into __images__ folder
* Copy any assets into __downloads__ folder
* Finally, it keeps a watch in your __src__ folder for any future changes.

---

#### LiveReload Instructions
1. be sure to have the [LiveReload Browser Extension](http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions-) installed.
2. Load the __index.html__ in the __builds/development__ folder
3. Make sure LiveReload 2 is running
4. Click the LiveReload toolbar button to enable or disable LiveReload. 

	![image](https://cloud.githubusercontent.com/assets/781670/6565922/77094562-c68a-11e4-9c73-dcdf53beb475.png)

# HTML and Jade Templates
Jade ([http://jade-lang.com]()) is a very cool HTML template language that brings a number of features to allow front-end developers to leverage [DRY practices](http://en.wikipedia.org/wiki/Don%27t_repeat_yourself) with variables, data-binding, mixins, includes, etc.

To learn more about Jade, [check out this Tuts+ video](https://webdesign.tutsplus.com/courses/top-speed-html-development-with-jade) by Kezz Bracey [@KezzBracey](https://twitter.com/KezzBracey)

After you are familiar with Jade, take a closer look in the __"\_src/templates__" folder and the .jade files

# Content Layer via JSON
For obvious reasons, it is important to keep the content of your resume decoupled from your presentation layer. The combination of Gulp and Jade allows to connect the templates with a JSON file.

Inside the __\_src/templates/content__ folder, you'll find the [mpaiva.json](https://github.com/mpaiva/material-resume/blob/master/_src/templates/content/mpaiva.json) containing the sections and content structure of the Material Resume template.

This file is serviced via the [gulpfile.js](https://github.com/mpaiva/material-resume/blob/master/gulpfile.js). 

A variable containing with path to data source:

```
19 // JSON containing the content for jade templates
20 var resumeData = require('./_src/templates/content/mpaiva.json')
```
is passed to the [gulp-jade plugin](https://www.npmjs.com/package/gulp-jade) via the __locals__ option. See example below:

```
var jade = require('gulp-jade');
 
gulp.task('templates', function() {
  var resumeData = require('./_src/templates/content/mpaiva.json')
 
  gulp.src('./lib/*.jade')
    .pipe(jade({
      locals: resumeData
    }))
    .pipe(gulp.dest('./dist/'))
});

```

Then, you can bind any data node from the JSON file with `#{locals.name}`. See example below:

JSON node: 

```
{
  "name": "Marcelo Paiva",
  "title": "User Experience Director",
  "photo": "images/mpaiva2.jpg"
}
```



Jade template: __[_portrait-card.jade](https://github.com/mpaiva/material-resume/blob/master/_src/templates/partials/_portrait-card.jade)___ 

```
.card.portrait
	.card-image
		img(src="#{locals.photo}")
		.portrait-wrapper
			h4 #{locals.name}
			h6 #{locals.title}
```

### That's it! Really.
With these initial instructions you should be able to get going in no time. 



---
# Have fun and Contribute!
if you have any questions or suggestions, please leave us note on the [Issues Page](https://github.com/mpaiva/material-resume/issues/new)

.

---




