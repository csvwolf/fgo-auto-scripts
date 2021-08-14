var click1 = function(x, y) {
  const _x = x+random(-10,10)
  const _y = y+random(-10,10)
  console.log(_x, _y)
  click(_x, _y)
}

var sleep1 = function(t) {
  sleep(t + random(0, 80))
}

var swipe1 = function(x1, y1, x2, y2, duration) {
  const _x1 = x1 + random(-10, 10)
  const _x2 = x2 + random(-10, 10)
  const _y1 = y1 + random(-10, 10)
  const _y2 = y2 + random(-10, 10)
  const _duration = duration + random(-100, 100)
  swipe(_x1, _y1, _x2, _y2, _duration)
}

var readImage = function(img) {
  const b = images.read(img)
  return b
}

var findButton = function (b, options) {
  const maxTimes = options ? options.maxTimes || 100 : 200
  const interval = options ? options.interval || 100  : 100
  const threshold = options ? options.threshold || 0.7 : 0.7
  
  for (let i = 0; i < maxTimes; i++) {
    const h = captureScreen().getHeight()
    const w = captureScreen().getWidth()
    const point = findImage(captureScreen(), b, { threshold: threshold })

    if (point) {
        return [Math.floor(point.x / h * 1080), Math.floor(point.y / w * 2340)]
    }
    sleep1(interval)
  }
  return false
}

var stopExecution = function (window, execution) {
  if (execution) {
    execution.getEngine().forceStop()
  }
  window.action.setText('开始运行')
}

exports.click = click1
exports.sleep = sleep1
exports.readImage = readImage
exports.findButton = findButton
exports.stopExecution = stopExecution
exports.swipe = swipe1
