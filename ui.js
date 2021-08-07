"ui";

const storage = storages.create("fgo")

ui.layout(
    <vertical padding="16">
        <checkbox id="apple" text="吃苹果"/>"/>
        <radiogroup id="version">
            <radio text="苍玉的魔法少女"/>
            <radio text="宝石翁"/>
            <radio text="2004御主服"/>
        </radiogroup>
        <text textSize='16sp'>自定义</text>
        <text>1T</text>
        <input lines='3' />
        <button>解析</button>
        <button>save</button>
        <text id="result"></text>
    </vertical>
);

ui.apple.checked = storage.get("apple") || false
const version = storage.get('version') || 1
ui.version.check(
    ui.version.getChildAt(version-1).getId()
)

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
