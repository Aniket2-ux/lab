const twilio = require("twilio");

const client = twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_TOKEN
);

module.exports.sendReportSMS = async (phone, code) => {
  await client.messages.create({
    body: `Your lab report is ready. Report Code: ${code}`,
    from: process.env.TWILIO_PHONE,
    to: phone,
  });
};
