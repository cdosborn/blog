---
layout: home
---
{% for post in site.posts limit: 6 %}
<div class="content clickable sidebar">
    <h1><a class="index" href="{{ post.url }}">{{ post.title }}</a><span id="time">{{ post.date | date: "%b %Y" | downcase }}</span></h1>
</div>
{% endfor %}
