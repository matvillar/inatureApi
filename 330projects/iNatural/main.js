const apiUrl =
  'https://api.inaturalist.org/v1/observations/observers?photos=true&sounds=true';

// const apiEndPoint = {
//   getUser: (id) => `identifications/${id}`,
// };

async function getBirds() {
  try {
    const response = await fetch(apiUrl);
    if (response.ok) {
      const data = await response.json();
      console.log(data);

      displayBirds(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.error(error);
  }
}

const displayBirds = (data) => {
  const section = document.querySelector('section');

  let birdImg = data.results.slice(0, 20).forEach((img) => {
    let image = document.createElement('img');
    const titleBird = img.user.login;
    if (img.user.icon_url !== null) {
      // create bird-card
      const birdCard = document.createElement('div');
      birdCard.classList.add('bird-card');

      // create the title
      const birdTitle = document.createElement('h2');
      birdTitle.innerHTML = titleBird;
      // set attributes
      image.setAttribute('src', img.user.icon_url);
      // append
      section.appendChild(birdCard);
      birdCard.appendChild(birdTitle);
      birdCard.appendChild(image);
    }
  });
};
getBirds();
