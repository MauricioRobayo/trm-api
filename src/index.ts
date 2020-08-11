import axios from 'axios';
import { TrmApiQuote } from './types';

class TrmApi {
  private trmApiUrl = 'https://www.datos.gov.co/resource/32sa-8pi3';

  async latest(): Promise<TrmApiQuote> {
    const response = await axios.get(`${this.trmApiUrl}?$limit=1`);
    return response.data;
  }
}

export default TrmApi;
