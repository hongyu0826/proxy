const main = (config) => {
  // 过滤 无用节点
  const filterKeywords = ["剩余流量", "距离下次重置", "套餐到期", "1元100G"];
  if (Array.isArray(config.proxies)) {
    config.proxies = config.proxies.filter(proxy => {
      const name = proxy.name ?? "";
      return !filterKeywords.some(kw => name.includes(kw));
    });
  }
  
  // 代理组
  config['proxy-groups'] = [
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
      filter: "^((?!(DIRECT)).)*$"
    },
    {
      name: "🌐 手动选择",
      type: "select",
      "include-all": true,
      filter: "^((?!(DIRECT)).)*$"
    },
    {
      name: "🐟 漏网之鱼",
      type: "select",
      proxies: [ "🚀 默认代理","DIRECT"]
    }
  ];

  // 规则列表
  config.rules = [
    "DOMAIN-KEYWORD,qiuhy,DIRECT",
    
    "RULE-SET,private_domain,DIRECT",
    "RULE-SET,apple_domain,DIRECT",
    "RULE-SET,microsoft_domain,DIRECT",
    "RULE-SET,cn_domain,DIRECT",
    "RULE-SET,cn_ip,DIRECT,no-resolve",
    "RULE-SET,github_domain,🚀 默认代理",
    "RULE-SET,youtube_domain,🚀 默认代理",
    "RULE-SET,telegram_domain,🚀 默认代理",
    "RULE-SET,telegram_ip,🚀 默认代理,no-resolve",
    "RULE-SET,ai,🚀 默认代理",
    "RULE-SET,google_domain,🚀 默认代理",
    "RULE-SET,google_ip,🚀 默认代理,no-resolve",
    "RULE-SET,gfw_domain,🚀 默认代理",
    "RULE-SET,geolocation-!cn,🚀 默认代理",
    "MATCH,🐟 漏网之鱼"
  ];

  // 规则集定义
  config['rule-providers'] = {
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
      url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/category-ai-!cn.mrs"
    },
    youtube_domain: {
      type: "http",
      interval: 86400,
      behavior: "domain",
      format: "mrs",
      url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/youtube.mrs"
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
