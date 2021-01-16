# Minesweeper

## Game Features

### Levels
* Beginner (9x9, 10 bombs)
* Intermediate (16x16 grid, 40 bombs)
* Advanced (30x16 grid, 99 bombs)
* Custom (_m_ x _n_ grid, _x_ bombs)

### Header
* The left side of the header contains a counter that displays the number of remaining bombs when a cell has been marked as a bomb.
  * The initial value displayed is the number of bombs in the grid as defined by the level.
  * If more bombs have been marked than exist in the grid, the number display will go negative.
* The middle of the header contains a button whose labels are as follows:
  * If the game is lost: losing face
  * If the game is won: winning face
  * If the button is down: pressed state
  * At all other times: unpressed state

### Grid
* A cell that has not been cleared or labeled has a label of uncleared.
* A cleared cell with no adjacent bombs is empty.
* A cleared cell with one adjacent bomb has a label of `1`.
  * Pattern continues up to a label of `8`.
* An uncleared cell marked by the user as a bomb has a label of a flag.
* A cleared cell containing a bomb has a label of a bomb.
  * This is only after the game is over.
* A cell that was labled with a flag that was not a bomb has a label of a crossed out bomb.
  * This is only after the game is over.
* A cleared cell will not have its label changed once set as defined above.

#### End of Game
* A cell that contains a bomb has a label of a bomb.
* A cell that contains a bomb that was detonated, has a label of a detonated bomb.
* A cell that contains an erroneously placed flag, i.e., a cell marked by the user as a bomb that was not a bomb, has a label of a crossed out bomb.

### Game Play
* A new game is initiated by either selecting a new level or clicking the face button in the header.
  * The user is not prompted whether they wish to abandon their current game.
* A grid is rendered with cells in an uncleared state.
* A left-click on a cell clears that cell.
  * The very first left-click on a cell in a new grid cannot end the game.
    * This implies that the bomb locations are not generated until after this cell is cleared.
    * This cleared cell will receive the appropriate label once bomb locations are generated.
  * If the cell clicked has no bombs in any of the eight adjacent cells, cells are cleared outwards, in adjacent cells, until a cell is encountered where a bomb is in an adjacent cell.
  * If the clicked cell contains a bomb, the game is over with a loss.
    * Any cell labeled with a flag that does not contain a bomb is labeled with a crossed-off bomb.
  * If the clicked cell is the last uncleared cell, the game is over with a win.
    * Cells do not need to be labeled with flags for the game to be won or lost.
* A right-click on an uncleared cell labels that cell with a flag.
