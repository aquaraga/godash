window.config = {
  gocd_dashboard: "http://localhost:9966/db",
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
      stages: ["FunctionalTest"]
    }
  ],
  interval: 30000
};