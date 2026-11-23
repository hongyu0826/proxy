const main = (config) => {
  // 过滤 无用节点
  const filterKeywords = ["剩余流量", "距离下次重置", "套餐到期", "元100G"];
  if (Array.isArray(config.proxies)) {
    config.proxies = config.proxies.filter(proxy => {
      const name = proxy.name ?? "";
      return !filterKeywords.some(kw => name.includes(kw));
    });
  }

  // 代理组
  config['proxy-groups'] = [
    {
      name: "🛑 广告拦截",
      type: "select",
      proxies: ["REJECT", "DIRECT"]
    },
    {
      name: "🚀 默认代理",
      type: "select",
      proxies: ["♻️ 自动选择", "🌐 手动选择", "DIRECT"]
    },
    {
      name: "♻️ 自动选择",
      type: "url-test",
      "include-all": true,
      tolerance: 20,
      interval: 300,
      filter: "^((?!(DIRECT|REJECT)).)*$"
    },
    {
      name: "🌐 手动选择",
      type: "select",
      "include-all": true,
      filter: "^((?!(DIRECT|REJECT)).)*$"
    },
    {
      name: "🐟 漏网之鱼",
      type: "select",
      proxies: ["🚀 默认代理", "DIRECT"]
    }
  ];

  // 规则列表：顺序非常重要！先广告、内网、再分流
  config.rules = [
    // ========== 广告 & 追踪（优先拦截） ==========
    "RULE-SET,ads_all,🛑 广告拦截",

    // ========== 内网、私有域名 ==========
    "RULE-SET,private_domain,DIRECT",

    // ========== 自定义直连 ==========
    "DOMAIN-KEYWORD,qiuhy,DIRECT",

    // ========== GitHub 强化（关键词+后缀，解决访问不稳） ==========
    "DOMAIN-KEYWORD,github,🚀 默认代理",
    "DOMAIN-SUFFIX,github.com,🚀 默认代理",
    "DOMAIN-SUFFIX,githubusercontent.com,🚀 默认代理",
    "DOMAIN-SUFFIX,github.io,🚀 默认代理",
    "DOMAIN-SUFFIX,githubassets.com,🚀 默认代理",
    "DOMAIN-SUFFIX,ghcr.io,🚀 默认代理",
    "DOMAIN-SUFFIX,github.dev,🚀 默认代理",
    "RULE-SET,github_domain,🚀 默认代理",

    // ========== 国内服务 ==========
    "RULE-SET,apple_domain,DIRECT",
    "RULE-SET,microsoft_domain,DIRECT",
    "RULE-SET,cn_domain,DIRECT",
    "RULE-SET,cn_ip,DIRECT,no-resolve",

    // ========== 海外服务 ==========
    "RULE-SET,youtube_domain,🚀 默认代理",
    "RULE-SET,telegram_domain,🚀 默认代理",
    "RULE-SET,telegram_ip,🚀 默认代理,no-resolve",
    "RULE-SET,ai,🚀 默认代理",
    "RULE-SET,google_domain,🚀 默认代理",
    "RULE-SET,google_ip,🚀 默认代理,no-resolve",
    "RULE-SET,gfw_domain,🚀 默认代理",
    "RULE-SET,tiktok_domain,🚀 默认代理",
    "RULE-SET,netflix_domain,🚀 默认代理",
    "RULE-SET,steam_domain,🚀 默认代理",
    "RULE-SET,geolocation-!cn,🚀 默认代理",

    // ========== 兜底 ==========
    "MATCH,🐟 漏网之鱼"
  ];

  // 规则集定义
  config['rule-providers'] = {
    ads_all: {
      type: "http",
      interval: 86400,
      behavior: "domain",
      format: "mrs",
      url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/category-ads-all.mrs"
    },
    private_domain: {
      type: "http",
      interval: 86400,
      behavior: "domain",
      format: "mrs",
      url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/private.mrs"
    },
    ai: {
      type: "http",
      interval: 86400,
      behavior: "domain",
      format: "mrs",
      url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/category-ai-!cn.mrs"
    },
    youtube_domain: {
      type: "http",
      interval: 86400,
      behavior: "domain",
      format: "mrs",
      url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/youtube.mrs"
    },
    tiktok_domain: {
      type: "http",
      interval: 86400,
      behavior: "domain",
      format: "mrs",
      url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/tiktok.mrs"
    },
    netflix_domain: {
      type: "http",
      interval: 86400,
      behavior: "domain",
      format: "mrs",
      url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/netflix.mrs"
    },
    steam_domain: {
      type: "http",
      interval: 86400,
      behavior: "domain",
      format: "mrs",
      url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/steam.mrs"
    },
    google_domain: {
      type: "http",
      interval: 86400,
      behavior: "domain",
      format: "mrs",
      url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/google.mrs"
    },
    github_domain: {
      type: "http",
      interval: 86400,
      behavior: "domain",
      format: "mrs",
      url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/github.mrs"
    },
    telegram_domain: {
      type: "http",
      interval: 86400,
      behavior: "domain",
      format: "mrs",
      url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/telegram.mrs"
    },
    microsoft_domain: {
      type: "http",
      interval: 86400,
      behavior: "domain",
      format: "mrs",
      url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/microsoft.mrs"
    },
    apple_domain: {
      type: "http",
      interval: 86400,
      behavior: "domain",
      format: "mrs",
      url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/apple-cn.mrs"
    },
    gfw_domain: {
      type: "http",
      interval: 86400,
      behavior: "domain",
      format: "mrs",
      url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/gfw.mrs"
    },
    "geolocation-!cn": {
      type: "http",
      interval: 86400,
      behavior: "domain",
      format: "mrs",
      url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/geolocation-!cn.mrs"
    },
    cn_domain: {
      type: "http",
      interval: 86400,
      behavior: "domain",
      format: "mrs",
      url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/cn.mrs"
    },
    cn_ip: {
      type: "http",
      interval: 86400,
      behavior: "ipcidr",
      format: "mrs",
      url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geoip/cn.mrs"
    },
    google_ip: {
      type: "http",
      interval: 86400,
      behavior: "ipcidr",
      format: "mrs",
      url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geoip/google.mrs"
    },
    telegram_ip: {
      type: "http",
      interval: 86400,
      behavior: "ipcidr",
      format: "mrs",
      url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geoip/telegram.mrs"
    }
  };

  return config;
};
