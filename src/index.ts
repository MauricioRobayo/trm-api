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
    order = 'ASC',
  }: {
    startAt: string;
    endAt: string;
    order?: 'ASC' | 'DESC';
  }): Promise<TrmApiQuote[]> {
    const searchparams = new URLSearchParams({
      $where: `vigenciadesde >= '${startAt}' AND vigenciahasta <= '${endAt}'`,
      $order: `vigenciadesde ${order}`,
    });

    const { data } = await axios.get<TrmApiQuote[]>(
      `${this.trmApiUrl}?${searchparams}`
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
      `${this.trmApiUrl}?${searchparams}`
    );
    return data;
  }
}

export default TrmApi;
