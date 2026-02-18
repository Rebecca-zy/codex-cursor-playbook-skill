# MEMORY.md

## User workflow preferences

- 对话语言默认中文；与 Codex 子代理沟通必须英文。
- 当调用 `codex-cursor-playbook` skill 且产生新技巧/经验时：
  - 需要同步更新 skill；
  - push 到远程 GitHub 必须先获得用户明确许可；
  - 同步把经验写入本地 memory（如 `memory/YYYY-MM-DD.md`）。
- PR 输出规范：每次提 PR 都必须给出三部分：变更摘要、验证点、风险说明。
- 项目实现默认要求：每个项目都要考虑多端兼容与适配（mobile/tablet/desktop）。
- UI 文案规范：页面面向用户的描述默认使用中文。
