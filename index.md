---
layout: page
---

<div class="index">
<ul>
{% for post in site.posts %}
<li><a href="{{ post.url }}">{{ post.title }}<span id="time">{{ post.date | date: "%b %d" | downcase }}</span></a></li>
{% endfor %}
</ul>
</div>
