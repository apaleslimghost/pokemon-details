var list = require('@quarterto/pokemon-list');
var sanitize = require('@quarterto/sanitize-pokemon-name');
var fs = require('fs');
var path = require('path');

var sanitizedList = list.map(sanitize);

var pokemonPath = path.join(__dirname, 'data', 'pokemon');
var speciesPath = path.join(__dirname, 'data', 'species');

var pokemonFiles = fs.readdirSync(pokemonPath).map(p => path.join(pokemonPath, p));
var speciesFiles = fs.readdirSync(speciesPath).map(p => path.join(speciesPath, p));

var pokemon = pokemonFiles.map(require);
var species = speciesFiles.map(require);

module.exports = id => {
	var numId = parseInt(id) - 1;
	if(0 <= numId && numId < pokemon.length) {
		return {
			pokemon: pokemon[numId],
			species: species[numId],
		};
	}

	var index = sanitizedList.indexOf(id);
	if(index >= 0) {
		return module.exports(index + 1);
	}
};
