import axios from 'axios';

export interface TrmApiQuote {
  valor: string;
  unidad: string;
  vigenciadesde: string;
  vigenciahasta: string;
}

class TrmApi {
  private trmApiUrl = 'https://www.datos.gov.co/resource/32sa-8pi3';

  private headers: Record<string, string>;

  constructor(private appToken: string = '') {
    this.headers = {
      'X-App-Token': appToken,
    };
  }

  async latest(): Promise<TrmApiQuote> {
    const { data } = await axios.get<TrmApiQuote[]>(
      `${this.trmApiUrl}?$limit=1`,
      { headers: this.headers }
    );
    return data[0];
  }

  async between({
    startAt,
    endAt,
    order = 'ASC',
  }: {
    startAt: string;
    endAt: string;
    order?: 'ASC' | 'DESC';
  }): Promise<TrmApiQuote[]> {
    const searchparams = new URLSearchParams({
      $where: `(vigenciadesde <= '${startAt}' AND vigenciahasta >= '${startAt}') OR (vigenciadesde >= '${startAt}' AND vigenciahasta <= '${endAt}') OR (vigenciadesde <= '${endAt}' AND vigenciahasta >= '${endAt}')`,
      $order: `vigenciadesde ${order}`,
    });

    const { data } = await axios.get<TrmApiQuote[]>(
      `${this.trmApiUrl}?${searchparams}`,
      { headers: this.headers }
    );
    return data;
  }

  async history({
    limit = 1000,
    order = 'ASC',
  }: {
    order?: 'ASC' | 'DESC';
    limit?: number;
  } = {}) {
    const searchparams = new URLSearchParams({
      $limit: String(limit),
      $order: `vigenciadesde ${order}`,
    });

    const { data } = await axios.get<TrmApiQuote[]>(
      `${this.trmApiUrl}?${searchparams}`,
      { headers: this.headers }
    );
    return data;
  }

  async date(date: string): Promise<TrmApiQuote> {
    const data = await this.between({ startAt: date, endAt: date });
    return data[0];
  }
}

export default TrmApi;
