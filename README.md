![](https://www.olivettiscuoladigitale.it/wp-content/uploads/2013/03/olivetti-scuola-digitale-2.png)

# EPUB-CREATOR


A simple class writed in Typescript (and transpiled in es5) that help you to create epub from source text/html. 
It work on client browser or server side nodejs.

# Note
This project is very much still a work in progress.
Epub-creator is still in beta.

## Install

***npm***

	npm install --save epub-creator
	
***bower***

	bower install --save epub-creator


## Quick and dirty

Create a epub in a quick and drity way:

    // ts
	let epubCreator = new EpubCreator(); // init class
	epubCreator.properties.title = "Olivetti Scuola Digitale book title"; //set title property
	epubCreator.addSections([
									{
										tag: "section", 
										name: "bodymatter", 
										"content": "Hi this is an epub3"
									}
							   ]);
	 epubCreator.download();
	 
	 
	
	// es6
	let epc = new epubCreator.EpubCreator();		
	epc.properties.title = "Olivetti Scuola Digitale book title"; //set title property
    epc.addSections([
                       				{
                       					tag: "section", 
                       					name: "bodymatter", 
                       					"content": "Hi this is an epub3"
                       				}
                       			]);
    epc.download();
							  


## Make epub great again -> epub.properties
You can create epub with more options and configure it with properties object. Take a look in te example "quick and dirty" at line 2: 

	epubCreator.properties.title = "Olivetti Scuola Digitale book title"; //set title property
	
Epubcreator expose a public `properties object` that you can set:

This is the default settings for properties object: 

			{
		            uuid: "github.com/bbottema/js-epub-maker::it-came-from::example-using-idpf-wasteland",
		            author: "Olivetti Scuola Digitale",
		            language: "it-IT",
		            modificationDate: new Date().toString(),
		            rights: {
		                description: "This work is shared with the public using the Attribution-ShareAlike 3.0 Unported (CC BY-SA 3.0) license.",
		                license: "http://creativecommons.org/licenses/by-sa/3.0/"
		            },
		            attributionUrl: "https://www.olivettiscuoladigitale.it",
		            cover: {
		                file: "",
		                license: "http://creativecommons.org/licenses/by-sa/3.0/",
		                mediaType: "image/jpeg",
		                attributionUrl: "https://www.olivettiscuoladigitale.it",
		                inline: "no"
		            },
		            title: "Book Title",
		            publicationDate: new Date().toString()
		        };


Channge it as you needed.

		epubCreator.properties.language = "en-EN";
		epubCretor.properties.author = "my Favorites author";
		
# Cover
Cover is a image that your epub reader display as thumbnail. 
It's not mandatory, but make epub cool.  

You can found the cover settings inside `properties` object

	cover: {
			                file: "",
			                license: "http://creativecommons.org/licenses/by-sa/3.0/",
			                mediaType: "image/jpeg",
			                attributionUrl: "https://www.olivettiscuoladigitale.it"
			            },

If `cover.file` properties is not specified, no cover is set.  

To set a cover we must compile the `cover.file` settings. We can pass two type of image:  

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
Don't forget to set `cover.mediaType` for image different to jpg. 

On some example in idpf the cover are jpg image data Width: 398px Height:510px, but large are better (600x800, 1200x783)


## Add a custom css files
Ok, now we have a epub with right properties and a cover, but we need to make it better with custom css!. 
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
To add a section we need to call the method `addSection` and set an array of object with params:
 
	{
	tag: string -> what type of section, 90%  = section
	name: string -> name of section ex. bodymatter
	content: array/string  -> the content inside this section, string for display content, array for neted content
	}
	
###A simple example

	epubCreator.addSections([ 
									{
										tag: "section", 
										name: "frontmatter", 
										"content":"this is the start of my book"
									}
								]);
	
***What append if inside of my frontmatter i need to add other section?***.  
We can solve this in 2 way
1 - autopilot, with nested object
2 - manual, with string

### Autopilot: Add nested object inside section (section of section)
We say above that `content` properties of section can be a string or array, in the example we have see the use of string, let now explain how use the content as array: 

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


In the example above section frontMatter has inside content an other section called `epigraph` that has a string content. We can use array of array of array x n. object inside content. 

### Add nested object with inside html
What about if we need to add some text/html before epigraph section without a section?  
We can do it set `tag` propery as `html` and leaving name as `null`: 
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
For most content `section` tag is the best values but we can use a html5 tag:

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
We can add content using the nested object only for the main structure. This case is usefull if we have content formatted as epub and we can insert `as is`:


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
Epubcreator generate a index and pupulate it with items that contain object `navLavel`.  

	epubCreator.addSections([
		 {
        tag: "section", name: "bodymatter", "content": [
        {tag: "section", id: "ch1", navLabel: "Chapter 1", content: "Body content for this section"},
        {tag: "section", id: "ch2", navLabel: "chapter 2", content: "Body Content for this other section"}
   												 ]
    	}
	])
	

Note: id params is not mandatory, if not preset epubcreator assing a random id to section. Only item that contain `navLabel` properties are elegible for navigation.

## Add Assets
In epub all assets (image, audio) must be included in epub and declared in definition file. 


### Add asset with inline content as base64 data
	epubCreator.addAsset({ 
				content: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAgE-THIS IS JUST AN EXAMPLE IS NOT A BASE64 VALID IMAGE- 8eIpiq7FX//2Q==",
				mediaType:"image/jpeg",
				name:"myimage.jpg",
				base64: true,
				id:"image0"
	});
`Id` params is optional.


### Add asset with inline content
	epubCreator.addAsset({ 
				content: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAgE-THIS IS JUST AN EXAMPLE IS NOT A BASE64 VALID IMAGE- 8eIpiq7FX//2Q==",
				mediaType:"image/jpeg",
				name:"myimage.jpg",
				id:"image0"
	});

### Add asset from file path
	epubCreator.addAsset({ 
					path: "./demo/image0.jpg",
					mediaType:"image/jpeg",
					name:"myimage.jpg",
					id:"image0"
		});
`name` and `id` params are optionals

# Template
Epub creation is base on template system.   
We can choose from this template:   

- epub3 -> a xhtml standard epub3
- epub3html -> a html5 epub3 
- epub2 -> a xhtml epub2 

example:

	 var epubCreator = new EpubCreator();
	 epubCreator.template("epub3html");
	 .....


Default template is `epub3`.  
More template cooming in next version....

# Download file
When we are ready to download a file we can call method `download`.

	var epubCreator = new EpubCreator();
		epubCreator.properties.title = "Olivetti Scuola Digitale book title";
		epubCreator.properties.cover.file = "./demo/cover.png";
		epubCreator.addSections(...)
		epubCreator.addCss({
	    "content": "@namespace '@charset 'UTF-8'; http://www.w3.org/1999/xhtml'; @namespace epub 'http://www.idpf.org/2007/ops'; body: { margin-left:6em, margin-right:2em}",
	    "name": "base.css"
	});
	epubCreator.download(); // this is important!!
	
This method accepts a string params: nameFile, add it for custom name. `epubCreator.download("mybook.epub"); `

# Get epub without download
Create epub on the fly and read it with your favourite reader. there are some methods:

- blobUrl -> generate a blob url.   
- asBase64 -> generate a base64 of epub zip. 
- asArrayBuffer -> generate a buffer for on the fly reading. 




			
			...
			// es6
			let epc = new epubCreator.EpubCreator();
			epc.asArrayBuffer().then( 
			(content) => console.log(content), 
			(err) => console.log(err));
			
			// es5
			var epc = new epubCreator.EpubCreator();
			epc.asArrayBuffer().then( 
			function (content) { 
				// this is the blob url content, send it to your epub reader
				console.log(content) ;
			}, 
			function (err) { 
				console.log(err) }
			);
			

# A more Complex Example

Create a Epub with frontmatter title and content bodymatter with 2 chapter and download it.
	
	let content = [
	    {
	        tag: "section", name: "frontmatter", "content": [
	        {
	            tag: "section", name: "titlepage", "content": [
	            {tag: "html", content: "<h1>My book title Section</h1> 	<div class='aut'>Author</div>"},
	            {
	                tag: "div",
	                name: "epigraph",
	                content: "<span xml:lang=\"la\">\"Nam Sibyllam quidem Cumis ego ipse oculismeis<br />vidi in ampulla pendere, et cum illi pueri dicerent</span>: <br /> "
	            },
	        ]
	        }
	    ]
	    },
	    {
	        tag: "section", name: "bodymatter", "content": [
	        {tag: "section", id: "ch1", navLabel: "Chapter 1", content: "sono il contenuto del body"},
	        {tag: "section", id: "ch2", navLabel: "Chapter 2", content: "sono il secondo capitolo"}
	    ]
	    }
	];
	
	
	let epubCreator = new EpubCreator();
	
	epubCreator.template("epub3");
	epubCreator.properties.title = "Olivetti Scuola Digitale book title";
	epubCreator.properties.cover.file = "./demo/cover.png";
	epubCreator.addSections(content);
	epubCreator.addCss({
	    "content": "@namespace '@charset 'UTF-8'; http://www.w3.org/1999/xhtml'; @namespace epub 'http://www.idpf.org/2007/ops'; body: { margin-left:6em, margin-right:2em}",
	    "name": "base.css"
	});
	
	 epubCreator.download();
			 
	
## Development
Clone this repo and `npm install`.
`npn start` -> change code and restart with webpack
`npm run build` -> create dist in ./dist folder

`./src` contain source code.


# TODO
- add more template
- add more option
- make more simple