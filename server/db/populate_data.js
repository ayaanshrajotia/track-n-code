const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const tags = [
  "Array",
  "String",
  "Hash Table",
  "Dynamic Programming",
  "Math",
  "Sorting",
  "Greedy",
  "Depth-First Search",
  "Binary Search",
  "Database",
  "Matrix",
  "Breadth-First Search",
  "Tree",
  "Bit Manipulation",
  "Two Pointers",
  "Prefix Sum",
  "Heap (Priority Queue)",
  "Binary Tree",
  "Simulation",
  "Stack",
  "Graph",
  "Counting",
  "Sliding Window",
  "Design",
  "Enumeration",
  "Backtracking",
  "Union Find",
  "Linked List",
  "Number Theory",
  "Ordered Set",
  "Monotonic Stack",
  "Segment Tree",
  "Trie",
  "Combinatorics",
  "Bitmask",
  "Queue",
  "Recursion",
  "Divide and Conquer",
  "Memoization",
  "Binary Indexed Tree",
  "Geometry",
  "Binary Search Tree",
  "Hash Function",
  "String Matching",
  "Topological Sort",
  "Shortest Path",
  "Rolling Hash",
  "Game Theory",
  "Interactive",
  "Data Stream",
  "Monotonic Queue",
  "Brainteaser",
  "Randomized",
  "Merge Sort",
  "Doubly-Linked List",
  "Counting Sort",
  "Iterator",
  "Concurrency",
  "Probability and Statistics",
  "Quickselect",
  "Suffix Array",
  "Bucket Sort",
  "Line Sweep",
  "Minimum Spanning Tree",
  "Shell",
  "Reservoir Sampling",
  "Strongly Connected Component",
  "Eulerian Circuit",
  "Radix Sort",
  "Rejection Sampling",
];

const companies = [
  "Accenture",
  "Adobe",
  "Airbnb",
  "Amazon",
  "Apple",
  "Atlassian",
  "Baidu",
  "Bilibili",
  "Boeing",
  "ByteDance",
  "Capgemini",
  "Cisco",
  "Cognizant",
  "Coinbase",
  "CRED",
  "Ctrip",
  "Dell",
  "Deloitte",
  "Didi Chuxing",
  "DingTalk",
  "DoorDash",
  "Dropbox",
  "Epic Games",
  "Facebook",
  "Fidelity Investments",
  "Flipkart",
  "GE",
  "Goldman Sachs",
  "Google",
  "HCL",
  "Honeywell",
  "Huawei",
  "IBM",
  "Infosys",
  "Instacart",
  "Intel",
  "JP Morgan Chase",
  "JD.com",
  "Kuaishou",
  "LinkedIn",
  "Lockheed Martin",
  "LTIMindtree",
  "Lyft",
  "McKinsey & Company",
  "Meituan",
  "Microsoft",
  "Morgan Stanley",
  "Netflix",
  "NIO",
  "Northrop Grumman",
  "Ola",
  "Oracle",
  "Palantir",
  "PayPal",
  "Paytm",
  "Pinduoduo",
  "Pinterest",
  "Qualcomm",
  "Reddit",
  "Robinhood",
  "Samsung",
  "Salesforce",
  "SenseTime",
  "Siemens",
  "Slack",
  "Snap Inc.",
  "Snapchat",
  "Spotify",
  "Square",
  "Stripe",
  "Swiggy",
  "TCS",
  "T-Mobile",
  "Tencent",
  "Tesla",
  "Trip.com",
  "Twitch",
  "Twitter",
  "Uber",
  "UnitedHealth Group",
  "Verizon",
  "Visa",
  "VMware",
  "Walmart",
  "Wayfair",
  "WeChat",
  "Weibo",
  "Wipro",
  "Workday",
  "Xiaomi",
  "Yahoo",
  "Yelp",
  "Youku",
  "Zebra Technologies",
  "Zillow",
  "Zoho",
  "Zomato",
  "Zscaler",
  "Alibaba",
  "Alibaba Cloud",
];

// Local schema definition
const tagSchema = new mongoose.Schema(
  {
    tag_name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const companySchema = new mongoose.Schema(
  {
    company_name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Tag = mongoose.model("Tag", tagSchema);
const Company = mongoose.model("Company", companySchema);

const MONGODB_URI = "replace_with_your_mongodb_uri"; // Replace with your MongoDB URI
const DB_NAME = "replace_with_your_db_name"; // Replace with your database name

const populateData = async () => {
  try {
    await mongoose.connect(MONGODB_URI + "/" + DB_NAME);
    console.log("MongoDB connected!");

    await Tag.deleteMany({});
    await Company.deleteMany({});

    const tagDocs = tags.map((name) => ({ tag_name: name }));
    const companyDocs = companies.map((name) => ({ company_name: name }));

    await Tag.insertMany(tagDocs);
    await Company.insertMany(companyDocs);

    console.log("Data populated successfully!");

    await mongoose.disconnect();
  } catch (error) {
    console.error("Error populating data:", error);
    await mongoose.disconnect();
    process.exit(1);
  }
};

populateData();
