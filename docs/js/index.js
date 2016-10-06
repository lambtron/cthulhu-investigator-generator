'use strict';

/**
 * Dice function. Returns 1 to 6.
 */

function d6() {
  return Math.floor(Math.random() * 6) + 1;
}

/**
 * Definition of each statistic.
 */

var calculate = {
  strength: (function() { return d6() + d6() + d6() * 5 }),
  constitution: (function() { return d6() + d6() + d6() * 5 }),
  size: (function() { return (d6() + d6() + 6) * 5 }),
  dexterity: (function() { return d6() + d6() + d6() * 5 }),
  appearance: (function() { return d6() + d6() + d6() * 5 }),
  intelligence: (function() { return (d6() + d6() + 6) * 5 }),
  power: (function() { return d6() + d6() + d6() * 5 }),
  education: (function() { return (d6() + d6() + 6) * 5 }),
  luck: (function() { return d6() + d6() + d6() * 5 })
};

/**
 * Calculate shit.
 */

function getStats() {
  var stats = {};
  for (var prop in calculate) {
    if (calculate.hasOwnProperty(prop)) {
      stats[prop] = calculate[prop]();
    }
  }

  // Health.
  stats.health = Math.floor((stats.constitution + stats.size) / 10);

  // Movement rate.
  stats.movement_rate = 7;
  if (stats.strength >= stats.size || stats.dexterity >= stats.size) stats.movement_rate = 8;
  if (stats.strength >= stats.size && stats.dexterity >= stats.size) stats.movement_rate = 9;

  // Sanity.
  stats.sanity = stats.power;

  return stats;
}

/**
 * Generate character.
 *
 * Basically, turn the stats object into DIVs.
 */

function generateCharacter() {
  var stats = getStats();
  var container = document.getElementById('container');
  container.innerHTML = '';
  for (var prop in stats) {
    if (stats.hasOwnProperty(prop)) {
      var stat = document.createElement('div');
      stat.className = 'w-60-ns w-40-l w-100 center tl'
      stat.innerHTML = '<span>' + prop.substring(0, 3).toUpperCase() + '</span><span class=\'fr\'>' + stats[prop] + '</span>';
      container.appendChild(stat);
    }
  }
}

/**
 * Bind generate action to button.
 */

var button = document.getElementById('button-create');

button.addEventListener('click', generateCharacter, false);