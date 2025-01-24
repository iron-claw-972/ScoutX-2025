const functions = require('firebase-functions');
const axios = require('axios');
const cors = require('cors')({ origin: true });
// const {SecretManagerServiceClient} = require('@google-cloud/secret-manager');
// const client = new SecretManagerServiceClient();
// const projectId = 'scouting-app-fall-project-2024'; 
// const secretName = 'projects/' + projectId + '/secrets/openai-api-key/versions/latest'; 

// async function getOpenAIKey(){
//     const [version] = await client.accessSecretVersion({name: secretName});
//     const openAIKey = version.payload.data.toString();
//     return openAIKey;
// }

exports.analyzeTeamData = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      const teamData = req.body.teamData;

      if (!teamData) {
        console.error('No team data provided');
        return res.status(400).send({ error: 'No team data provided' });
      }

      // Retrieve OpenAI API key from Secret Manager (does not work but most secure)
      // const openaiApiKey = await getOpenAIKey();
      // if (!openaiApiKey) {
      //   console.error('Failed to retrieve OpenAI API key from Secret Manager.');
      //   return res.status(500).send({ error: 'Failed to retrieve API key.' });
      // }

      // Retrieve API KEY using environment variable (resets every time function is deployed, but works when manually set in cloud run)
      // const openaiApiKey = process.env.OPENAI_API_KEY; 

      // Hard-coded not secure but works everytime
      const openaiApiKey = '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';

      const openaiUrl = 'https://api.openai.com/v1/chat/completions';

      const prompt = 'You are an expert in FRC robotics scouting. Analyze the provided team data and generate statistics, performance insights, and strategic feedback for a team that is deciding on whether or not to pick this person as their alliance partner. Provide a CONCISE and EFFECTIVE analysis.';
      const prompt2 = "You are an expert in 2025 FRC Robotics Scouting. Analyze this team's match data so that I can decide to pick them as my alliance partner. Provide TWO to THREE sentences for auto scoring, tele scoring, and ovreall robot functionality and performance each. Provide THREE sentences on their weaknesses. Provide THREE sentences on their strengths. Finally, provide FOUR sentences with your own insights and opinions on whether or not to choose this team. Please be CONCISE and EFFECTIVE."; 

      const response = await axios.post(
        openaiUrl,
        {
          model: 'gpt-4o-mini-2024-07-18',
          messages: [
            {
              role: 'system',
              content: prompt2,
            },
            {
              role: 'user',
              content: `Here is the team data: ${JSON.stringify(teamData)}`,
            },
          ],
          // max_tokens: 350,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${openaiApiKey}`,
          },
        }
      );

      const analysis = response.data.choices[0].message.content;
      return res.status(200).send({ analysis });
    } catch (error) {
      console.error('Error in analyzeTeamData function:', error);

      // Log error response from GPT (if available)
      if (error.response) {
        console.error('Error response from GPT:', error.response.data);
      }

      return res.status(500).send({ error: error.message });
    }
  });
});
