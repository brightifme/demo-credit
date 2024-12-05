import axios from 'axios';

interface KarmaBlacklistResponse {
  status: string;
}

class KarmaBlacklistService {
  private apiEndpoint = '';
  private apiKey = '';

  async checkKarmaBlacklist(email: string): Promise<KarmaBlacklistResponse> {
    try {
      const response = await axios.post(this.apiEndpoint, {
        email,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
      });

      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Failed to check Karma blacklist: ${error.message}`);
      } else {
        throw new Error('An unknown error occurred while checking the Karma blacklist');
      }
    }
  }
}

export default KarmaBlacklistService;