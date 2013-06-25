---
layout: home
---
<div id="start">
<div id="sidebar">
    <ul>
        <li><a href="/about/index.html">about</a></li>
        <li><a href="/index.html">posts</a></li>
        <li><a href="/projects/index.html">stream</a></li>
    </ul>
</div>
<div id="list">
<ul>
{% for post in site.posts limit: 6 %}
<li><a href="{{ post.url }}">{{ post.title }}</a></li>
{% endfor %}
</ul>
</div>
</div>
