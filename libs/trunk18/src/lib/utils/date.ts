export class DateUtil {
  static getNow(): string {
    return new Date().toISOString();
  }
}
