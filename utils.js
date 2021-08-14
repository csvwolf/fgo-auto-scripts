// 自动缩放不好使
// setScreenMetrics(1080, 2340)

// 人工缩放坐标系
var resize = function(x, y) {
  return [Math.floor(x / 2340 * device.height), Math.floor(y / 1080 * device.width)]
}

/**
 * 
 * @param {*} x 
 * @param {*} y 
 * @param {*} r resize or not
 */
var click1 = function(x, y, r) {
  let p = [x, y]
  if (r) {
    p = resize(x, y)
  }
  const _x = p[0] + random(-10,10)
  const _y = p[1] + random(-10,10)
  click(_x, _y)
}

var sleep1 = function(t) {
  sleep(t + random(0, 80))
}

/**
 * 
 * @param {*} x1 
 * @param {*} y1 
 * @param {*} x2 
 * @param {*} y2 
 * @param {*} duration 
 * @param {*} r resize or not
 */
var swipe1 = function(x1, y1, x2, y2, duration, r) {
  var p1 = [x1, y1]
  var p2 = [x2, y2]
  if (resize) {
    p1 = resize(x1, y1)
    p2 = resize(x2, y2)
  }
  const _x1 = p1[0] + random(-10, 10)
  const _x2 = p2[0] + random(-10, 10)
  const _y1 = p1[1] + random(-10, 10)
  const _y2 = p2[1] + random(-10, 10)
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
    const point = findImage(captureScreen(), b, { threshold: threshold })

    if (point) {
        return [
          Math.floor(point.x + b.getWidth() / 2), 
          Math.floor(point.y + b.getHeight() / 2)
        ]
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
