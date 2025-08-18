const cron = require('node-cron');
const Meme = require('../models/Meme');
const User = require('../models/User');
const MemeKing = require('../models/MemeKing');

const startScheduler = () => {
  // Schedule to run every day at midnight (00:00)
  cron.schedule('0 0 * * *', async () => {
    console.log('Running daily Meme King selection job...');
    try {
      const now = new Date();
      const yesterday = new Date(now);
      yesterday.setDate(now.getDate() - 1);
      yesterday.setHours(0, 0, 0, 0);

      const endOfYesterday = new Date(now);
      endOfYesterday.setDate(now.getDate() - 1);
      endOfYesterday.setHours(23, 59, 59, 999);

      // Find the meme with the most votes from yesterday
      const topMeme = await Meme.aggregate([
        { $match: { createdAt: { $gte: yesterday, $lte: endOfYesterday } } },
        { $project: { _id: 1, user: 1, votesCount: { $size: '$votes' } } },
        { $sort: { votesCount: -1 } },
        { $limit: 1 },
      ]);

      if (topMeme.length > 0) {
        const winnerMeme = topMeme[0];
        const winnerUser = await User.findById(winnerMeme.user);

        if (winnerUser) {
          // Check if a Meme King for this date already exists to prevent duplicates
          const existingMemeKing = await MemeKing.findOne({ date: yesterday });
          if (!existingMemeKing) {
            await MemeKing.create({
              meme: winnerMeme._id,
              user: winnerUser._id,
              date: yesterday,
              totalVotes: winnerMeme.votesCount,
            });
            console.log(`Meme King for ${yesterday.toDateString()} selected: ${winnerUser.username} with ${winnerMeme.votesCount} votes.`);
          } else {
            console.log(`Meme King for ${yesterday.toDateString()} already exists.`);
          }
        } else {
          console.log('Winner user not found for top meme.');
        }
      } else {
        console.log('No memes found for yesterday to select a Meme King.');
      }
    } catch (error) {
      console.error('Error running Meme King selection job:', error);
    }
  });
};

module.exports = startScheduler;