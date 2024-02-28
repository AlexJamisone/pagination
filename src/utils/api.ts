import axios from "axios";
import md5 from "crypto-js/md5";
import { isNumber } from "./isNumber";
import { uniq } from "./uniq";
import axiosRetry from "axios-retry";
type ResponseResult = {
  result: string[];
};
type ReqProduct = {
  currentPage: number;
  product: string;
  price: string;
  brands: string[];
};
type Product = {
  id: string;
  product: string;
  price: number;
  brand: string | null;
};

const api = axios.create({
  baseURL: "https://api.valantis.store:41000/",
  headers: {
    "Content-Type": "application/json",
    "X-Auth": md5(
      `${process.env.PASS}_${new Date().toISOString().slice(0, 10).replace(/-/g, "")}`,
    ).toString(),
  },
});
axiosRetry(api, { retries: 3 });

async function getProductIdsByName(
  product: string,
): Promise<string[] | undefined> {
  try {
    const response = await api.post<ResponseResult>("", {
      action: "filter",
      params: { product },
    });
    if (!response.data.result) {
      return [];
    }
    return response.data.result;
  } catch (err) {
    console.log(err);
  }
}
async function getProductIdsByPrice(price: number) {
  try {
    const response = await api.post<ResponseResult>("", {
      action: "filter",
      params: { price },
    });
    if (!response.data.result) {
      return [];
    }
    return response.data.result;
  } catch (err) {
    console.log(err);
  }
}

async function getProductIdsByBrands(brands: string[]) {
  const result: string[][] = [];
  try {
    for (const brand of brands) {
      const response = await api.post<ResponseResult>("", {
        action: "filter",
        params: { brand },
      });
      result.push(response.data.result);
    }
    const merge = result.flat();
    return merge;
  } catch (err) {
    console.log(err);
  }
}
async function getInitialTotalPage() {
  // call price because have smallest response size
  try {
    const response = await api.post<{ result: number[] }>("", {
      action: "get_fields",
      params: { field: "price" },
    });
    const totalPage = Math.ceil(response.data.result.length / 50);
    return totalPage;
  } catch (err) {
    console.log(err);
  }
}
async function getIds(offset: number, limit: number) {
  try {
    const response = await api.post<ResponseResult>("", {
      action: "get_ids",
      params: { offset, limit },
    });
    if (!response.data.result) {
      return [];
    }
    return response.data.result;
  } catch (err) {
    console.log(err);
  }
}
async function getProductByIds(ids: string[]) {
  try {
    if (!ids || ids.length === 0) {
      return [];
    }
    const response = await api.post<{ result: Product[] }>("", {
      action: "get_items",
      params: { ids },
    });
    return response.data.result;
  } catch (err) {
    console.log(err);
  }
}

export async function getProducts({
  product,
  price,
  brands,
  currentPage,
}: ReqProduct) {
  try {
    let ids: string[] = [];
    let total: number = 0;
    const limit = 50;
    const offset = (currentPage - 1) * limit;
    if (product) {
      ids = (await getProductIdsByName(product)) ?? [];
    }
    if (price && isNumber(price)) {
      ids = (await getProductIdsByPrice(+price)) ?? [];
    }
    if (brands.length !== 0) {
      ids = (await getProductIdsByBrands(brands)) ?? [];
    }
    if (ids.length === 0) {
      console.log("up here");
      total = (await getInitialTotalPage()) ?? 0;
      ids = (await getIds(offset, limit)) ?? [];
    }
    const response = await getProductByIds(ids);
    const products = uniq(response ?? [], (item) => item.id);
    return {
      products,
      totalPage: total,
    };
  } catch (err) {
    console.log(err);
  }
}
