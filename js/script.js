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
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = ".tags.list",
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-';

function generateTitleLinks(customSelector = ''){

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  let html = '';
  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);

  for(let article of articles){
    /* get the article id */
    const articleId = article.getAttribute('id');
    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    /* get the title from the title element */
    /* insert link into titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.insertAdjacentHTML('beforeend', '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>');

    /* create HTML of the link */

    //const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    //console.log(linkHTML);

    //html = html + linkHTML;
  }
  //titleList.innerHTML = html;

  let links = document.querySelectorAll('.titles a');
  console.log(links);

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

function calculateTagsParams(tags){

  const params = {
    max: 0,
    min: 999999,
  };
  for(let tag in tags){
    if(tags[tag] > params.max){
      params.max = tags[tag];
    } if(tags[tag] < params.min){
      params.min = tags[tag];
    }
    console.log(tag + ' is used ' + tags[tag] + ' times');
  }
  return params;
}
console.log(calculateTagsParams);

function calculateTagClass(count, params){
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
  return optCloudClassPrefix + classNumber;
}

function generateTags(){
  /* [NEW] create a new variable allTags with an empty array */
  let allTags = {};
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for(let article of articles){
    /* find tags wrapper */
    const titleList = article.querySelector(optArticleTagsSelector);
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    //console.log(articleTags);
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    //console.log(articleTags)
    /* START LOOP: for each tag */
      for(let tag of articleTagsArray){
      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
      /* add generated code to html variable */
      html = html + " " + linkHTML;
      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags.hasOwnProperty(tag)){
        /* [NEW] add tag to allTags objects */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    /* END LOOP: for each tag */
  }
    /* insert HTML of all the links into the tags wrapper */
    titleList.innerHTML = html;

    let links = document.querySelectorAll('.titles a');
    console.log(links);

    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }
    /* END LOOP: for every article: */
  }
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector('.tags');
    console.log(tagList);
    /* [NEW] add html from allTags to tagList */
     //tagList.innerHTML = allTags.join(' ');
     //console.log(allTags);
     const tagsParams = calculateTagsParams(allTags);
     console.log('tagsParams:', tagsParams);
     /* create variable for all links HTML code */
     let allTagsHTML = '';
     /* START LOOP: for each tag in allTags */
     for(let tag in allTags){
       /* generate code of a link and add it to alltagsHTML */
       //allTagsHTML += tag + ' (' + allTags[tag] + ') ';
       //allTagsHTML += '<li><a class="' + '" href="#tag-' + tag + '">' + tag + ' ' + allTags[tag] +  '</a></li> ';
       allTagsHTML += '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag + ' ' + allTags[tag] +  '</a></li> ';
       //console.log(allTagsHTML);
     }
     /* END LOOP: for each tag in allTags */

     /* add HTML from  allTags HTML to tagList */
     tagList.innerHTML = allTagsHTML;
}

generateTags();

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  /* find all tag links with class active */
  const articleTags = document.querySelectorAll('a.active[href^="#tag-"]');
  /* START LOOP: for each active tag link */
  for(let articleTag of articleTags){
    /* remove class active */
    articleTag.classList.remove('active');
  /* END LOOP: for each active tag link */
}
  /* find all tag links with "href" attribute equal to the "href" constant */
  const articles = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
  for(let article of articles){
    /* add class active */
    article.classList.add('active');
  /* END LOOP: for each found tag link */
}
  /* execute function "generateTitleLinks" with article selector as argument */
generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  /* find all links to tags */
  let links = document.querySelectorAll('a[href^="#tag-"]');
  /* START LOOP: for each link */
  for(let link of links){
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
  /* END LOOP: for each link */
}
}
addClickListenersToTags();

function generateAuthors() {
  /* find all articles */

  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for(let article of articles){
    /* find authors wrapper */
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    //console.log(authorWrapper);
    /* make html variable with empty string */
    let html = '';

    const articleAuthors = article.getAttribute('data-author');
    //console.log(articleAuthors);
    const linkHTML = '<li><a href="#author-' + articleAuthors + '"><span>' + articleAuthors + '</span></a></li>';
    /* add generated code to html variable */
    html = html + linkHTML;

    //authorWrapper.innerHTML = html;

    authorWrapper.innerHTML = html;

    let links = document.querySelectorAll('.title a');
    //console.log(links);

    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }
  }
}
generateAuthors();

function authorClickHandler(event){
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    /* make a new constant "author" and extract tag from the "href" constant */
    const author = href.replace('#author-', '');
    /* find all author links with "href" attribute equal to the "href" constant */
    const articleAuthors = document.querySelectorAll('a.active[href^="#author-"]');
    /* START LOOP: for each active author link */
    for (let articleAuthor of articleAuthors){
    /* remove class active */
      articleAuthor.classList.remove('active');
      /* END LOOP: for each active tag link */
    }
    /* find all author links with "href" attribute equal to the "href" constant */
    const links = document.querySelectorAll('a.active[href^="#author-"]');
    for (let link of links) {
      link.classList.add('active');
    }
generateTitleLinks('[data-author="' + author + '"]');
}

  function addClickListenersToAuthors(){
    /* find all links to authors */
    let links = document.querySelectorAll('a[href^="#author-"]');
    /* START LOOP: for each link */
    for(let link of links){
      /* add authorClickHandler as event listener for that link */
      link.addEventListener('click', authorClickHandler);
    /* END LOOP: for each link */
  }
  }
  addClickListenersToAuthors();
