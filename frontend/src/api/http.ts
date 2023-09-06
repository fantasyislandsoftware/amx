import axios from "axios";
import { apiBaseUrl } from "../constants/env";

export const http = axios.create({ baseURL: apiBaseUrl });
