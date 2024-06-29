export class DateUtils {
  static formatDate(timestamp: number): string {
    const date = new Date(timestamp);
    return date.toLocaleDateString(); // Customize the format as needed
  }
}
