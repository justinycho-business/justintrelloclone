# Justin Cho Trello Clone

[View Live Site Here](https://justincho-trello-clone.herokuapp.com/)
---
![Justin Trello gif](/justin_trello_gif.gif)

## About
Justin_Trello_Clone is a clone of [Trello](https://trello.com/en-US), a project management website that was acquired by Atlassian in 2017. I chose to work on this project because it is such a simple yet powerful tool. With a project management background, I recognize the usefulness of breaking down large tasks into smaller little tasks. It does so much for our human brains. I wanted to implement Drag and Drop functionality and put a spin on Trello with exciting colors to make project management a fun activity. 

I partitioned my project into 5 phases during a 2-week sprint. These phases were planning my database and backend routes, implementing user authentication, putting together board UI, implementing Drag and Drop, and implementing a progress bar for each checklist.  I used Python, Javascript, React, and Redux to put my web-based project management tool together. 

[Read My Wiki](https://github.com/justinycho-business/justintrelloclone/wiki/Database-Schema)

## Technologies
* Frontend: Javascript, React, Redux
* Backend: Python
* Relational Database: PostgreSQL 
* Drag and Drop: [React Beautiful DnD](https://github.com/atlassian/react-beautiful-dnd)
* Styling: CSS and HTML5

## Highlights and Challenges
* The drag and drop feature was a fun, new technology for me to learn. Programming draggable components inside of another draggable component was difficult, but delving deep into the documentation allowed me to find the correct solution. There is a property you can give draggables that is not mentioned in the quick start guide. If you can, log into the demo user and feel how smooth the drag and drag functionality is. 
* Additionally, having to track and the order of the lists and cards after dragging was a difficult task, so I needed to restructure my database to track the order. You can close the window and come back the board; you will see that the order persists. 

### Future Features
* Dark mode 
* Bar graph for # cards in each list
* Permit multiple users on a board 
