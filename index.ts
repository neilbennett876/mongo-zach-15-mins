import { ObjectId } from 'mongodb';
import {
  createCharacters,
  getCharacters,
  getCharactersByTvShow,
} from './characters.js';
import { createPlatform, getPlatforms } from './platforms';
import {
  createTvShows,
  getShowsByName,
  getShowsByPlatform,
  getTvShows,
} from './ts-shows';

const run = async () => {

  await createPlatform({name: 'Netflix', price: 100, hasFreeTrial: true});
  await createPlatform({name: 'Hulu', price: 34, hasFreeTrial: false});
  const platforms = await getPlatforms();
  await createTvShows({name: '30 Rock', 
  platformIds: [platforms[0]._id.toString(), platforms[1]._id].toString(), genre: "Comedy", maturityRating: "NC-17"});
  await createTvShows({name: 'The Office', 
  platformIds: [platforms[0]._id.toString(), platforms[1]._id].toString(), genre: "Drama", maturityRating: "R"});
  const showsByPlatforms = await getShowsByPlatform(platforms[0]._id);
  console.log(`${platforms[0].name} 2nd TV Show: ${showsByPlatforms[1].name}`);
  
  const tvShows = await getTvShows();
  console.log(tvShows);
  
  await createCharacters({name: 'Michael Scott', tvShowId: tvShows[1]._id});
  await createCharacters({name: 'Pam Beasley', tvShowId: tvShows[1]._id});
  const characters = await getCharactersByTvShow(showsByPlatforms[1]._id);
  console.log(`These are my characters ${characters}`);
  const tvShowsByName = await getShowsByName('30');
  console.log(tvShowsByName);
}
run();