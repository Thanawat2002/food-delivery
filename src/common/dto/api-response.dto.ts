export class ApiResponse<T> {
  success: number;
  message: string;
  data?: T;

  constructor(success: number, message: string, data?: T) {
    this.success = success;
    this.message = message;
    if (data !== undefined) {
      this.data = data;
    }
  }
}
