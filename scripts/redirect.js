// is used for fast redirection if users use links to old joomla website
console.log('welcome');
if (location.pathname.indexOf('index.php') > -1) {
    location.href = 'index.html';
} 