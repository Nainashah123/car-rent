/**
 * Blog posts (Figma "Blog" 233:49208 + "Detail blog" 232:27331).
 * The featured post and the first six grid posts carry the exact Figma copy;
 * the rest are realistic fillers so pagination has pages 2–4.
 */

export type BlogCategory =
  | "Road Trips"
  | "Vehicle Care"
  | "City Guide"
  | "Driving Tips"
  | "EV & Battery"
  | "Company News"
  | "Promotions";

export type BlogAuthor = { name: string; avatar: string };

export type BlogSection = { title: string; body: string };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  author: BlogAuthor;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  readTime: number;
  cover: string;
  /** Lead paragraphs above the first section. */
  intro: string[];
  sections: BlogSection[];
};

const IMG = "/images/blog";

export const AUTHORS = {
  jonathan: { name: "Jonathan Gill", avatar: `${IMG}/author-jonathan-lg.png` },
  amelia: { name: "Amelia Putri", avatar: `${IMG}/author-amelia.png` },
  bagas: { name: "Bagas Nugroho", avatar: `${IMG}/author-bagas.png` },
  citra: { name: "Citra Ramadhani", avatar: `${IMG}/author-citra.png` },
  reza: { name: "Reza Pratama", avatar: `${IMG}/author-reza.png` },
  nadia: { name: "Nadia Putri", avatar: `${IMG}/author-nadia.png` },
} satisfies Record<string, BlogAuthor>;

const COVERS = {
  roadTrip: `${IMG}/featured-road-trip.jpg`,
  vehicleCare: `${IMG}/post-vehicle-care.png`,
  cityGuide: `${IMG}/post-city-guide.png`,
  selfDrive: `${IMG}/post-self-drive.png`,
  ev: `${IMG}/post-ev.png`,
  fleet: `${IMG}/post-fleet.png`,
  promo: `${IMG}/post-promo.png`,
};

export const FEATURED_POST: BlogPost = {
  slug: "plan-the-perfect-weekend-road-trip",
  title: "How to Plan the Perfect Weekend Road Trip",
  excerpt:
    "From choosing the right vehicle to packing smart, here's how CARENT renters get more out of every self-drive adventure without the last-minute scramble",
  category: "Road Trips",
  author: AUTHORS.jonathan,
  date: "2026-08-12",
  readTime: 6,
  cover: COVERS.roadTrip,
  intro: [
    "From choosing the right vehicle to packing smart, here's how CARENT renters get more out of every self-drive adventure — without the last-minute scramble.",
    "A good weekend road trip doesn't happen by accident. The renters who come back relaxed instead of exhausted usually did a handful of things differently before they even left the driveway. Here's what that looks like in practice.",
  ],
  sections: [
    {
      title: "Start With the Right Vehicle, Not Just Any Vehicle",
      body: "The car you pick shapes the whole trip. A compact hatchback is great for winding mountain roads and easy parking, but it'll feel cramped with four people and a weekend's worth of luggage. Heading somewhere with rougher terrain or steep inclines? An SUV with higher ground clearance will save you a lot of stress. Match the vehicle to the route first, then to your budget — not the other way around.",
    },
    {
      title: "Book Early, Not the Night Before",
      body: "Weekend slots — especially SUVs and MPVs — tend to fill up fast, particularly around long weekends and holidays. Booking a few days ahead doesn't just guarantee availability; it also gives you time to double-check your dates, add a driver if needed, and sort out payment without rushing. Locking in your car first makes everything else easier to plan around.",
    },
    {
      title: "Pack Smart, Not Heavy",
      body: "It's tempting to bring \"just in case\" items for every scenario, but overpacking eats into legroom and fuel efficiency. A simple rule: lay out everything you think you need, then remove a third of it. Prioritize a phone mount, a portable charger, a small first-aid kit, and cash for tolls or parking — small items that solve real problems on the road.",
    },
    {
      title: "Map Your Stops Before You Leave",
      body: "You don't need a minute-by-minute itinerary, but knowing your fuel stops, meal spots, and roughly where you'll be by sunset makes a real difference — especially if part of your route has limited signal. Save offline maps for areas you're unsure about, and share your general route with someone who isn't on the trip.",
    },
    {
      title: "Check the Essentials Before You Drive Off",
      body: "Before pulling out of the pick-up point, take two minutes to check tire condition, fuel level, and that the spare tire and toolkit are actually in the car. It's a small habit that prevents most of the \"why didn't we check this earlier\" moments later in the trip.",
    },
    {
      title: "Build in Buffer Time",
      body: "Weekend traffic out of the city is rarely predictable. Add an extra 30–45 minutes to your estimated drive time, especially on the way out on Friday or Saturday morning. Arriving a little early beats arriving stressed.",
    },
  ],
};

