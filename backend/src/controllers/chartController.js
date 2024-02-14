import express from 'express';
import { getDB } from '../../config/db.js';

const router = express.Router();

router.get('/daily', async (req, res) => {
  try {
    const database = getDB();
    const collection = database.collection('sensorData');

    // Get the date 10 days ago
    const tenDaysAgo = new Date();
    tenDaysAgo.setDate(tenDaysAgo.getDate() - 15);

    // Aggregate data for the last 10 days
    const dailyChartData = await collection.aggregate([
      {
        $match: {
          timestamp: { $gte: tenDaysAgo },
          sensorId: 4 // Tank sensor ID
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
          totalVolume: { $sum: "$volume" }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]).toArray();

    // Create an object to store daily data
    const dailyData = {};

    // Initialize data for each day with volume 0
    const currentDate = new Date();
    for (let i = 0; i < 15; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - i);
      const key = date.toISOString().slice(0, 15);
      dailyData[key] = 0;
    }

    // Fill in data from the database
    dailyChartData.forEach(item => {
      dailyData[item._id] = item.totalVolume;
    });

    // Convert daily data object to an array of objects
    const formattedDailyData = Object.keys(dailyData).map(key => ({
      day: key,
      totalVolume: dailyData[key]
    }));

    res.json(formattedDailyData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});


router.get('/weekly', async (req, res) => {
  try {
    const database = getDB();
    const collection = database.collection('sensorData');

    // Get the date 7 weeks ago
    const sevenWeeksAgo = new Date();
    sevenWeeksAgo.setDate(sevenWeeksAgo.getDate() - 7 * 7);

    // Aggregate data for the last 7 weeks
    const weeklyChartData = await collection.aggregate([
      {
        $match: {
          timestamp: { $gte: sevenWeeksAgo },
          sensorId: 4 // Tank sensor ID
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%U", date: "$timestamp" } },
          totalVolume: { $sum: "$volume" }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]).toArray();

    // Create an array to store weekly data
    const formattedWeeklyData = [];

    // Generate labels for each week
    const currentDate = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - i * 7);
      const isoWeek = getISOWeek(date);
      const isoYear = getISOYear(date);
      const key = isoYear + "-" + isoWeek;
      formattedWeeklyData.push({ week: "Week " + (i + 1), totalVolume: 0 });
    }

    // Fill in data from the database
    let weekIndex = 0;
    weeklyChartData.forEach(item => {
      while (weekIndex < formattedWeeklyData.length && item._id !== formattedWeeklyData[weekIndex].week) {
        weekIndex++;
      }
      if (weekIndex < formattedWeeklyData.length) {
        formattedWeeklyData[weekIndex].totalVolume = item.totalVolume;
      }
      weekIndex++;
    });

    res.json(formattedWeeklyData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});


// Function to get ISO week and year
function getISOWeek(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  const yearStart = new Date(d.getFullYear(), 0, 1);
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

function getISOYear(date) {
  const d = new Date(date);
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  const year = d.getFullYear();
  const week = Math.ceil((((d - new Date(year, 0, 1)) / 86400000) + 1) / 7);
  if (week === 1 && d.getMonth() > 0) {
    return year - 1;
  }
  if (week >= 52 && d.getMonth() < 11) {
    return year + 1;
  }
  return year;
}




router.get('/monthly', async (req, res) => {
  try {
    const database = getDB();
    const collection = database.collection('sensorData');

    // Get the date 12 months ago
    const twelveMonthsAgo = new Date();
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

    // Aggregate data for the last 12 months
    const monthlyChartData = await collection.aggregate([
      {
        $match: {
          timestamp: { $gte: twelveMonthsAgo },
          sensorId: 4 // Tank sensor ID
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$timestamp" } },
          totalVolume: { $sum: "$volume" }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]).toArray();

    // Create an object to store monthly data
    const monthlyData = {};

    // Initialize data for each month with volume 0
    const currentDate = new Date();
    for (let i = 0; i < 12; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      const key = date.toISOString().slice(0, 7);
      monthlyData[key] = 0;
    }

    // Fill in data from the database
    monthlyChartData.forEach(item => {
      monthlyData[item._id] = item.totalVolume;
    });

    // Convert monthly data object to an array of objects
    const formattedMonthlyData = Object.keys(monthlyData).map(key => ({
      month: key,
      totalVolume: monthlyData[key]
    }));

    res.json(formattedMonthlyData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});




// Fetch live data for tank sensors (last 10 inserted volume values)
router.get('/live', async (req, res) => {
  try {
    const database = getDB();
    const collection = database.collection('sensorData');

    const latestData = await collection.find({ sensorId: 4 }).sort({ timestamp: -1 }).limit(10).toArray();
    
    // Extract volume values from the latest data
    const volumes = latestData.map(data => data.volume);

    // console.log(volumes)
    res.json(volumes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;

