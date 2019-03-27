---
title: 'Feeds'
---

<section>

# The GDL Opds-feed

The Open Publication Distribution System (OPDS) Catalog specification is a syndication format for electronic publications based on Atom (RFC4287) and HTTP (RFC2616). OPDS Catalogs enable the aggregation, distribution, and discovery of books, journals, and other digital content by any user, from any source, in any electronic format, on any device. The OPDS Catalogs specification is based on the Atom syndication format and prioritizes simplicity and speed.

The Global Digital Library has made an OPDS-feed available at the url [https://opds.digitallibrary.io/v1/root.xml](https://opds.digitallibrary.io/v1/root.xml). This can be used in existing ebook-readers that support OPDS, like Aldiko or FBReader. The GDL Android app also uses this feed.

<bottomimagewrapper>

![feed image](/images/billy.png)

</bottomimagewrapper>

</section>

<content>

## Structure of GDL OPDS-feed

The root.xml is the home of the OPDS-feed, and consists of two main sections:

- **Facet-section**
- **Entry-section**

The entries listed in the root of the opds feed will default to newly arrived English titles.

## Facets

Facets were introduced in version 1.1 of the OPDS specification and is a common way to navigate an opds-feed. By navigating via the the facet-links in the root-feed, one can select other languages.

For each language available in the GDL, there will be a facet-link like the following:

```xml
<link rel=”http://opds-spec.org/facet” href=”https://opds.digitallibrary.io/v1/am/root.xml” title=”አማርኛ” opds:facetGroup=”Languages” opds:activeFacet=”false”/>
```

This links to books in the Amharic language.

For each language, facets with the available top-level categories will be listed:

```xml
<link rel=”http://opds-spec.org/facet” href=”https://opds.digitallibrary.io/v1/am/category/library_books/root.xml” title=”የቤተ መጻሕፍቱ መጽሐፍት” opds:facetGroup=”Category” opds:activeFacet=”false”/>
<link rel=”http://opds-spec.org/facet” href=”https://opds.digitallibrary.io/v1/am/category/classroom_books/root.xml” title=”የክፍል መጽሐፍት” opds:facetGroup=”Category” opds:activeFacet=”false”/>
```

For each of the top-level categories, a list of reading-levels will be listed:

```xml
<link rel=”http://opds-spec.org/facet” href=”https://opds.digitallibrary.io/v1/am/category/library_books/level/1.xml” title=”ደረጃ 1″ opds:facetGroup=”Selection” opds:activeFacet=”false”/>
<link rel=”http://opds-spec.org/facet” href=”https://opds.digitallibrary.io/v1/am/category/library_books/level/2.xml” title=”ደረጃ 2″ opds:facetGroup=”Selection” opds:activeFacet=”false”/>
<link rel=”http://opds-spec.org/facet” href=”https://opds.digitallibrary.io/v1/am/category/library_books/level/3.xml” title=”ደረጃ 3″ opds:facetGroup=”Selection” opds:activeFacet=”false”/>
<link rel=”http://opds-spec.org/facet” href=”https://opds.digitallibrary.io/v1/am/category/library_books/level/4.xml” title=”ደረጃ 4″ opds:facetGroup=”Selection” opds:activeFacet=”false”/>
<link rel=”http://opds-spec.org/facet” href=”https://opds.digitallibrary.io/v1/am/category/library_books/level/read-aloud.xml” title=”ጮክ ብለህ አንብብ” opds:facetGroup=”Selection” opds:activeFacet=”false”/>
<link rel=”http://opds-spec.org/facet” href=”https://opds.digitallibrary.io/v1/am/category/library_books/root.xml” title=”New arrivals” opds:facetGroup=”Selection” opds:activeFacet=”true”/>
```

By following any of the links in the facet, the listed books will be filtered according to the selected facet.

## Entries

Each book in the listing will have a similar entry like the following:

```xml
<entry>
  <id>urn:uuid:1c08973d-286e-432c-99f4-2d10c5d245b8</id>
  <title>7 የቀስተደመና ቀለሞች</title>
  <author>
    <name>Caren Echesa</name>
  </author>
  <contributor type=”Illustrator”>
    <name>Jesse Breytenbach</name>
  </contributor>
  <dc:license>Attribution 4.0 International (CC BY 4.0)</dc:license>
  <dc:publisher>African Storybook Initiative</dc:publisher>
  <updated>2017-12-06T00:00:00Z</updated>
  <dc:created>2017-05-15T00:00:00Z</dc:created>
  <published>2017-12-06T00:00:00Z</published>
  <lrmi:educationalAlignment alignmentType=”readingLevel” targetName=”ደረጃ 1″/>
  <summary>
    ይህ ተረት ቁጥሮችንና ቀለሞችን ለልጆች ያስተዋውቃል፡፡ (ተረቱን በሁለተኛ ደረጃ በተመደቡ ተረቶች ዝርዝር ውስጥም ማግኘት ይችላሉ፡፡)
  </summary>
  <link href=”https://url-here” type=”image/jpeg” rel=”http://opds-spec.org/image”/>
  <link href=”<url>” type=”image/png” rel=”http://opds-spec.org/image/thumbnail”/>
  <link href=”<url>” type=”application/epub+zip” rel=”http://opds-spec.org/acquisition/open-access”/>
  <link href=”https://books.digitallibrary.io/pdf/am/1c08973d-286e-432c-99f4-2d10c5d245b8.pdf” type=”application/pdf” rel=”http://opds-spec.org/acquisition/open-access”/>
</entry>
```

The metadata associated with each title follows the standard atom and opds structure.
In addition to the standard fields, the GDL-feed also uses the `lrmi:educationalAlignment`.
This indicates the reading level for the current book.

<button to="/">Home</button>

</content>
