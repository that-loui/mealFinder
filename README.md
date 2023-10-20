# MEAL FINDER || release 1.0.1

## Table of Content

- [overview](#Overview)
  - [prerequisites](#prerequisites)
  - [functionalities](#functionalities)
- [Process](#process)

  - [1](#stage-1-making-fetch-request)
  - [2](#stage-2-displaying-results)
  - [3](#stage-3-fetching-single-meal-info)
  - [4](#stage-4-displaying-single-result-in-dom)
  - [built-with](#build-with)

- [links](#links)
- [author](#author)
## Overview

    This  is a meal finder app built using bootstrap and the mealDB api.

### Prerequisites

- _git clone https://github.com/that-loui/mealFinder_
- _git checkout dev_
- _npm i versel/analytics_

### Functionalities

- MAIN

  - fetch data from DB using search query
  - Display data gotten from DB into DOM
  - fetch single meals data from DB using mealID
  - Display single meal data to dom

- SECONDARY
  - Check that data gotten from DB isn't empty
  - display loader when fetching data from DB

## Process

### Stage 1-(making fetch request)

- When search button is clicked a fetch request is made to the mealDB api.
- Before the fetch request is sent a check is made to ensure that the search query isn't empty.
- If empty an alert is displayed, if not empty the fetch request is sent. While awaiting the response a loader is shown

### Stage 2-(displaying results)

- when the fetch request si successful and the data has been converted to the correct type. A function is called passing the data as an argument.
- The function checks to ensure that the data gotten isn't empty.
  - If result is empty display a text stating that the result wasn't found
  - else, display result to DOM.
- For more info check [script](./js/script.js) line 60-80

### Stage 3-(fetching single meal info)

- When a meal(data displayed in DOM) is selected(clicked), a fetch request is made to the API using the ID of the meal (check [script](./js/script.js) line 149-160 and line 32-45)
- when fetch is successful a function is called to the appropriate response

### stage 4-(displaying single result in DOM)

- The result is displayed in detail to the DOM to allow users see more info about the specific result selected(clicked)

### build-with

- bootstrap css
- custom css/scss
- vanilla js

## Links

[repo](https://github.com/that-loui/mealFinder_)
[preview](https://github.com/that-loui/mealFinder_)

## Author

Name - Louis Macjob
[github](https://github.com/that-loui)
