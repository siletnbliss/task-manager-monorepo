import { SegmentedControl, SegmentedControlProps } from '@mantine/core';

export function PriorityInput({
  putAll = false,
  ...props
}: Omit<SegmentedControlProps, 'data'> & { putAll?: boolean }) {
  return (
    <SegmentedControl
      data={[
        ...(putAll ? [{ label: 'All', value: 'all' }] : []),
        { label: 'Low', value: 'low' },
        { label: 'Medium', value: 'medium' },
        { label: 'High', value: 'high' },
      ]}
      {...props}
    />
  );
}
