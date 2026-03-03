export interface BodyProps {
  title: string;
  columns: number;
  products: Array<{
    id: number;
    name: string;
    price: number;
    image: string;
  }>;
}
