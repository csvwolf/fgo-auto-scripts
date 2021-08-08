var click1 = function(x, y) {
  const _x = x+random(-10,10)
  const _y = y+random(-10,10)
  console.log(_x, _y)
  click(_x, _y)
}

var sleep1 = function(t) {
  sleep(t + random(0, 80))
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
      const point = findImage(captureScreen(), b, { threshold: threshold })
      if (point) {
          return [point.x, point.y]
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
