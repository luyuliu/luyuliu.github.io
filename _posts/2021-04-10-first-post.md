---
title: 'How to make your own academic website?'
date: 2021-04-10
permalink: /posts/2021/04/first-post/
tags:
  - Personal website
  - Jekyll
  - Markdown
  - HTML
  - Windows 10
---

Hurra! This is my first post on my new website after me spending a whole day to test and write (copy) codes. If you can see this, that means this really pays off. I think I am going to talk briefly about how to set up a reliable personal website and some difficulties I encountered when I was doing this.

First, special thanks to [Rob Williams' wonderful article](https://jayrobwilliams.com/posts/2020/06/academic-website/) and the [corresponding GitHub repo](https://github.com/jayrobwilliams/jayrobwilliams.github.io), I learn a lot from his instructions and codes. I used [academicpages](https://github.com/academicpages/academicpages.github.io), a GitHub Pages project for academic personal websites. It is based on [Jekyll](https://en.wikipedia.org/wiki/Jekyll_(software)) and [Minimal Mistakes](https://mademistakes.com/work/minimal-mistakes-jekyll-theme/). But you know what, I know you are not going to click in those urls I just throwed at you. Because I didn't. So to save your time, I am going to explain some necessary concepts you have to know before making some careless jumping.

# Why I choose this one?
There are many framworks and projects you can choose, simply search "personal website acadmic" in Google or GitHub, there are so many results. I choose this one because:
* I am so lazy that I do not want to write any low-level codes
* I also want some degrees of control over the low-level functions for some advanced functions and, more importantly, to show off my coding ability
* I am broke, so I have to go for static website
* Reliability is a factor, so if a lot of people is using this, it should be more robust than a random project that have 0 star
* However, again, if more people are using this one, it may become a cliche. But this is a low priority and it always has less users than  workpress (not against using workpress though)

# Jekyll
I knew nothing about Jekyll before except the [Jekyll and Hyde musical](https://www.youtube.com/watch?v=Dxzw2CWoBqI&list=PLjXQ_rLk0ogaVqkK_mrtp1VYs51qk0oUN&index=4) and [AVGN'S Jekyll and Hyde game review](https://www.youtube.com/watch?v=HemXBVloiA0). 

So basically, Jekyll is a project written in Ruby that allow you to write markdown (like those .md file in GitHub repos) to produce static HTMLs. Yeah, I know it's super weird; I didn't use Ruby, I hardly used markdown except documenting, and I hate static HTML without JS; it's such a strange combination like those Vegetable Bird's Nests sold in Trader Joe (yeah, that's a real thing too). But it is strangly suitable for GitHub page because it only supports static website and GitHub is super friendly towards markdown; so suddenly Jekyll becomes a thing. That's my guess.

# Install those things on Windows
An absolute annyong thing is that most cool projects are super unfriendly towards Windows users; I can't tell if this is even more annoying than the Windows system itself but I am not usually complaining. I did all the things on Windows, but Rob and the orignal project both did their website on Unix systems, so there are so many bugs that I need to fix by my self. 

First, you will need to install ruby. This is easy, just go [here](https://rubyinstaller.org/) and install. Do remember you also need to install MSYS2. I tried to not install it but it won't give me a break, so I have to uninstall and install again. Make sure you add ruby to the PATH environment variable too.

After getting ready, you will follow the [instructions here](https://github.com/academicpages/academicpages.github.io). There are some tricky parts, like you will need to manually "bundle add " jekyll, webrick, and sorted_set. You will also add require "pure_ruby" to the top of this file C:\Ruby30-x64\lib\ruby\gems\3.0.0\gems\eventmachine-1.2.7-x64-mingw32\lib\eventmachine.rb. I think this is optional, but if you encountered something weird, please try this and don't even ask how I found this out.

# Host the project on localhost:4000
This part is kind of misleading. I constantly get this brtree error that won't let me "bundle exec jekyll liveserve", but I can "bundle exec jekyll serve", which I think it cannot properly reload itself. So every time I make some changes, the whole project will render for a very long time (20 - 40 seconds). Don't know if this is normal but I can write other things when waiting for the rendering, so I lived it by.

# Logic of jekyll
I would like to share some of my understandings as I read Rob's code and trial-and-error.

## yml files
Jekyll has a setting.yml file like in Android Java. It contains all the important settings. I think this project's yml is pretty self-explanary so I did not waste a lot of time on it. There is several other yml files in /_data folder. Among them all I think navigation.yml is most important because it contains the setting of the banner menu (like if you want to change the name of the buttons and the link they will link to).

## Collections (publications and teaching)
These two are okay too. Just change the parameters in the templetes the project provided and you are good to go. Only one awkward thing I spent a lot of time on is that you should be careful with single quote marks, as you should not use 's inside a single quote clause.

## Tricks to change name of the folders
So I do not need a portfolio and a talk folders and those corresponding buttons. I want to delete one and change on into "projects". One good way to do this is to use your IDE to find all the word "portfolio" and substitute them with projects. However, remember to hard restart the server to refresh the cache. I wasted a lot of time on this just because I did not restart.

## _include
_include folder includes all HTML files that you can incorporate in different actual HTML pages you want to show. This is super cool because it really can reuse the HTML resources. Observe that this very page also have the same banner buttons, sidebar, and my face to the left. You can incorporte those just by one line `include xxxx %}`. 
However, despite you can use both md and html in a same project in the _page folder, which can be rendered as a page itself, you can only include HTML properly in this other HTML file. If you try directly include MD or include html in a MD, it will not properly render. I tried to search but did not find a good solution. But jekyll clauss is seemingly working file for both. That's my understanding.

## site parameter
*site* is like the main object that contains the information you can read from yml and the collections.

## for loop
You will see a lot of for loop in those publication and teaching html. I did not pay a lot of attention to those but it's working.

## SCSS files
It's like css but you make it harder for other people to read. And you can include different scss in other scss files. I found my name is super small so I change the font-size in some SCSS files according to the class name. If you are not sure which class to change, just inspect a rendered HTML and find out. There are some p elements that do not have a class name and also do not have a parent with a class name, super annoying. But most important ones you can always find a parent (please don't take this sentence out of context) and you can use `& + p {
    font-size: 16px;
    text-indent: 0;
  }` to find a child with a parent.

# Conclusion
It's worth the time. And it's a good-looking website. Try yourself. I will try more later.