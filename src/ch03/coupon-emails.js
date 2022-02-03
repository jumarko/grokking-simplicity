/*
 This is the example starting in chapter 3 on p. 39 - Applying function thinking to new code.
 It shows a company whose marketing department want to send couponts via emails
 to customers based on how many people they recommended.
 */

// Data, possibly fetched from the database
const subscriber = {
  email: "sam@pmail.com",
  rec_count: 16
};

// Ranks
const rank1 = "good";
const rank2 = "best";

// Calculation: Deciding a coupon rank
function subscriberCouponRank(subscriber) {
  if (subscriber.rec_count >= 10) {
    return "best";
  } else {
    return "good";
  }
}

const coupon = {
  code: "10PERCENT",
  rank: "bad"
};

function selectCouponsByRank(coupons, rank) {
  // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
  return coupons.filter(coupon => coupon.rank === rank);
}

selectCouponsByRank([coupon, {code: "goodone", rank: "good"}, {code: "BESTOFALL", rank: "best"}],
                   "best");
// =>
[ { code: 'BESTOFALL', rank: 'best' } ]


// email (p. 49) - it's just data:
const message = {
  from: "nesletter@coupondog.co",
  to: "sam@pmail.com",
  subject: "Your weekly coupons inside",
  body: "Here are your coupons"
};

// this is a _calculation_
function emailForSubscriber(subscriber, goods, bests) {
  const rank = subscriberCouponRank(subscriber);
  if (rank == "best") {
    return {
      from: "nesletter@coupondog.co",
      to: subscriber.email,
      subject: "Your best weekly coupons inside",
      body: "Here are the best coupons: " + bests.join(", ")
    };
  } else {
    return {
      from: "nesletter@coupondog.co",
      to: subscriber.email,
      subject: "Your good weekly coupons inside",
      body: "Here are the good coupons: " + goods.join(", ")
    };
  }
}

// here I'm intentionally skipping `emailsForSubscribers`
// because I think it brings little value - better to use higher-level functions ala `map`
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
[subscriber].map(emailForSubscriber);


// the final Calculation that ties it all together!
// ... and some stubs for other actions like fetching from the db;
function fetchCouponsFromDb() {
  return [coupon];
}
function fetchSubscribersFromDb() {
  return [subscriber];
}
const emailSystem = {
  send: function(email) {}
};
function sendIssue() {
  const coupons = fetchCouponsFromDb();
  const goodCoupons = selectCouponsByRank(coupons, "good");
  const bestCoupons = selectCouponsByRank(coupons, "best");
  const subscribers = fetchSubscribersFromDb();

  const emails = subscribers.map(emailForSubscriber);
  emails.forEach(emailSystem.send);
}
