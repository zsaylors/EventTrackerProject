export class Events {
  id: number;
  name: string;
  location: string;
  description: string;
  date: string;

  constructor(id?: number, name?: string, location?: string, description?: string, date?: string) {
    this.id = id;
    this.name = name;
    this.location = location;
    this.description = description;
    this.date = date;
  }
}
