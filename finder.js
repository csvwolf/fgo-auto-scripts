// 查找助战

var servants = {
  caster: 4
}

var utils = require('./utils')
var swipe1 = utils.swipe
var click1 = utils.click
var sleep1 = utils.sleep
var readImage = utils.readImage
// autojs 这个 node 版本 const 分析的不对，没办法还是用 var 吧
var findButton = utils.findButton
var images = {}

function initImages () {
  for (let key in servants) {
    images[key] = []
    for (let i = 1; i <= servants[key]; i++) {
      images[key].push(readImage(getWholePath(key, i)))
    }    
  }
}

function getWholePath(servant, idx) {
  return './assets/friends/' + servant + '/' + idx + '.jpg'
}

function findServant(servant) {
  const imageList = images[servant]
  let p = null
  for (let i = 0; i < imageList.length; i++) {
    // 就搜一次就够了
    p = findButton(imageList[i], {maxTimes: 1, threshold: 0.9})
    if (p) {
      return p
    }
  }
  return p
}

function findServantAndSwipe(servant) {
  let p = null
  for (let i = 0; i < 5; i++) {
    p = findServant(servant)
    sleep(300)
    if (p) {
      return p
    }
    swipe1(1600, 1000, 1600, 500, 600)
    sleep(200)
  }
  return p
}

function find(servant) {
  p = findServantAndSwipe(servant)

  while (!p) {
    click1(1566,183)
    sleep1(300)
    click1(1576,842)
    sleep1(3000)

    p = findServantAndSwipe(servant)
    if (p) { 
        break
    }
    sleep1(15000)
    toast('接着找')
 }
 click1(p[0],p[1])
 toast('找到啦 ' + p[0] + ',' + p[1]) 
 sleep1(3000)
}

events.on('exit', function() {
  for (let key in images) {
    images[key]
    for (let i = 0; i <= images[key].length; i++) {
      images[key][i].recycle()
    }    
  }
})

// 直接初始化一波
initImages()

exports.findServant = find
