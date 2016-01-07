module.exports = {
  gocd_url: "http://go:C0mplexPwd@172.18.34.3:8153",
  interests: [
    "PerformanceAnalytics-Build-Master",
    "PerformanceAnalytics-Smoke",
    "PerformanceAnalytics-QA",
    "StoryboardService-Build-Master",
    "StoryboardService-Smoke",
    "StoryboardService-QA",
    "StoryboardWeb-Build-Master",
    "StoryboardWeb-Smoke",
    "StoryboardWeb-QA",
    "DBMigration-Build",
    "LandingPageSeed-Build",
    "AuthProxy",
  ],
  stage_detail_interests: [
    {
      pipeline: "PerformanceAnalytics-QA",
      stages: ["FunctionalUiTests"]
    }
  ],
  interval: 30000,
  port: 3100
};