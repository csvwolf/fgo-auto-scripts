exports.click = function(x, y) {
    const _x = x+random(-10,10)
    const _y = y+random(-10,10)
    click(_x, _y)
}

exports.sleep = function(t) {
  sleep(t + random(0, 80))
}

exports.readImage = function(img) {
  const b = images.read(img)
  return b
}
