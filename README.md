![](http://www.alfabook.it/wp-content/uploads/2013/03/logo-alfabook2.png)

# EPUB-CREATOR


A simple class writed in Typescript (and transpiled in es5) for create your epub from text/html. 
Can be used in your client browser or nodejs.

## Install

by npm

	npm install --save epub-creator
	
bower

	bower install --save epub-creator


## Quick and dirty

Create a epub in a quick and drity way.

	let epubCreator = new EpubCreator(); // init class
	epubCreator.properties.title = "Alfabook book title"; //set title property
	epubCreator.addSections([
									{
										tag: "section", 
										name: "bodymatter", 
										"content": "Hi this is an epub3"
									}
							   ]);


## Make epub great again -> epub.properties
You can create epub with more options and pass to the class some property.
takea look in te example "quick and dirty" at line 2: `epubCreator.properties.title = "Alfabook book title"; //set title property
`
Epubcreator expos a public `properties object` that you can set:

this is the default settings: 

			{
		            uuid: "github.com/bbottema/js-epub-maker::it-came-from::example-using-idpf-wasteland",
		            author: "Alfabook",
		            language: "it-IT",
		            modificationDate: new Date().toString(),
		            rights: {
		                description: "This work is shared with the public using the Attribution-ShareAlike 3.0 Unported (CC BY-SA 3.0) license.",
		                license: "http://creativecommons.org/licenses/by-sa/3.0/"
		            },
		            attributionUrl: "https://www.alfabook.it",
		            cover: {
		                file: "",
		                license: "http://creativecommons.org/licenses/by-sa/3.0/",
		                mediaType: "image/jpeg",
		                attributionUrl: "https://www.alfabook.it"
		            },
		            title: "Book Title",
		            publicationDate: new Date().toString()
		        };


You can set what you want like this:

		epubCreator.properties.language = "en-EN";
		epubCretor.properties.author = "my Favorites author";
		
# Cover
This is the image that your epub reader use to make a preview. It's not mandatory, but make epub cool.  

The settings for cover are in properties under key `cover`


	cover: {
			                file: "",
			                license: "http://creativecommons.org/licenses/by-sa/3.0/",
			                mediaType: "image/jpeg",
			                attributionUrl: "https://www.alfabook.it"
			            },

if `file` properties is not specified, no cover is set.  

If we want to set a cover we must compile the `cover.file` settings. We can pass two type of image:  

- a string with path of image 
- a base64 image 

### Cover with a string:

	cover: {
				                file: "./images/mycover.jpg",
				                license: "http://mysite.com/licence",
				                mediaType: "image/jpeg",
				                attributionUrl: "https://www.thisismyimage.com"
				            },


### Cover with base64 image data: 

	cover: {
				                file: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAgE-THIS IS JUST AN EXAMPLE IS NOT A BASE64 VALID IMAGE- 8eIpiq7FX//2Q==,
				                license: "http://mysite.com/licence",
				                mediaType: "image/jpeg",
				                attributionUrl: "https://www.thisismyimage.com"
				            },
	
[^emphasize]:           
Don't remember to set `cover.mediaType` for image different to jpg. 

On some example in idpf the cover are jpg image data Width:398 px Height:510 px


## Add a custom css files
Ok now we have a epub with right properties and a cover but we need to make it better with custom css!. 
We can add a css as a string of parameters or linking a file:

### Add css with string:

		epubCreator.addCss({
	    "content": "@namespace '@charset 'UTF-8'; http://www.w3.org/1999/xhtml'; @namespace epub 'http://www.idpf.org/2007/ops'; body: { margin-left:6em, margin-right:2em}",
	    "name": "base.css"
	})


Super easy! We have used `addCss` with a object `{content:string, name:string}`. 

`content` has css string parameters and `name` is the name of file.

### Add css with file path:

	epubCreator.addCss({
		  	"path": "./demo/day.css",
		})

You can set `name` as optional parameter `{path:string, name?:string}`


You can add more than one css as you like:

	epubCreator.addCss({
		    "content": "@namespace '@charset 'UTF-8'; http://www.w3.org/1999/xhtml'; @namespace epub 'http://www.idpf.org/2007/ops'; body: { margin-left:6em, margin-right:2em}",
		    "name": "base.css"
		}) 
	epubCreator.addCss({
		  	"path": "./demo/day.css",
		})
  
## Add Content
This is the most important part. EpubCreator help you to insert a valid content but you need to know some Epub3 basic concept:

1 - content is organizied by section  
2 - there are 3 basic section:  
			- Front Matter: A section in the beginning of the work    
		 	- Body Matter: 'An introductory section that sets the background to a story, typically part of the narrative.     
			- Back Matter: An ending section.      
3 - this section have some subsection... but this is an other story...   
4 - the main content of an epub is placed in section bodyMatter.  
5 - for a better epub we need to study idpf line guide.    

### Add section content
To add a section we need to coll the method "addSection" and pass an array of object with params:
 
	{
	tag: string -> what type of section, 90%  = section
	name: string -> name of section ex. bodymatter
	content: array/string  -> the content inside this section
	}
	
A simple example

	epubCreator.addSections([ 
									{
										tag: "section", 
										name: "frontmatter", 
										"content":"this is the start of my book"
									}
								]);
	
***What append if inside of my frontmatter i need to add other section?***
We can solve this in 2 way
1 - autopilot, with nested object
2 - manual with string

### Autopilot: Add nested object inside section (section of section)
We say above that "content" properties of section can be a string or array, in the example we have see the use of string, let now explain how use the content as array: 

	epubCreator.addSections([
									{
										tag: "section", 
										name: "frontmatter", 
										"content":[
										  {tag: "section", name: "frontmatter", "content": [
																		  {
														                tag: "section",
														                name: "epigraph",
														                content: "this is epigraph content "
								            							  },
																		]
									}
								]);


In the example above section frontMatter has inside content an other section called epigraph that has a string content. We can use array of array of array x n. object inside content. 

### Add nested object with inside html
Waht about if we need to add some text/html before epigraph section?. We can do it set `tag` propery as html and leaving name as null: 
 `{tag: "html", content: "<br>this is a content"}`
 
	 epubCreator.addSections([
										{
											tag: "section", 
											name: "frontmatter", 
											"content":[
											  {tag: "section", name: "frontmatter", "content": [	
																{tag: "html", content: "<br>this is a content"},  											 
																{
															                tag: "section",
															                name: "epigraph",
															                content: "this is epigraph content "
									            							  },
																			]
										}
									]);

Now we have an example with frontmatter that has 2 section with one that has only html and the other that is an epigraph.

### section Tag
For most content `section` tag is the best values but we can create a html5 tag:

	epubCreator.addSections([
									{
										tag: "section", 
										name: "frontmatter", 
										"content":[
										  {tag: "section", name: "frontmatter", "content": [
																		  {
														                tag: "div",
														                name: "epigraph",
														                content: "this is epigraph content "
								            							  },
																		]
									}
								]);

In this example `epigraph` is created with tag `id`

## Manual add content as string
We can add content using the object only for the main structure. This case is usefull if we have content formatted as epub:


	 epubCreator.addSections([
											{
												tag: "section", 
												name: "frontmatter", 
												"content":"
												<section epub:type='titlepage' id='titlepage'>
												<h1>The Waste Land</h1> 
												This is html content 
												<div epub:type='epigraph'>
												this is epigraph conmtent
												</section>
												</section>
												"
											}


## Create index -> navigation
Epubcreator generate a index and pupulate it with item that contain object `navLavel`.  

	epubCreator.addSections([
		 {
        tag: "section", name: "bodymatter", "content": [
        {tag: "section", id: "ch1", navLabel: "Chapter 1", content: "Body content for this section"},
        {tag: "section", id: "ch2", navLabel: "chapter 2", content: "Body Content for this other section"}
   												 ]
    	}
	])
	

Note: id params is not mandatory, if not preset epubcreator assing a random id to section.


# Download file
To download epub file call method download.

	var epubCreator = new EpubCreator();
		epubCreator.properties.title = "Alfabook book title";
		epubCreator.properties.cover.file = "./demo/cover.jpg";
		epubCreator.addSections(...)
		epubCreator.addCss({
	    "content": "@namespace '@charset 'UTF-8'; http://www.w3.org/1999/xhtml'; @namespace epub 'http://www.idpf.org/2007/ops'; body: { margin-left:6em, margin-right:2em}",
	    "name": "base.css"
	});
	epubCreator.download(); // this is important!!

# ReadFile without download
Create epub on the fly and read it with your favourite reader.


			var epubCreator = new EpubCreator();
			...
			// es6
			epubCreator.blobUrl().then( 
			(content) => console.log(content), 
			(err) => console.log(err));
			// es5
			epubCreator.blobUrl().then( 
			function (content) { 
				// this is the blob url content, send it to your epub reader
				console.log(content) ;
			}, 
			function (err) { 
				console.log(err) }
			);
			

		 
	
## Development
Clone this repo and `npm install`.
`npn start` -> change code and restart with webpack
`npm run build` -> create dist in ./dist folder

`./src` contain source code.


# TODO
- add more template
- add more option
- make more simple