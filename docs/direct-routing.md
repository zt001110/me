# 直连域名的集中维护

以下条目来自原有直连列表，集中到 `rule/chinese.list`。
这里沿用原有分流选择，不代表它们都是国内网站，也不代表这些服务必须直连。
核对日期：2026-11-06。

| 域名 | 用途及核对程度 |
| --- | --- |
| `cdn.angruo.com` | 原有资源域名，当前具体运营方及用途未确认。 |
| `cdp.cloud.unity3d.com` | Unity 后端接口，原游戏和去广告列表均有该条目；本次未确认具体功能。 |
| `download.jetbrains.com` | JetBrains 软件及安装配置下载。 |
| `images-cn.ssl-images-amazon.com` | 从域名判断为 Amazon 图片资源主机，未核实当前具体使用页面。 |
| `steamcommunity-a.akamaihd.net` | 从域名及原游戏规则分类判断为 Steam 社区静态资源，未验证当前实际使用情况。 |
| `api.crisp.chat` | Crisp 客服会话、联系人等数据的接口。 |
| `emby-icon.vercel.app` | 原媒体列表中的第三方图标资源条目；当前根路径返回 404，未确认服务是否迁移或停用。 |
| `apple-finance.query.yahoo.com` | 原 `zhilian.list` 的财经查询条目，本次仅迁移归档，未核实当前服务状态。 |

## 排除交叉匹配

`Global.list` 中仅 `cdn.angruo.com` 是同名条目，已删除。
其余域名由 Yahoo、JetBrains、Akamai、Unity、Vercel、Crisp、Amazon 图片域等
父域后缀覆盖，所以改为带 `AND` / `NOT` 的排除规则，
保留父域下其他主机的全球分流。

`Game.list` 中 Unity 和 Steam 的同名后缀也已迁出；
`chineseMedia.list` 的图标条目、`zhilian.list` 的财经条目迁入 `chinese.list`。
不需要在个人 Surge 配置中重复添加这些域名。
去广告列表中针对 Unity 数据收集的拦截条目保留；若启用这些拦截列表，
其是否拦截仍取决于拦截规则在个人配置中的位置。

## 资料

- Unity 官方分析文档：https://docs.unity.com/ugs/en-us/manual/analytics/manual/faq
- JetBrains 官方安装说明：https://www.jetbrains.com/help/idea/installation-guide.html
- Crisp 官方接口说明：https://docs.crisp.chat/references/rest-api/v1/

本次没有以用户所在网络实测直连质量。未确认的历史条目也没有擅自删除；
若以后决定调整直连或代理，只需在规则库内集中修改。
