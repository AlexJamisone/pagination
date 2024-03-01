import axios from "axios";
import md5 from "crypto-js/md5";
import axiosRetry from "axios-retry";
import { isNumber } from "@/helpers/isNumber";
import { uniq } from "@/helpers/uniq";
import { compareArrays } from "@/helpers/compareArrays";

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
  baseURL: "https://api.valantis.store:41000",
  headers: {
    "Content-Type": "application/json",
    "X-Auth": md5(
      `${process.env.NEXT_PUBLIC_PASS}_${new Date().toISOString().slice(0, 10).replace(/-/g, "")}`,
    ).toString(),
  },
  timeout: 9999, // hit free vercel timeout because of Serveless and free account
  timeoutErrorMessage: "timeout error more then 10sec Vercel limiting",
});
axiosRetry(api, {
  retries: 5,
  retryDelay: (count) => {
    return count * 1000;
  },
  retryCondition: () => true,
  onRetry: (count, err) => {
    console.log(
      `Error code ${err.code}: ${err.message} on retry ${count} status: ${err.status}`,
    );
    if (count === 5) {
      throw new Error(`code ${err.code}: ${err.message} after ${count} retrys`);
    }
  },
});

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
export async function getAllBrands(): Promise<string[] | undefined> {
  try {
    const response = await api.post<ResponseResult>("", {
      action: "get_fields",
      params: { field: "brand" },
    });
    const brands = uniq(response.data.result, (brend) => brend);
    return brands;
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
    let products: Product[] = [];
    let ids: string[] = [];
    let total: number = 0;
    const limit = 50;
    const offset = (currentPage - 1) * limit;
    let productIds: string[] = [];
    let priceIds: string[] = [];
    let brandsIds: string[] = [];

    if (product) {
      productIds = (await getProductIdsByName(product)) ?? [];
    }
    if (price && isNumber(price)) {
      priceIds = (await getProductIdsByPrice(+price)) ?? [];
    }
    if (brands.length !== 0) {
      brandsIds =
        (await getProductIdsByBrands(
          typeof brands === "string" ? [brands] : brands,
        )) ?? [];
    }
    ids = compareArrays(productIds, priceIds, brandsIds);
    if (ids.length === 0 && !product && !price && brands.length === 0) {
      total = (await getInitialTotalPage()) ?? 0;
      ids = (await getIds(offset, limit)) ?? [];
    }
    const response = await getProductByIds(ids);
    products = uniq(response ?? [], (item) => item.id);
    if (total === 0) {
      total = Math.ceil(products.length / limit);
      const endIndex: number = Math.min(offset + limit - 1, total - 1);
      products =
        products.length > limit ? products.slice(offset, endIndex) : products;
    }
    return {
      products,
      totalPage: total,
      error: null,
    };
  } catch (err) {
    console.log(err);
    throw new Error("on this");
    return {
      product: [],
      total: 0,
      error: err,
    };
  }
}
