---
title: simple data structures
date: 2013-05-06 00:00:00 Z
published: false
tags:
- computer-science,
- javascript
layout: post
---

The purpose of this post is not to be an over-simplification, but rather a quick clean summary. Code examples in JavaScript should bring it back down to earth. Every data structure stores data in a unique way, which affects the retrieval and insertion of data. This post is a summary of my take aways from an introductory programming course at the University of Washington. 

##arrays <span class="close clickable">-</span>
Arrays store ordered/indexed elements. They store keys and values, where each key is a particual number, and each value shares an equivalent type.

<pre title="JavaScript arrays explanation"><code>
//an array of Strings 
var arr1 = ["a","b","c"];

//an array of numbers 
var arr2 = new Array(1,2,3);

//an array of number arrays
var arr3 = [ 
             [1,2,3],
             [4,5,6],
             [7,8,9]
           ]

//element access
arr1[0] --> "a" //Note the obj[key] --> value syntax
arr2[1] --> "2"
arr3[2] --> [7,8,9]
</code></pre>

##objects <span class="close clickable">-</span>
Objects store unordered key value pairs. Objects are the most un-restrictive data structure which allows for any key to be assigned any value.

<pre title="JavaScript object explanation"><code>
//define unique object
var obj1 = new {
    hair: "curly",
    name: "Connor",
    getCode: function(sleep, food) {
        console.log("drinking coffee...");
        console.log("necessary sleep reduced");
        console.log("connsume nearby cereal");
        console.log("code..");
    }
}

var obj2 = new Object();
obj2.color = "red";
obj2.shape = "triangle";
obj2.getShape = function() {
    return this.shape;    
}

//element access
obj1.hair --> "curly"
obj2.color --> "red";
obj2[shape] --> "triangle"; //Note the obj[key] --> value syntax
obj2.getShape() --> "triangle";
</code></pre>
##stacks <span class="close clickable">-</span>
##queues <span class="close clickable">-</span>
##linked-lists <span class="close clickable">-</span>
##maps <span class="close clickable">-</span>
