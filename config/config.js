//Configure me
module.exports = {
  gocd_url: "http://username:password@ip:port",
  interests: [
    "pipeline1",
    "pipeline2"
  ],
  stage_detail_interests: [
    {
      pipeline: "pipeline3",
      stages: ["stage31"]
    }
  ],
  interval: 30000,
  port: 3100
};
