# Codex × Cursor Skill 兼容清单

目标：同一份 Skill 尽量被不同 Agent 实现稳定识别。

## 1) Frontmatter 最小化

优先仅使用：
- `name`
- `description`

理由：不同实现对扩展字段容忍度不一致；最小集合兼容性最高。

## 2) 命名规范

- 目录名与 `name` 完全一致
- 仅小写字母、数字、连字符
- 语义清晰，避免过长

## 3) 描述写法（决定触发率）

`description` 同时写明：
- 能力：这个 Skill 能做什么
- 触发词：用户提到哪些场景时应启用

## 4) 结构与引用

- 主 `SKILL.md` 简洁（流程、模板、清单）
- 细节放到 `references/`，并在主文档明确引用路径
- 脚本用相对路径（如 `scripts/deploy.sh`）

## 5) 运行假设声明

在正文中明确：
- 需要的工具/命令
- 是否要求联网
- 哪些步骤必须人工确认

## 6) 分发与安装建议

项目级安装（推荐团队共享）：
- 复制到仓库：`.codex/skills/<skill-name>/` 或 `.cursor/skills/<skill-name>/`

用户级安装（推荐个人复用）：
- 复制到：`~/.codex/skills/<skill-name>/` 或 `~/.cursor/skills/<skill-name>/`

## 7) 验收

最少验证三件事：
1. Agent 能发现技能
2. 自动触发或 `/skill-name` 显式触发正常
3. Skill 中引用的脚本/参考文件路径可访问
