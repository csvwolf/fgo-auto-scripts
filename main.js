"ui";

var getCommandResult = require('./commands')
var native = require('./native')
var storage = storages.create("fgo")
var utils = require('./utils')
var stopExecution = utils.stopExecution

let w = null
let execution = null

// 悬浮窗
threads.start(function() {
    const a = require('./floaty.js')()
    w = a.window
    execution = a.execution
    w.setSize(0, 0)
})

// ui mode
ui.layout(
    <drawer>
        <vertical>
            <appbar>
                <toolbar id="toolbar" title="FGO 冲冲冲" />
                <tabs id="tabs" />
            </appbar>
            <viewpager id="viewpager">
                <frame>
                    <ScrollView>
                        <vertical padding="16">
                            <button id="start">Start!</button>
                            <text textSize='16sp'>基础配置</text>
                            <checkbox id="apple" text="吃苹果（请注意苹果库存）"/>
                            <radiogroup id="version">
                                <radio text="苍玉的魔法少女"/>
                                <radio text="宝石翁"/>
                                <radio text="2004御主服"/>
                                <radio text="自定义（请在自定义页面配置）" />
                            </radiogroup>
                        </vertical>
                    </ScrollView>
                </frame>
                <frame>
                    <ScrollView>
                        <vertical padding="16">
                            <text textSize='16sp'>自定义</text>
                                <horizontal>
                                    <text>保存的配置</text>
                                    <spinner id="configs" w="150" spinnerMode="dialog" entries=""></spinner>
                                    <button id="loadConfig" w="60">加载</button>
                                    <button id="deleteConfig" w="60">删除</button>
                                </horizontal>
                                <button id="clear">清空输入框</button>
                                <input id="custom" inputType="textMultiLine"/>
                                <text>运算单元</text>
                                <button id="compile">解析</button>
                                <button id="affect">生效</button>
                                <horizontal>
                                    <input id="name" hint="配置名" w="200"></input>
                                    <button id="save">保存（不会生效）</button>
                                </horizontal>
                                <text id="result"></text>
                                <text textSize="16sp">UI picker 简易输入工具</text>
                                <horizontal>
                                    <text>从者1</text>
                                    <spinner id="s1to" entries="默认|从者1|从者2|从者3"></spinner>
                                    <button id="s1s1" w="70">技能1</button>
                                    <button id="s1s2" w="70">技能2</button>
                                    <button id="s1s3" w="70">技能3</button>
                                </horizontal>
                                <horizontal>
                                    <text>从者2</text>
                                    <spinner id="s2to" entries="默认|从者1|从者2|从者3"></spinner>
                                    <button id="s2s1" w="70">技能1</button>
                                    <button id="s2s2" w="70">技能2</button>
                                    <button id="s2s3" w="70">技能3</button>
                                </horizontal>
                                <horizontal>
                                    <text>从者3</text>
                                    <spinner  id="s3to" entries="默认|从者1|从者2|从者3"></spinner>
                                    <button id="s3s1" w="70">技能1</button>
                                    <button id="s3s2" w="70">技能2</button>
                                    <button id="s3s3" w="70">技能3</button>
                                </horizontal>
                                <horizontal>
                                    <text>御主服</text>
                                    <spinner id="mto" entries="默认|从者1|从者2|从者3"></spinner>
                                    <button id="m1s1" w="70">技能1</button>
                                    <button id="m1s2" w="70">技能2</button>
                                    <button id="m1s3" w="70">技能3</button>
                                </horizontal>
                                <horizontal>
                                    <spinner id="changeFrom" entries="从者1|从者2|从者3"></spinner>
                                    <text>To</text>
                                    <spinner id="changeTo" entries="从者4|从者5|从者6"></spinner>
                                    <button id="change">换人</button>
                                </horizontal>
                                <button id="nextTurn">Next Turn</button>

                        </vertical>
                    </ScrollView>
                </frame>
                <frame>
                    <vertical>
                        <button id="friendPoolButton">自动抽友情池</button>
                        <button id="unlimitedPoolButton">自动抽无限池</button>
                        <button id="test">测试功能</button>
                    </vertical>
                </frame>
            </viewpager>
        </vertical>
    </drawer>
);

// 不开报了奇怪的 error
$settings.setEnabled('foreground_service', true);

activity.setSupportActionBar(ui.toolbar)

ui.apple.checked = storage.get("apple") || false

const version = storage.get('version') || 1
let customList = storage.get('customList') || []

native.setSpinnerAdapter(ui.configs, customList.map(i => i.name))

ui.viewpager.setTitles(['基础模式', '自定义配置', '其他功能'])
ui.tabs.setupWithViewPager(ui.viewpager)

ui.version.check(
    ui.version.getChildAt(version-1).getId()
)

const customCmd = storage.get('customCmd') || ''
ui.custom.setText(customCmd || '')

ui.apple.on("check", (checked) => {
    storage.put("apple", checked)
});