/** Grid posts in display order (6 per page). */
export const POSTS: BlogPost[] = [
  {
    slug: "habits-that-extend-your-rental-cars-life",
    title: "Simple Habits That Extend Your Rental Car's Life",
    excerpt: "Small things you do behind the wheel decide how the car feels at the end of the trip — and how smoothly the return goes.",
    category: "Vehicle Care",
    author: AUTHORS.amelia,
    date: "2026-08-10",
    readTime: 4,
    cover: COVERS.vehicleCare,
    intro: [
      "Small things you do behind the wheel decide how the car feels at the end of the trip — and how smoothly the return goes.",
      "None of these take more than a minute, and every one of them saves you from a conversation at the drop-off counter.",
    ],
    sections: [
      { title: "Warm Up Gently", body: "Modern engines don't need long idling, but the first few kilometres should be easy. Keep revs moderate until the temperature gauge settles, especially on cold mornings in the highlands." },
      { title: "Read the Dashboard, Not Just the Fuel Gauge", body: "Tyre-pressure and service warnings are there for a reason. If a light comes on, pull over somewhere safe and call CARENT support — we'd much rather swap the car than have you push on." },
      { title: "Keep the Cabin Clean as You Go", body: "Sand, snacks and wet umbrellas add up over a weekend. A small bin bag and a quick shake-out of the floor mats at each fuel stop keeps the interior in return-ready shape." },
    ],
  },
  {
    slug: "best-weekend-drives-around-yogyakarta",
    title: "Best Weekend Drives Around Yogyakarta: 6 Routes Worth the Fuel",
    excerpt: "From Malioboro to the southern beaches and the slopes of Merapi, these are the drives our Yogyakarta renters keep coming back for.",
    category: "City Guide",
    author: AUTHORS.bagas,
    date: "2026-08-08",
    readTime: 7,
    cover: COVERS.cityGuide,
    intro: [
      "From Malioboro to the southern beaches and the slopes of Merapi, these are the drives our Yogyakarta renters keep coming back for.",
      "Each route works as a day trip from the city centre, and most are easy in a compact car — we've flagged the ones where an SUV makes life easier.",
    ],
    sections: [
      { title: "Malioboro to Parangtritis", body: "About an hour south on good roads, ending at the black-sand beach. Go late afternoon for the sunset, and leave before dark when the coastal road gets busy." },
      { title: "Kaliurang and the Merapi Foothills", body: "A steady climb north through villages and pine forest. The road is paved all the way, but the gradients near the top are steep — an SUV or MPV with a full load is the comfortable choice." },
      { title: "The Gunungkidul Beach Loop", body: "Indrayanti, Pok Tunggal and Sadranan sit close together along a scenic ridge road. Start early: parking at the popular beaches fills up by mid-morning on weekends." },
    ],
  },
  {
    slug: "self-drive-vs-with-driver",
    title: "Self-Drive vs. With Driver: Which One Fits Your Trip?",
    excerpt: "Both options get you there. The right one depends on the route, the group, and how much of the trip you want to spend driving.",
    category: "Driving Tips",
    author: AUTHORS.citra,
    date: "2026-08-05",
    readTime: 5,
    cover: COVERS.selfDrive,
    intro: [
      "Both options get you there. The right one depends on the route, the group, and how much of the trip you want to spend driving.",
    ],
    sections: [
      { title: "When Self-Drive Wins", body: "Flexible itineraries, short city hops and couples who enjoy the drive itself. You set the pace, stop wherever you like and keep the daily rate lower." },
      { title: "When a Driver Is Worth It", body: "Unfamiliar cities, airport runs with tight timing, or long days where everyone wants to rest. A local driver also knows where to park — which in a busy old town is half the battle." },
      { title: "Mixing Both", body: "Plenty of renters book a driver for the arrival day and switch to self-drive once they've settled in. Just add the driver days when you book so we can match the schedule." },
    ],
  },
  {
    slug: "before-renting-an-electric-vehicle",
    title: "What to Know Before Renting an Electric Vehicle",
    excerpt: "Range, charging and regenerative braking: the short guide to enjoying your first EV rental instead of worrying about it.",
    category: "EV & Battery",
    author: AUTHORS.reza,
    date: "2026-08-03",
    readTime: 5,
    cover: COVERS.ev,
    intro: [
      "Range, charging and regenerative braking: the short guide to enjoying your first EV rental instead of worrying about it.",
    ],
    sections: [
      { title: "Plan Around Real-World Range", body: "The quoted range assumes gentle driving. With air-conditioning on and highway speeds, budget for roughly 80% of it and plan a charging stop before you need one." },
      { title: "Know Your Chargers", body: "Fast chargers at malls and highway rest areas can add most of a charge over a coffee break. Every CARENT EV comes with the cable you need and a list of chargers near your route." },
      { title: "Get Used to One-Pedal Driving", body: "Regenerative braking slows the car as soon as you lift off the accelerator. Give yourself ten minutes in a quiet street to get the feel before heading into traffic." },
    ],
  },
  {
    slug: "carent-expands-fleet-to-three-new-cities",
    title: "CARENT Expands Fleet to Three New Cities, Adds 200+ New Vehicles",
    excerpt: "Bandung, Semarang and Bali join the CARENT network this month, with more than 200 new sedans, SUVs and EVs ready to book.",
    category: "Company News",
    author: AUTHORS.jonathan,
    date: "2026-08-12",
    readTime: 3,
    cover: COVERS.fleet,
    intro: [
      "Bandung, Semarang and Bali join the CARENT network this month, with more than 200 new sedans, SUVs and EVs ready to book.",
    ],
    sections: [
      { title: "Where You Can Pick Up", body: "Each city opens with an airport desk and a city-centre location. Delivery to hotels and villas is available in Bali from day one." },
      { title: "What's in the New Fleet", body: "The new cars lean towards family MPVs and electric sedans — the two categories renters asked for most in our last survey." },
      { title: "Launch Pricing", body: "Bookings made in the first month at any of the new locations get 15% off the daily rate, applied automatically at checkout." },
    ],
  },
  {
    slug: "long-weekend-rental-deals",
    title: "Save More With CARENT's Long-Weekend Rental Deals",
    excerpt: "Book three days or more over a public holiday and the fourth day is on us. Here's how the long-weekend deal works.",
    category: "Promotions",
    author: AUTHORS.nadia,
    date: "2026-07-28",
    readTime: 3,
    cover: COVERS.promo,
    intro: [
      "Book three days or more over a public holiday and the fourth day is on us. Here's how the long-weekend deal works.",
    ],
    sections: [
      { title: "Who Qualifies", body: "Any self-drive or with-driver booking of at least three consecutive days that includes a national public holiday." },
      { title: "How to Claim It", body: "There's no code to remember. Choose your dates, and the free day shows up in the price breakdown before you pay." },
      { title: "Book Early", body: "Holiday weekends are our busiest dates of the year. SUVs and MPVs usually sell out a week ahead, so lock in your car as soon as your plans are firm." },
    ],
  },
  {
    slug: "airport-pickup-checklist",
    title: "The 5-Minute Airport Pick-Up Checklist",
    excerpt: "Landed, tired, and keen to get going? Run through these five checks at the desk and drive away with nothing to worry about.",
    category: "Driving Tips",
    author: AUTHORS.citra,
    date: "2026-07-24",
    readTime: 4,
    cover: COVERS.selfDrive,
    intro: ["Landed, tired, and keen to get going? Run through these five checks at the desk and drive away with nothing to worry about."],
    sections: [
      { title: "Photograph the Car", body: "Walk around once and take photos of every panel and the wheels. It takes a minute and settles any question about existing scratches." },
      { title: "Check Fuel and Mileage", body: "Make sure the fuel level matches the rental agreement, and note the odometer reading in the app." },
      { title: "Pair Your Phone Before You Move", body: "Set up navigation and Bluetooth in the car park, not at the first set of lights." },
    ],
  },
  {
    slug: "bandung-food-trail-by-car",
    title: "A Weekend Food Trail Through Bandung by Car",
    excerpt: "Batagor, surabi and strawberry farms: a self-drive eating tour of Bandung and the Lembang highlands.",
    category: "City Guide",
    author: AUTHORS.bagas,
    date: "2026-07-20",
    readTime: 6,
    cover: COVERS.cityGuide,
    intro: ["Batagor, surabi and strawberry farms: a self-drive eating tour of Bandung and the Lembang highlands."],
    sections: [
      { title: "Start in the City", body: "Morning traffic in central Bandung is heavy, so park once near Braga and walk between the classic breakfast spots." },
      { title: "Head Up to Lembang", body: "The road north climbs steadily into cooler air. Stop at a strawberry farm on the way and grab a surabi from a roadside stall." },
      { title: "Beat the Sunday Rush Home", body: "Leave Lembang by 3 pm on Sundays. After that, the single road back into the city slows to a crawl." },
    ],
  },
  {
    slug: "child-seats-and-family-travel",
    title: "Travelling With Kids: Child Seats and Family-Friendly Cars",
    excerpt: "What to request, which cars fit three car seats, and the small extras that make long drives with children easier.",
    category: "Road Trips",
    author: AUTHORS.amelia,
    date: "2026-07-16",
    readTime: 5,
    cover: COVERS.roadTrip,
    intro: ["What to request, which cars fit three car seats, and the small extras that make long drives with children easier."],
    sections: [
      { title: "Request Seats When You Book", body: "Infant, toddler and booster seats are free to add, but stock is limited at busy locations. Adding them at booking guarantees they're fitted before you arrive." },
      { title: "Pick a Car That Fits the Whole Setup", body: "Three seats across a row needs a wide MPV. A seven-seater like the Toyota Voxy keeps the third row free for bags." },
      { title: "Plan Shorter Legs", body: "Kids set the pace. Plan a stop every 90 minutes and the whole car arrives in a better mood." },
    ],
  },
  {
    slug: "fuel-saving-tips-for-highway-drives",
    title: "Seven Fuel-Saving Tips for Long Highway Drives",
    excerpt: "You can cut fuel use by up to 15% on a long trip without driving any slower. These are the habits that make the difference.",
    category: "Driving Tips",
    author: AUTHORS.reza,
    date: "2026-07-12",
    readTime: 4,
    cover: COVERS.vehicleCare,
    intro: ["You can cut fuel use by up to 15% on a long trip without driving any slower. These are the habits that make the difference."],
    sections: [
      { title: "Smooth Is Efficient", body: "Gentle acceleration and early braking save more fuel than any gadget. Look further down the road and let the car coast." },
      { title: "Use Cruise Control on Flat Stretches", body: "Holding a constant speed on toll roads keeps the engine in its most efficient range." },
      { title: "Lose the Roof Box", body: "Anything on the roof adds drag. If the bags fit inside, keep them inside." },
    ],
  },
  {
    slug: "carent-app-update-instant-booking",
    title: "New in the CARENT App: Instant Booking and Digital Keys",
    excerpt: "Book, unlock and return selected cars straight from your phone — no desk visit required.",
    category: "Company News",
    author: AUTHORS.jonathan,
    date: "2026-07-08",
    readTime: 3,
    cover: COVERS.fleet,
    intro: ["Book, unlock and return selected cars straight from your phone — no desk visit required."],
    sections: [
      { title: "How Instant Booking Works", body: "Verified renters can confirm a car in under a minute. Your licence and payment details are checked once and saved for next time." },
      { title: "Digital Keys", body: "Cars marked with the key icon unlock from the app when you're standing next to them. The physical key stays in the glovebox as a backup." },
      { title: "Where It's Available", body: "Instant booking is live in Jakarta and Yogyakarta now, with the new cities following next quarter." },
    ],
  },
  {
    slug: "ev-charging-etiquette",
    title: "EV Charging Etiquette: Sharing the Plug Politely",
    excerpt: "Public chargers are still scarce in places. A few simple courtesies keep things moving for everyone.",
    category: "EV & Battery",
    author: AUTHORS.reza,
    date: "2026-07-04",
    readTime: 3,
    cover: COVERS.ev,
    intro: ["Public chargers are still scarce in places. A few simple courtesies keep things moving for everyone."],
    sections: [
      { title: "Move Once You're Charged", body: "Set a reminder for when the car reaches 80%. Charging slows after that point anyway, and someone is probably waiting." },
      { title: "Don't Park in a Charging Bay", body: "Bays are for cars that are actively charging, even if every other space is full." },
      { title: "Leave the Cable Tidy", body: "Coil the cable and hang it back up. A cable on the ground gets driven over and damaged." },
    ],
  },
  {
    slug: "student-rental-discount",
    title: "Students Save 10% on Every Weekday Rental",
    excerpt: "Show a valid student card and get 10% off Monday to Thursday rentals, all semester long.",
    category: "Promotions",
    author: AUTHORS.nadia,
    date: "2026-06-30",
    readTime: 2,
    cover: COVERS.promo,
    intro: ["Show a valid student card and get 10% off Monday to Thursday rentals, all semester long."],
    sections: [
      { title: "Eligibility", body: "Full-time students aged 21 and over with a licence held for at least one year." },
      { title: "How to Apply", body: "Upload your student card in your CARENT profile. Once it's verified, the discount applies automatically to weekday bookings." },
    ],
  },
  {
    slug: "how-to-return-a-car-without-surprises",
    title: "How to Return Your Rental Without Surprise Charges",
    excerpt: "Fuel, cleaning and late fees are avoidable. Here's the drop-off routine our desk staff wish every renter followed.",
    category: "Vehicle Care",
    author: AUTHORS.amelia,
    date: "2026-06-26",
    readTime: 4,
    cover: COVERS.vehicleCare,
    intro: ["Fuel, cleaning and late fees are avoidable. Here's the drop-off routine our desk staff wish every renter followed."],
    sections: [
      { title: "Refuel Close to the Drop-Off", body: "Fill up within 10 km of the return location so the gauge reads full when you hand back the keys." },
      { title: "Allow Fifteen Minutes", body: "A quick inspection with staff present is faster than settling questions by email later." },
      { title: "Running Late? Extend in the App", body: "Extending before your return time costs the normal daily rate. Arriving late without extending adds a late fee." },
    ],
  },
  {
    slug: "bali-beyond-the-beach-clubs",
    title: "Bali Beyond the Beach Clubs: A Three-Day Self-Drive",
    excerpt: "Rice terraces, crater lakes and quiet north-coast villages — the Bali most visitors never drive to.",
    category: "Road Trips",
    author: AUTHORS.bagas,
    date: "2026-06-22",
    readTime: 8,
    cover: COVERS.roadTrip,
    intro: ["Rice terraces, crater lakes and quiet north-coast villages — the Bali most visitors never drive to."],
    sections: [
      { title: "Day One: Ubud to Jatiluwih", body: "Head west through the rice terraces of Jatiluwih. The roads are narrow; a compact SUV is the sweet spot." },
      { title: "Day Two: Bedugul and the Lakes", body: "Climb to the crater lakes around Bedugul. Mornings are clear; afternoons often bring mist and rain." },
      { title: "Day Three: The North Coast", body: "Drop down to Lovina for a calm, black-sand coastline and a slower pace before the drive back south." },
    ],
  },
  {
    slug: "driving-in-the-rainy-season",
    title: "Driving Safely in the Rainy Season",
    excerpt: "Afternoon downpours are part of life from November to March. These habits keep you safe when the roads flood.",
    category: "Driving Tips",
    author: AUTHORS.citra,
    date: "2026-06-18",
    readTime: 5,
    cover: COVERS.selfDrive,
    intro: ["Afternoon downpours are part of life from November to March. These habits keep you safe when the roads flood."],
    sections: [
      { title: "Double Your Following Distance", body: "Wet roads can double your stopping distance. Give the car ahead more space than feels necessary." },
      { title: "Never Drive Into Standing Water", body: "If you can't see the road surface, you can't judge the depth. Turn around and find another route." },
      { title: "Lights On, Hazards Off", body: "Use dipped headlights in heavy rain. Hazard lights while moving confuse other drivers about your intentions." },
    ],
  },
  {
    slug: "hybrid-vs-electric-rental",
    title: "Hybrid or Fully Electric: Which Should You Rent?",
    excerpt: "Both save fuel. One needs a plug. Here's how to choose for the trip you're actually taking.",
    category: "EV & Battery",
    author: AUTHORS.reza,
    date: "2026-06-14",
    readTime: 4,
    cover: COVERS.ev,
    intro: ["Both save fuel. One needs a plug. Here's how to choose for the trip you're actually taking."],
    sections: [
      { title: "Choose a Hybrid for Long, Unplanned Routes", body: "A hybrid refuels anywhere in minutes, so it suits road trips where you don't know where you'll be each night." },
      { title: "Choose an EV for City Stays", body: "If your hotel has a charger and you're mostly driving around town, an EV is quiet, smooth and cheaper per kilometre." },
    ],
  },
  {
    slug: "carent-customer-awards-2026",
    title: "CARENT Named Best Rental Experience at the 2026 Travel Awards",
    excerpt: "Thank you to every renter who voted. Here's what the award means and what we're improving next.",
    category: "Company News",
    author: AUTHORS.jonathan,
    date: "2026-06-10",
    readTime: 3,
    cover: COVERS.fleet,
    intro: ["Thank you to every renter who voted. Here's what the award means and what we're improving next."],
    sections: [
      { title: "What Renters Told Us", body: "Fast pick-ups and transparent pricing came up again and again in the voting comments." },
      { title: "What's Next", body: "We're adding more delivery locations and extending support hours to 24/7 in every city by the end of the year." },
    ],
  },
  {
    slug: "early-bird-holiday-bookings",
    title: "Early-Bird Pricing for Year-End Holiday Bookings",
    excerpt: "Book your December rental before the end of September and lock in this year's rates — with free cancellation.",
    category: "Promotions",
    author: AUTHORS.nadia,
    date: "2026-06-06",
    readTime: 2,
    cover: COVERS.promo,
    intro: ["Book your December rental before the end of September and lock in this year's rates — with free cancellation."],
    sections: [
      { title: "The Details", body: "Early-bird rates apply to any booking between 20 December and 5 January made before 30 September." },
      { title: "Free Cancellation", body: "Plans change. Cancel up to 72 hours before pick-up for a full refund." },
    ],
  },
  {
    slug: "interior-care-on-long-trips",
    title: "Keeping the Interior Fresh on Week-Long Rentals",
    excerpt: "A week in the car with a family can get messy. A small kit and a daily five-minute tidy keeps it pleasant.",
    category: "Vehicle Care",
    author: AUTHORS.amelia,
    date: "2026-06-02",
    readTime: 3,
    cover: COVERS.vehicleCare,
    intro: ["A week in the car with a family can get messy. A small kit and a daily five-minute tidy keeps it pleasant."],
    sections: [
      { title: "Pack a Mini Cleaning Kit", body: "Wet wipes, a microfibre cloth and a few bin bags cover almost everything." },
      { title: "Air It Out Every Evening", body: "Open all the doors for a couple of minutes when you park for the night — especially after a beach day." },
    ],
  },
  {
    slug: "jakarta-to-bandung-toll-road-guide",
    title: "Jakarta to Bandung: A Toll Road Guide for First-Timers",
    excerpt: "Which gates to use, where to stop, and how to keep enough balance on your e-toll card for the round trip.",
    category: "City Guide",
    author: AUTHORS.bagas,
    date: "2026-05-28",
    readTime: 5,
    cover: COVERS.cityGuide,
    intro: ["Which gates to use, where to stop, and how to keep enough balance on your e-toll card for the round trip."],
    sections: [
      { title: "Top Up Before You Leave", body: "Toll gates are cashless. Every CARENT car has an e-toll card — check the balance in the app and top up at any convenience store." },
      { title: "Best Rest Areas", body: "KM 57 and KM 88 have the widest choice of food and clean facilities. Both get busy around midday." },
      { title: "Avoid Friday Evenings", body: "Leaving Jakarta after 4 pm on a Friday can double the journey time. Early Saturday is far quieter." },
    ],
  },
];

export const ALL_POSTS: BlogPost[] = [FEATURED_POST, ...POSTS];

export const POSTS_PER_PAGE = 6;

export function postBySlug(slug: string) {
  return ALL_POSTS.find((p) => p.slug === slug);
}

/** Up to `n` other posts, same category first. */
export function relatedPosts(post: BlogPost, n = 3) {
  const others = ALL_POSTS.filter((p) => p.slug !== post.slug);
  const same = others.filter((p) => p.category === post.category);
  const rest = others.filter((p) => p.category !== post.category);
  // Skip posts that share a cover already in view so the row doesn't repeat photos.
  const seen = new Set([post.cover]);
  const picked: BlogPost[] = [];
  for (const p of [...same, ...rest]) {
    if (picked.length === n) break;
    if (seen.has(p.cover)) continue;
    seen.add(p.cover);
    picked.push(p);
  }
  return picked;
}

const DATE_FMT = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

/** "2026-08-12" → "Aug 12, 2026". */
export function formatPostDate(iso: string) {
  return DATE_FMT.format(new Date(`${iso}T00:00:00Z`));
}

/** Anchor id for a section heading. */
export function sectionId(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
