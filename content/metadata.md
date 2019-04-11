---
title: 'Metadata'
---

<content>

# GDL Metadata 
This page covers details about metadata for both books and games.

## Books
### Metadata in ePub
We prefer that epub files conform to the EPUB3 specification. Each chapter should be separated into an own html-file.
This section describes the required and optional elements in the file content.opf

#### Required
* __dc:title__ : Title of the book
* __dc:description__: Description of the book
* __dc:creator__: Name of author
* __dc:language__: A BCP47 compliant language tag ([RFC5646](https://tools.ietf.org/html/rfc5646))
* __dc:identifier__: Unique identifier for the book (preferably an UUID)
* __dc:date__: The publication date of the document
* __dc:publisher__: Name of the publisher of the document
* __dc:rights__: The license speficied as an SPDX License identifier ([SPDX Licenses](https://spdx.org/licenses/))

#### Optional
* __dc:contributor__: One or more describing additional contributors to the epub. Should be refined using meta-refines.

#### Example of the metadata-section of a content.opf
```xml
<?xml version='1.0' encoding='utf-8'?>
<package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="uuid_id">
   <metadata xmlns:dc="http://purl.org/dc elements/1.1/">
      <dc:title>Title of the book</dc:title>
      <dc:description>Textual description of the book</dc:description>
      <dc:creator id="creator01">Name of author</dc:creator>
      <meta property="role" refines="#creator01">aut</meta>
      <dc:contributor id="illustrator01">Name of Illustrator</dc:creator>
      <meta property="role" refines="#illustrator01">ill</meta>
      <dc:language>en</dc:language>
      <dc:identifier id="uuid_id">d849806e-8a08-4d52-80be-154372c1f0b4</dc:identifier>
      <meta property="identifier-type" refines="#uuid_id">uuid</meta>
      <meta property="dcterms:modified">2018-08-04T14:18:00Z</meta>
      <dc:date>2018-06-15</dc:date>
      <dc:publisher>Name of publisher</dc:publisher>
      <dc:rights>cc-by-4.0</dc:rights>
   </metadata>
</package>

``` 

The manifest-section of the epub should contain all resources that make up the epub-file including what is to be used as the cover-image for the book.
An example of how to identify the cover image is as follows:

```xml
<?xml version='1.0' encoding='utf-8'?>
<package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="uuid_id">
   <manifest>
      <item href="filename.png" id="cover" media-type="image/png" properties="cover-image" />
   </manifest>
</package>
```

### Metadata as CSV
#### Required
* __ID__: Unique ID (same as used in content.opf)
* __Title__: Title of book
* __Link to epub__: Direct link to the actual file, that can be automatically downloaded
* __Reading Level__: 1-4, read-aloud - Based on Pratham Books system for levelling (https://storyweaver.org.in/reading_levels)

#### Optional
* __isBasedOnUrl__: A resource that was used in the creation of this resource. This term can be repeated for multiple sources. (schema.org/URL)
* __educationalAlignment__: An alignment to an established educational framework (schema.org/AlignmentObject)
* __educationalUse__: The purpose of the work in the context of education. Eg.“assignment”, “group work” (schema.org/Text
* __educationalRole__: The role that describes the target audience of the content. (schema.org/Text)
* __timeRequired__: Approximate or typical time it takes to work with or through this learning resource for the typical intended target audience. E.g "PT30M" (schema.org/Duration ISO8601)
* __typicalAgeRange__: The typical range of ages the content’s intended end user. Eg. “7-9”, “18-“ (schema.org/Text)
* __interactivityType__: The predominant mode of learning supported by the learning resource. Acceptable values are active, expositive, or mixed. Eg.“active”, “mixed” (schema.org/Text)
* __learningResourceType__: The predominant type or kind characterizing the learning resource. Eg. “presentation”, “handout” (schema.org/Text)
* __accessibilityAPI__:  Indicates that the resource is compatible with the referenced accessibility API. (WebSchemas wiki lists possible values). (schema.org/Text)
* __accessibilityControl__: Identifies input methods that are sufficient to fully control the described resource. (WebSchemas wiki lists possible values). (schema.org/Text)
* __accessibilityFeature__: Content features of the resource, such as accessible media, alternatives and supported enhancements for accessibility. (WebSchemas wiki lists possible values). (schema.org/Text)
* __accessibilityHazard__: A characteristic of the described resource that is physiologically dangerous to some users. Related to WCAG 2.0 guideline 2.3. (WebSchemas wiki lists possible values). (schema.org/Text)

#### Example:
```csv
Title, Link to epub, Reading Level
"676719b9-f5bb-4ce7-83ca-e221cbc53c67", "Bath time for Chunnu and Munnu", https://books.digitallibrary.io/epub/en/676719b9-f5bb-4ce7-83ca-e221cbc53c67.epub, 1
"c418ac9f-fa75-4a72-9f3a-8ceacee850f2", "A Street or a Zoo?", https://books.digitallibrary.io/epub/en/c418ac9f-fa75-4a72-9f3a-8ceacee850f2.epub, 1
```

## Games
The GDL can host information about games and how to install/play the games.
### Metadata as CSV
#### Required
* __ID__: Unique ID. Preferably a Google Play Store-identifier or an UUID.
* __Title__: Title of the game
* __Description__: A description of the game and what it is about
* __Language__: A BCP47 compliant language tag ([RFC5646](https://tools.ietf.org/html/rfc5646))
* __URL__: URL to where the game can be installed from or where the game can be launched.
* __CoverImage__: Direct URL to an image (eg. JPG, PNG) which can serve as a cover image for the game.
* __License__: The license speficied as an SPDX License identifier ([SPDX Licenses](https://spdx.org/licenses/))
* __Publisher__: Name of the publisher of the game


#### Example
```csv
ID,Title,Description,Language (BCP47),URL,Cover Image,License,Publisher
com.eduapp4syria.feedthemonsterSwahili,"Mlishe Zimwi","Mlishe Zimwi Description",sw-ke,https://play.google.com/store/apps/details?id=com.eduapp4syria.feedthemonsterSwahili,"https://res.cloudinary.com/djylvyru4/ar_0.81,c_fill/f_auto,q_auto,dpr_auto,c_scale,w_auto/61bae4215764aea871fb3ee445d2863a.png",BSD-2-Clause,Curious Learning
com.eduapp4syria.feedthemonsterHausa,"Ciyar da dodo","Ciyar da dodo Description",ha-ng,https://play.google.com/store/apps/details?id=com.eduapp4syria.feedthemonsterHausa,"https://res.cloudinary.com/djylvyru4/ar_0.81,c_fill/f_auto,q_auto,dpr_auto,c_scale,w_auto/61bae4215764aea871fb3ee445d2863a.png",BSD-2-Clause,Curious Learning

```

<backbutton />

</content>
