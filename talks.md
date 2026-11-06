---
layout: category
title: Talks & Activities
description: "Talks, invited lectures, organized events, program committees and reviewing by Mirko Zichichi."
---

---

{% comment %} Lectures and talks in the first list, everything else in the second, keeping the page order {% endcomment %}
{%- assign talk_entries = "" | split: "" -%}
{%- assign activity_entries = "" | split: "" -%}
{%- for entry in site.data.talks -%}
  {%- if entry.type == "lecture" or entry.type == "talk" -%}
    {%- assign talk_entries = talk_entries | push: entry -%}
  {%- else -%}
    {%- assign activity_entries = activity_entries | push: entry -%}
  {%- endif -%}
{%- endfor %}

## Talks

{% include entry-list.html entries=talk_entries types=site.data.talk_types id="talks" collapse=5 %}

---

## Activities

{% include entry-list.html entries=activity_entries types=site.data.talk_types id="activities" collapse=5 %}
