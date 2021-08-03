'use strict';

function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');
  console.log(event);

  /* remove class 'active' from all article links  */

const activeLinks = document.querySelectorAll('.titles a.active');

for(let activeLink of activeLinks){
  activeLink.classList.remove('active');
}

  /* add class 'active' to the clicked link */

clickedElement.classList.add('active');
console.log('clickedElement:', clickedElement);

  /* remove class 'active' from all articles */
const activeArticles = document.querySelectorAll('article.active');

for(let activeArticle of activeArticles){
  activeArticle.classList.remove('active');
}

  /* get 'href' attribute from the clicked link */

const articleSelector = clickedElement.getAttribute('href');
console.log(articleSelector);

  /* find the correct article using the selector (value of 'href' attribute) */

const targetArticle = document.querySelector(articleSelector);
console.log(targetArticle);

  /* add class 'active' to the correct article */

targetArticle.classList.add('active');
}

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

function generateTitleLinks(){

  /* remove contents of titleList */

const titleList = document.querySelector(optTitleListSelector);
let html = '';

  /* for each article */

const articles = document.querySelectorAll(optArticleSelector);
for(let article of articles){

    /* get the article id */

    const articleId = article.getAttribute('id');

    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* get the title from the title element */

    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log(linkHTML);

    /* create HTML of the link */

    const titleList = document.getElementById('article-1');
    titleList.insertAdjacentHTML('afterend', '<article class="post" id="article-2"></article>');

    /* insert link into titleList */

    html = html + linkHTML;

  }

  titleList.innerHTML = html;

  let links = document.querySelectorAll('.titles a');
  console.log(links);

  for(let link of links){
  link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();
