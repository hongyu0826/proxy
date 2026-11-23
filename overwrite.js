const main = (config) => {
  // 过滤无用节点
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

  config.rules = [
    "RULE-SET,ads_all,🛑 广告拦截",
    "RULE-SET,private_domain,DIRECT",
    "DOMAIN-KEYWORD,qiuhy,DIRECT",

    // ========== 安卓GMS / Play / FCM 推送核心硬兜底 ==========
    "DOMAIN-SUFFIX,mtalk.google.com,🚀 默认代理",
    "DOMAIN-SUFFIX,alt1-mtalk.google.com,🚀 默认代理",
    "DOMAIN-SUFFIX,alt2-mtalk.google.com,🚀 默认代理",
    "DOMAIN-SUFFIX,alt3-mtalk.google.com,🚀 默认代理",
    "DOMAIN-SUFFIX,alt4-mtalk.google.com,🚀 默认代理",
    "DOMAIN-SUFFIX,alt5-mtalk.google.com,🚀 默认代理",
    "DOMAIN-SUFFIX,alt6-mtalk.google.com,🚀 默认代理",
    "DOMAIN-SUFFIX,alt7-mtalk.google.com,🚀 默认代理",
    "DOMAIN-SUFFIX,alt8-mtalk.google.com,🚀 默认代理",
    "DOMAIN-SUFFIX,googleapis.com,🚀 默认代理",
    "DOMAIN-SUFFIX,googleusercontent.com,🚀 默认代理",
    "DOMAIN-SUFFIX,gstatic.com,🚀 默认代理",
    "DOMAIN-SUFFIX,fcm.googleapis.com,🚀 默认代理",
    "DOMAIN-SUFFIX,fcm-xmpp.googleapis.com,🚀 默认代理",
    "DOMAIN-SUFFIX,iid.googleapis.com,🚀 默认代理",
    "DOMAIN-SUFFIX,firebaseinstallations.googleapis.com,🚀 默认代理",
    "DOMAIN-SUFFIX,android.apis.google.com,🚀 默认代理",
    "DOMAIN-SUFFIX,play.googleapis.com,🚀 默认代理",
    "DOMAIN-SUFFIX,safebrowsing.googleapis.com,🚀 默认代理",
    "DOMAIN-SUFFIX,play.google.com,🚀 默认代理",
    "DOMAIN-SUFFIX,android.clients.google.com,🚀 默认代理",
    "DOMAIN-SUFFIX,accounts.google.com,🚀 默认代理",
    "DOMAIN-SUFFIX,auth.google.com,🚀 默认代理",
    "DOMAIN-SUFFIX,dl.google.com,🚀 默认代理",
    "DOMAIN-SUFFIX,ggpht.com,🚀 默认代理",

    // ========== GitHub 兜底 ==========
    "DOMAIN-KEYWORD,github,🚀 默认代理",
    "DOMAIN-SUFFIX,github.com,🚀 默认代理",
    "DOMAIN-SUFFIX,githubusercontent.com,🚀 默认代理",
    "DOMAIN-SUFFIX,github.io,🚀 默认代理",
    "DOMAIN-SUFFIX,githubassets.com,🚀 默认代理",
    "DOMAIN-SUFFIX,ghcr.io,🚀 默认代理",
    "DOMAIN-SUFFIX,github.dev,🚀 默认代理",

    "RULE-SET,apple_domain,DIRECT",
    "RULE-SET,microsoft_domain,DIRECT",
    "RULE-SET,cn_domain,DIRECT",
    "RULE-SET,cn_ip,DIRECT,no-resolve",

    "RULE-SET,github_domain,🚀 默认代理",
    "RULE-SET,youtube_domain,🚀 默认代理",
    "RULE-SET,telegram_domain,🚀 默认代理",
    "RULE-SET,telegram_ip,🚀 默认代理,no-resolve",
    "RULE-SET,twitter_domain,🚀 默认代理",
    "RULE-SET,ai,🚀 默认代理",
    "RULE-SET,google_domain,🚀 默认代理",
    "RULE-SET,google_ip,🚀 默认代理,no-resolve",
    "RULE-SET,gfw_domain,🚀 默认代理",
    "RULE-SET,tiktok_domain,🚀 默认代理",
    "RULE-SET,steam_domain,🚀 默认代理",
    "RULE-SET,geolocation-!cn,🚀 默认代理",

    "MATCH,🐟 漏网之鱼"
  ];

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
    steam_domain: {
      type: "http",
      interval: 86400,
      behavior: "domain",
      format: "mrs",
      url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/steam.mrs"
    },
    twitter_domain: {
      type: "http",
      interval: 86400,
      behavior: "domain",
      format: "mrs",
      url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/twitter.mrs"
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

  config.dns = {
    enable: true,
    ipv6: false,
    enhanced-mode: "redir-host",
    default-nameserver: ["223.5.5.5", "119.29.29.29"],
    nameserver: [
      "https://223.5.5.5/dns-query",
      "https://doh.pub/dns-query"
    ],
    fallback: [
      "https://1.1.1.1/dns-query",
      "https://8.8.8.8/dns-query"
    ],
    fallback-filter: {
      geoip: true,
      geoip-code: "CN"
    }
  };

  return config;
};
