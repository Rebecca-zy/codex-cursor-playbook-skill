# Cursor Agent Skills 官方文档要点（基于公开页面提炼）

来源：
- https://cursor.com/cn/docs/context/skills

## Skills 是什么

- Skills 是给 Agent 增加专门能力的开放标准。
- Skill 是可移植、可版本化、可执行的目录包。
- Agent 会自动发现技能，并在合适上下文自动调用；也可手动 `/技能名` 调用。

## 目录发现规则（重点）

项目级：
- `.cursor/skills/`
- `.claude/skills/`
- `.codex/skills/`

用户级：
- `~/.cursor/skills/`
- `~/.claude/skills/`
- `~/.codex/skills/`

每个技能目录至少包含：`SKILL.md`

## SKILL.md 结构

基础格式：
- YAML frontmatter
- Markdown 正文

必填字段：
- `name`：小写字母/数字/连字符，且应与目录名一致
- `description`：技能用途 + 使用场景（用于相关性判断）

可选字段（Cursor 支持）：
- `license`
- `compatibility`
- `metadata`
- `disable-model-invocation`

## 资源目录

可选：
- `scripts/`：可执行脚本
- `references/`：按需加载参考文档
- `assets/`：模板、图片、静态资源

## 迁移与治理

- Cursor 提供 `/migrate-to-skills` 可将部分规则/命令迁移为 Skills。
- `disable-model-invocation: true` 可把 Skill 变成仅显式触发的“斜杠命令风格”。
