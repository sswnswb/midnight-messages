// src/engine/narrative.ts
var registry = /* @__PURE__ */ new Map();
var chapters = [];
function registerChapter(chapter) {
  chapters.push(chapter);
  for (const node of chapter.nodes) {
    if (registry.has(node.id)) {
      console.warn(`[narrative] \u91CD\u590D\u8282\u70B9 id: ${node.id}`);
    }
    registry.set(node.id, node);
  }
}
function getNode(id) {
  return registry.get(id);
}
function getChapters() {
  return chapters;
}
function validateGraph() {
  const errors2 = [];
  for (const [id, node] of registry) {
    for (const ch of node.choices ?? []) {
      if (!registry.has(ch.go)) {
        errors2.push(`\u8282\u70B9\u300C${id}\u300D\u7684\u9009\u62E9\u6307\u5411\u4E0D\u5B58\u5728\u7684\u8282\u70B9\u300C${ch.go}\u300D`);
      }
    }
    if (node.end && !/^ending:/.test(node.end)) {
      errors2.push(`\u8282\u70B9\u300C${id}\u300D\u7684 end \u5B57\u6BB5\u683C\u5F0F\u5E94\u4E3A ending:xxx`);
    }
  }
  return errors2;
}

// src/story/ch1.ts
var N = (id, speaker, text, effects, choices, next) => ({ id, speaker, text, effects, choices, next });
var ch1 = {
  id: 1,
  title: "\u7B2C\u4E00\u591C",
  nodes: [
    N("c1s1", "narration", "\u5341\u4E00\u70B9\u4E94\u5341\u5206\u3002\n\n\u4F60\u56DE\u5230\u51FA\u79DF\u5C4B\uFF0C\u94A5\u5319\u5728\u9501\u5B54\u91CC\u8F6C\u4E86\u4E24\u5708\u3002\u706F\u6CA1\u5F00\uFF0C\u4F60\u6478\u9ED1\u6362\u4E86\u978B\uFF0C\u628A\u5916\u5957\u642D\u5728\u6905\u80CC\u4E0A\u3002\n\n\u8FD9\u5957\u4E00\u5C45\u5BA4\u4E0D\u5927\u3002\u684C\u4E0A\u6709\u5403\u4E86\u4E00\u534A\u7684\u5916\u5356\uFF0C\u5783\u573E\u6876\u91CC\u6709\u4E09\u4E2A\u7A7A\u5496\u5561\u7F50\u3002\n\n\u4F60\u628A\u81EA\u5DF1\u6454\u8FDB\u5E8A\u91CC\uFF0C\u624B\u673A\u653E\u5728\u6795\u8FB9\u3002\u5C4F\u5E55\u4EAE\u4E86\u4E00\u4E0B\uFF1A\n\n23:57\u3002", ["chapter:1", "ambient:on"], void 0, "c1s2"),
    N("c1s2", "narration", "\u4F60\u76EF\u7740\u5929\u82B1\u677F\uFF0C\u6570\u7740\u697C\u4E0A\u62D6\u978B\u8D70\u52A8\u7684\u6B21\u6570\u3002\n\n0:00\u3002\n\n\u624B\u673A\u9707\u4E86\u4E00\u4E0B\u3002", ["time:0", "sfx:msg_num"], void 0, "c1s3"),
    N("c1s3", "number", "\u8FD8\u6CA1\u7761\uFF1F", ["typing"], void 0, "c1s4"),
    N("c1s4", "number", "\u8FD9\u4E48\u665A\u4E0D\u7761\uFF0C\u662F\u5728\u7B49\u4EC0\u4E48\u6D88\u606F\u5417\u3002", ["typing"], [
      { label: "\u4F60\u662F\u8C01\uFF1F", go: "c1s5" },
      { label: "\u4F60\u6253\u9519\u4E86\u5427\u3002", go: "c1s5b", flags: { saidWrong: true } },
      { label: "*\u4E0D\u56DE\uFF0C\u7FFB\u4E2A\u8EAB\u88C5\u7761", go: "c1s6", flags: { ignoredFirst: true } }
    ]),
    N("c1s5", "number", "\u6211\u662F\u8C01\u4E0D\u91CD\u8981\u3002\n\n\u6211\u77E5\u9053\u4F60\u53EB\u738B\u658C\u3002\u4ECA\u5929\u4E0B\u5348\u4E09\u70B9\uFF0C\u4F60\u5728\u5341\u4E03\u697C\u4F1A\u8BAE\u5BA4\uFF0C\u65B9\u6848\u53C8\u6CA1\u8FC7\u3002\u9886\u5BFC\u628A\u6587\u4EF6\u6454\u5728\u684C\u4E0A\u65F6\uFF0C\u4F60\u7684\u624B\u6296\u4E86\u4E00\u4E0B\u3002", ["typing"], void 0, "c1s7"),
    N("c1s5b", "number", '\u6CA1\u6253\u9519\u3002\n\n\u4F60\u53EB\u738B\u658C\uFF0C\u5BF9\u5427\uFF1F\u4ECA\u5929\u52A0\u73ED\u5230\u5341\u70B9\uFF0C\u8DEF\u8FC7\u4FBF\u5229\u5E97\u4E70\u4E86\u74F6\u5496\u5561\uFF0C\u6CA1\u559D\uFF0C\u6254\u4E86\u3002\u4F60\u8BF4\u5B83"\u53C8\u82E6\u53C8\u51C9"\u3002', ["typing"], void 0, "c1s7"),
    N("c1s6", "number", "\u6211\u77E5\u9053\u4F60\u9192\u4E86\u3002", ["typing", "sting"], void 0, "c1s7"),
    N("c1s7", "number", "\u6211\u8BF4\u51E0\u4EF6\u4E8B\u3002\n\n\u4F60\u516C\u53F8\u697C\u4E0B\u90A3\u5BB6\u9762\u9986\uFF0C\u4E0A\u5468\u5012\u95ED\u4E86\u3002\u4F60\u515C\u91CC\u90A3\u5F20\u7535\u5F71\u7968\u6839\uFF0C\u662F\u53BB\u5E74\u5341\u4E00\u6708\u516D\u53F7\u7684\u3002\n\n\u8FD8\u6709\u2014\u2014\u4F60\u623F\u95F4\u91CC\uFF0C\u662F\u4E0D\u662F\u6709\u4E00\u53F0\u5F88\u4E45\u6CA1\u5F00\u673A\u7684\u7535\u8111\uFF1F", ["typing"], [
      { label: "\u4F60\u5230\u5E95\u662F\u8C01\uFF1F\u4F60\u5728\u76D1\u63A7\u6211\uFF1F", go: "c1s8", flags: { accuse: true } },
      { label: "*\u4E0D\u8BF4\u8BDD\uFF0C\u76EF\u7740\u5C4F\u5E55", go: "c1s8b" }
    ]),
    N("c1s8", "number", "\u4E0D\u662F\u76D1\u63A7\u3002\n\n\u6211\u5728\u4F60\u8EAB\u8FB9\u3002\u5F88\u8FD1\u3002", ["typing", "sting"], void 0, "c1s9"),
    N("c1s8b", "number", "\u4F60\u4E0D\u8BF4\u8BDD\u4E5F\u6CA1\u7528\u3002\u6211\u77E5\u9053\u4F60\u5728\u770B\u3002", ["typing", "sting"], void 0, "c1s9"),
    N("c1s9", "number", "\u6BD4\u5982\u2014\u2014\u4F60\u73B0\u5728\u4F4F\u7684\u8FD9\u4E2A\u623F\u95F4\u3002\u4E00\u5E74\u524D\uFF0C\u8FD8\u4F4F\u7740\u53E6\u4E00\u4E2A\u4EBA\u3002\n\n\u4F60\u628A\u5979\u5F04\u4E22\u4E86\u3002", ["typing", "stinglong"], [
      { label: "\u4F60\u95ED\u5634\uFF01\u522B\u63D0\u5979\uFF01", go: "c1s10", flags: { anger: true } },
      { label: "*\u63E1\u7740\u624B\u673A\uFF0C\u53D1\u6296", go: "c1s10", flags: { shaken: true } },
      { label: "\u2026\u2026\u4F60\u600E\u4E48\u77E5\u9053\u6797\u665A\uFF1F", go: "c1s10", flags: { askLin: true } }
    ]),
    N("c1s10", "narration", "\u5C4F\u5E55\u6697\u4E0B\u53BB\u53C8\u4EAE\u8D77\u6765\u3002\n\n\u8FC7\u4E86\u4E00\u5206\u949F\uFF0C\u50CF\u662F\u659F\u914C\u4E86\u5F88\u4E45\uFF0C\u5B83\u53D1\u6765\u4E00\u5F20\u7167\u7247\u3002", ["sfx:msg_num", "sting"], void 0, "c1s11"),
    N("c1s11", "number", "\u8FD9\u5F20\u7167\u7247\uFF0C\u662F\u521A\u624D\u62CD\u7684\u3002\u4F60\u4FE1\u5417\uFF1F", ["typing", "photo:p_hallway", "photo:open:p_hallway", "stinglong"], void 0, "c1s12"),
    N("c1s12", "number", "\u4ECE\u4F60\u623F\u95F4\u7684\u95E8\u7F1D\u91CC\uFF0C\u80FD\u770B\u5230\u4F60\u5BA2\u5385\u7684\u706F\u8FD8\u4EAE\u7740\u3002\n\n\u4F60\u56DE\u5934\u770B\u4E86\u4E00\u773C\u3002\n\n\u706F\uFF0C\u786E\u5B9E\u4EAE\u7740\u3002", ["typing", "sting"], void 0, "c1s13"),
    N("c1s13", "number", "\u665A\u5B89\u3002\u660E\u5929\u6211\u8FD8\u4F1A\u6765\u3002\n\n\u9664\u975E\u2014\u2014\u4F60\u60F3\u8D77\u6765\u3002", ["typing"], void 0, "c1s14"),
    N("c1s14", "system", "\u5BF9\u65B9\u5DF2\u79BB\u7EBF\u3002", [], void 0, "c1s15"),
    N("c1s15", "narration", "\u4F60\u4E00\u591C\u6CA1\u7761\u3002\n\n\u7A97\u5916\u7684\u5929\uFF0C\u4E00\u70B9\u70B9\u53D8\u4EAE\u3002\u50CF\u4E00\u5F20\u5E95\u7247\uFF0C\u6162\u6162\u663E\u5F71\u51FA\u697C\u7684\u8F6E\u5ED3\u3002\n\n\u4F60\u770B\u7740\u90A3\u6761\u77ED\u4FE1\uFF0C\u770B\u4E86\u5F88\u4E45\u3002", ["time:270"], [
      { label: "\u7761\u4E00\u4F1A\u513F\u5427\uFF0C\u660E\u5929\u8FD8\u8981\u4E0A\u73ED\u3002", go: "c2s1", flags: { keptWorking: true } },
      { label: "*\u60F3\u628A\u8FD9\u4EF6\u4E8B\u544A\u8BC9\u5468\u51EF", go: "c2s1", flags: { wantTell: true } },
      { label: "*\u628A\u8FD9\u4E2A\u53F7\u7801\u5220\u6389", go: "c2s1", flags: { deleted: true } }
    ])
  ]
};

