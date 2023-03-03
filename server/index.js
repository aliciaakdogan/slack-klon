import express from "express";
const app = express();
import mongoose from "mongoose";
import cors from "cors";

app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
  res.send("hej");
});

const channelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLenght: 1,
      maxLenght: 30,
    },
  },
  { timestamps: true }
);

const Channel = mongoose.model("channels", channelSchema);

app.get("/channels", async (req, res) => {
  const channels = await Channel.find();

  res.send(channels);
});

app.listen(3000, async () => {
  await mongoose.connect(
    "mongodb+srv://alicia:alicia@cluster0.ok7cjmg.mongodb.net/?retryWrites=true&w=majority"
  );
});
