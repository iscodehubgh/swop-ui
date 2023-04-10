declare global {
  interface Window {
    REACT_APP_BACKEND_PROTOCOL: string;
    REACT_APP_BACKEND_DOMAIN: string;
    REACT_APP_BACKEND_PORT: string;
    REACT_APP_FRONTEND_PROTOCOL: string;
    REACT_APP_FRONTEND_DOMAIN: string;
    REACT_APP_FRONTEND_PORT: string;
  }
}

interface HTTPMethods {
  GET: keyof HTTPMethods;
  POST: keyof HTTPMethods;
  PUT: keyof HTTPMethods;
  DELETE: keyof HTTPMethods;
  PATCH: keyof HTTPMethods;
}

const httpMethods: HTTPMethods = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
};

const backendUrl = () => {
  const PROTOCOL = window.REACT_APP_BACKEND_PROTOCOL;
  const DOMAIN = window.REACT_APP_BACKEND_DOMAIN;
  const PORT = window.REACT_APP_BACKEND_PORT;
  const BACKEND_URL = `${PROTOCOL}://${DOMAIN}:${PORT}/api`;
  return BACKEND_URL;
};
export const api = {
  get: async (url: string): Promise<Response> => {
    const fullUrl = `${backendUrl()}${url}`;
    const response = await fetch(fullUrl, {
      method: httpMethods.GET,
    });
    return response;
  },
  post: async (
    url: string,
    body: unknown,
  ): Promise<Response> => {
    const response = await fetch(`${backendUrl()}${url}`, {
      method: httpMethods.POST,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
      body: JSON.stringify(body),
    });

    return response;
  },
  postFormData: async (
    url: string,
    body: FormData,
  ): Promise<Response> => {
    const response = await fetch(`${backendUrl()}${url}`, {
      method: httpMethods.POST,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
      body,
    });

    return response;
  },
  put: async (url: string, body: unknown): Promise<Response> => {
    const response = await fetch(`${backendUrl()}${url}`, {
      method: httpMethods.PUT,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return response;
  },
  patch: async (url: string, body: unknown): Promise<Response> => {
    const response = await fetch(`${backendUrl()}${url}`, {
      method: httpMethods.PATCH,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return response;
  },
  delete: async (url: string): Promise<Response> => {
    const requestInit: RequestInit = {
      method: httpMethods.DELETE,
      headers: {},
    };

    const response = await fetch(`${backendUrl()}${url}`, {
      ...requestInit,
    });
    return response;
  },
};
