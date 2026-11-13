import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import { isIP } from "node:net";

const source = "https://openai.com/chatgpt-voice.json";
const target = new URL("../rule/chatgpt.list", import.meta.url);
const response = await fetch(source, { signal: AbortSignal.timeout(30000) });
assert(response.ok, `Voice list download failed: HTTP ${response.status}`);
const data = await response.json();
assert(Array.isArray(data.prefixes) && data.prefixes.length > 0, "Empty voice list");
assert(Number.isFinite(Date.parse(data.creationTime)), "Invalid source timestamp");

const rules = new Set();
for (const entry of data.prefixes) {
  const fields = Object.keys(entry);
  assert(fields.length === 1, `Unexpected prefix entry: ${JSON.stringify(entry)}`);
  const key = fields[0];
  const family = key === "ipv4Prefix" ? 4 : key === "ipv6Prefix" ? 6 : 0;
  assert(family, `Unknown prefix type: ${key}`);
  const prefix = entry[key];
  assert(typeof prefix === "string", "Invalid prefix");
  const [address, bits, extra] = prefix.split("/");
  assert(!extra && isIP(address) === family && /^\d+$/.test(bits ?? ""), `Invalid prefix: ${prefix}`);
  assert(Number(bits) <= (family === 4 ? 32 : 128), `Invalid mask: ${prefix}`);
  rules.add(`${family === 4 ? "IP-CIDR" : "IP-CIDR6"},${prefix},no-resolve`);
}

let text = await readFile(target, "utf8");
const section = /# 语音 IP 开始\n[\s\S]*?# 语音 IP 结束/;
assert(section.test(text), "Missing voice section markers");
text = text.replace(section, [
  "# 语音 IP 开始",
  `# 来源: ${source}`,
  `# 源清单生成时间: ${data.creationTime}`,
  "# 官方语音中继 IP 快照；更新命令：node scripts/update-chatgpt-voice.mjs",
  ...[...rules].sort(),
  "# 语音 IP 结束",
].join("\n"));
const active = text.split("\n").filter(line => line && !line.startsWith("#"));
assert(new Set(active).size === active.length, "Duplicate rules");
for (const [kind, label] of Object.entries({
  DOMAIN: "精确域名",
  "DOMAIN-SUFFIX": "域名后缀",
  "DOMAIN-WILDCARD": "域名通配",
  "DOMAIN-KEYWORD": "域名关键词",
  AND: "逻辑规则",
  "IP-CIDR": "IPv4 规则",
  "IP-CIDR6": "IPv6 规则",
  "IP-ASN": "ASN 规则",
})) {
  const count = active.filter(line => line.startsWith(`${kind},`)).length;
  text = text.replace(new RegExp(`^# ${label}: \\d+$`, "m"), `# ${label}: ${count}`);
}
text = text.replace(/^# 规则总数: \d+$/m, `# 规则总数: ${active.length}`);
const date = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Shanghai" }).format(new Date());
text = text.replace(/^# 更新日期: .*$/m, `# 更新日期: ${date}`);
await writeFile(target, text);
console.log(`Updated ${rules.size} official voice IP rules; ${active.length} rules total.`);
