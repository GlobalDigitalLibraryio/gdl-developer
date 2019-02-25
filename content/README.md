<content>

# README

A guide to show what is required to add a new file with markdown in the `/content` directory.

You can either follow this file or read it on the [developer portal](https://developer.test.digitallibrary.io/README)

Primarly you can use normal markdown syntax. Here is a cheatsheet you can follow: [cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)

Since we have a design we want to preserve, there are some details that you need to follow.

## Section

A section seperates the rest of the content with a white background and are preferrably used as a top section with a title and some description like this:

```xml
<section>

# Here you can add a title

Here you can write description

It is optional to add a semi-transparent image like this:

<bottomimagewrapper>

![feed image](/images/philly.png)

</bottomimagewrapper>

(yes, it is positioned on the bottom right)

</section>
```

NB! It is required to have a new line after the `<section>` tag and before the enclosing `</section>` tag.

## Content

To add content in a new markdown file, the `content` tag is required:

```xml
<content>

All content (e.g text. buttons, images) needs to be inbetween the content tags

![alt text](/images/philly.png)

</content>
```

NB! Again, it is required to have the new line after the `<content>` tag and before the enclosing `</content>` tag.

## Button

Creating a button uses the same syntax as creating a [link with markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet#links). Therefore, to distinguish between a url link and a button it is required to create a button tag like this:

```xml
<button to="/example">Example</button>

<button to="/">Home</button>

<button to="https://www.google.com">To Google</button>
```

</content>
