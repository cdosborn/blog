---
title: stream
layout: stream
---
<script type="text/javascript">
//(function () {
    //On load swap rand link
    var rand = document.createElement("span");
    rand.id = "rand";
    var old = document.getElementById("randButton");
    rand.innerHTML = "next";
    var parent = old.parentNode;
    parent.replaceChild(rand, old);
    var numOfPosts = 5;
    var _index = 0;
    var whitelist = sortNums(numOfPosts);
    loadNextPost(whitelist);
    rand.onclick = loadNextPost;
    
    function loadNextPost() { 
        var request;
        if (window.XMLHttpRequest) { // Mozilla, Safari, ...
            request = new XMLHttpRequest();
        } else if (window.ActiveXObject) { // IE 8 and older
            request = new ActiveXObject("Microsoft.XMLHTTP");
        } 

        if (!request) {
            alert('Cannot create an XMLHTTP instance');
            return false;
        }

        request.onreadystatechange = addPost;
        request.open("GET", "/rand/" + whitelist[_index] + ".html");
        request.send();

        function addPost() {
            try {
                if (request.readyState === 4 && request.status === 200) {
                    var post = document.getElementById("post")
                    post.innerHTML = request.responseText;

                    // last index was mystery so we restart
                    if (whitelist[_index] == "mystery") {
                        whitelist = sortNums(numOfPosts);
                        _index = 0; 
                    } else
                        _index++;
                }
            } catch (e) {
                alert("eRr0r!! " + e)
            }
        }
    }

    function sortNums() {
        whitelist = Array(numOfPosts);
        blacklist = Array();
        for (var i = 0; i < numOfPosts; i++) {
            randIndex = Math.floor(Math.random() * numOfPosts);
            // post already displayed
            while(blacklist[randIndex] === true) {
                if (randIndex == 0)
                    randIndex = numOfPosts - 1;
                else 
                    randIndex -= 1;
            } //randIndex is new value
            whitelist[i] = randIndex + 1; 
            blacklist[randIndex] = true;
        }
        whitelist[numOfPosts] = "mystery";
        return whitelist;
    }
//})();    
</script>

<div id="post"></div>
