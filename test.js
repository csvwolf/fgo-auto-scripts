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

const SkillImage = readImage('./assets/skill-border.png')

var i = 0

events.on('exit', function() {
  SkillImage.recycle()
  toast('共抽 ' + i + ' 次')
})

toast('开抽')

var res = images.matchTemplate(captureScreen(), SkillImage, { region: [10, device.width / 2], max: 9, transparentMask: true })
res.matches.forEach(match => {
  log("point = " + match.point + ", similarity = " + match.similarity);
});
console.log(res.length)
