var bookmarkNameInput = document.getElementById('siteNameInput');
var bookmarkURLInput = document.getElementById('siteURLInput');

var bookmarkDataList = [];

if (localStorage.getItem('bookmarks') === null) {
  bookmarkDataList = [];
} else {
  bookmarkDataList = JSON.parse(localStorage.getItem('bookmarks'));
  displayBookmarks();
}

// onclick="bookmarkSumbitHandler();"
function bookmarkSumbitHandler() {
  //!!!!! Regex validate data from user.

  addNewBookmarkItem();
  displayBookmarks();
}
// add item to the datalist and local storage
function addNewBookmarkItem() {
  var bookmarkData = {
    name: bookmarkNameInput.value,
    url: bookmarkURLInput.value,
  };
  bookmarkDataList.push(bookmarkData);
  localStorage.setItem('bookmarks', JSON.stringify(bookmarkDataList));
}
// display in html
function displayBookmarks() {
  document.getElementById('bookmarkTable').innerHTML = '';
  for (var i = 0; i < bookmarkDataList.length; i++) {
    document.getElementById(
      'bookmarkTable'
    ).innerHTML += `<tr class="text-center align-baseline">
    <td>${i + 1}</td>
    <td>${bookmarkDataList[i].name}</td>
    <td>
      <button onclick="visitBookmark(${i});" class="btn btn-info">
        <i class="fas fa-eye"></i> visit
      </button>
    </td>
    <td>
      <button onclick="deleteBookmark(${i});" class="btn btn-danger">
        <i class="fas fa-trash-can"> Delete</i>
      </button>
    </td>
  </tr>`;
  }
}
// open bookmark url website in new blank page
function visitBookmark(i) {
  console.log(bookmarkDataList[i].url);
  window.open(`https://${bookmarkDataList[i].url}`);
}

// delete bookmark
function deleteBookmark(i) {
  bookmarkDataList.splice(i, 1);
  localStorage.setItem('bookmarks', JSON.stringify(bookmarkDataList));
  displayBookmarks();
}

function validation(inputId, regexKey, alertElID) {
  var input = document.getElementById(inputId);
  var regex = {
    name: /^.{3,}$/,
    url: /(https?:\/\/)?(www\/)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/,
  };
  input.classList.remove('is-invalid', 'is-valid');
  if (regex[regexKey].test(input.value)) {
    input.classList.add('is-valid');
    document.getElementById(alertElID).classList.replace('d-block', 'd-none');
  } else {
    input.classList.add('is-invalid');
    document.getElementById(alertElID).classList.replace('d-none', 'd-block');
  }
}
