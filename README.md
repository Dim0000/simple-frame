# Simple Frame

[![](https://github.com/Dim0000/simple-frame/actions/workflows/gh-pages.yml/badge.svg)](https://github.com/Dim0000/simple-frame/actions/workflows/gh-pages.yml)
[![](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Dim0000/simple-frame/blob/main/LICENSE)

A minimal and fast Hugo theme for blogs and personal sites.

## Preview

![Screenshot](https://raw.githubusercontent.com/Dim0000/simple-frame/main/images/screenshot.png)

## Requirements

* Hugo 0.120 or higher
* Hugo extended version

## Configuration

```toml
title = "Simple Frame"

[permalinks]
  search = "/search/"

[Params]
  Subtitle = "Minimal Hugo theme."
  mainSections = ["post", "docs"]
  post_meta = ["date", "categories", "taglist"]
  dateformat = "2006-01-02"
  toc = true
  pager = true

[Params.sidebar]
  home = "right"
  list = "right"
  single = "right"
  widgets = ["search", "categories", "taglist", "recent", "archives"]

[Params.widgets]
  recent_num = 5
  categories_counter = true
  tags_counter = true
  
[taxonomies]
  tag = "tags"
  category = "categories"
  archive = "archives"

[related]
  includeNewer = true
[[related.indices]]
  name = "tags"
  weight = 80
[[related.indices]]
  name = "categories"
  weight = 60
```