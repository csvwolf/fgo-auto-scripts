auto()

if (!requestScreenCapture(true)) {
    toast('请求截图失败')
    exit()
}

sleep(300)

var utils = require('./utils')
var finder = require('./finder')
var defaults = require('./default')
var getCommands = require('./commands')

setScreenMetrics(1080, 2340)

var click1 = utils.click
var sleep1 = utils.sleep
var readImage = utils.readImage
var findServant = finder.findServant
// autojs 这个 node 版本 const 分析的不对，没办法还是用 var 吧
var findButton = utils.findButton

const storage = storages.create("fgo")
const apple = storage.get("apple") || false
const version = storage.get("version") || 1
const customCmd = storage.get('customCmd') || ''

toast(apple ? '吃苹果' : '不吃苹果')

const Battle = [2010,910]
const CardSP = [1199,340]
const Card1= [443,764]
const Card2 = [790,764]

const NextImage =  readImage('./assets/next.jpg')
const GoldAppleImage = readImage('./assets/gold_apple.jpg')
const Attack = readImage('./assets/attack.jpg')

function fight() {
    click1(Battle[0],Battle[1], true)
    sleep1(1500)
    click1(CardSP[0],CardSP[1], true)
    sleep1(500)
    click1(Card1[0],Card1[1], true)
    sleep1(500)
    click1(Card2[0],Card2[1], true)
    sleep1(20000)
}


function useCustom(t) {
    const result = getCommands(t).result
    result.forEach((r) => {
        findAttack()
        r.forEach((u) => {
            u.f(u.p)
        })
        fight()
    })
}

// 宝石翁
function use3TInDiamond() {
    useCustom(defaults.RubyMan)
}


function use2004() {
    useCustom(defaults.Future2004)
}

// 苍玉的魔法少女
function use3TInBlue() {
    useCustom(defaults.BlueMagicGirl)
}

function eatApple() {
    const appleImage = findButton(GoldAppleImage, {maxTimes:10})
    if (appleImage) {
        if (!apple) {
            toast('体力没有了，不吃苹果，游戏结束')
            console.log('别吃啊！！！')
            return false
        }
        click1(appleImage[0], appleImage[1], true)
        sleep1(300)
        click1(1603,835, true)
        console.log('吃屎啦你')
    } else {
        toast('不用吃苹果')
    }
    return true
}

function clickRefresh() {
    findServant('caster')
}


function findAttack() {
    while (!findButton(Attack, {maxTimes:1})) {
        
    }
    toast('进攻')
    return true
  
}

function nextTurn() {
    toast('完成')
    let p = null
    while (!p) {
        click1(1920,993, true)
        sleep1(300)
        p = findButton(NextImage, {maxTimes:1})
    }
    click1(1564, 852, true)

}

function useVersion() {
    switch (version) {
        case 1:
            toast('苍玉的魔法少女')
            use3TInBlue()
            break
        case 2:
             toast('宝石翁')
             use3TInDiamond()
             break
        case 3:
            toast('2004')
            use2004()
            break
        case 4:
            toast('使用自定义配置')
            useCustom(customCmd)
            break
    }
}

var i = 0


events.on('exit', function() {
    toast('共刷 ' + i + ' 轮')
    NextImage.recycle()
    GoldAppleImage.recycle()
    Attack.recycle()
})


while (true) {
    i++
    useVersion()
    toast('3t end')
    nextTurn()
    sleep1(3000)
    toast('next')
    // 如果不勾选苹果，苹果用光就退出脚本
    if (!eatApple()) {
        console.log('苹果用光拉，结束战斗')
        break
    }
    sleep1(2000)
    clickRefresh()
    toast('1 turn end')
}
