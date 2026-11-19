# ChatGPT / Codex / Claude / Devin / Grok 分流

`rule/chatgpt.list` 用于 Surge `RULE-SET`，规则不内置策略名。逗号后没有空格。
它从 `AI.list` 的原 OpenAI 段拆出登录、API、静态资源、上传文件、语音、
客服、统计与订阅依赖。`openai.com` 和 `chatgpt.com` 使用后缀规则，
因此无需逐个列出 `auth`、`api`、`ab`、`ws`、`cdn` 或 Codex 路径。
原 OpenAI 段的 Sora / OpenAI API 范围也予以保留。

按个人分流需要，`AI.list` 原 `Meta AI` 分段的 5 条规则也迁入此文件：
`imagine.meta.com`、`meta.ai`、`muse.ai`、`metaaivm.com`、`metaaiusercontent.com`。
它们使用同一个策略，不表示这些服务属于 OpenAI。
`AI.list` 中的 `meta.com` 后缀已排除 `imagine.meta.com`，避免交叉覆盖。

## Claude

原 `AI.list` 的 Anthropic Claude 段已迁入 `chatgpt.list`。
域名后缀涵盖网页和应用、邮件登录链接、OAuth、SSO、Claude API、Console、
Claude Code、Cowork、Artifacts、预览、Claude in Chrome 和 MCP 小组件。
同时包含 Anthropic 公布的 API / Console 入站 IPv4 和 IPv6 网段。

Google 和 Apple 登录端点、Claude Code 的安装更新和插件端点、可选遥测、
Artifacts 的字体和 JS 库也走这个策略。共享主机（例如
`accounts.google.com`、`github.com` 和 `raw.githubusercontent.com`）上的其他请求
同样会走 ChatGPT 策略。已移除其他列表里的精确重复项，并在通用域名规则中排除这些主机。
企业自定义身份提供商、MCP 服务和 API 网关的域名取决于实际配置。

`hcaptcha.com` 后缀涵盖验证码 API、资源和动态子域。其他应用使用 hCaptcha 时，
这些域名也会走同一个策略。使用 Surge Mac 时，可以在本机配置的 `[Rule]` 中，
紧接 `chatgpt.list` 的订阅规则添加 `PROCESS-NAME,/Applications/Claude.app/,ChatGPT`，
让 Claude Desktop 及其 Helper 的未知域名请求走同一个策略。把末尾的 `ChatGPT`
替换成该配置实际使用的策略组名。


- Claude Code 网络要求 https://code.claude.com/docs/en/network-config#network-access-requirements
- Claude Desktop 网络要求 https://code.claude.com/docs/en/desktop#network-access-requirements
- Claude 登录方式 https://support.claude.com/en/articles/13189465-log-in-to-your-claude-account
- Anthropic 官方入站地址 https://platform.claude.com/docs/en/api/ip-addresses

与 Net.Coffee 和 v2fly 对照后补充 Claude MCP 客户端兼容域名和两个具体 CDN 主机。
`claudemcpclient.com` 来源于社区清单，公开 DNS 查询暂未返回根域的 A 记录。
按用户提供的清单补充 Ghost、Fathom、Datadog 和 Sift 关键词，以及
`160.79.104.0/21`、`2607:6bc0::/32` 和 `AS399358` 兜底。
这些 IP 规则覆盖 Anthropic 公布的三个入站网段。Datadog 和 Sift 关键词也会
匹配其他应用的域名，两个广告规则集中的重叠条目已移除。

## Devin

按个人分流需要，Devin / Cognition 的全部域名也迁入 `chatgpt.list`，使用同一个策略：

- `devin.ai`：网页 `app.devin.ai`、API `api.devin.ai`、CLI `cli.devin.ai` / `static.devin.ai`、
  文档 `docs.devin.ai`、状态页 `status.devin.ai` 和 MCP 端点。
