"ui";

const getCommandResult = require('./commands')
const storage = storages.create("fgo")
let w = null
console.log(device.width, device.height)
// 悬浮窗
threads.start(function() {
    w = require('./floaty.js')()
    w.setSize(0, 0)
})

// ui mode
ui.layout(
    <vertical padding="16">
        <button id="start">Start!</button>
        <checkbox id="apple" text="吃苹果"/>
        <radiogroup id="version">
            <radio text="苍玉的魔法少女"/>
            <radio text="宝石翁"/>
            <radio text="2004御主服"/>
            <radio text="自定义" />
        </radiogroup>
        <text textSize='16sp'>自定义</text>
        <input id="custom" lines='3' />
        <button id="compile">解析</button>
        <button id="save">save</button>
        <text id="result"></text>
    </vertical>
);

ui.apple.checked = storage.get("apple") || false
const version = storage.get('version') || 1
ui.version.check(
    ui.version.getChildAt(version-1).getId()
)

const customCmd = storage.get('customCmd') || ''
ui.custom.setText(customCmd || '')

ui.apple.on("check", (checked) => {
    storage.put("apple", checked)
});

ui.version.setOnCheckedChangeListener(function (radioGroup, id) {
    let i = id % radioGroup.getChildCount()
    if (i == 0) { i = radioGroup.getChildCount() }
    const r = radioGroup.getChildAt(i - 1).getText()
    toast(r)
    storage.put("version", i)
})

ui.start.click(function() {
    w.setSize(600, 200)
    toast('显示悬浮框')
})

ui.compile.click(function() {
    const r = getCommandResult(ui.custom.text())
    ui.result.setText(r.resultText)
})

ui.save.click(function() {
    const r = getCommandResult(ui.custom.text())
    storage.put('customCmd', r.rawText)
    toast('保存成功')
})
