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

var Blank = [2016, 821]

// setScreenMetrics(1080, 2340)

var UnlimitedBtn = readImage('./assets/unlimited/10.jpg')
var Zero = readImage('./assets/unlimited/zero.jpg')
// 重置无限池
var Reset = readImage('./assets/unlimited/reset.jpg')
var Execute = [1582, 861]
var Close = [1268, 840]
var i = 0

events.on('exit', function() {
  UnlimitedBtn.recycle()
  Zero.recycle()
  Reset.recycle()
  toast('共抽 ' + i + ' 次')
})

toast('开抽')

while (true) {
  if (findButton(Reset, { maxTimes: 1 })) {
    toast('已经空拉，重置开始')
    const resetPosition = findButton(Reset, { maxTimes: 1 })
    if (!resetPosition) {
      continue
    }
    click1(resetPosition[0], resetPosition[1], false)
    sleep1(500)
    // const executePosition = findButton(Execute, { maxTimes: 1 })
    // if (!executePosition) {
    //   console.log('找不到 execute')
    //   continue
    // }
    click1(Execute[0], Execute[1], true)
    sleep(4000)
    click1(Close[0], Close[1], true)
    sleep(1000)
  }

  const position = findButton(UnlimitedBtn, { maxTimes: 5 })
  if (position) {
    click1(position[0], position[1], false)
    toast('抽完了一次！')
    // 在这里才开始
    // click1(Blank[0], Blank[1], true)
    i++
  }

  sleep1(300)
}
