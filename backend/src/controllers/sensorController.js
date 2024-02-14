import { getDB } from '../../config/db.js';

export const saveSensorData = async (req, res) => {
  const database = getDB();
  const sensorDataCollection = database.collection('sensorData');

  if (typeof req.body === 'object'){
    const { apartmentId, sensorId, volume, averageFlowRate, floorNumber } = req.body;

    await sensorDataCollection.insertOne({
      apartmentId,
      sensorId,
      volume,
      averageFlowRate,
      floorNumber,
      timestamp: new Date(),
    });

res.status(200).json({
  message: 'Sensor data saved successfully',
});
return

  }
  try {

    await Promise.all(
      req.body.map(async (sensorItem) => {
        const { apartmentId, sensorId, volume, averageFlowRate, floorNumber } = sensorItem;

        await sensorDataCollection.insertOne({
          apartmentId,
          sensorId,
          volume,
          averageFlowRate,
          floorNumber,
          timestamp: new Date(),
        });
      })
    );

    res.status(200).json({
      message: 'Sensor data saved successfully',
    });
  } catch (error) {
    console.error('Error saving sensor data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getLastNSensorData = async (req, res) => {
  try {
    const database = getDB();
    const sensorDataCollection = database.collection('sensorData');
    const { numberOfEntries, apartmentId } = req.params;

    // Find all unique sensorId values for the given apartment ID
    const uniqueSensorIds = await sensorDataCollection.distinct('sensorId', {
      apartmentId: apartmentId,
    });

    // Identify the tank sensor based on the highest sensorId
    const tankSensorId = Math.max(...uniqueSensorIds);

    // Use the unique sensorIds to fetch the last N sensor data entries for each sensor
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to midnight for the beginning of the day

    const sensorData = await Promise.all(
      uniqueSensorIds.map(async (sensorId) => {
        const sensorEntries = await sensorDataCollection
          .find({
            apartmentId: apartmentId,
            sensorId: sensorId,
            timestamp: { $gte: today }, // Fetch entries with timestamps greater than or equal to the beginning of today
          })
          .sort({ timestamp: -1 }) // Sort in descending order so the latest entry comes first
          // .limit(numberOfEntries) // Limit to the specified number of entries
          .toArray();

        // Calculate total volume, average flow rate, and fetch current flow rate
        let totalVolume = 0;
        let totalFlowRate = 0;
        let currentFlowRate = 0;

        sensorEntries.forEach(entry => {
          totalVolume += entry.volume;
          totalFlowRate += entry.averageFlowRate;
        });

        // Fetch current flow rate from the latest entry
        if (sensorEntries.length > 0) {
          currentFlowRate = sensorEntries[0].averageFlowRate; // Assuming 'averageFlowRate' is the current flow rate
        }

        // Calculate average flow rate
        const averageFlowRate = sensorEntries.length > 0 ? totalFlowRate / sensorEntries.length : 0;

        return {
          sensorId: sensorId,
          totalVolume: totalVolume,
          averageFlowRate: averageFlowRate,
          currentFlowRate: currentFlowRate
        };
      })
    );

    // Separate tank sensor data from non-tank sensors
    const tankSensorData = sensorData.find(sensor => sensor.sensorId === tankSensorId);
    const otherSensorData = sensorData.filter(sensor => sensor.sensorId !== tankSensorId);

    // Calculate averageFlowRateAllSensors, totalVolumeTank, and averageFlowRateTank
    const averageFlowRateAllSensors = sensorData.reduce((acc, cur) => acc + cur.currentFlowRate, 0) / sensorData.length;
    const totalVolumeTank = tankSensorData ? tankSensorData.totalVolume : 0;
    const averageFlowRateTank = totalVolumeTank > 0 ? tankSensorData.currentFlowRate : 0;

    console.log({
      tankSensorData: tankSensorData,
      otherSensorData: otherSensorData,
      averageFlowRateAllSensors: averageFlowRateAllSensors,
      totalVolumeTank: totalVolumeTank,
      averageFlowRateTank: averageFlowRateTank,
    })
    res.json({
      tankSensorData: tankSensorData,
      otherSensorData: otherSensorData,
      averageFlowRateAllSensors: averageFlowRateAllSensors,
      totalVolumeTank: totalVolumeTank,
      averageFlowRateTank: averageFlowRateTank,
    });

  } catch (error) {
    console.error('Error getting sensor data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
