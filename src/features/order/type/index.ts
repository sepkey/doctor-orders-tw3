export type Order = {
  id: string;
  title: string;
  type: OrderType;
  startDate: string;
  commandType: 'DRUGS' | 'LAB_TEST' | 'RADIOLOGY';
  metaData: string;
};

export type OrderType = 'duringOrder' | 'outOfOrder';

export type ParsedMetadata = {
  instruction?: string;
  discontinueUsingReason?: string;
};

export type Filters = 'all' | OrderType;
