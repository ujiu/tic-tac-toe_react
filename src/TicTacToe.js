import { useState } from 'react'
import './TicTacToe.css'

function TicTacToe() {
  const initBoard = () => [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]

  const [steps, setSteps] = useState([])
  const [unDoSteps, setUnDoSteps] = useState([])
  const [boardData, setBoardData] = useState(initBoard())

  const updateBoardDataBySteps = steps => {
    const tempBoardData = initBoard()

    steps.forEach((item, index) => {
      tempBoardData[item[0]][item[1]] = index % 2 === 0 ? 'O' : 'X'
    })

    setSteps(steps)
    setBoardData(tempBoardData)

    const res = hasWinner(steps, tempBoardData)
    if (res) {
      setTimeout(() => {
        window.alert(res)
        updateBoardDataBySteps([])
      })
    }
  }

  const onRestart = () => {
    updateBoardDataBySteps([])
  }

  const onTick = (rowIndex, colIndex) => {
    // 判断是否重复落子
    if (steps.find(item => item[0] === rowIndex && colIndex === item[1])) {
      return
    }

    unDoSteps.pop()
    setUnDoSteps([...unDoSteps])
    updateBoardDataBySteps([...steps, [rowIndex, colIndex]])
  }

  // 撤销
  const onUndo = () => {
    if (steps.length === 0) {
      console.log('到底了')
      return
    }

    setUnDoSteps([...unDoSteps, steps.pop()])
    updateBoardDataBySteps([...steps])
  }

  // 重做
  const onRedo = () => {
    if (unDoSteps.length === 0) {
      console.log('到底了')
      return
    }

    updateBoardDataBySteps([...steps, unDoSteps.pop()])
    setUnDoSteps([...unDoSteps])
  }

  function hasWinner(steps, boardData) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]

    const flatBoardData = boardData.flat()
    for (let i = 0; i < lines.length; i++) {
      const [j, k, l] = lines[i]
      if (
        flatBoardData[j] === flatBoardData[k] &&
        flatBoardData[j] === flatBoardData[l] &&
        flatBoardData[j] !== null
      ) {
        return `Winner is ${flatBoardData[j]}`
      }
    }

    if (steps.length === 9) return '平局'

    return false
  }

  return (
    <div className="game-wrapper">
      {/* 棋盘 */}
      <div className="board-wrapper">
        {boardData.map((row, index1) => (
          <div className="row" key={index1}>
            {row.map((item, index2) => (
              <span className="item" key={index2} onClick={() => onTick(index1, index2)}>
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>

      {/* 一些操作 */}
      <div className="action-wrapper">
        <button onClick={onUndo}>撤销</button>
        <button onClick={onRedo}>重做</button>
        <button onClick={onRestart}>重置</button>
      </div>
    </div>
  )
}

export default TicTacToe
