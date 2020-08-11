import axios from 'axios';

export interface TrmApiQuote {
  valor: string;
  unidad: string;
  vigenciadesde: string;
  vigenciahasta: string;
}

class TrmApi {
  private trmApiUrl = 'https://www.datos.gov.co/resource/32sa-8pi3';

  async latest(): Promise<TrmApiQuote> {
    const { data } = await axios.get<TrmApiQuote[]>(
      `${this.trmApiUrl}?$limit=1`
    );
    return data[0];
  }

  async between({
    startAt,
    endAt,
  }: {
    startAt: string;
    endAt: string;
  }): Promise<TrmApiQuote[]> {
    const searchString = `$where=vigenciadesde >= '${startAt}' AND vigenciahasta <= '${endAt}'`;
    const { data } = await axios.get<TrmApiQuote[]>(
      `${this.trmApiUrl}?${searchString}`
    );
    return data;
  }
}

export default TrmApi;
