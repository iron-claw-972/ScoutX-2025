const functions = require('firebase-functions');
const axios = require('axios');
const cors = require('cors')({ origin: true });

exports.analyzeTeamData = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const teamData = req.body.teamData;

      if (!teamData) {
        console.error('No team data provided');
        return res.status(400).send({ error: 'No team data provided' });
      }

      // Directly hard-code your OpenAI API key here
      const openaiApiKey = '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'; // Replace with your actual key
      const openaiUrl = 'https://api.openai.com/v1/chat/completions';

      console.log('Sending request to GPT-4 API with data:', teamData);

      const response = await axios.post(
        openaiUrl,
        {
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content:
                'You are an expert in FRC robotics scouting. Analyze the provided team data and generate statistics, performance insights, and strategic feedback for the team.',
            },
            {
              role: 'user',
              content: `Here is the team data: ${JSON.stringify(teamData)}`,
            },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${openaiApiKey}`, // Pass the API key here
          },
        }
      );

      console.log('GPT-4 response:', response.data);

      const analysis = response.data.choices[0].message.content;
      return res.status(200).send({ analysis });
    } catch (error) {
      console.error('Error in analyzeTeamData function:', error);
      return res.status(500).send({ error: error.message });
    }
  });
});
