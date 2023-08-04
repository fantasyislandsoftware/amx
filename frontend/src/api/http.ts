import axios from "axios";
import { apiBaseUrl } from "../App/constants/env";

export const http = axios.create({ baseURL: apiBaseUrl });
