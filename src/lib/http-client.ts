import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

export interface HttpClient {
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  post<T = any, R = any>(url: string, data?: T, config?: AxiosRequestConfig): Promise<R>;
  put<T = any, R = any>(url: string, data?: T, config?: AxiosRequestConfig): Promise<R>;
  patch<T = any, R = any>(url: string, data?: T, config?: AxiosRequestConfig): Promise<R>;
  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
}

export class AxiosHttpClient implements HttpClient {
  private readonly instance: AxiosInstance;
  private isRefreshing = false;
  private refreshSubscribers: Array<() => void> = [];

  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
      withCredentials: true, // Required for HttpOnly cookies
    });

    // Interceptors
    this.instance.interceptors.request.use(this.addContextHeaders);
    this.instance.interceptors.response.use(
      (response) => response,
      (error) => this.handleError(error)
    );
  }

  private addContextHeaders = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    if (typeof window !== 'undefined') {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const locale = navigator.language || 'en-US';

      config.headers["X-TIMEZONE"] = timezone;
      config.headers["X-LOCALE"] = locale;

      // CSRF Token
        const csrfToken = this.getCookie("csrf_access");
        if (csrfToken) {
          config.headers["X-CSRF-Token"] = csrfToken;
        }
    }

    return config;
  };

  private handleError = async (error: AxiosError): Promise<any> => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    const status = error.response?.status;
    // Handle 401 Unauthorized — token expired
    if (status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true;

      try {
        await this.refreshToken();
        this.notifySubscribers();
        return this.instance(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        
        this.redirectToLogin();

        return Promise.reject(refreshError); // ensure rejection is preserved
      }
    }

    // Other errors

    // 403 Forbidden - Not enough permissions
    if (status === 403) {
      console.warn("Access denied. You do not have the required permissions.");
      this.redirectToAccessDenied(); // Optional custom route
    }

    // 419 Authentication Timeout
    if (status === 419) {
      console.warn("Authentication timeout. Please login again.");
      this.redirectToLogin();
    }

    // Network or CORS errors
    if (error.code === "ECONNABORTED" || error.message === "Network Error" || !error.response) {
      console.log("error obj: ", error)
      console.error("Network error. Please check your internet connection.");
      this.notifyNetworkError(); // Optionally show toast/snackbar
    }

    return Promise.reject(error);
  };

  private async refreshToken(): Promise<void> {
    if (this.isRefreshing) {
      return new Promise((resolve) => this.refreshSubscribers.push(resolve));
    }

    this.isRefreshing = true;

    try {
      await axios.post(
        '/api/users/auths/refresh-token',
        {},
        { withCredentials: true }
      );
    } finally {
      this.isRefreshing = false;
    }
  }

  private notifySubscribers() {
    this.refreshSubscribers.forEach((cb) => cb());
    this.refreshSubscribers = [];
  }

// Helper Error Redirection Methods
private redirectToLogin() {
  if (typeof window !== "undefined") {
    const current = window.location.pathname + window.location.search;
    window.location.href = `/login?redirect=${encodeURIComponent(current)}`;
  }
}

private redirectToAccessDenied() {
  if (typeof window !== "undefined") {
    window.location.href = `/403`;
  }
}

private notifyNetworkError() {
  // Show toast/snackbar or emit event to global error handler
  if (typeof window !== "undefined") {
    console.error("No response received. Possibly offline.");
    alert("Network error. Please check your internet connection.");
  }
}


  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.instance.get(url, config);
    return response.data;
  }

  async post<T = any, R = any>(url: string, data?: T, config?: AxiosRequestConfig): Promise<R> {
    const response: AxiosResponse<R> = await this.instance.post(url, data, config);
    return response.data;
  }

  async put<T = any, R = any>(url: string, data?: T, config?: AxiosRequestConfig): Promise<R> {
    const response: AxiosResponse<R> = await this.instance.put(url, data, config);
    return response.data;
  }

  async patch<T = any, R = any>(url: string, data?: T, config?: AxiosRequestConfig): Promise<R> {
    const response: AxiosResponse<R> = await this.instance.patch(url, data, config);
    return response.data;
  }

  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.instance.delete(url, config);
    return response.data;
  }

  private getCookie(name: string): string | null {
    if (typeof document === "undefined") return null;

    const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
    return match ? decodeURIComponent(match[1]) : null;
  }
}
