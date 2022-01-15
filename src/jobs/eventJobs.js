const Event = require("../../models/Event");
var CronJob = require("cron").CronJob;
const { Op } = require("sequelize");

const scheduler = {};
//assignRider to pending task
scheduler.checkEventStatus = new CronJob("1 * * * * *", async function () {
  await Event.update(
    { status: "inactive" },
    {
      where: {
        endDate: {
          [Op.lte]: Date.now(),
        },
        status: "active",
      },
    }
  );
});

scheduler.init = () => {
  scheduler.checkEventStatus.start();
  // scheduler.checkRouteeBalance.start();
};

module.exports = scheduler;
