export type Order = {
  id: string;
  title: string;
  type: OrderStatus;
  startDate: string;
  commandType: 'DRUGS' | 'LAB_TEST' | 'RADIOLOGY';
  metaData: string;
};

export type OrderStatus = 'duringOrder' | 'outOfOrder';

export type ParsedMetadata = {
  instruction?: string;
  discontinueUsingReason?: string;
};
