export const smoothScroll = (event) => {
  event.preventDefault()
  smoothScrollWithHash(event?.target?.hash ?? "html")
}

export const smoothScrollWithHash = (hash) => {
  const el = document.querySelectorAll(hash)[0]

  const targetPosition = el.offsetTop
  const startPosition = document.scrollingElement.scrollTop
  let currentPosition = startPosition

  const goDown = currentPosition < targetPosition
  const interval = setInterval(function() {
    const mp = movingPosition(startPosition, targetPosition, currentPosition)
    // mpの返り値が0だと無限ループになるので、最低限移動する値を加減算する
    currentPosition += goDown ? mp + 5 : - mp - 5

    if (goDown && currentPosition > targetPosition
      || !goDown && currentPosition < targetPosition) {
      clearInterval(interval);
      document.scrollingElement.scrollTop = targetPosition
    }
    document.scrollingElement.scrollTop = currentPosition
  }, 10);
}

const movingPosition = (start, target, current) => {
  const sin = Math.sin((current - target) / (start - target) * Math.PI)
  return sin * 50
}
