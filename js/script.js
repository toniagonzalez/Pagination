
//-----------------Variables-------------------//
const main = document.getElementsByClassName('page')[0];
//---List Variables
const studentListUL = document.getElementsByClassName('student-list');
let studentItem = document.getElementsByClassName('student-item cf');


//---Search Bar Variables
const searchInput = document.createElement('input');
searchInput.type = 'text';
const searchButton = document.createElement('button');
const searchBarDiv = document.createElement('div');
const header = document.querySelector('.page-header');
let message = document.createElement('p');
message.innerText = 'No Results Found';
message.classList.add('message');
message.style.visibility = 'hidden';
let results;


//---Pagination Variables
const paginationDIV = document.createElement('div');
let paginationUL = document.createElement('ul');
let paginationLI;
let pageLink;

paginationDIV.prepend(message);

//------Style & Add Search Bar Dynamically--------//

//------Style Search Bar & Button
searchBarDiv.classList.add('student-search');
searchInput.placeholder = 'Search for students...'
searchButton.innerText = 'Search';

//------Add Search Bar & Button DOM
searchBarDiv.append(searchInput);
searchBarDiv.append(searchButton);
header.append(searchBarDiv);


//------------Search Bar Functionality--------//

//------Submit by Button
header.addEventListener('click', function(e){
  let entry;
   if (e.target === searchButton) {
        //------Variables
        entry = searchInput.value.toLowerCase();
        let results = 0;
        message.style.visibility = 'hidden';

        //----Show Matches
        for(let i= 0; i < studentItem.length; i++){
            let text = studentItem[i].innerText.toLowerCase();
            studentItem[i].classList.remove('match')
            if (text.includes(entry)) {
              studentItem[i].classList.add('match');
              results += 1;
            }
            else {
              studentItem[i].style.display = 'none';
            }
        }

        //---Show Pagination & Matches
        getNumberOfPages(results);
        let matches = document.getElementsByClassName('match');
        showPage(matches, 1);
        paginationUL.innerHTML = '';
        appendPageLinks(getNumberOfPages(results));

        if (results === 0) {
          message.style.visibility = 'visible';
        }
        if (entry == ''){
            showPage(studentItem, 1);
        }
  }

});

//------Responsive Text Entry Search
header.addEventListener('keyup', function() {
      //------Variables
      let entry = searchInput.value.toLowerCase();
      let results = 0;
      message.style.visibility = 'hidden';

      //----Show Matches
      for(let i= 0; i < studentItem.length; i++){
          let text = studentItem[i].innerText.toLowerCase();
          studentItem[i].classList.remove('match')
          if (text.includes(entry)) {
            studentItem[i].classList.add('match');
            results += 1;
          }
          else {
            studentItem[i].style.display = 'none';
          }
      }

     //---Show Pagination & Matches
     getNumberOfPages(results);
     let matches = document.getElementsByClassName('match');
     showPage(matches, 1);
     paginationUL.innerHTML = '';
     appendPageLinks(getNumberOfPages(results));

     if (results === 0) {
       message.style.visibility = 'visible';
     }
     if (entry === ''){
       showPage(studentItem, 1);
     }
});


//---------Show Page with max 10 items----------//
function showPage(list, page){
  let lastPageItem = (page * 10) -1;
  let firstPageItem = (lastPageItem - 9);
    for ( let i=0; i < list.length; i++){
        if( (i >= firstPageItem ) && (i <= lastPageItem ) ) {
          list[i].style.display = 'block';
        }
        else {
        list[i].style.display = 'none';
        }
    }
};



//----------Styles & Adds Pagination Dynamically----------//
//------Add Pagination Div & Pagination UL to DOM
main.append(paginationDIV);
paginationDIV.classList.add('pagination');
paginationDIV.append(paginationUL);


//------Find Number of Pages Links
function getNumberOfPages(value) {
   let pages = Math.ceil(value/ 10);
   return pages;
};

//------Find Initial Pages Links
getNumberOfPages(studentItem.length);


//------Append Page Links to Pagination UL

function appendPageLinks(value) {

    for (let i = 0; i < value; i++) {
        //---Create LI & links
        paginationLI = document.createElement('li');
        pageLink = document.createElement('a');
        pageLink.innerHTML = ''+(i+1)+'';
        paginationLI.append(pageLink);

        //---Append to UL
        paginationUL.appendChild(paginationLI);
        paginationUL.firstElementChild.firstElementChild.classList.add('active');

        //---Add Event Listener to links
        pageLink.addEventListener('click', function (e) {
          for (let i = 0; i < paginationUL.children.length; i++) {
            paginationUL.children[i].firstElementChild.classList.remove('active');
            console.log(paginationUL.children[i]);
          }
          showPage(studentItem, e.target.innerText);
          e.target.classList.add('active');
        });
    };
}

appendPageLinks(getNumberOfPages(studentItem.length));

//------Loads First Page & Style Button 1
showPage(studentItem, 1);
