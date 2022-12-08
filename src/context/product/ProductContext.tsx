import { createContext } from "react";
import { ProductContextProps } from './ProductProvider'

export const ProductContext = createContext<ProductContextProps>({} as ProductContextProps );