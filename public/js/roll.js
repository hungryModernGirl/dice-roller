/*
 * function to calculate total value of the dice roll
 *
 */

function calculateRoll(val_array){
    var sides = val_array[0];
    var how_many = val_array[1];
    var total = 0;
    for (i = 0; i < how_many; i++){
      var rand = Math.floor((Math.random() * sides) + 1);
      total += rand;
    }
    return total;
}