// src/story/ch2.ts
var N2 = (id, speaker, text, effects, choices, next) => ({ id, speaker, text, effects, choices, next });
var ch2 = {
  id: 2,
  title: "\u7B2C\u4E8C\u591C",
  nodes: [
    N2("c2s1", "narration", "\u767D\u5929\u6D51\u6D51\u5669\u5669\u3002\u5468\u51EF\u5728\u5FAE\u4FE1\u4E0A\u558A\u4F60\u5403\u5348\u996D\uFF0C\u4F60\u6CA1\u56DE\u3002\n\n\u665A\u4E0A\u5341\u4E00\u70B9\u4E94\u5341\uFF0C\u4F60\u8EBA\u4E0B\uFF0C\u624B\u673A\u653E\u5728\u6795\u8FB9\u3002\n\n\u4F60\u77E5\u9053\u5B83\u8981\u6765\u3002", ["chapter:2", "card:2", "note:n_secret", "contact:c_doctor"], void 0, "c2s2"),
    N2("c2s2", "number", "\u6211\u6765\u4E86\u3002", ["typing", "sfx:msg_num", "time:0"], void 0, "c2s3"),
    N2("c2s3", "number", "\u4ECA\u5929\u4F60\u5F00\u4F1A\u8D70\u4E86\u4E09\u6B21\u795E\u3002\u7B2C\u4E09\u6B21\uFF0C\u4F60\u5728\u5907\u5FD8\u5F55\u91CC\u5199\u4E86\u4E00\u4E2A\u5B57\uFF0C\u53C8\u5220\u4E86\u3002", ["typing"], [
      { label: "\u4F60\u8FDE\u6211\u7684\u5907\u5FD8\u5F55\u90FD\u770B\u5F97\u89C1\uFF1F", go: "c2s4", flags: { revealNote: true } },
      { label: "*\u6CA1\u56DE\uFF0C\u5374\u6253\u5F00\u4E86\u81EA\u5DF1\u7684\u5907\u5FD8\u5F55", go: "c2s4b" }
    ]),
    N2("c2s4", "number", '\u770B\u4E0D\u89C1\u3002\n\n\u4F46\u6211\u8BFB\u5F97\u61C2\u4F60\u3002\u4F60\u5199\u7684\u90A3\u4E2A\u5B57\uFF0C\u662F"\u665A"\u3002\u5BF9\u5427\u3002', ["typing"], void 0, "c2s5"),
    N2("c2s4b", "number", '\u4F60\u81EA\u5DF1\u90FD\u5FD8\u4E86\u81EA\u5DF1\u5199\u8FC7\u4EC0\u4E48\uFF0C\u5BF9\u5427\u3002\n\n\u90A3\u6211\u6765\u544A\u8BC9\u4F60\u2014\u2014\u662F"\u665A"\u3002', ["typing"], void 0, "c2s5"),
    N2("c2s5", "number", "\u6211\u4EEC\u6765\u73A9\u4E2A\u6E38\u620F\u3002\n\n\u4F60\u731C\u5BF9\u4E00\u4E2A\uFF0C\u6211\u5C31\u544A\u8BC9\u4F60\u6211\u662F\u8C01\u3002", ["typing"], void 0, "c2s6"),
    N2("c2s6", "number", "\u8C1C\u9898\u3002\n\n\u6211\u4EEC\u7B2C\u4E00\u6B21\u89C1\u9762\u7684\u65E5\u5B50\u3002\n\n\u7ED9\u4F60\u4E00\u4E2A\u63D0\u793A\uFF1A\u4F60\u7684\u76F8\u518C\u91CC\uFF0C\u6709\u4E00\u5F20\u86CB\u7CD5\u3002", ["typing"], void 0, "c2s6w"),
    // 决策点：可去翻相册，也可直接答
    N2("c2s6w", "narration", "\u4F60\u60F3\u4E86\u60F3\u3002", [], [
      { label: "*\u5148\u53BB\u7FFB\u76F8\u518C\uFF0C\u627E\u90A3\u5F20\u86CB\u7CD5\u7684\u7167\u7247", effect: ["screen:photos"], go: "c2s6w" },
      { label: "*\u76F4\u63A5\u56DE\u7B54\uFF1A4 \u6708 18 \u65E5", go: "c2s7", flags: { solvedPuzzle1: true } },
      { label: "*\u76F4\u63A5\u56DE\u7B54\uFF1A6 \u6708 2 \u65E5", go: "c2s6wrong" },
      { label: "*\u76F4\u63A5\u56DE\u7B54\uFF1A11 \u6708 6 \u65E5", go: "c2s6wrong" }
    ]),
    N2("c2s6wrong", "number", "\u4E0D\u5BF9\u3002\n\n\u4F60\u8FDE\u8FD9\u4E2A\u90FD\u5FD8\u4E86\uFF1F\u5979\u5F97\u591A\u96BE\u8FC7\u3002", ["typing", "sting"], [
      { label: "*\u518D\u60F3\u60F3", go: "c2s6wrong2", flags: { wrongP1: true } }
    ]),
    N2("c2s6wrong2", "number", "\u518D\u60F3\u60F3\u3002\n\n\u76F8\u518C\u91CC\u90A3\u5F20\u86CB\u7CD5\u7167\u7247\uFF0C\u65E5\u671F\uFF0C\u4F60\u770B\u89C1\u8FC7\u3002", ["typing"], [
      { label: "*\u7FFB\u76F8\u518C\uFF0C\u627E\u90A3\u5F20\u86CB\u7CD5\u7684\u7167\u7247", effect: ["screen:photos"], go: "c2s6w" },
      { label: "*\u518D\u731C\u4E00\u6B21", go: "c2s6w" }
    ]),
    N2("c2s7", "number", "\u2026\u20264 \u6708 18 \u65E5\u3002\n\n\u90A3\u662F\u4F60\u4EEC\u76F8\u9047\u7684\u7B2C\u4E00\u5929\u3002\u5F88\u597D\uFF0C\u4F60\u8BB0\u5F97\u3002\n\n\u53EF\u662F\u4F60\u8BB0\u4E0D\u8BB0\u5F97\uFF0C\u4F60\u4EEC\u5728\u4E00\u8D77\u7684\u6700\u540E\u4E00\u5929\uFF0C\u662F\u54EA\u4E00\u5929\uFF1F", ["typing", "sfx:sting"], [
      { label: "11 \u6708 6 \u65E5\u3002\u8F66\u7978\u90A3\u5929\u3002", go: "c2s8", flags: { knowsDate: true } },
      { label: "*\u4E0D\u60F3\u56DE\u7B54", go: "c2s8" }
    ]),
    N2("c2s8", "number", "11 \u6708 6 \u65E5\u3002\u90A3\u5929\u4E0B\u7740\u5927\u96E8\u3002\n\n\u4F60\u5F00\u7740\u8F66\uFF0C\u624B\u673A\u4EAE\u7740\u2014\u2014\u4E00\u6761\u77ED\u4FE1\u3002\n\n\u4F60\u56DE\u4E86\u5417\uFF1F", ["typing"], void 0, "c2s9"),
    N2("c2s9", "number", "\u56DE\u7B54\u6211\u3002", ["typing"], [
      { label: "\u6211\u2026\u2026\u6CA1\u56DE\u3002\u6211\u5728\u5F00\u8F66\u3002", go: "c2s9a", flags: { claimDriving: true } },
      { label: "\u6211\u4E0D\u8BB0\u5F97\u4E86\u3002", go: "c2s9b", flags: { noMemory: true } }
    ]),
    N2("c2s9a", "number", "\u662F\u5417\u3002\n\n\u4F60\u786E\u5B9A\u5417\u3002", ["typing", "sting"], [{ label: "*\u6C89\u9ED8", go: "c2s10" }]),
    N2("c2s9b", "number", "\u4F60\u679C\u7136\u4E0D\u8BB0\u5F97\u4E86\u3002\n\n\u6CA1\u5173\u7CFB\u3002\u6211\u66FF\u4F60\u8BB0\u7740\u3002", ["typing", "sting"], [{ label: "*\u6C89\u9ED8", go: "c2s10" }]),
    N2("c2s10", "number", "\u4ECA\u665A\u5148\u5230\u8FD9\u513F\u3002\n\n\u660E\u5929\uFF0C\u6211\u5E26\u4F60\u53BB\u89C1\u4E00\u4E2A\u4EBA\u3002", ["typing"], [
      { label: "*\u6253\u7ED9\u5468\u51EF\uFF0C\u628A\u8FD9\u4EF6\u4E8B\u8BF4\u51FA\u6765", effect: ["call:zhou"], go: "c2_aftercall_zhou" },
      { label: "*\u6253\u7ED9\u5988\u5988\uFF0C\u542C\u542C\u5979\u7684\u58F0\u97F3", effect: ["call:mom"], go: "c2_aftercall_mom" },
      { label: "*\u8C01\u90FD\u4E0D\u6253\uFF0C\u81EA\u5DF1\u625B\u7740", go: "c2s11", flags: { alone: true } }
    ]),
    // 自己扛
    N2("c2s11", "number", "\u5F88\u597D\u3002\n\n\u4F60\u9009\u62E9\u4E86\u81EA\u5DF1\u625B\u3002\u50CF\u4EE5\u524D\u4E00\u6837\u3002", ["typing"], void 0, "c2s12"),
    N2("c2s12", "number", "\u665A\u5B89\u3002\u660E\u5929\u89C1\u3002\n\n\u7B49\u4F60\u771F\u6B63\u60F3\u8D77\u6765\u7684\u65F6\u5019\uFF0C\u4F60\u4F1A\u611F\u8C22\u4ECA\u665A\u7684\u4F60\u3002", ["typing"], void 0, "c3s1"),
    // 电话后汇合
    N2("c2_aftercall_zhou", "number", "\u4F60\u7684\u540C\u4E8B\u5F88\u5173\u5FC3\u4F60\u3002\n\n\u53EF\u60DC\uFF0C\u4ED6\u5E2E\u4E0D\u4E86\u4F60\u3002", ["typing", "calllog:c_zhou_1"], [
      { label: "*\u628A\u53F7\u7801\u53D1\u7ED9\u5468\u51EF\u770B", go: "c2s12", flags: { toldZhou: true } },
      { label: "\u7B97\u4E86\uFF0C\u8BF4\u4E86\u4ED6\u4E5F\u4E0D\u4FE1\u3002", go: "c2s12", flags: { toldZhou: true } }
    ]),
    N2("c2_declined_zhou", "number", "\u8FDE\u5468\u51EF\u7684\u7535\u8BDD\u4F60\u90FD\u4E0D\u63A5\uFF1F\n\n\u4F60\u628A\u81EA\u5DF1\u5173\u5F97\u592A\u6B7B\u4E86\u3002", ["typing"], [{ label: "\u2026\u2026", go: "c2s12", flags: { refusedHelp: true } }]),
    N2("c2_aftercall_mom", "number", "\u5988\u5988\u7684\u58F0\u97F3\uFF0C\u8BA9\u4F60\u6709\u70B9\u60F3\u54ED\u3002", ["typing", "calllog:c_mom_1"], [
      { label: "*\u60F3\u628A\u8FD9\u4EF6\u4E8B\u544A\u8BC9\u5988\u5988", go: "c2s12", flags: { toldMom: true } },
      { label: '*\u6CA1\u8BF4\u51FA\u53E3\uFF0C\u53EA\u8BF4"\u6211\u633A\u597D\u7684"', go: "c2s12", flags: { liedMom: true } }
    ]),
    N2("c2_declined_mom", "number", "\u4F60\u6302\u65AD\u4E86\u5988\u5988\u7684\u7535\u8BDD\u3002", ["typing"], [{ label: "\u2026\u2026", go: "c2s12", flags: { refusedHelp: true } }])
  ]
};

