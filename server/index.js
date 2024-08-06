const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 8080;

// In-memory storage, pre-defined channels
let channels = [
  {
    id: 1,
    name: "General Chat",
    emoji: "💬",
    details: "A place for casual conversations and general chit-chat.",
  },
  {
    id: 2,
    name: "Tech Discussions",
    emoji: "💻",
    details: "Discussing the latest in technology and coding tips.",
  },
  {
    id: 3,
    name: "Gaming Zone",
    emoji: "🎮",
    details: "For gamers to connect and discuss their favorite games.",
  },
  {
    id: 4,
    name: "Movie Buffs",
    emoji: "🎬",
    details: "Film enthusiasts sharing recommendations and reviews.",
  },
  {
    id: 5,
    name: "Book Club",
    emoji: "📚",
    details: "A community for book lovers to discuss and recommend books.",
  },
  {
    id: 6,
    name: "Coding Help",
    emoji: "💻",
    details: "Get assistance and help others with coding challenges.",
  },
  {
    id: 7,
    name: "Travel Enthusiasts",
    emoji: "✈️",
    details: "Explore the world through shared travel experiences.",
  },
  {
    id: 8,
    name: "Foodies Corner",
    emoji: "🍔",
    details: "Share recipes, food experiences, and culinary tips.",
  },
];

let messages = [];

app.use(cors());
app.use(bodyParser.json());

// GET endpoint for querying channels
app.get("/channels", (req, res) => {
  res.json(channels);
});

// GET endpoint for querying channel's messages
app.get("/messages/:channel", (req, res) => {
  const channelId = parseInt(req.params.channel);
  const channelMessages = messages.filter(
    (message) => message.channelId === channelId
  );

  const sortedMessages = channelMessages.sort(
    (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
  );

  res.json(sortedMessages);
});

// POST endpoint for submitting new messages to a channel
app.post("/:channel", (req, res) => {
  const channelId = parseInt(req.params.channel);
  const { id, text, timestamp, author, title } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Message text is required." });
  }

  const newMessage = {
    id,
    channelId,
    author,
    timestamp,
    title,
    text,
  };

  messages.push(newMessage);
  res.json(newMessage);
});

app.listen(port, () => {
  console.log(`Node Server is running on http://localhost:${port}`);
});
