/* Step 1: using axios, send a GET request to the following URL (replacing the placeholder with your Github name): https://api.github.com/users/<your name>
*/

const cards = document.querySelector('.cards');

axios.get('https://api.github.com/users/SeeStephSay').then((response) => {
	cards.appendChild(createCard(response));

	axios
		.get(response.data.followers_url)
		.then((response) => {
			response.data.forEach((user) => {
				//Make request for user with given ID
				axios
					.get(`https://api.github.com/users/${user.login}`)
					.then((response) => {
						//Handle success
						cards.appendChild(createCard(response));
					})
					//Handle error
					.catch((error) => console.log('OH NO: ', error));
			});
		})
		.catch((error) => console.log('OH NO: ', error));
});
// .catch((error) => console.log('OH NO: ', error));

/* Step 2: Inspect and study the data coming back, this is YOUR 
  github info! You will need to understand the structure of this 
  data in order to use it to build your component function 

  Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = [];

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/

function createCard(user) {
	//add variables for each newly created element
	const card = document.createElement('div'),
		img = document.createElement('img'),
		info = document.createElement('div'),
		name = document.createElement('h3'),
		username = document.createElement('p'),
		location = document.createElement('p'),
		profile = document.createElement('p'),
		link = document.createElement('a'),
		followers = document.createElement('p'),
		following = document.createElement('p'),
		bio = document.createElement('p');

	//add 'card' class to card div variable
	card.classList.add('card');

	//src data for user avatar img
	img.src = user.data.avatar_url;
	//add img <img> var to card div
	card.appendChild(img);

	//add 'card-info' class to info div variable
	info.classList.add('card-info');

	//add .name class to name h3 var
	name.classList.add('name');
	//add user (name) data as text content of name h3 var
	name.textContent = user.data.name;
	//add name h3 var to info div
	info.appendChild(name);

	//add .username class to username p var
	username.classList.add('username');
	//add user login name data to username p var
	username.TextContent = user.data.login;
	//add username p var to info div
	info.appendChild(username);

	//add user location data as text content to location p var
	location.textContent = `Location: ${user.data.location}`;
	//add location p var to info div
	info.appendChild(location);

	//add text content to profile p var
	profile.textContent = 'Profile: ';
	//add user url data to link a var
	link.href = user.data.html_url;
	//add user url data as text content to link a var
	link.textContent = user.data.html_url;
	//add link a var to profile p var
	profile.appendChild(link);
	//add profile p var to info div
	info.appendChild(profile);

	//add text content to followers p var
	followers.textContent = `Followers: ${user.data.followers}`;
	//add followers p var to info div
	info.appendChild(followers);

	//add text content to following p var
	following.textContent = `Following: ${user.data.following}`;
	//add following p var to info div
	info.appendChild(following);

  //add text content to bio p var
  bio.textContent = `Bio: ${user.data.bio}`;
  //add bio p var to info div
	info.appendChild(bio);

  //add info div to card to card div
	card.appendChild(info);

	return card;
}
