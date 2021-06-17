---
title: "UCGIS Workshop: Full-stack Geo-visualization 101: How to Make Productive Webmaps"
collection: teaching
type: "Workshop"
permalink: /teaching/2021-UCGIS-workshop
venue: "University Consortium for Geographic Information Science"
date: 2021-06-11
location: "Virtual"
---


## Introduction
The ability to visualize large amounts of information in real time on interactive maps has never been more important for GI scientists and specialists.  Web-based and open-source platforms, such as the mapping library leaflet and the noSQL database MongoDB, are becoming more popular and useful for their real-time functionality. This workshop will serve as an introductory technical training on full-stack geo-visualization. The workshop will include an overview of web-based platforms, mapping libraries, and the backend infrastructure. During this interactive and hands-on session, all participants will have a chance to build a small web map project with a provided data pack. The whole process of programming and debugging will be demonstrated. There will be time for both development and answering questions that participants may have.

This workshop was organized by Luyu Liu as a part of UCGIS workshop 2021 series on Friday June 11, 2021, 2:00 - 4:00 pm EDT (11:00 am - 1:00 pm PDT).

You can find the instruction and all the materials we used in the workshop [here](https://github.com/luyuliu/UCGIS-Fullstack-Geovisualization-Workshop) and the recording [here](https://www.youtube.com/watch?v=BEEc_jbamPY). You should be able to reproduce all the results by simply following the instruction. The PowerPoint file I used in the video is in the `/doc` folder or [download here](https://luyuliu.github.io/UCGIS-Fullstack-Geovisualization-Workshop/doc/presentation.pptx). 

## Assessment
Perhaps the most underrated part of teaching is assessment. Assessment is important primarily because it can make you teach better in the future. I learned this after taking many pedagogy classes; however, the actual reason that pushed me to do systematic assessment is that: as a student for almost 20 years, I can strongly feel that many teachers I met just did assessments for administrative purposes (which are surely important), but this should never be the primary reason to conduct your assessment. Instead, I am going to build my assessment based on whether my teaching met the expectation/goals.

Below are the learning objectives/goals/expected outcomes: by the end of this workshop, the participants should be able to:

- Explain the structure of web pages
- Report HTML, JavaScript, and CSS’s usages
- Reproduce a simple static webmap
- Share the webmap with GitHub Pages
- Report the functions of an API (for backend part only)
- Reproduce a simple back-end with MongoDB and python-eve (for backend part only)

So, I designed two short polls that will be launched before and after the workshop. 

First is the pre-workshop poll. It has five questions:
1. How would you rate your web programming skill? (Selecting from Extremely good, Very good, Somewhat good, Not so good, and Not good at all)
2. How confident would you rate yourself to finish a webmap independently?
3. How would you rate the pre-workshop material?
4. Which materials do you find most useful so far? Please check all that apply. (Selecting from Instruction, Emails, YouTube Video, Slack, and Not helpful at all)
5. Please check the prerequisites you finished.

Second is the post-workshop poll. It has 10 questions:
1. How would you rate your web programming skill after the workshop?
2. How confident would you be on finishing a webmap independently after the workshop?
3. Generally, how would you rate the instructor's ability to help your learning process during the workshop?
4. How would you rate the instructor's public speaking skill?
5. How would you rate the lectures?
6. How would you rate the labs?
7. Do you think the learning objectives are reached after the workshop?
8. How would you rate the organization of the workshop?
9. Do you think the questions during the workshop (can be asked by other students) are answered?
10. How do you rate the instructor's time control?

There are several purposes for these two polls:
1. First and the most importantly, I want to test whether my teaching has helped the participants improve their web-programming skills. Therefore, I asked the same questions in the pre- and post-workshop. Examples are questions 1, 2 in the pre-workshop poll and 1, 2, and 7 in the post-workshop polls. The idea is to compare the self-reported measure before and after to get a semi-quantitative result.
2. I want to ask about the materials, structure, public speaking and other differnet aspects of the workshop and the instructor. These includes questions 3, 4 in the pre-workshop poll and question 3 - 10 in the post-workshop poll.
3. I want to double-check that the participants have prepared all the prerequisites for the labs before the workshop. The example is question 5 in pre-workshop poll.

Both polls were anonymous. I also referred to the rubric of micro-teaching activities used in the College Teaching class (ESEPSY 7404) I took when I was designing the polls. The class was taught by Dr. Shirley Yu, so special thanks to her.

## Results
You can find the poll results in `\doc\poll_analysis.xlsx` or [download here](https://luyuliu.github.io/UCGIS-Fullstack-Geovisualization-Workshop/doc/poll_analysis.xlsx). We are going to analyze the results based on three dimensions: assessment of learning outcomes, the instructor, and the materials.

### Learning outcomes
The results show that the learning outcomes have been met after the workshop. There are several self-reported results we can use to support this claim.

1. Comparison between self-reported results

<img src='/images/teaching_outcomes_comparison.PNG'>

Picture 1: The result of questions 1 - 2 in pre- and post-workshop polls and their average.

The confidence of finishing a webmap independently increase from 2.86 to 3.44 by almost 0.6 point, while the self-reported web-programming skill increase from 2.57 to 3.11. This shows that there are a significant increase in both confidence and self-reported web-programming skill, which is definitely a satisfying result.


2. Self-reported opinion on learning objectives

<img src='/images/post_workshop_poll.PNG'>

Picture 2: Post-workshop results

All responses indicated the learning objectives are at least somewhat met. The average score of this answer based on Likert scale is 4.22 out of 5.

However, compared with other questions about the materials and the instructor, this results are relatively lower. A participant reported that the workshop was too fast-paced and I will address this issue next.

### The instructor

Generally, my performance is accepted and acknowledged by the audience. We can see this from the responses to the questions in the post-workshop poll:

- Generally, how would you rate the instructor's ability to help your learning process during the workshop? Average score: **4.44 out of 5**.
-  How would you rate the instructor's public speaking skill? Average score: **4.67 out of 5**.  This is actually very surprising to me but I am definitely happy that I can receive such a high score in public speaking as a non-native speaker.
-  How do you rate the instructor's time control? Average score: **4.56 out of 5**.
- Do you think the questions during the workshop (can be asked by other students) are answered? Average score: **3.89 out of 5**. This one is relatively low compared with other items, since I did not expect a mistake a participant throwed during the lab. Thankfully, one of the participants helped me.


There are emails I received from some students which really gave me that "awwwww" moment.

>"Thank you so much for the great lecture, everything you have prepared is so well-organized. I have learned HTML, JavaScript, and MongoDB both in classes pieces and on my own at different times, your lecture finally glued all those pieces together. It’s also great to learn a lot of tips you shared in your work, and I like the metaphor you used (bone, face muscle, and make up) to describe HTML, JS, and JQuery, which gave me an “a-ha” moment. 

>"**I feel your lecture is much better than some of the ESRI trainings I have attended.** I look forward to hearing more from your work in the future. "


### Materials
All materials received very positive responses:
- How would you rate the labs? **4.22 out of 5**
- How would you rate the lectures? **4.67 out of 5**
- How would you rate the organization of the workshop? **4.67 out of 5**

One participant responded that the labs are less useful. The participant contacted me after the workshop and made some suggestions that I was too fast when doing the lab. 

I totally agree. In fact, I already expected this when I finished designing the workshop; however, since I need to cover a lot of contents so that some backgrounds can be properly addressed before diving into the labs, I need to compress the lab part to assign more time to the lectures. This is a compromise I chose to make, but this can be improved by either extending the length of the workshop or removing some contents. This is especially obvious for participants without much prior knowledge on web-programming, since we can see the participant's response on the self-reported skills. These are very good lesson I learned from the feedback, and will help my future teaching in the long run.

One thing I notice about the pre-workshop materials (Question 4) is that: YouTube tutorial video is super helpful. I recorded a video walkthrough like the ones I did for my GEOG 5210 Labs, and many participants found it very helpful. I actually received many many positive feedbacks about this. It could take a very long time to make a high-quality tutorial walkthrough video; I recorded the same video twice, which took me about a whole afternoon for a one-hour long video. But it is definitely worth. 

I also used GitHub repo as a unified platform to host all the data, tutorial, instruction, and feedback. And I think this is really a good practice because it can literally last forever and a large chunk of the contents being taught in the workshop is on GitHub platform. It really helps me organize everything. And write instruction in Markdown and README.mdis really becoming my new comfort zone now: it's efficient, fast, and traceable; and we can also see that in the poll: the instruction also received most positive feedback.


## Conclusion
This is the very first time I ever organized a workshop like this, and I believe it is definitely a successful one. It may sound kind of weird for me to say this, but since we have evidence as shown above, we can say with more confidence. It really helps me to build my confidence when teaching, and it is a really precious chance for me to think again about education and my future career, and web-based geovisualization in general.