- `devinusercontent.com`：会话附件和文件。
- `devinapps.com`：Devin Apps 与 IDE。
- `devinenterprise.com`：企业版网页和 API。
- `watchdevinwork.com`：演示站。
- `cognition.ai`、`cognition.com`、`cognition-labs.com`：Cognition 官网与服务。
- `windsurf.com`、`codeium.com`、`codeiumdata.com`：Devin Desktop（Windsurf）登录、推理、插件市场和更新。
- `deepwiki.com`：DeepWiki。

域名来自 `app.devin.ai` 前端脚本、`docs.devin.ai` 文档和 CLI 安装脚本，核对日期 2026-11-18。
文档托管在 Mintlify 等共享平台的资源未加入，以免影响其他网站。

Devin Desktop 的官方网络清单还列出 Google 登录所用的 `googleapis.com`（含子域）、
`apis.google.com`，以及客服入口 `decagon.ai`。为免整个 Google API 走 ChatGPT 策略，
只加入 Devin Desktop 登录页（`windsurf.com` 的 Firebase Auth）实际请求的主机：
`identitytoolkit.googleapis.com`、`securetoken.googleapis.com`、
`content-firebaseappcheck.googleapis.com`、`exa2-fb170.firebaseapp.com` 和 `apis.google.com`。
Google 账号授权页 `accounts.google.com` 已在 Claude 段列出。`Google.list` 中对应的通用规则排除了这些主机。
企业自定义 SSO 和第三方集成的域名取决于实际配置。

