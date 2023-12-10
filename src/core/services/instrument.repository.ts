import { Instrument } from "../../features/models/instrument";
import { ApiRepository } from "./api.repository";

type ApiResponse = {
  items: Instrument[];
};
export class InstrumentRepository extends ApiRepository<Instrument> {
  constructor(public url: string, public token: string) {
    super(url, token);
  }

  async getAll(): Promise<Instrument[]> {
    const response = await fetch(`${this.url}instrument`);
    if (!response.ok) {
      const message = `Error: ${response.status}. ${response.statusText}`;
      throw new Error(message);
    }

    const data = response.json() as Promise<ApiResponse>;
    return (await data).items;
  }

  async createInstrument(item: FormData): Promise<Instrument> {
    const response = await fetch(`${this.url}instrument`, {
      method: "POST",
      body: item,
      headers: { Authorization: "Bearer " + this.token },
    });
    return response.json() as Promise<Instrument>;
  }

  async updateInstrument(
    id: Instrument["id"],
    item: FormData
  ): Promise<Instrument> {
    const response = await fetch(`${this.url}instrument/` + id, {
      method: "PATCH",
      body: item,
      headers: {
        Authorization: "Bearer " + this.token,
      },
    });
    const updatedInstrument = await response.json();
    return updatedInstrument as Instrument;
  }

  async deleteInstrument(id: Instrument["id"]): Promise<boolean> {
    const response = await fetch(`${this.url}instrument/` + id, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + this.token,
      },
    });
    return response.ok;
  }
}