// src/story/ch3.ts
var N3 = (id, speaker, text, effects, choices, next) => ({ id, speaker, text, effects, choices, next });
var ch3 = {
  id: 3,
  title: "\u7B2C\u4E09\u591C",
  nodes: [
    N3("c3s1", "narration", '\u767D\u5929\uFF0C\u5468\u51EF\u5728\u5FAE\u4FE1\u4E0A\u95EE\u4F60"\u5230\u5E95\u600E\u4E48\u4E86"\u3002\u4F60\u6253\u4E86\u51E0\u4E2A\u5B57\uFF0C\u53C8\u5220\u4E86\u3002\n\n\u591C\u91CC\uFF0C\u96E8\u53C8\u4E0B\u4E86\u8D77\u6765\u300200:00\uFF0C\u624B\u673A\u51C6\u65F6\u4EAE\u8D77\u3002', ["chapter:3", "card:3", "time:0"], void 0, "c3s2"),
    N3("c3s2", "number", "\u4ECA\u665A\uFF0C\u6211\u4E0D\u8BF4\u8BDD\u3002\n\n\u4F60\u5148\u53BB\u770B\u4F60\u7684\u5907\u5FD8\u5F55\u3002\u7B2C\u4E09\u6761\u3002\n\n\u90A3\u4E0D\u662F\u4F60\u5199\u7684\u3002", ["typing", "note:n_wrong", "sting"], void 0, "c3s2w"),
    N3("c3s2w", "narration", "\u5907\u5FD8\u5F55\u91CC\uFF0C\u591A\u4E86\u4E00\u6761\u4E0D\u662F\u4F60\u5199\u7684\u4E1C\u897F\u3002", [], [
      { label: "*\u6253\u5F00\u5907\u5FD8\u5F55\u770B\u770B", effect: ["screen:notes"], go: "c3s2w" },
      { label: "\u6211\u81EA\u5DF1\u7684\u5907\u5FD8\u5F55\uFF0C\u6211\u8FD8\u4E0D\u6E05\u695A\uFF1F", go: "c3s3", flags: { doubt: true } }
    ]),
    N3("c3s3", "number", '\u770B\u5230\u4E86\u5417\u3002\n\n"\u522B\u4FE1\u624B\u673A"\u3002\u4E09\u6761\u3002\n\n\u90A3\u662F\u4F60\u81EA\u5DF1\u5199\u7684\uFF0C\u8FD8\u662F\u2026\u2026\u6211\u66FF\u4F60\u5199\u7684\uFF1F', ["typing", "sting"], void 0, "c3s4"),
    N3("c3s4", "number", '\u73B0\u5728\uFF0C\u53BB\u770B\u4F60\u7684\u901A\u8BDD\u8BB0\u5F55\u3002\n\n\u6628\u665A 00:04\uFF0C\u6709\u4E00\u901A\u62E8\u51FA\u7684\u7535\u8BDD\uFF0C\u6253\u7ED9"\u672A\u77E5\u53F7\u7801"\u3002\u65F6\u957F 3 \u79D2\u3002', ["typing", "calllog:c_self", "sting"], void 0, "c3s4w"),
    N3("c3s4w", "narration", "\u4F60\u4E0D\u6562\u76F8\u4FE1\u3002", [], [
      { label: "*\u6253\u5F00\u901A\u8BDD\u8BB0\u5F55\u786E\u8BA4", effect: ["screen:calls"], go: "c3s4w" },
      { label: "\u6211\u6CA1\u6253\u8FC7\u8FD9\u4E2A\u7535\u8BDD\uFF01", go: "c3s5", flags: { deniedCall: true } }
    ]),
    N3("c3s5", "number", "\u53EF\u5B83\u5C31\u5728\u90A3\u91CC\u3002\n\n3 \u79D2\u300200:04\u3002\n\n\u521A\u597D\u5728\u4F60\u5220\u6389\u6211\u804A\u5929\u8BB0\u5F55\u4E4B\u524D\u3002", ["typing"], void 0, "c3s6"),
    N3("c3s6", "number", "\u4F60\u5F00\u59CB\u6000\u7591\u4E86\u5427\u3002\n\n\u4F60\u7684\u624B\u673A\uFF0C\u5728\u80CC\u7740\u4F60\u505A\u4E8B\u3002\n\n\u6216\u8005\u2014\u2014\u80CC\u7740\u4F60\u7684\u4EBA\uFF0C\u662F\u4F60\u81EA\u5DF1\u3002", ["typing", "stinglong"], void 0, "c3s7"),
    N3("c3s7", "number", "\u4ECA\u665A\uFF0C\u6211\u518D\u7ED9\u4F60\u770B\u4E00\u6837\u4E1C\u897F\u3002\n\n\u7136\u540E\uFF0C\u4F60\u51B3\u5B9A\u4FE1\u8C01\u3002", ["typing", "note:n_right"], void 0, "c3s8"),
    N3("c3s8", "narration", "\u5907\u5FD8\u5F55\u91CC\uFF0C\u73B0\u5728\u6709\u4E24\u6761\u6545\u969C\u7684\u5B57\u3002\n\n\u4E00\u6761\u8BF4\uFF1A\u522B\u4FE1\u624B\u673A\u3002\n\n\u4E00\u6761\u8BF4\uFF1A\u522B\u4FE1\u81EA\u5DF1\u3002", ["sting"], void 0, "c3s8w"),
    N3("c3s8w", "narration", "\u4F60\u7AD9\u5728\u4E24\u6761\u4E4B\u95F4\u3002", [], [
      { label: "\u6211\u4FE1\u624B\u673A\u3002\u81F3\u5C11\u5B83\u662F\u6211\u7684\u3002", go: "c3s9a", flags: { trustPhone: true } },
      { label: "\u6211\u4FE1\u6211\u81EA\u5DF1\u3002\u6211\u600E\u4E48\u4F1A\u5BB3\u81EA\u5DF1\u3002", go: "c3s9b", flags: { trustSelf: true } },
      { label: "*\u4E24\u6761\u90FD\u4E0D\u4FE1\uFF0C\u518D\u53BB\u5907\u5FD8\u5F55\u770B\u770B", effect: ["screen:notes"], go: "c3s8w" }
    ]),
    N3("c3s9a", "number", "\u4F60\u4FE1\u624B\u673A\uFF1F\n\n\u53EF\u6628\u665A 00:04 \u90A3\u901A\u7535\u8BDD\uFF0C\u5C31\u662F\u4F60\u7684\u624B\u673A\u81EA\u5DF1\u6253\u7684\u3002", ["typing", "sting"], [{ label: "*\u6C89\u9ED8", go: "c3s10" }]),
    N3("c3s9b", "number", "\u4F60\u4FE1\u81EA\u5DF1\uFF1F\n\n\u90A3\u4E3A\u4EC0\u4E48\u4F60\u4F1A\u5FD8\u6389\u90A3\u4E48\u591A\u4E8B\u3002\u4E3A\u4EC0\u4E48\u5907\u5FD8\u5F55\u91CC\u4F1A\u6709\u4F60\u6CA1\u5199\u8FC7\u7684\u5B57\u3002", ["typing", "sting"], [{ label: "*\u6C89\u9ED8", go: "c3s10" }]),
    N3("c3s10", "number", "\u4F60\u4E0D\u662F\u75AF\u4E86\u3002\n\n\u4F60\u53EA\u662F\u2026\u2026\u4E0D\u6562\u60F3\u8D77\u6765\u3002", ["typing"], void 0, "c3s11"),
    N3("c3s11", "number", "\u660E\u5929\uFF0C\u6211\u6709\u6837\u4E1C\u897F\u8981\u7ED9\u4F60\u770B\u3002\n\n\u4F60\u89C1\u8FC7\u4E4B\u540E\uFF0C\u5C31\u4F1A\u660E\u767D\u4E00\u5207\u3002", ["typing"], [
      { label: "*\u63A5\u8FD9\u4E2A\u672A\u77E5\u53F7\u7801\u7684\u6765\u7535", effect: ["call:number"], go: "c3_call_accepted" },
      { label: "*\u4E0D\u63A5\uFF0C\u6302\u65AD", go: "c3s13", flags: { refusedCall: true } }
    ]),
    N3("c3_call_accepted", "number", "\u2026\u2026\u4F60\u7EC8\u4E8E\u63A5\u4E86\u3002", ["typing"], void 0, "c3s13"),
    N3("c3_call_declined", "number", "\u4F60\u4E0D\u63A5\u7535\u8BDD\u3002\n\n\u4F60\u4EE5\u4E3A\u8EB2\u5F00\u58F0\u97F3\uFF0C\u5C31\u80FD\u8EB2\u5F00\u771F\u76F8\u5417\u3002", ["typing"], void 0, "c3s13"),
    N3("c3s13", "number", "\u660E\u5929\u665A\u4E0A\uFF0C\u8FD8\u662F\u8FD9\u4E2A\u65F6\u95F4\u3002\n\n\u6211\u4F1A\u7ED9\u4F60\u770B\u90A3\u665A\u7684\u7167\u7247\u3002\n\n\u7761\u5427\u3002\u4F60\u9700\u8981\u7684\u3002", ["typing"], void 0, "c3s14"),
    N3("c3s14", "narration", "\u4F60\u628A\u624B\u673A\u653E\u4E0B\uFF0C\u53C8\u62FF\u8D77\u6765\u3002\n\n\u5C4F\u5E55\u7684\u5149\uFF0C\u7167\u7740\u4F60\u4E00\u4E2A\u4EBA\u3002\n\n\u4F60\u5FFD\u7136\u53D1\u73B0\uFF0C\u4F60\u4E0D\u8BB0\u5F97\u81EA\u5DF1\u662F\u4EC0\u4E48\u65F6\u5019\u7761\u7740\u7684\u3002", ["time:180"], [{ label: "*\u5929\u4EAE\u4E4B\u524D\uFF0C\u5FC5\u987B\u5F04\u660E\u767D", go: "c4s1" }])
  ]
};

