---
title: "(re)cursing without bad words"
date: 2014-09-16 00:00:00 Z
tags:
- codez
layout: post
---

Recursion is just another way to iterate that provides some behaviour difficult to simulate with traditional iteration (for/while). Both for loops and recursion operate on the principle of changing state until a condition is satisfied, Recursion simply operates in a different domain utilizing function calls and the underlying stack to control the order of execution. In order to understand how recursion works, it's imperative to understand how information is communicated during function calls. When approaching recursion, it's useful to rethink common language constructs in the following way:

1. Function arguments transmit data

2. Function calls retrieve the data 

3. Return statements pass data back

In recursion all transmisson happens on the stack. A recursive method calls itself, spreading its execution over several stack frames.

In order to illustrate the three points of control flow, let's introduce a simple list implementation to extend with some recursive methods.

```
           --------       --------       --------            
          | 0    | |     | 1    | |     | 2    | |        //
front ->  |      | --->  |      | --->  |      | --->    //
          |      | |     |      | |     |      | |      //
          |________|     |________|     |________|       
     
```
A linked list is a reference to a bunch of nodes. Each node can hold some data (ex. a number) and a pointer to the next node creating a chain. The last pointer points to the absence of an object (null) represented by the slash.

Here is the basic implementation.

```
function Node(num) { 
    this.data = num;
    this.next = null;
}

function LinkedList(node) { 
    this.front = node;
}
```

Lets proceed to create a list.

```
var list = new LinkedList(new Node(0));

// list.front -> node 0 -> /

list.front.next = new Node(1);

list.front.next.next = new Node(2);

// list.front -> node 0 -> node 1 -> node 2 -> /
```

The list is rather inflexible at this point. In order to access the data in our 3rd element, the following command is necessary:

`list.front.next.next.next.data` -> 2

Let's write some useful methods for our list.

- `getLength()` returns the length of the list
- `getN()` returns the nth node of the list
- `create( n, data )` returns n nodes each containing data
- `lastIndexOf( data )` returns the index of the last occurence of data
- `map( fun )` applies the fun to every node in the list
- `reduce( fun, init )` reduces a list to a single value

Recursion is great for solving problems where the answer lies in the sum of the parts. Each part by itself is unsatisfactory unless brought together. Let's begin with an outline of the method to implement.

```
function LinkedList(node) { 
    this.front = node;

    // returns the length of the list
    this.getLength() {

    }
}

```
The list has a `getLength()` method which is going to be a facade. I.e. the real method is going to be on a `Node`.

```
// returns the length of the list
this.getLength() {
    this.front.getLength();
}
```

To the `Node` class:

```
function Node(num) { 
    this.data = num;
    this.next = null;
    
    this.getLength() {

    }
}
```
Initially, the temptation is to think how the method is going to call itself. How is it going to recurse? This is the wrong focus, instead the experienced (recursors ?) reason about how the recursion will end.


```
this.getLength() {
    if (this.next === null) {
       return 1; 
    }

    return 1 + this.next.getLength();
}
```



# The stack

When a computer is interpreting code, it keeps track of all the defined variables with the chance they will be used later. Evaluating the line `var a = "bar"` adds the variable `a` with its value `"bar"` to something called the environment. Formally, `a` is bound to the value `"bar"`. But how long is it *bound* or remembered?

The scoping of a language, determines how those variables are remembered. Functions are responsible for creating new environments. 

```
// We're in the global environment. 
// What's the result of fun1();

var a = "baz";

var fun1 = function() {

    // A new local environment
    // containing its outer env

    var a = "foo";     
    var b = fun2();            
    return b;
}


var fun2 = function() {
    return a;
}
```

The result is `"baz"`. Functions create new environments where they are *defined*, not where they are *called*. Although `a` is bound to `"foo"` in the environment created by `fun1`, it has a different value where `fun2` is defined. Both `fun1` and `fun2` have access to the global environment, but are otherwise sheltered from each other. Because they each *enclose* an environment, these function expressions are commonly referred to as `closures`. 

What does the code interpreter do when it evaluates function calls? Function calls interrupt the natural flow of logic. In `fun1`, the call to `fun2` propels execution into a new environment, but the interpreter has to keep track of the original environment. Enter the stack.


```
|                    |
|  the               |
|   STACK            |
|                    | 
|____________________| 

At the bottom most level the stack keeps track
of the global environment

|                    |
|  ---------------   |   
|  global            |
|                    |   
|____________________|   

When fun1 is called, its environment is
pushed on top

|  ---------------   |   
|  fun1              | 
|                    |
|  ---------------   |
|  global            |
|                    |   
|____________________|   

Inside of the call to fun1
fun2 is called, elevating
execution again.

|  ---------------   |   
|  fun2              | 
|                    |
|  ---------------   |
|  fun1              | 
|                    |
|  ---------------   |
|  global            |
|                    |   
|____________________|   

```

Because `fun1` and `fun2` are separate closures, `fun2` has access only to the `a` defined in its parent's environment (global). What happens when there are no more statements to evaluate in `fun2`? Continuing on with the cool ascii art..

```
The return statement in fun2
specifies that "baz" is the
result of the call to fun2. fun2
is popped off the top of the
stack.

|  ---------------   |   
|  fun2              | - 
|___________________ |   |
                         |
          "baz"  <------ 

|  ---------------   |
|  fun1              | 
|                    |
|  ---------------   |
|  global            |
|                    |   
|____________________|   

```
Execution resumes in the `fun1` frame where the call to `fun2` results in `"baz"`. 

> The return command allows a stack frame to send a value back to the frame before.

In the code example, `fun2()` binds `b` to the return value `"baz"`. 

Proceeding, `fun1` returns the value `b` in its environment. The `fun1` frame is popped off the top and execution resumes and ends in the global frame.

#Actual recursion!

In order to practice some recursion, we will create a linked list data structure with some recursive methods. A linked list is significant, because it's definition is recursive. More ascii art...

```
 front v

 --------       --------       --------          //
| 0      |     | 1      |     | 2      |        //
|        - ->  |        - ->  |        - ->    //
|        |     |        |     |        |      //
|________|     |________|     |________|     //

```
A linked list is a reference to a bunch of nodes. Each node can hold some data (ex. a number) and a pointer to the next node creating a chain. The last pointer points to the absence of an object (null) represented by the slash.

Here is the basic implementation.

```
function Node(num) { 
    this.data = num;
    this.next = null;
}

function LinkedList(node) { 
    this.front = node;
}
```


