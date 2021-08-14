auto()

if (!requestScreenCapture(true)) {
    toast('请求截图失败')
    exit()
}

sleep(300)

var utils = require('./utils')
var findButton = utils.findButton
var readImage = utils.readImage
var click1 = utils.click
var sleep1 = utils.sleep

// setScreenMetrics(1080, 2340)

const Blank = [2016, 821]
const Confirm = [1564, 855]
const Continue = [1497, 1000]

const Continue10Image = readImage('./assets/continue10.jpg')

var i = 0

events.on('exit', function() {
  Continue10Image.recycle()
  toast('共抽 ' + i + ' 次')
})

toast('开抽')

while (true) {
  while (!findButton(Continue10Image, { maxTimes: 1 })) {
    click1(Blank[0], Blank[1], true)
  }
  toast('抽完了一次！')  

  click1(Continue[0], Continue[1], true)
  sleep1(300)
  click1(Confirm[0], Confirm[1], true)

  // 在这里才开始
  i++
  sleep(1500)
}