// src/story/ch4.ts
var N4 = (id, speaker, text, effects, choices, next, end) => ({ id, speaker, text, effects, choices, next, end });
var ch4 = {
  id: 4,
  title: "\u771F\u76F8",
  nodes: [
    N4("c4s1", "narration", "\u767D\u5929\uFF0C\u4F60\u7FFB\u4E86\u4E00\u6574\u5929\u7684\u76F8\u518C\u3002\n\n\u624B\u673A\u91CC\u7684\u672A\u8BFB\uFF0C\u4ECE 99 \u53D8\u6210 0\u3002\u53EF\u4F60\u8D8A\u770B\uFF0C\u8D8A\u89C9\u5F97\u54EA\u91CC\u4E0D\u5BF9\u3002\n\n\u591C\u665A\u6765\u5F97\u5F88\u6162\u3002", ["chapter:4", "card:4", "photo:p_crash"], void 0, "c4s2"),
    N4("c4s2", "number", "\u4ECA\u665A\uFF0C\u6211\u4E0D\u7ED5\u5F2F\u5B50\u4E86\u3002", ["typing", "time:0"], void 0, "c4s3"),
    N4("c4s3", "number", "\u4F60\u8BF4 11 \u6708 6 \u53F7\u90A3\u665A\uFF0C\u4F60\u5728\u5F00\u8F66\uFF0C\u6CA1\u56DE\u77ED\u4FE1\u3002\n\n\u90A3\u6211\u95EE\u4F60\u2014\u2014", ["typing"], void 0, "c4s4"),
    N4("c4s4", "number", "\u90A3\u6761\u77ED\u4FE1\uFF0C\u662F\u8C01\u53D1\u7ED9\u4F60\u7684\uFF1F", ["typing", "sting"], void 0, "c4s4w"),
    N4("c4s4w", "narration", "\u4F60\u63E1\u7740\u624B\u673A\uFF0C\u6307\u5C16\u53D1\u51C9\u3002", [], [
      { label: "\u662F\u2026\u2026\u6797\u665A\u53D1\u7684\u3002\u5979\u95EE\u6211\u5230\u5BB6\u6CA1\u6709\u3002", go: "c4s5", flags: { truthReply: true } },
      { label: "\u6211\u4E0D\u8BB0\u5F97\u6709\u77ED\u4FE1\u3002", go: "c4s5", flags: { denyAgain: true } }
    ]),
    N4("c4s5", "number", '\u5979\u95EE\u4F60\u5230\u5BB6\u6CA1\u6709\u3002\n\n\u7136\u540E\u5462\uFF1F\u4F60\u56DE\u4E86\u3002\n\n"\u9A6C\u4E0A\u5230\uFF0C\u7B49\u6211\u3002"', ["typing", "sting"], void 0, "c4s6"),
    N4("c4s6", "number", "\u4F60\u4E00\u8FB9\u5F00\u8F66\uFF0C\u4E00\u8FB9\u56DE\u5979\u7684\u77ED\u4FE1\u3002\n\n\u96E8\u5F88\u5927\u3002\u4F60\u770B\u89C1\u524D\u9762\u7684\u5239\u8F66\u706F\u65F6\uFF0C\u5DF2\u7ECF\u6765\u4E0D\u53CA\u4E86\u3002", ["typing", "stinglong", "heart:on"], void 0, "c4s7"),
    N4("c4s7", "number", "\u4F60\u4E00\u76F4\u4EE5\u4E3A\uFF0C\u662F\u90A3\u573A\u96E8\u3002\n\n\u5176\u5B9E\u4E0D\u662F\u3002\n\n\u662F\u4F60\u81EA\u5DF1\u7684\u624B\u3002", ["typing"], void 0, "c4s8"),
    N4("c4s8", "number", "\u4F60\u60F3\u8D77\u6765\u4E86\u5417\uFF1F", ["typing"], [
      { label: "*\u4E00\u76F4\u6447\u5934\uFF0C\u4E0D\u613F\u63A5\u53D7", go: "c4s8a" },
      { label: "*\u773C\u6CEA\u6389\u5728\u5C4F\u5E55\u4E0A", go: "c4s8b", flags: { tears: true } }
    ]),
    N4("c4s8a", "number", '\u4F60\u628A\u8F66\u5F00\u51FA\u62A4\u680F\u7684\u65F6\u5019\uFF0C\u624B\u673A\u5C4F\u5E55\u4E0A\u8FD8\u4EAE\u7740\u4E24\u4E2A\u5B57\u2014\u2014\n\n"\u7B49\u6211"\u3002\n\n\u90A3\u662F\u4F60\u53D1\u7684\u3002', ["typing", "stinglong"], void 0, "c4s9"),
    N4("c4s8b", "number", '\u4F60\u628A\u8F66\u5F00\u51FA\u62A4\u680F\u7684\u65F6\u5019\uFF0C\u624B\u673A\u5C4F\u5E55\u4E0A\u8FD8\u4EAE\u7740\u4E24\u4E2A\u5B57\u2014\u2014\n\n"\u7B49\u6211"\u3002\n\n\u90A3\u662F\u4F60\u53D1\u7684\u3002', ["typing", "stinglong"], void 0, "c4s9"),
    N4("c4s9", "number", "\u4F60\u4E0D\u662F\u53D7\u5BB3\u8005\u3002\n\n\u4F60\u662F\u90A3\u4E2A\uFF0C\u5728\u96E8\u91CC\u62FF\u8D77\u624B\u673A\u7684\u4EBA\u3002", ["typing"], void 0, "c4s10"),
    N4("c4s10", "number", "\u5979\u90A3\u5929\u4E0B\u5348\u95EE\u4F60\uFF1A\u51E0\u70B9\u5230\u5BB6\u3002\u4F60\u8BF4\uFF1A\u4E5D\u70B9\u3002\n\n\u90A3\u5929\u665A\u4E0A\uFF0C\u4F60\u8FDF\u4E86\u4E09\u4E2A\u5C0F\u65F6\u3002\n\n\u5979\u7B49\u4F60\u7684\u90A3\u4E09\u4E2A\u5C0F\u65F6\u91CC\uFF0C\u6253\u4E86\u56DB\u901A\u7535\u8BDD\u3002\u4F60\u90FD\u6CA1\u63A5\u3002", ["typing", "sting"], void 0, "c4s11"),
    N4("c4s11", "number", "\u73B0\u5728\uFF0C\u4F60\u77E5\u9053\u6211\u662F\u8C01\u4E86\u3002\n\n\u6211\u662F\u90A3\u4E2A\u66FF\u4F60\u8BB0\u7740\u8FD9\u4E00\u5207\u7684\u4EBA\u3002\n\n\u6211\u662F\u4F60\u3002\u738B\u658C\u3002\n\n\u662F\u4F60\u5FD8\u6389\u7684\u90A3\u4E2A\u81EA\u5DF1\u3002", ["typing", "stinglong"], void 0, "c4s12"),
    N4("c4s12", "number", "\u8FD9\u4E00\u5E74\u6765\uFF0C\u6BCF\u5929 00:00 \u7684\u77ED\u4FE1\uFF0C\u4E0D\u662F\u522B\u4EBA\u3002\n\n\u662F\u4F60\u81EA\u5DF1\uFF0C\u5728\u63D0\u9192\u4F60\u81EA\u5DF1\u3002", ["typing", "heart:off"], [
      { label: "\u2026\u2026\u4F60\u771F\u662F\u6211\u81EA\u5DF1\uFF1F", go: "c4s13", flags: { believe: true } },
      { label: "*\u4E0D\u4FE1\u3002\u62C9\u9ED1\u8FD9\u4E2A\u53F7\u7801", go: "c4s14", flags: { blockAgain: true } }
    ]),
    N4("c4s13", "number", "\u4F60\u4E0D\u4FE1\uFF1F\n\n\u90A3\u4F60\u53BB\u6253\u5F00\u8349\u7A3F\u7BB1\u3002\u5BC6\u7801\u662F\u4F60\u6C38\u8FDC\u5FD8\u4E0D\u6389\u7684\u90A3\u4E00\u5929\u3002\n\n\u300C\u6211\u4EEC\u300D\u4E4B\u540E\u7684\u90A3\u4E00\u5929\u3002", ["typing", "drafts"], void 0, "c4s13d"),
    // 草稿箱决策点：去解锁，或已解锁继续
    N4("c4s13d", "narration", "\u8349\u7A3F\u7BB1\u9700\u8981 4 \u4F4D\u6570\u5B57\u5BC6\u7801\u3002", [], [
      { label: "*\u53BB\u89E3\u9501\u8349\u7A3F\u7BB1", effect: ["screen:drafts"], go: "c4s13d" },
      { label: "\u6211\u6253\u5F00\u4E86\uFF0C\u90FD\u770B\u5B8C\u4E86\u3002", cond: "flag:draftsUnlocked", go: "c4s15", flags: { sawDrafts: true } },
      { label: "*\u5148\u8BB0\u4E0B\u8FD9\u4E2A\u8C1C\u9898\uFF0C\u60F3\u60F3\u518D\u56DE\u6765", go: "c4s13d" }
    ]),
    N4("c4s14", "number", '\u4F60\u62C9\u9ED1\u4E86\u6211\u3002\n\n\u624B\u673A\u5B89\u9759\u4E86\u4E09\u79D2\u3002\n\n\u7136\u540E\uFF0C\u4E00\u6761\u65B0\u77ED\u4FE1\uFF0C\u6765\u81EA\u4E00\u4E2A\u65B0\u7684\u672A\u77E5\u53F7\u7801\uFF1A\n\n"\u522B\u8FD9\u6837\u3002\u4F60\u9003\u4E0D\u6389\u7684\u3002"', ["typing", "sting"], [
      { label: "*\u6211\u8BE5\u62FF\u4F60\u600E\u4E48\u529E", go: "c4s14b" }
    ]),
    N4("c4s14b", "number", "\u53BB\u6253\u5F00\u8349\u7A3F\u7BB1\u3002\u5BC6\u7801\u662F 11 \u6708 6 \u65E5\u3002\n\n\u90A3\u662F\u4F60\u552F\u4E00\u9003\u4E0D\u6389\u7684\u65E5\u5B50\u3002", ["typing"], [
      { label: "*\u56DE\u5230\u8349\u7A3F\u7BB1\uFF0C\u89E3\u9501\u5B83", effect: ["screen:drafts"], go: "c4s13d" }
    ]),
    N4("c4s15", "number", "\u770B\u5B8C\u4E86\uFF1F\n\n\u90A3\u4E9B\u5B9A\u65F6\u77ED\u4FE1\u2014\u2014\u662F\u4F60\uFF0C\u4E00\u5E74\u524D\u81EA\u5DF1\u8BBE\u4E0B\u7684\u3002\n\n\u6BCF\u5929 00:00\uFF0C\u53D1\u7ED9\u4E00\u4E2A\u6C38\u8FDC\u4E0D\u4F1A\u518D\u56DE\u4F60\u7684\u4EBA\u3002", ["typing", "sting"], void 0, "c4s16"),
    N4("c4s16", "number", "\u4F60\u8BBE\u4E0B\u5B83\u4EEC\uFF0C\u662F\u56E0\u4E3A\u4F60\u6015\u81EA\u5DF1\u5FD8\u4E86\u3002\n\n\u6015\u6709\u4E00\u5929\uFF0C\u4F60\u771F\u7684\u4F1A\u4EE5\u4E3A\uFF0C\u90A3\u53EA\u662F\u4E00\u573A\u96E8\u3002", ["typing"], void 0, "c4s17"),
    N4("c4s17", "number", "\u4F60\u4E00\u76F4\u9A97\u81EA\u5DF1\uFF1A\u6211\u662F\u53D7\u5BB3\u8005\uFF0C\u662F\u90A3\u573A\u96E8\u3002\n\n\u53EF\u4F60\u9A97\u4E0D\u4E86\u90A3\u4E2A\u66FF\u4F60\u8BB0\u5F97\u7684\u4F60\u81EA\u5DF1\u3002", ["typing", "sting"], void 0, "c4s18"),
    N4("c4s18", "number", "\u4ECA\u665A\u5C31\u5230\u8FD9\u3002\n\n\u660E\u5929\uFF0C\u662F\u6700\u540E\u4E00\u591C\u3002\n\n\u5230\u65F6\u5019\uFF0C\u4F60\u8981\u505A\u4E00\u4E2A\u9009\u62E9\u3002\n\n\u4E00\u4E2A\u53EA\u6709\u4F60\u80FD\u66FF\u81EA\u5DF1\u505A\u7684\u9009\u62E9\u3002", ["typing"], void 0, "c4s19"),
    N4("c4s19", "narration", "\u4F60\u628A\u624B\u673A\u653E\u5728\u80F8\u53E3\uFF0C\u7761\u4E86\u8FC7\u53BB\u3002\n\n\u8FD9\u4E00\u6B21\uFF0C\u4F60\u6CA1\u6709\u68A6\u5230\u5979\u3002\n\n\u4F60\u68A6\u5230\u4E86\u4E00\u6761\u77ED\u4FE1\uFF0C\u4E00\u4E2A\u4ECE\u672A\u53D1\u51FA\u7684\u5B57\uFF1A\n\n\u300C\u6094\u3002\u300D", ["time:240"], [{ label: "*\u9192\u6765\u3002\u6700\u540E\u4E00\u591C\u3002", go: "c5s1" }])
  ]
};

