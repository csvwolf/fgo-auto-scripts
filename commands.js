var utils = require('./utils')

setScreenMetrics(1080, 2340)

var click2 = utils.click
var sleep2 = utils.sleep

const SkillY = 880
const MasterSkillY = 479
const ChangeY = 536
const AvatarY = 614

const Avatar1 = [732, AvatarY]
const Avatar2 = [1230, AvatarY]
const Avatar3 = [1660, AvatarY]
const Confirm = [1569,655]

// 从者一号位
const C1S1 = [370,SkillY]
const C1S2 = [507,SkillY]
const C1S3 = [619,SkillY]

// 从者二号位
const R1S1 = [852,SkillY]
const R1S2 = [997,SkillY]
const R1S3 = [1129,SkillY]

// 从者三号位
const C3S1 = [1315,SkillY]
const C3S2 = [1452,SkillY]
const C3S3 = [1584,SkillY]

// 御主技能
const MasterSkillStart = [2047, MasterSkillY]
const MasterSkill1 = [1633, MasterSkillY]
const MasterSkill2 = [1770, MasterSkillY]
const MasterSkill3 = [1892, MasterSkillY]

// 换人坐标点
// 换人是三技能
const ChangeS1 = [495, ChangeY]
const ChangeS2 = [795, ChangeY]
const ChangeS3 = [1096, ChangeY]
const ChangeS4 = [1371, ChangeY]
const ChangeS5 = [1703, ChangeY]
const ChangeS6 = [2008, ChangeY]
const ChangeConfirm = [1353, 958]

function useMasterSkill(i) {
  click2(MasterSkillStart[0], MasterSkillStart[1], true)
  sleep2(150)
  use(i)
}

function use(t) {
  var i = t[0]
  var avatar = t[1]
  click2(i[0],i[1], true)
  sleep2(200)
  click2(Confirm[0],Confirm[1], true)
  sleep2(100)
  click2(avatar[0],avatar[1], true)
  sleep2(3000)
}

// t: [from, to]
function changeServant(t) {
  click2(MasterSkillStart[0], MasterSkillStart[1], true)
  sleep2(150)
  // 换人服是三技能
  click2(MasterSkill3[0], MasterSkill3[1], true)
  sleep2(200)
  click2(Confirm[0],Confirm[1], true)
  sleep2(100)
  click2(t[0][0], t[0][1], true)
  sleep2(100)
  click2(t[1][0], t[1][1], true)
  sleep2(100)
  click2(ChangeConfirm[0], ChangeConfirm[1], true)
  sleep2(3000)
}

const CommandList = {
  s: use,
  m: useMasterSkill,
  c: changeServant
}

const PointList = {
  's:1,1': C1S1,
  's:1,2': C1S2,
  's:1,3': C1S3,
  's:2,1': R1S1,
  's:2,2': R1S2,
  's:2,3': R1S3,
  's:3,1': C3S1,
  's:3,2': C3S2,
  's:3,3': C3S3,
  'm:1,0': MasterSkill1,
  'm:2,0': MasterSkill2,
  'm:3,0': MasterSkill3
}

const AvatarList = {
  0: Avatar2, // 默认走 2 号位
  1: Avatar1,
  2: Avatar2,
  3: Avatar3
}

const ChangeList = {
  1: ChangeS1,
  2: ChangeS2,
  3: ChangeS3,
  4: ChangeS4,
  5: ChangeS5,
  6: ChangeS6
}

const translate = function(i) {
  switch (i[1]) {
    case 's':
      return '从者 ' + i[2] + ' 技能 ' + i[3] + ' 给 ' + (i[4] === '0' ? 2 : i[4]) + ' 从者\n'
    case 'm':
      return '御主技能 ' + i[2] + '给 ' + (i[4] === '0' ? 2 : i[4]) + ' 从者\n'
    case 'c':
      return '换人 从者 ' + i[2] + '与 ' + i[3] + ' 交换\n'
  }
}

/**
 * 一行一条指令
 * s:1,2,2 表示 从者 1 技能 2 给 从者 2
 * m:1,0,2 表示 御主技能 1 给 二号位从者（懒得特殊处理 统一一下格式好了）
 * c:1,4,0 表示换人服 1 位换 4 位从者
 * 
 * ---\n
 * 区分一面二面和三面
 * 
 * @param {*} text 
 * @returns resultText 翻译文本
 * @returns result 结果
 * @rawText 
 */
module.exports = function (text) {
  let resultText = ''
  let result = []
  const turns = text.split('---')
  for (let i = 0; i < turns.length; i++) {
    resultText += '第' + (i + 1) + '面\n'
    result.push([])

    // 解析命令
    turns[i].split('\n').map(i => i.trim()).filter((c) => !!c).forEach(function(command) {
      const c = /^(\w):(\d),(\d),(\d)$/.exec(command)
      if (!c) {
        toast('错误的指令')
        console.log('指令错误', command)
        return resultText, result
      }
      resultText += translate(c)
      const _r = {f: CommandList[c[1]]}
      if (c[1] !== 'c') {
        _r['p'] = [PointList[c[0].slice(0,-2)], AvatarList[c[4]]]
      } else {
        _r['p'] =  [ChangeList[c[2]], ChangeList[c[3]]]
      }
      result[i].push(_r)
    })
  }

  return {
    resultText: resultText,
    result: result,
    rawText: text
  }
}
