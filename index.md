---
layout: home
---
<div id="list">
<p>
<ul>
{% for post in site.posts limit: 6 %}
<li><a href="{{ post.url }}">{{ post.title }}</a></li>
{% endfor %}
</ul>
</p>
</div>