// src/story/ch5.ts
var N5 = (id, speaker, text, effects, choices, next, end) => ({ id, speaker, text, effects, choices, next, end });
var ch5 = {
  id: 5,
  title: "\u6700\u540E\u4E00\u591C",
  nodes: [
    N5("c5s1", "narration", "\u7A97\u5916\u4E0B\u7740\u96E8\uFF0C\u50CF\u90A3\u665A\u4E00\u6837\u3002\n\n\u4F60\u5750\u5728\u5E8A\u8FB9\uFF0C\u6CA1\u6709\u5F00\u706F\u3002\u624B\u673A\u63E1\u5728\u624B\u91CC\uFF0C\u5C4F\u5E55\u6697\u7740\u3002\n\n\u4F60\u7B49\u5B83\u3002\n\n00:00\u3002", ["chapter:5", "card:5", "time:0"], void 0, "c5s2"),
    N5("c5s2", "number", "\u6700\u540E\u4E00\u591C\u4E86\u3002\u738B\u658C\u3002", ["typing", "sfx:msg_num"], void 0, "c5s3"),
    N5("c5s3", "number", "\u4E00\u5E74\u4E86\u3002\u6BCF\u5929 00:00\uFF0C\u6211\u90FD\u5728\u8FD9\u91CC\u7B49\u4F60\u3002\n\n\u73B0\u5728\u4F60\u90FD\u60F3\u8D77\u6765\u4E86\u3002\n\n\u6240\u4EE5\u2014\u2014\u8F6E\u5230\u4F60\u56DE\u7B54\u4E86\u3002", ["typing"], void 0, "c5s4"),
    N5("c5s4", "number", "\u6211\u7ED9\u4F60\u4E09\u4E2A\u9009\u62E9\u3002\n\n\u4E0D\uFF0C\u6211\u7ED9\u4F60\u4E94\u4E2A\u3002\n\n\u8BB0\u4F4F\uFF1A\u6CA1\u6709\u6B63\u786E\u7684\u7B54\u6848\u3002\u53EA\u6709\u4F60\u60F3\u6210\u4E3A\u4EC0\u4E48\u6837\u7684\u4EBA\u3002", ["typing", "sting"], void 0, "c5s5"),
    // 五个结局的选择
    N5("c5s5", "narration", "\u96E8\u58F0\u5F88\u5927\u3002\u4F60\u770B\u7740\u5C4F\u5E55\uFF0C\u5F88\u4E45\u3002", [], [
      { label: "\u6211\u60F3\u8D77\u6765\uFF0C\u4E5F\u613F\u610F\u627F\u62C5\u3002\u660E\u5929\uFF0C\u6211\u53BB\u81EA\u9996\u3002", go: "c5end_confess", flags: { chooseConfess: true } },
      { label: "\u6211\u60F3\u6D3B\u4E0B\u53BB\u3002\u6211\u53BB\u627E\u9648\u533B\u751F\uFF0C\u628A\u4E00\u5207\u90FD\u544A\u8BC9\u4ED6\u3002", go: "c5end_therapy", flags: { chooseTherapy: true } },
      { label: "\u6211\u53D7\u591F\u4E86\u3002\u6211\u5220\u6389\u6240\u6709\uFF0C\u91CD\u65B0\u5F00\u59CB\u3002", go: "c5end_loop", flags: { chooseLoop: true } },
      { label: "\u6211\u4E0D\u5220\u4ED6\u3002\u6211\u63A5\u53D7\u4ED6\u3002\u6211\u539F\u8C05\u6211\u81EA\u5DF1\u3002", cond: "flag:tears", go: "c5end_merge", flags: { chooseMerge: true } },
      { label: "*\u4E0D\u56DE\u590D\u3002\u8BA9\u8FD9\u4E2A\u53F7\u7801\u6C38\u8FDC\u7B49\u4E0B\u53BB\u3002", go: "c5end_silence", flags: { chooseSilence: true } }
    ]),
    // 各结局收束节点
    N5("c5end_confess", "narration", "\u4F60\u6253\u51FA\u4E86\u90A3\u4E09\u4E2A\u5B57\uFF0C\u6309\u4E0B\u53D1\u9001\uFF1A\n\n\u300C\u6211\u53BB\u81EA\u9996\u3002\u300D\n\n\u53F7\u7801\u6CA1\u6709\u518D\u56DE\u3002", ["sfx:send", "time:5"], [], void 0, "ending:confess"),
    N5("c5end_therapy", "narration", "\u4F60\u627E\u5230\u4E86\u9648\u533B\u751F\u7684\u540D\u7247\uFF0C\u62E8\u4E86\u8FC7\u53BB\u3002\n\n\u7535\u8BDD\u54CD\u4E86\u4E09\u58F0\uFF0C\u63A5\u901A\u4E86\u3002\n\n\u4F60\u8BF4\uFF1A\u533B\u751F\uFF0C\u6211\u60F3\u804A\u804A\u3002", ["sfx:ring", "time:5"], [], void 0, "ending:therapy"),
    N5("c5end_loop", "narration", "\u4F60\u5220\u9664\u4E86\u6240\u6709\u804A\u5929\u8BB0\u5F55\uFF0C\u62C9\u9ED1\u53F7\u7801\uFF0C\u6E05\u7A7A\u4E86\u8349\u7A3F\u7BB1\u3002\n\n\u624B\u673A\u6062\u590D\u51FA\u5382\u8BBE\u7F6E\u7684\u90A3\u4E00\u523B\uFF0C\u4F60\u957F\u957F\u5730\u8212\u4E86\u4E00\u53E3\u6C14\u3002", ["sfx:send", "time:5", "sting"], [], void 0, "ending:loop"),
    N5("c5end_merge", "narration", "\u4F60\u4FDD\u5B58\u4E86\u6240\u6709\u8BB0\u5F55\uFF0C\u4E00\u6761\u4E5F\u6CA1\u6709\u5220\u3002\n\n\u4F60\u5173\u6389\u624B\u673A\uFF0C\u6CA1\u6709\u7B49\u5B83\u3002\n\n\u4F60\u77E5\u9053\uFF0C\u5B83\u2014\u2014\u4E0D\uFF0C\u4F60\u2014\u2014\u660E\u5929\u8FD8\u4F1A\u6765\u3002\u800C\u4F60\u4E0D\u518D\u5BB3\u6015\u4E86\u3002", ["sfx:send", "time:5"], [], void 0, "ending:merge"),
    N5("c5end_silence", "narration", "\u4F60\u6CA1\u6709\u56DE\u3002\n\n\u5C4F\u5E55\u6697\u4E0B\u53BB\uFF0C\u53C8\u56E0\u4E3A\u65B0\u6D88\u606F\u4EAE\u8D77\u6765\u3002\u4F60\u6CA1\u6709\u770B\u3002\n\n\u5929\u4EAE\u4E86\u3002\u4F60\u4E5F\u6CA1\u6709\u770B\u3002", ["time:420", "sting"], [], void 0, "ending:silence")
  ]
};

