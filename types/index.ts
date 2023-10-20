export interface OptionProps {
  title: string;
  value: string[] | string | any;
}

export interface CustomFilterProps {
  title: string;
  options: OptionProps[];
  data?: string | any | string[]; 

}

export interface ProcessDataItem {
  _id: string;
  processFlow: string[];
  __v: number;
}
