module.exports = {
  ci: {
    collect: {
      startServerCommand: "npm run dev -- --hostname 127.0.0.1 --port 3000",
      startServerReadyPattern: "Ready",
      url: ["http://127.0.0.1:3000/"],
      numberOfRuns: 1,
    },
    assert: {
      assertions: {
        "categories:performance": ["warn", { minScore: 0.8 }],
        "categories:accessibility": ["warn", { minScore: 0.9 }],
        "categories:best-practices": ["warn", { minScore: 0.9 }],
        "categories:seo": ["warn", { minScore: 0.9 }],
      },
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};