// src/story/index.ts
function registerStory() {
  registerChapter(ch1);
  registerChapter(ch2);
  registerChapter(ch3);
  registerChapter(ch4);
  registerChapter(ch5);
}

// src/engine/state.ts
var META_KEY = "wywlx_meta_v1";
function freshRun() {
  return {
    flags: {},
    currentNode: "c1s1",
    chapter: 1,
    readCount: 0,
    time: 0,
    notes: ["n_onboarding", "n_dinner", "n_secret", "n_zhou"],
    photos: ["p_home", "p_lin_cake", "p_lin_window", "p_nightout", "p_room"],
    contacts: ["c_unknown", "c_lin", "c_zhou", "c_mom"],
    calls: [],
    draftsUnlocked: false,
    roomViewed: 0
  };
}
var run = freshRun();
var meta = loadMeta();
function loadMeta() {
  try {
    const raw = localStorage.getItem(META_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        endings: parsed.endings ?? [],
        newGamePlus: parsed.newGamePlus ?? false
      };
    }
  } catch {
  }
  return { endings: [], newGamePlus: false };
}

// scripts/validate.ts
registerStory();
var errors = validateGraph();
console.log(`[validate] \u8282\u70B9\u603B\u6570: ${getChapters().reduce((a, c) => a + c.nodes.length, 0)}`);
console.log(`[validate] \u7AE0\u8282\u6570: ${getChapters().length}`);
var start = getNode("c1s1");
if (!start) errors.push("\u8D77\u59CB\u8282\u70B9 c1s1 \u4E0D\u5B58\u5728");
for (const ch of getChapters()) {
  for (const node of ch.nodes) {
    if (node.choices?.length) {
      const hasUncond = node.choices.some((c) => !c.cond);
      const hasScreenOrCall = node.choices.some((c) => c.effect?.some((e) => e.startsWith("call:") || e.startsWith("screen:")));
      if (!hasUncond && !hasScreenOrCall) {
        errors.push(`\u8282\u70B9\u300C${node.id}\u300D\u7684\u6240\u6709\u9009\u9879\u90FD\u6709\u6761\u4EF6\u6216\u90FD\u4F1A\u88AB\u5207\u5C4F\u6D88\u8D39\uFF0C\u53EF\u80FD\u6B7B\u80E1\u540C`);
      }
    }
  }
}
for (const ch of getChapters()) {
  for (const node of ch.nodes) {
    if (!node.choices?.length && !node.next && !node.end) {
      errors.push(`\u8282\u70B9\u300C${node.id}\u300D\u662F\u6B7B\u8DEF\uFF1A\u65E0\u9009\u9879/\u65E0next/\u65E0end`);
    }
  }
}
for (const ch of getChapters()) {
  for (const node of ch.nodes) {
    if (node.speaker === "number" && node.text) {
      const noTyping = !node.effects?.includes("typing");
      const isQuick = node.text.length < 8;
      if (noTyping && !isQuick) {
        errors.push(`\u53F7\u7801\u8282\u70B9\u300C${node.id}\u300D\u8F83\u957F\u4F46\u7F3A\u5C11 typing \u6548\u679C`);
      }
    }
  }
}
if (errors.length) {
  console.error("[validate] \u53D1\u73B0\u95EE\u9898\uFF1A");
  for (const e of errors) console.error("  \u2717 " + e);
  process.exit(1);
}
console.log("[validate] \u5267\u60C5\u56FE\u6821\u9A8C\u901A\u8FC7 \u2713");
