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


// TODO: email (p. 49)