- [Devin Desktop 官方网络清单](https://docs.devin.ai/desktop/devin-desktop-faq#what-is-the-full-list-of-hostnames-we-should-allow)

## Grok

从 `AI.list` 迁入 `x.ai` 和 `grok.com` 后缀，涵盖 Grok 网页、账号、开发者控制台、
API（含地区端点）、语音、Imagine 和 Grok Build。原 `api.x.ai` 精确条目已由 `x.ai` 覆盖。

Grok 官网的内容安全策略列出 `grokusercontent.com` 资源、`grok-sandbox.com` 沙盒
和 `groktpcontent.com` 嵌入资源。相关入口还包括 `grok.me`、`grokipedia.com`
以及 X Subscription 共用的账号主机 `accounts.spacex.ai`。

X 的帖子、视频和站内 Grok 页面使用 `Global.list` 中的 `x.com`、`twimg.com`
和 `t.co` 等域名规则。`grok.x.com` 也由 `x.com` 后缀覆盖。

Grok Bot 官网和 Grok 登录由现有后缀覆盖。桌面端还使用 Cursor 的 `cursor.sh` API、
`cursor-cdn.com` 静态资源、`cursorapi.com` 扩展市场、`cursorvm.com` 云电脑，以及
`cursor.com` 和 `downloads.cursor.com` 安装更新。`cursorvm.com` 的后缀规则也匹配
多级云电脑子域。其他 Cursor 应用访问这些共享主机时也会走 ChatGPT 策略。

- [Grok 官网](https://grok.com/)
- [xAI API 参考](https://docs.x.ai/developers/rest-api-reference/inference)
- [Grok Build 文档](https://docs.x.ai/build/overview)
- [Grok Bot 官方网络域名](https://docs.x.ai/grok-bot/proxies#allow-these-domain-patterns)
- [X Subscription 账号域名](https://docs.x.ai/x-subscription/sign-in-domains)

## 使用

```ini
[Proxy Group]
ChatGPT = select,你的代理节点或策略组

[Rule]
RULE-SET,https://raw.githubusercontent.com/zt001110/me/master/rule/chatgpt.list,ChatGPT,update-interval=86400
```

把这一行放在 AI、全球代理、微软、直连、去广告等规则之前。
仓库 `Surge.conf` 已加入独立的 `ChatGPT` 策略组，并把规则放到 `[Rule]` 第一条，
包括原来的 SSID 直连规则之前。需要固定出口时，请在这个组内选定同一个代理节点。
不使用 `DOMAIN-SET`，因为文件还包含 AND 逻辑规则与语音 IP 规则。

## OpenAI 核对来源

核对日期：2026-11-06。

- OpenAI 网络说明：
  https://help.openai.com/en/articles/9247338-network-recommendations-for-chatgpt-errors-on-web-and-apps
  复核后补充 `ct.sendgrid.net`、`humb.apple.com` 和 `rum.browser-intake-datadoghq.com`。
- OpenAI Prism 与 ChatGPT Sites 的域名另见官方说明。
  https://openai.com/index/introducing-prism/
  https://help.openai.com/en/articles/20001339-creating-and-using-chatgpt-sites
- OpenAI 官方 Codex 源码：
  https://github.com/openai/codex
  核对版本 `1031a7b`。登录使用 `auth.openai.com`，API 使用 `api.openai.com`，
  ChatGPT 登录模式使用 `chatgpt.com`；反馈上报包含 `o33249.ingest.us.sentry.io`。
  `openai.org` 也出现在官方端点校验中。
- OpenAI 官方语音 IP：
  https://openai.com/chatgpt-voice.json
  文件内保留源清单的生成时间。
- 社区 OpenAI 规则交叉核对：
  https://github.com/v2fly/domain-list-community/blob/master/data/openai
  https://github.com/blackmatrix7/ios_rule_script/blob/master/rule/Surge/OpenAI/OpenAI.list
  补充 Azure 文件存储、Statsig、Intercom CDN、Stripe、Arkose 等依赖。
  社区条目不是 OpenAI 官方归属证明，未照搬整段共享云 IP / ASN。

## 范围与维护

按兼容清单将 `ai.com` 从 `AI.list` 迁入本文件，并补充共享服务、域名关键词、
两个 IPv4 地址和 `AS20473`。`AS20473` 是 Vultr 的 ASN，其他 Vultr 目标 IP
也可能命中本策略。`openai` 关键词也会匹配名称中含有该字符串的第三方域名。
原 `open-ai-chat-omega.vercel.app` 历史条目仍由 `AI.list` 管理。

原有 `identrust.com`、`compute-pipe.com`、`edgecompute.app`、`every1dns.net`、
`sentry.io` 后缀保留在兼容段，本次没有确认它们全部属于当前必需依赖。
Auth0、WorkOS、Stripe、Intercom 等也属于共享服务，其他使用相同域名的软件
可能一并走 ChatGPT 策略。域名规则无法按发起请求的软件区分这些共享域名。

其他规则文件中与本文件重复的域名和子域名条目已移除，包括去广告文件中的
部分统计、登录和支付域名，以及媒体文件中的 `disney.my.sentry.io`。
这是保留原有共享后缀范围后的结果；这些共享域名现在由 ChatGPT 策略统一接管。
`Global.list` 和 `Microsoft.list` 中的 Cloudflare、Gravatar、Qualtrics、
Azure 和 Windows 宽泛后缀改为带排除条件的逻辑规则，
只排除本文件已覆盖的主机或子域名范围，保留其他主机的原分流。
这部分使用 Surge 的 `AND` / `NOT` 嵌套语法，其他客户端的转换兼容性未实测。

语音 IP 规则匹配官方清单的具体地址，并带 `no-resolve`。
没有添加整个 Azure / Cloudflare / DigitalOcean 网段或 ASN。
更新官方语音 IP 快照并重算文件统计：

```sh
node scripts/update-chatgpt-voice.mjs
```

这不是永久完整性保证。企业自定义登录、连接器、
自定义 MCP、Codex 下载依赖/访问仓库或用户自定义 API 网关涉及任意第三方站点，
不属于可穷举的 OpenAI 服务域名。这些站点按自身命中的规则分流。
未来新增域名、动态 IP、DNS / UDP 能力以及客户端绕过代理，都需要结合实际请求日志检查。
本次没有在用户的 Surge 客户端完成登录、对话、上传及语音实测。
