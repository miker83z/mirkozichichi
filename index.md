---
layout: index
title: Home
---

# Hello! I'm Mirko

Passionate about Distributed Ledger Technologies, with expertise in designing and developing protocols for smart contract implementation and optimization. I hold a PhD in _Law, Science, and Technology_ with the thesis titled _“Decentralized Systems for the Protection and Portability of Personal Data.”_

{% include entry-list.html entries=site.data.home.about types=site.data.home_types id="about" filters=false compact=true %}

---

## Current Projects

{% include entry-list.html entries=site.data.home.current types=site.data.home_types id="current" filters=false %}

---

## Blog Posts

{% comment %} Generated from _posts: English posts, newest first; the Italian version is linked when it exists. {% endcomment %}
<table class="entries" id="list-posts">
{%- for post in site.posts %}
{%- unless post.url contains "-ita." %}
{% include post-row.html post=post %}
{%- endunless %}
{%- endfor %}
</table>

---

## Highlights

{% comment %} Entries with star: true in _data/publications.yml, projects.yml and talks.yml, newest first (undated ones, such as ongoing projects, on top). {% endcomment %}
{%- assign starred_publications = site.data.publications | where: "star", true -%}
{%- assign starred_projects = site.data.projects | where: "star", true -%}
{%- assign starred_talks = site.data.talks | where: "star", true -%}
{%- assign highlights = starred_projects | concat: starred_publications | concat: starred_talks | sort: "date", "last" | reverse -%}
{%- assign highlight_types = site.data.publication_types | concat: site.data.project_types | concat: site.data.talk_types %}

{% include entry-list.html entries=highlights types=highlight_types id="highlights" filters=false %}

## Past Affiliations

{% include entry-list.html entries=site.data.home.affiliations types=site.data.home_types id="affiliations" filters=false compact=true %}

---

## Contacts

{% include entry-list.html entries=site.data.home.contacts types=site.data.home_types id="contacts" filters=false compact=true %}

<p class="entry-note">In the email addresses, name = mirko, surname = zichichi and username = miker83z.</p>
