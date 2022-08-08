'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

const openModal = function (e) {
  e.preventDefault(); // So the page doesn't go to the top
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(function (btn) {
  btn.addEventListener('click', openModal);
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Implementing Smooth Scrolling on 'Learn More' button
// Adding event listener to the button
btnScrollTo.addEventListener('click', function (e) {
  const s1coordinates = section1.getBoundingClientRect(); //This gets the coordinates of the section1 element

  // Coordinates Check
  /*
  console.log(s1coordinates);
  console.log(e.target.getBoundingClientRect()); // These would be the coordinates of the clicked button ('Learn More'). These positions are relative to where in the screen the user is!
  console.log('Current scroll (x/y)', window.pageXOffset, window.pageYOffset); //These are the actual screen coordinates
  console.log(
    'height/width of the viewport: ',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  ); //These give the "size of the screen" that the user is checking on the browser.
  */

  // Scrolling
  // Option 1 (Abrupt) OLD SCHOOL
  /*
  window.scrollTo(
    s1coordinates.left + window.pageXOffset,
    s1coordinates.top + window.pageYOffset
  ); //We have to add the 'window.pageYOffset' because the s1coordinates.top is always relative to where the page is. Then we have to add to the offset of the window of the user's browser
  */

  // Option 2 (Smooth) OLD SCHOOL
  /*
  window.scrollTo({
    left: s1coordinates.left + window.pageXOffset,
    top: s1coordinates.top + window.pageYOffset,
    behavior: 'smooth',
  }); //We have to add the 'window.pageYOffset' because the s1coordinates.top is always relative to where the page is. Then we have to add to the offset of the window of the user's browser
  */

  // Option 3 (Smooth) NEW WAY
  section1.scrollIntoView({ behavior: 'smooth' });
});

// Smooth scrolling on the header buttons

/*
// SOLUTION 1) Creating the same callback function for each of the elements
document.querySelectorAll('.nav__link').forEach(function (el) {
  el.addEventListener('click', function (e) {
    // By preventing default, the button click will no longer go straight to the section clicked (like it's specified on the HTML)
    e.preventDefault();
    // Creating a varible to get just the href attribute (which contains the #section--number) and that takes to the clicked section! We write this to get each of the buttons' href.
    const id = this.getAttribute('href');
    // By doing this, we get the id exactly as it's on the href (HTML), and then we can easily scroll to this part! (ids are #section--1, #section--2 and #section--3)
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  });
});
*/

// SOLUTION 2) Using Event Delegation -> catch the event on the parent element
// 1) Adding the EVENT LISTENER to a common parent element of all the elements we are interested in (in this case, .nav__links)
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  // 2) Determine what element originated the event
  // e.target -> check where the event was originated!
  //console.log(e.target);

  // Matching strategy (the element that originated the function MUST contain the nav__link class, otherwise, scrolling shouldn't happen!)
  if (e.target.classList.contains('nav__link')) {
    // Creating a varible to get just the href attribute (which contains the #section--number) and that takes to the clicked section! We write this to get each of the buttons' href.
    const id = e.target.getAttribute('href');
    // console.log(id);
    // By doing this, we get the id exactly as it's on the href (HTML), and then we can easily scroll to this part! (ids are #section--1, #section--2 and #section--3)
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// Adding a Tabbed Component on Section 2
// Using EVENT DELEGATION (attaching the event handler to the parent element - tabsContainer)
tabsContainer.addEventListener('click', function (el) {
  // ACTIVATE TAB

  //Matching strategy -> We need to search for the closest '.operations__tab', because there is a span within the button elements!
  const clicked = el.target.closest('.operations__tab');

  /*
  // Option 1
  // We must add the active to the clicked element. But only if a 'real button' is clicked. If we only click on the parent element, then nothing should happen
  if (el.target.classList.contains('operations__tab')) {
    clicked.classList.add('operations__tab--active');
  }
  */

  // Option 2
  //Guard Clause (If there's no clicked variable, then it returns the function immediately)
  if (!clicked) return;

  // REMOVE: before adding the active class, the active class must be removed from all the tabs;
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  // ADD: now adding aftwrwards in one of them (in the clicked one)
  clicked.classList.add('operations__tab--active');

  // ACTIVATE CONTENT AREA (the information is on the data-tab attribute, either 1, 2 or 3)
  //console.log(clicked.dataset.tab); // It gives us the number of the data-set attribute of the clicked button. Remember: IT IS A DATASET ATTRIBUTE!, SO WE JUST NEED TO WRITE .dataset.tab !!!!!!!!!!

  // REMOVE: before adding the active class, the active class must be removed from all the contents;
  tabsContent.forEach(content =>
    content.classList.remove('operations__content--active')
  );

  // ADD: now adding aftwrwards in one of them (in the clicked one)
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active'); // Remember: IT IS A DATASET ATTRIBUTE!, SO WE JUST NEED TO WRITE .dataset.tab !!!!!!!!!!
});
