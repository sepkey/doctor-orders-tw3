import type { ParsedMetadata } from '@/features/order/type';
import { DotIcon, Pill, Scan, TestTube } from 'lucide-react';

export const getCommandTypeMapper = [
  { type: 'DRUGS', label: 'نسخه دارویی', icon: <Pill className="h-5 w-5" /> },
  {
    type: 'LAB_TEST',
    label: 'نسخه آزمایشگاهی',
    icon: <TestTube className="h-5 w-5" />,
  },
  {
    type: 'RADIOLOGY',
    label: 'نسخه رادیولوژی',
    icon: <Scan className="h-5 w-5" />,
  },
];

export const parseMetadata = (metaDataString: string): ParsedMetadata => {
  try {
    const firstParse = JSON.parse(metaDataString);
    if (firstParse.metadata) {
      return JSON.parse(firstParse.metadata);
    }
    return firstParse;
  } catch (error) {
    console.error('Error parsing metadata:', error);
    return {};
  }
};

export const renderMetadataField = (label: string, value?: string) => {
  if (!value) return null;

  return (
    <div className="flex items-center gap-2">
      <span className="font-medium flex items-center">
        <DotIcon className="h-8 w-8" />
        {label}
      </span>
      <span>{value}</span>
    </div>
  );
};

export const createMetaData = (
  instruction?: string,
  discontinueUsingReason?: string
): string => {
  const metadata: ParsedMetadata = {};

  if (instruction) metadata.instruction = instruction;
  if (discontinueUsingReason)
    metadata.discontinueUsingReason = discontinueUsingReason;

  return JSON.stringify({
    metadata: JSON.stringify(metadata),
  });
};
