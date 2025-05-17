export class DataFormatter {
  public static format = (data: object | string): string => {
    return JSON.stringify(data);
  };
}