ui.version.setOnCheckedChangeListener(function (radioGroup, id) {
    let i = 1
    let viewId = radioGroup.getCheckedRadioButtonId()
    let radioView = ui.findView(viewId)
    const r = radioView.getText().toString()
    toast(r)
    switch (r) {
        case '苍玉的魔法少女':
            i = 1
            break
        case '宝石翁':
            i = 2
            break
        case '2004御主服':
            i = 3
            break
        case '自定义（请在自定义页面配置）':
            i = 4
            break
    }
    storage.put("version", i)
})

ui.start.click(function() {
    w.setSize(600, 200)
    stopExecution(w, execution.p)
    storage.put('scriptOption', 'attack')
    toast('显示悬浮框')
})

ui.compile.click(function() {
    const r = getCommandResult(ui.custom.text())
    ui.result.setText(r.resultText)
})

ui.affect.click(function() {
    const r = getCommandResult(ui.custom.text())
    storage.put('customCmd', r.rawText)
    toast('自定义已生效')
})

// 保存
ui.save.click(function() {
    const rawText = ui.custom.text()
    const name = ui.name.text()
    if (!name) {
        toast('名称不能为空')
        return
    }

    customList.push({ text: rawText, name: name })
    storage.put('customList', customList)
    native.setSpinnerAdapter(ui.configs, customList.map(i => i.name))
    toast('保存成功')
})

// 删除配置
ui.deleteConfig.click(function() {
    const i = ui.s1to.getSelectedItemPosition()
    customList.splice(i, 1)
    storage.put('customList', customList)
    native.setSpinnerAdapter(ui.configs, customList.map(i => i.name))
    toast('已删除')
})

ui.loadConfig.click(function() {
    const i = ui.s1to.getSelectedItemPosition()
    const data = customList[i]
    if (!data) {
        toast('错误的配置')
    }
    ui.custom.setText(data.text)
})

ui.clear.click(function() {
    ui.custom.setText('')
})

ui.friendPoolButton.click(function() {
    w.setSize(600, 200)
    storage.put('scriptOption', 'friend_pool')
    stopExecution(w, execution.p)
})

ui.unlimitedPoolButton.click(function() {
    w.setSize(600, 200)
    storage.put('scriptOption', 'unlimited_pool')
    stopExecution(w, execution.p)
})

ui.test.click(function() {
    w.setSize(600, 200)
    storage.put('scriptOption', 'test')
    stopExecution(w, execution.p)
})

//-----下面是一坨屎 别动了

// s1 click
ui.s1s1.click(function() {
    const i = ui.s1to.getSelectedItemPosition()
    ui.custom.setText(ui.custom.text() + '\n' + 's:1,1,' + i)
})

ui.s1s2.click(function() {
    const i = ui.s1to.getSelectedItemPosition()
    ui.custom.setText(ui.custom.text() + '\n' + 's:1,2,' + i)
})

ui.s1s3.click(function() {
    const i = ui.s1to.getSelectedItemPosition()
    ui.custom.setText(ui.custom.text() + '\n' + 's:1,3,' + i)
})

// s2 click
ui.s2s1.click(function() {
    const i = ui.s2to.getSelectedItemPosition()
    ui.custom.setText(ui.custom.text() + '\n' + 's:2,1,' + i)
})

ui.s2s2.click(function() {
    const i = ui.s2to.getSelectedItemPosition()
    ui.custom.setText(ui.custom.text() + '\n' + 's:2,2,' + i)
})

ui.s2s3.click(function() {
    const i = ui.s2to.getSelectedItemPosition()
    ui.custom.setText(ui.custom.text() + '\n' + 's:2,3,' + i)
})

// s3 click
ui.s3s1.click(function() {
    const i = ui.s3to.getSelectedItemPosition()
    ui.custom.setText(ui.custom.text() + '\n' + 's:3,1,' + i)
})

ui.s3s2.click(function() {
    const i = ui.s3to.getSelectedItemPosition()
    ui.custom.setText(ui.custom.text() + '\n' + 's:3,2,' + i)
})

ui.s3s3.click(function() {
    const i = ui.s3to.getSelectedItemPosition()
    ui.custom.setText(ui.custom.text() + '\n' + 's:3,3,' + i)
})

// 御主服 click
ui.m1s1.click(function() {
    const i = ui.mto.getSelectedItemPosition()
    ui.custom.setText(ui.custom.text() + '\n' + 'm:1,0,' + i)
})

ui.m1s2.click(function() {
    const i = ui.mto.getSelectedItemPosition()
    ui.custom.setText(ui.custom.text() + '\n' + 'm:2,0,' + i)
})

ui.m1s3.click(function() {
    const i = ui.mto.getSelectedItemPosition()
    ui.custom.setText(ui.custom.text() + '\n' + 'm:3,0,' + i)
})

ui.change.click(function() {
    const i = ui.changeFrom.getSelectedItemPosition() + 1 // 1 2 3
    const j = ui.changeTo.getSelectedItemPosition() + 4 // 4 5 6
    ui.custom.setText(ui.custom.text() + '\n' + 'c:' + i + ',' + j + ',0')
})

ui.nextTurn.click(function() {
    ui.custom.setText(ui.custom.text() + '\n---')
})
